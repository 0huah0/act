package com.abcdef.frm.action.system;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.abcdef.core.Constants;
import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.exception.ExistException;
import com.abcdef.core.exception.NotCompleteException;
import com.abcdef.core.exception.NotExistException;
import com.abcdef.core.log.Action;
import com.abcdef.core.model.OnlineUser;
import com.abcdef.core.util.AppUtil;
import com.abcdef.core.util.ContextUtil;
import com.abcdef.core.util.StringUtil;
import com.abcdef.core.web.action.BaseAction;
import com.abcdef.frm.model.system.AppRole;
import com.abcdef.frm.model.system.AppUser;
import com.abcdef.frm.model.system.Department;
import com.abcdef.frm.model.system.IndexDisplay;
import com.abcdef.frm.model.system.PanelItem;
import com.abcdef.frm.service.system.AppRoleService;
import com.abcdef.frm.service.system.AppUserService;
import com.abcdef.frm.service.system.IndexDisplayService;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

public class AppUserAction extends BaseAction {

	@Resource
	private AppUserService appUserService;
	@Resource
	private AppRoleService appRoleService;
	@Resource
	private IndexDisplayService indexDisplayService;

	private AppUser appUser;

	private Long userId;

	private Long roleId;

	private Long depId;

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getDepId() {
		return depId;
	}

	public void setDepId(Long depId) {
		this.depId = depId;
	}

	public AppUser getAppUser() {
		return appUser;
	}

	public void setAppUser(AppUser appUser) {
		this.appUser = appUser;
	}

	/**
	 * @category 查询本人信息
	 * @return
	 */
	public String getMy() {
		userId = ContextUtil.getCurrentUserId();
		get();
		return SUCCESS;
	}

