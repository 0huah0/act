package com.abcdef.core.web.filter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.abcdef.core.security.SecurityDataSource;
/**
 * 权限拦载器
 * 
 */
public class SecurityInterceptorFilter extends OncePerRequestFilter {
	
	/**
	 * 角色权限映射列表源，用于权限的匹配
	 */
	private HashMap<String, Set<String>> roleUrlsMap=null;
	
	private SecurityDataSource securityDataSource;

	public void setSecurityDataSource(SecurityDataSource securityDataSource) {
		this.securityDataSource = securityDataSource;
	}
	
	@Override
	public void afterPropertiesSet() throws ServletException {
		loadDataSource();
		if(roleUrlsMap==null){
			throw new RuntimeException("没有进行设置系统的权限匹配数据源");
		}
	}

	public void loadDataSource(){
		roleUrlsMap=securityDataSource.getDataSource();
	}
	
	/**
	 * 检查该URL是否授权访问
	 * @param url
	 * @return
	 */
	private boolean isUrlGrantedRight(String url,Authentication auth){
		//遍历该用户下所有角色对应的URL，看是否有匹配的
		for(GrantedAuthority ga:auth.getAuthorities()){
			String roleCode = ga.getAuthority();
			Set<String> urlSet=roleUrlsMap.get(roleCode);
			if(urlSet!=null && urlSet.contains(url)){
				if(logger.isDebugEnabled()){
					logger.debug(roleCode + ", granted url:" + url);
				}
				return true;
			}
		}
		return false;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
		String url=request.getRequestURI();
		//若有contextPath,则切出来
		if(org.springframework.util.StringUtils.hasLength(request.getContextPath())){
			String contextPath=request.getContextPath();
			int index=url.indexOf(contextPath);
			if(index!=-1){
				url=url.substring(index+contextPath.length());
			}
		}
		boolean isSuperUser = false;
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();//取得认证器
		Iterator<? extends GrantedAuthority> iterator = auth.getAuthorities().iterator();
		
		String __debugPrintRole = "";
		
		while (iterator.hasNext()) {
			GrantedAuthority authority = iterator.next();
			
			__debugPrintRole += authority.getAuthority() + "，";
			
			if("ROLE_SUPER".equals(authority.getAuthority())){
				isSuperUser = true;
				break;
			} /*else if ("ROLE_PUBLIC".equals(authority.getAuthority())){
				//加上这个是为了项目权限分配的简化处理，不需要细化每个url
				isSuperUser = true;
			}*/
		}
		
		if(!isSuperUser){//非超级管理员
			if(!isUrlGrantedRight(url,auth)){//如果未授权
				if(logger.isDebugEnabled()){
					logger.debug(__debugPrintRole + ", ungranted url:" + url);
				}
				/*if(url.startsWith("/mobile/")){
					response.sendRedirect(request.getContextPath() + "/mobile/login.jsp");
					return;
				}*/
				throw new AccessDeniedException("Access is denied! Url:" + url + " User:" + SecurityContextHolder.getContext().getAuthentication().getName());
			}
		} else {
			if(logger.isDebugEnabled()){
				logger.debug("pass the url:" + url);
			}
		}
		//进行下一个Filter
		chain.doFilter(request, response);
	}
}
