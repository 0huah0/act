package com.abcdef.frm.action.system;

import java.lang.reflect.Type;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.dom4j.Document;

import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.util.AppUtil;
import com.abcdef.core.util.BeanUtil;
import com.abcdef.core.util.ContextUtil;
import com.abcdef.core.web.action.BaseAction;
import com.abcdef.frm.model.system.AppFunction;
import com.abcdef.frm.model.system.AppRole;
import com.abcdef.frm.service.system.AppFunctionService;
import com.abcdef.frm.service.system.AppRoleService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

/**
 * @category 员工角色Action类
 * @author
 */
public class AppRoleAction extends BaseAction {
	@Resource
	private AppFunctionService appFunctionService;
	@Resource
	private AppRoleService appRoleService;

	private AppRole appRole;

	private Long roleId;

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public AppRole getAppRole() {
		return appRole;
	}

	public void setAppRole(AppRole appRole) {
		this.appRole = appRole;
	}

	/**
	 * @category 查询用户角色列表
	 */
	public String list() {
		if (logger.isDebugEnabled()) {
			logger.debug("Request Parameter：" + getRequestParameter());
		}
		QueryFilter filter = new QueryFilter(getRequest());
		List<AppRole> list = appRoleService.getAll(filter);

		Type type = new TypeToken<List<AppRole>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
				.create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		jsonString = buff.toString();
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername()
					+ "：查询用户角色列表操作");
		}
		return SUCCESS;
	}

	/**
	 * @category 列出角色树
	 * 
	 */
	public String tree() {
		if (logger.isDebugEnabled()) {
			logger.debug("Request Parameter：" + getRequestParameter());
		}
		List<AppRole> listRole;
		StringBuffer buff = new StringBuffer("[");
		listRole = appRoleService.getAll();// 最顶层父节点
		for (AppRole role : listRole) {
			buff.append("{id:'" + role.getRoleId() + "',text:'"
					+ role.getRoleName() + "',leaf:true},");
		}
		if (!listRole.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername() + "：查询角色树操作");
		}
		return SUCCESS;
	}

	/**
	 * @category 列出部门中的角色树
	 * 
	 */
	public String treeDepRole() {
		if (logger.isDebugEnabled()) {
			logger.debug("Request Parameter：" + getRequestParameter());
		}
		List<AppRole> listRole;
		StringBuffer buff = new StringBuffer("[");
		listRole = appRoleService.getAll();// 最顶层父节点
		for (AppRole role : listRole) {
			buff.append("{id:'" + role.getRoleId() + "',text:'"
					+ role.getRoleName() + "',leaf:true},");
		}
		if (!listRole.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername()
					+ "：列出部门中的角色树");
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
		if (ids != null) {
			for (String id : ids) {
				AppRole appRole = appRoleService.get(new Long(id));
				appRole.getAppUsers().remove(appRole);
				appRole.getFunctions().remove(appRole);
				try {
					appRoleService.remove(appRole.getRoleId());
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		jsonString = "{success:true}";
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername()
					+ "：批量删除角色操作");
		}
		return SUCCESS;
	}

	/**
	 * @category 角色授权
	 * @return
	 */
	public String grant() {
		if (logger.isDebugEnabled()) {
			logger.debug("Request Parameter：" + getRequestParameter());
		}
		AppRole appRole = appRoleService.get(roleId);
		String rights = getRequest().getParameter("rights");

		if (rights == null) {
			rights = "";
		}
		appRole.setRights(rights);

		appRole.getFunctions().clear();

		String[] funs = rights.split("[,]");

		for (int i = 0; i < funs.length; i++) {
			if (funs[i].startsWith("_")) {
				AppFunction af = appFunctionService.getByKey(funs[i]);
				if (af != null) {
					appRole.getFunctions().add(af);
				}
			}
		}
		// 检查Right是否发生了变化
		try {
			// TODO 保存和移除
			appRoleService.save(appRole);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// 重新加载权限 优化为只是更新该角色对应的权限
		AppUtil.reloadSecurityDataSource();
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername() + "：角色授权操作");
		}
		return SUCCESS;
	}

	/**
	 * 加载授权的XML
	 * 
	 * @return
	 */
	public String grantXml() {
		if (logger.isDebugEnabled()) {
			logger.debug("Request Parameter：" + getRequestParameter());
		}
		Document grantMenuDoc = AppUtil.getGrantMenuDocument();
		setJsonString(grantMenuDoc.asXML());
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername()
					+ "：加载授权的XML操作");
		}
		return SUCCESS;
	}

	/**
	 * @category 查询单个角色详细信息
	 * @return
	 */
	public String get() {
		if (logger.isDebugEnabled()) {
			logger.debug("Request Parameter：" + getRequestParameter());
		}
		AppRole appRole = appRoleService.get(roleId);
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
				.create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(appRole));
		sb.append("}");
		setJsonString(sb.toString());
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername()
					+ "：查询单个角色详细信息操作");
		}
		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		boolean success  = true;
		String un = ContextUtil.getCurrentUser().getUsername();
		Date date = new Date();
		try {
			if (appRole.getRoleId() == null) {
				appRole.setCreateBy(un);
				appRole.setCreateDate(date);
			} else {
				AppRole orgactTitle = appRoleService.get(appRole.getRoleId());
				BeanUtil.copyNotNullProperties(orgactTitle, appRole);
				appRole = orgactTitle;
			}
			appRole.setUpdateBy(un);
			appRole.setUpdateDate(date);
			appRoleService.save(appRole); 
		} catch (Exception ex) {
			success  = false;
			logger.error(ex.getMessage());
		}		
		setJsonString("{success:"+success+"}");
		return SUCCESS;
	}

	public String check() {
		/*
		 * 改用roleCode进行检查 String roleName=getRequest().getParameter("roleName");
		 * AppRole appRole=appRoleService.getByRoleName(roleName);
		 * if(appRole==null){ setJsonString("{success:true}"); }else{
		 * setJsonString("{success:false}"); }
		 */
		return SUCCESS;
	}

}