	/**
	 * @category 查询单个账号信息
	 * @return
	 */
	public String get() {
		/*
		 * if (logger.isDebugEnabled()) { logger.debug("Request Parameter：" +
		 * getRequestParameter()); }
		 */
		AppUser appUser = null;
		JSONSerializer json = new JSONSerializer();
		if (userId != null) {
			appUser = appUserService.get(userId);

		} else {
			appUser = ContextUtil.getCurrentUser();

			appUser = appUserService.get(appUser.getUserId());
		}
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,totalCounts:1,data:");
		json.transform(new DateTransformer("yyyy-MM-dd"),
				"employee.accessionDate");
		json.transform(new DateTransformer("yyyy-MM-dd"), "employee.birthday");
		json.transform(new DateTransformer("yyyy-MM-dd"),
				"employee.attendWorkDate");
		sb.append(json.exclude(new String[] { "password","class","employee.class" }).serialize(appUser));
		sb.append("}");
		setJsonString(sb.toString());
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername()
					+ "：查询单个用户信息");
		}
		return SUCCESS;
	}

	/**
	 * @category 显示当前用户,并且加载该用户的所有权限
	 * @return
	 */
	public String getCurrent() {
		if (logger.isDebugEnabled()) {
			logger.debug("Request Parameter：" + getRequestParameter());
		}
		AppUser currentUser = ContextUtil.getCurrentUser();

		Department curDep = currentUser.getEmployee().getDepartment();

		Iterator<String> publicIds = AppUtil.getPublicMenuIds().iterator();
		StringBuffer publicIdSb = new StringBuffer();
		while (publicIds.hasNext()) {
			publicIdSb.append(",").append(publicIds.next());
		}
		List<IndexDisplay> list = indexDisplayService.findByUser(currentUser
				.getUserId());
		List<PanelItem> items = new ArrayList<PanelItem>();
		for (IndexDisplay id : list) {
			PanelItem pi = new PanelItem();
			pi.setPanelId(id.getPortalId());
			pi.setColumn(id.getColNum());
			pi.setRow(id.getRowNum());
			items.add(pi);
		}
		boolean isOfficeManager = false;
		StringBuffer sb = new StringBuffer();
		sb.append("{success:true,user:{userId:'").append(
				currentUser.getUserId());
		sb.append("'");
		sb.append(",isOfficeManager:").append(isOfficeManager);

		sb.append(",username:'").append(currentUser.getUsername())

		.append("',fullname:'").append(currentUser.getEmployee().getFullname())
				.append("',depId:'").append(curDep.getDepId())
				.append("',depName:'").append(curDep.getDepName())
				.append("',rights:'");

		sb.append(currentUser.getRights().toString().replace("[", "")
				.replace("]", ""));

		if (!"".equals(currentUser.getRights()) && publicIdSb.length() > 0) {
			sb.append(publicIdSb.toString());
		}
		Gson gson = new Gson();
		sb.append("',items:").append(gson.toJson(items).toString());
		sb.append("}}");
		setJsonString(sb.toString());
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername()
					+ "：显示当前用户,并且加载该用户的所有权限");
		}
		return SUCCESS;
	}

	/**
	 * @category 查询所有的用户信息
	 * @return
	 */
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_delFlag_SN_EQ", Constants.FLAG_UNDELETED.toString());
		List<AppUser> list = appUserService.getAll(filter);

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"),new String[] { "accessionTime" });
		JSONSerializer jSerializer = serializer.exclude(new String[] { "password" });
		String jString = jSerializer.exclude(new String[] { "class" })
				.serialize(list);

		buff.append(jString);
		buff.append("}");
		jsonString = buff.toString();
		
		return SUCCESS;
	}

	/**
	 * @category 在线用户
	 * @return
	 */
	public String online() {
		logger.debug("Request Parameter : " + super.getRequestParameter());
		Map<String, OnlineUser> onlineUsers = new HashMap<String, OnlineUser>();
		Map<String, OnlineUser> onlineUsersByDep = new HashMap<String, OnlineUser>();
		Map<String, OnlineUser> onlineUsersByRole = new HashMap<String, OnlineUser>();
		onlineUsers = AppUtil.getOnlineUsers();// 获得所有在线用户
		// 按部门选择在线用户
		if (depId != null) {
			for (String sessionId : onlineUsers.keySet()) {
				OnlineUser onlineUser = new OnlineUser();
				onlineUser = onlineUsers.get(sessionId);
				String path = "";
				if (!onlineUser.getUserId().equals(AppUser.SUPER_USER)) {
					path = onlineUser.getDepPath();
				}
				if (!depId.equals(new Long(0))) {
					if (java.util.regex.Pattern.compile("." + depId + ".")
							.matcher(path).find()) {
						onlineUsersByDep.put(sessionId, onlineUser);
					}
				} else {
					onlineUsersByDep.put(sessionId, onlineUser);
				}
			}
		}
		// 按角色选择在线用户
		if (roleId != null) {
			for (String sessionId : onlineUsers.keySet()) {
				OnlineUser onlineUser = new OnlineUser();
				onlineUser = onlineUsers.get(sessionId);
				if (java.util.regex.Pattern.compile("," + roleId + ",")
						.matcher(onlineUser.getRoleIds()).find()) {
					onlineUsersByRole.put(sessionId, onlineUser);
				}
			}
		}
		Type type = new TypeToken<java.util.Collection<OnlineUser>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(onlineUsers.size()).append(",result:");
		Gson gson = new Gson();
		if (depId != null) {
			buff.append(gson.toJson(onlineUsersByDep.values(), type));
		} else if (roleId != null) {
			buff.append(gson.toJson(onlineUsersByRole.values(), type));
		} else {
			buff.append(gson.toJson(onlineUsers.values(), type));
		}
		buff.append("}");
		jsonString = buff.toString();
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername() + "：查找在线用户");
		}
		return SUCCESS;
	}

	/**
	 * @category 批量删除
	 * @return
	 */
	public String multiDel() {
		if (logger.isDebugEnabled()) {
			logger.debug("Request Parameter：" + getRequestParameter());
		}
		String[] ids = getRequest().getParameterValues("ids");
		StringBuffer buff = new StringBuffer("{success:true");
		if (ids != null) {
			buff.append(",msg:'");
			for (String id : ids) {
				AppUser delUser = appUserService.get(new Long(id));
				AppRole superManager = appRoleService.get(AppRole.SUPER_ROLEID);
				if (delUser.getRoles().contains(superManager)) {
					buff.append("员工:").append(delUser.getUsername())
							.append("是超级管理员,不能删除!<br><br/>");
				} else if (delUser.getUserId().equals(
						ContextUtil.getCurrentUserId())) {
					buff.append("不能删除自己!<br></br>");
				} else {
					try {
						appUserService.remove(delUser.getUserId());
					} catch (NotExistException e) {
						buff.append("删除过程存在错误!<br></br>");
					}
				}
			}
			buff.append("'");
		}
		buff.append("}");
		setJsonString(buff.toString());
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername()
					+ "：批量删除用户信息操作");
		}
		return SUCCESS;
	}

	/**
	 * @category 添加及保存用户信息
	 */
	public String selfAlter() {
		if (appUser.getId() != null) {
			appUserService.selfAlter(appUser);
			setJsonString("{success:true}");
		} else {
			setJsonString("{success:false}");
		}

		return SUCCESS;
	}

	/**
	 * @category 添加及保存用户信息
	 */
	public String save() {

		// 保存账号信息
		String rolesIds = getRequest().getParameter("AppUserRoles");
		if (appUser != null && !rolesIds.isEmpty()) {
			String[] ids = rolesIds.split(",");
			Set<AppRole> roles = new HashSet<AppRole>();
			for (String id : ids) {
				if (!"".equals(id)) {
					AppRole role = appRoleService.get(new Long(id));
					roles.add(role);
				}
			}
			appUser.setRoles(roles);
		}

		try {
			appUserService.save(appUser);
		} catch (NotCompleteException e) {
			setJsonString("{success:false,msg:'用户信息不完整'}");
		} catch (NotExistException e) {
			setJsonString("{success:false,msg:'用户登录账号:" + appUser.getUsername()
					+ "已存在,请重新输入账号.'}");
		} catch (ExistException e) {
			setJsonString("{success:false,msg:'" + e.getMessage() + "'}");
		}
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername()
					+ "：添加及保存用户信息操作");
		}

		return SUCCESS;
	}

	public String selectedRoles() {
		if (logger.isDebugEnabled()) {
			logger.debug("Request Parameter：" + getRequestParameter());
		}
		if (userId != null) {
			setAppUser(appUserService.get(userId));
			// 给Set<AppRole> roleSet用TreeSet排序
			Comparator<AppRole> compar = new Comparator<AppRole>() {
				public int compare(AppRole a, AppRole b) {
					long n1 = a.getRoleId();
					long n2 = b.getRoleId();
					if (n1 > n2) {
						return 1;
					} else if (n1 == n2) {
						return 0;
					} else {
						return -1;
					}
				}
			};
			TreeSet<AppRole> roles = new TreeSet<AppRole>(compar);
			Set<AppRole> roleSet = appUser.getRoles();

			for (AppRole role : roleSet) {
				roles.add(role);
			}

			StringBuffer sb = new StringBuffer("[");
			for (AppRole role : roles) {
				sb.append("['" + role.getRoleId() + "','" + role.getRoleName()
						+ "'],");
			}
			if (sb.length() > 1) {
				sb.deleteCharAt(sb.length() - 1);
			}
			sb.append("]");
			setJsonString(sb.toString());
		}
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername() + "：查询已有角色");
		}
		return SUCCESS;
	}

	/**
	 * @category 查询可选角色
	 * @return
	 */
	public String chooseRoles() {
		if (logger.isDebugEnabled()) {
			logger.debug("Request Parameter：" + getRequestParameter());
		}
		List<AppRole> chooseRoles = appRoleService.getAll();
		if (userId != null) {
			setAppUser(appUserService.get(userId));
			Set<AppRole> selectedRoles = appUser.getRoles();
			for (AppRole role : selectedRoles) {
				chooseRoles.remove(role);
			}
		}

		AppUser au = ContextUtil.getCurrentUser();
		List<AppRole> chooseRoles1 = new ArrayList<AppRole>();
		// 如果是系统管理员登录，将不为物业公司管理员角色的选择过滤出来
		if (appUserService.hasRole(au, "ROLE_SYSTEM")) {
			for(AppRole role : chooseRoles){
				String roleCode = role.getRoleCode();
				if(!roleCode.equals("ROLE_COMPANYMANAGER")){
					chooseRoles1.add(role);
				}
			}
		} else if (appUserService.hasRole(au, "ROLE_COMPANYMANAGER")) {// 如果是物业公司管理员登录，将不为公司业务人员角色的选择过滤出来
			for (AppRole role : chooseRoles) {
				String roleCode = role.getRoleCode();
				if (!roleCode.equals("ROLE_COMPANY")) {
					chooseRoles1.add(role);
				}
			}
		} else if (appUserService.hasRole(au, "ROLE_COMPANY")) {// 如果是公司业务人员登录，将不为以下三种角色的选择过滤出来
			for (AppRole role : chooseRoles) {
				String roleCode = role.getRoleCode();
				if (!roleCode.equals("ROLE_OFFICEMAMAGER")) {
					chooseRoles1.add(role);
				}
			}
		} else if (appUserService.hasRole(au, "ROLE_OFFICEMAMAGER")) { // 如果是管理处管理员登录，将不为以下两种角色的选择过滤出来
			for (AppRole role : chooseRoles) {
				String roleCode = role.getRoleCode();
				if (!(roleCode.equals("ROLE_OFFICE") || roleCode
						.equals("ROLE_PRO"))) {
					chooseRoles1.add(role);
				}
			}
		} /*else if (appUserService.hasRole(au, "ROLE_OFFICE")) {
			for (AppRole role : chooseRoles) {
				String roleCode = role.getRoleCode();
				if (!roleCode.equals("ROLE_PRO")) {
					chooseRoles1.add(role);
				}
			}
		}*/
		// 删除该登陆账号不能操作的可选角色
		for (AppRole role : chooseRoles1) {
			chooseRoles.remove(role);
		}
		StringBuffer sb = new StringBuffer("[");
		if (!chooseRoles.isEmpty()) {
			for (AppRole role : chooseRoles) {
				if (role.getStatus() != 0) {
					sb.append("['" + role.getRoleId() + "','"
							+ role.getRoleName() + "'],");
				}
			}

			if (sb.toString().contains(",")) {
				sb.deleteCharAt(sb.length() - 1);
			}
		}
		sb.append("]");
		setJsonString(sb.toString());
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername() + "：查询可选角色");
		}
		return SUCCESS;
	}

	/**
	 * @category 修改密码
	 * @return
	 */
	public String resetPassword() {
		if (logger.isDebugEnabled()) {
			logger.debug("Request Parameter：" + getRequestParameter());
		}
		String userId = getRequest().getParameter("appUserUserId");
		String oldPassword = StringUtil.encryptSha256(getRequest()
				.getParameter("oldPassword"));
		String newPassword = getRequest().getParameter("newPassword");
		String againPassword = getRequest().getParameter("againPassword");
		if (StringUtils.isNotEmpty(userId)) {
			setAppUser(appUserService.get(new Long(userId)));
		} else {
			setAppUser(ContextUtil.getCurrentUser());
		}
		StringBuffer msg = new StringBuffer("{msg:'");
		setJsonString("{success:true}");
		boolean pass = false;
		if (oldPassword.equals(appUser.getPassword())) {
			if (newPassword.equals(againPassword)) {
				pass = true;
			} else
				msg.append("两次输入不一致.'");
		} else
			msg.append("旧密码输入不正确.'");
		if (pass) {
			appUser.setPassword(StringUtil.encryptSha256(newPassword));
			try {
				appUserService.save(appUser);
			} catch (NotCompleteException e) {
				msg.append("员工信息不完整");
			} catch (ExistException e) {
				msg.append("员工信息已经存在");
			} catch (NotExistException e) {
				msg.append("员工信息不存在");
			}

		} else {
			msg.append(",failure:true}");
			setJsonString(msg.toString());
		}
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername() + "：修改密码操作");
		}
		return SUCCESS;
	}

	/**
	 * 首页上方修改密码
	 * 
	 * @return
	 */
	@Action(description = "修改本人密码")
	public String resetMyPassword() {
		if (logger.isDebugEnabled()) {
			logger.debug("Request Parameter：" + getRequestParameter());
		}
		String oldPassword = StringUtil.encryptSha256(getRequest()
				.getParameter("oldPassword"));
		String newPassword = getRequest().getParameter("newPassword");
		String againPassword = getRequest().getParameter("againPassword");
		setAppUser(ContextUtil.getCurrentUser());
		StringBuffer msg = new StringBuffer("{msg:'");
		setJsonString("{success:true}");
		boolean pass = false;
		if (oldPassword.equals(appUser.getPassword())) {
			if (newPassword.equals(againPassword)) {
				pass = true;
			} else
				msg.append("两次输入不一致.'");
		} else
			msg.append("旧密码输入不正确.'");
		if (pass) {
			appUser.setPassword(StringUtil.encryptSha256(newPassword));
			try {
				appUserService.save(appUser);
			} catch (NotCompleteException e) {
				msg.append("员工信息不完整'");
			} catch (ExistException e) {
				msg.append("员工信息已经存在'");
			} catch (NotExistException e) {
				msg.append("员工信息不存在'");
			}

		} else {
			msg.append(",failure:true}");
			setJsonString(msg.toString());
		}
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername()
					+ "：修改自己密码操作");
		}
		return SUCCESS;
	}

	/**
	 * @category 重置密码
	 * @return
	 */
	public String createPassword() {
		if (logger.isDebugEnabled()) {
			logger.debug("Request Parameter：" + getRequestParameter());
		}
		String userId = getRequest().getParameter("appUserUserId");
		String newPassword = getRequest().getParameter("newpassword");
		String password = getRequest().getParameter("password");
		StringBuffer msg = new StringBuffer("{msg:'");
		if (StringUtils.isNotEmpty(userId)) {
			setAppUser(appUserService.get(new Long(userId)));
		} else {
			setAppUser(ContextUtil.getCurrentUser());
		}

		if (newPassword.equals(password)) {
			appUser.setPassword(StringUtil.encryptSha256(newPassword));
			try {
				appUserService.save(appUser);
			} catch (NotCompleteException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (ExistException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (NotExistException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			setJsonString("{success:true}");
		} else {
			msg.append("重置失败!,两次输入的密码不一致,请重新输入!.'");
			msg.append(",failure:true}");
			setJsonString(msg.toString());
		}
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername() + "：重置密码操作");
		}
		return SUCCESS;

	}

	public String isExit() {
		StringBuffer buff = new StringBuffer("{result:");
		String empCode = getRequest().getParameter("empCode");
		if (appUserService.isExit(empCode)) {
			buff.append("true");
		} else {
			buff.append("false");
		}
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}

	public String validate() {
		StringBuffer buff = new StringBuffer("{result:");
		String userName = getRequest().getParameter("userName");
		if (appUserService.validate(userName)) {
			buff.append("true");
		} else {
			buff.append("false");
		}
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	
	
}
