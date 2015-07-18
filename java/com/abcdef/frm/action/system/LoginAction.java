package com.abcdef.frm.action.system;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import nl.captcha.Captcha;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import com.abcdef.core.util.StringUtil;
import com.abcdef.core.web.action.BaseAction;
import com.abcdef.frm.model.system.AppUser;
import com.abcdef.frm.model.system.SysConfig;
import com.abcdef.frm.service.system.AppUserService;
import com.abcdef.frm.service.system.SysConfigService;

public class LoginAction extends BaseAction{
	private AppUser user;
	private String username;
	private String password;
	private String checkCode;//验证码
	
	private String key="RememberAppUser";
	
	@Resource
	private AppUserService userService;
	@Resource
	private SysConfigService sysConfigService;
	@Resource(name="authenticationManager")
	private AuthenticationManager authenticationManager=null;

	
	/**
	 * 登录
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public String login(){
		//定义验证信息
		StringBuffer msg = new StringBuffer("{msg:'");
		//取得验证码配置
		SysConfig sysConfig = sysConfigService.findByKey("codeConfig");
		//取得验证码
		Captcha captcha = (Captcha)getSession().getAttribute(Captcha.NAME);
		Boolean login = false;
		
		String newPassword=null;
		//用户名不为空
		if(!"".equals(username)&&username!=null){
			setUser(userService.getByUserName(username));
			//验证用户是否存在
			if(user!=null){
				//密码不为空
				if(StringUtils.isNotEmpty(password)){
					//密码加密
					newPassword=StringUtil.encryptSha256(password);
					//密码验证
					if(user.getPassword().equalsIgnoreCase(newPassword)){
						//判断是否需要验证码验证
						if(sysConfig.getDataValue().equals(SysConfig.CODE_OPEN)){
							if(captcha==null){
								msg.append("请刷新验证码再登录.'");
							}else{
								//验证码验证
								if(captcha.isCorrect(checkCode)){
									//判断用户是否被禁用
									if(user.getStatus()==1){
										login=true;
									}
									else msg.append("此用户已被禁用.'");
								}
								else msg.append("验证码不正确.'");
							}
						}else{//此处不需要验证码验证
							//判断用户是否被禁用
							if(user.getStatus()==1){
								login=true;
							}
							else msg.append("此用户已被禁用.'");
						}
					}
					else msg.append("密码不正确.'");
				}
				else msg.append("密码不能为空.'");
			}
			else msg.append("用户不存在.'");
		}
		if(login){
			UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);
			SecurityContext securityContext = SecurityContextHolder.getContext();
			securityContext.setAuthentication(authenticationManager.authenticate(authRequest));
			SecurityContextHolder.setContext(securityContext);
	        getSession().setAttribute(AbstractAuthenticationProcessingFilter.SPRING_SECURITY_LAST_EXCEPTION_KEY,username);
	        String rememberMe = getRequest().getParameter("_spring_security_remember_me");
	        if(rememberMe!=null&&rememberMe.equals("on")){
				//加入cookie
				long tokenValiditySeconds = 1209600; // 14 days
		        long tokenExpiryTime = System.currentTimeMillis() + (tokenValiditySeconds * 1000);
		        //DigestUtils.md5Hex(username + ":" + tokenExpiryTime + ":" + password + ":" + getKey());
		        String signatureValue = DigestUtils.md5Hex(username + ":" + tokenExpiryTime + ":" + user.getPassword() + ":" + key);
		        
		        String tokenValue = username + ":" + tokenExpiryTime + ":" + signatureValue;
		        String tokenValueBase64 = new String(Base64.encodeBase64(tokenValue.getBytes()));
		        getResponse().addCookie(makeValidCookie(tokenExpiryTime, tokenValueBase64));
		        
	        }
	        
			setJsonString("{success:true}");
		}else{
			msg.append(",failure:true}");
			setJsonString(msg.toString());
		}
		return SUCCESS;
	}
	//add Cookie
	protected Cookie makeValidCookie(long expiryTime, String tokenValueBase64) {
		HttpServletRequest request=getRequest();
		Cookie cookie = new Cookie(TokenBasedRememberMeServices.SPRING_SECURITY_REMEMBER_ME_COOKIE_KEY, tokenValueBase64);
		cookie.setMaxAge(60 * 60 * 24 * 365 * 5); // 5 years
		cookie.setPath(org.springframework.util.StringUtils.hasLength(request.getContextPath()) ? request.getContextPath():"/");
		return cookie;
	}
	
	public AppUser getUser() {
		return user;
	}
	
	public void setUser(AppUser user) {
		this.user = user;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}

	public String getCheckCode() {
		return checkCode;
	}

	public void setCheckCode(String checkCode) {
		this.checkCode = checkCode;
	}

}
