package com.abcdef.frm.action.system;

/*
 *  捷达世软件（深圳）有限公司 地铁三号线考勤系统 
 *  Copyright (C) 2008-2010 ShenZhen JieDaShi Software Limited Company.
 */
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.abcdef.core.Constants;
import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.util.AppUtil;
import com.abcdef.core.util.BeanUtil;
import com.abcdef.core.util.ContextUtil;
import com.abcdef.core.web.action.BaseAction;
import com.abcdef.frm.model.system.AppUser;
import com.abcdef.frm.model.system.Department;
import com.abcdef.frm.service.system.AppUserService;
import com.abcdef.frm.service.system.DepartmentService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import flexjson.JSONSerializer;

public class DepartmentAction extends BaseAction {

	private Department department;

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	@Resource
	private DepartmentService departmentService;
	
	@Resource
	private AppUserService appUserService;
	
	/**
	 * 查询 所有的部门信息
	 * 
	 * @param depId
	 * @return
	 */
	public String select() {

		String depId = getRequest().getParameter("depId");
		QueryFilter filter = new QueryFilter(getRequest());
		if (StringUtils.isNotEmpty(depId) && !"0".equals(depId)) {
			department = departmentService.get(new Long(depId));
			filter.addFilter("Q_path_S_LFK", department.getPath());

		}
		filter.addSorted("path", "asc");
		List<Department> list = departmentService.getAll(filter);
		Type type = new TypeToken<List<Department>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
				.create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 查询 指定部门下的所有科室列表
	 * 
	 * @return
	 */
	public String selectDepSub() {
		String depId = getRequest().getParameter("depId");
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_parentId_L_EQ", depId);
		filter.addSorted("path", "asc");
		List<Department> list = departmentService.getAll(filter);
		Type type = new TypeToken<List<Department>>() {
		}.getType();
		StringBuffer buff = new StringBuffer(
				"{\"success\":\"true\",\"totalCounts\":").append(
				filter.getPagingBean().getTotalItems()).append(",\"result\":");
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
				.create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * from department table where path like path% 
	 * @return
	 */
	public String list1() {
		StringBuffer buff = new StringBuffer("[");
		AppUser au  = ContextUtil.getCurrentUser();
		String path = departmentService.get(au.getDepId()).getPath();
		if(appUserService.hasRole(au, "ROLE_SUPER")){
			path = "0.1.";
		}
		List<Department> listParent = departmentService.findByPath(path);// 最顶层父节点
		for (Department dep : listParent) 
			buff.append("{id:'" + dep.getDepId() 
					+ "',text:'"+ dep.getDepName() + "'},");
				
		if (buff.length()>0) buff.deleteCharAt(buff.length() - 1);
		jsonString = buff.append("]").toString();
		
		return SUCCESS;		
	}
	
	/**
	 * get department by parentId
	 * @return
	 */
	public String list2() {
		StringBuffer buff = new StringBuffer("[");
		AppUser au  = ContextUtil.getCurrentUser();
		String node = getRequest().getParameter("node");
		String path = departmentService.get(au.getDepId()).getPath();		
		if(path.contains(node)){ //node是父辈部门
			logger.error("DepartmentAction.list2():是父辈部门,最高按本级查询");
		}else{
			path = departmentService.get(Long.parseLong(node)).getPath();	
		}
		if(appUserService.hasRole(au, "ROLE_SUPER")){
			path = "0.1.";
		}
		List<Department> listParent = departmentService.findByPath(path);// 最顶层父节点
		for (Department dep : listParent) 
			buff.append("{id:'" + dep.getDepId() 
					+ "',text:'"+ dep.getDepName() + "'},");
				
		if (buff.length()>0) buff.deleteCharAt(buff.length() - 1);
		jsonString = buff.append("]").toString();
		
		return SUCCESS;		
	}
	
	public String list() {
		String opt = getRequest().getParameter("opt");
		StringBuffer buff = new StringBuffer();

		if (StringUtils.isNotEmpty(opt)) {
			buff.append("[");
		} else {
			buff.append("[{id:'" + 0 + "',text:'" + AppUtil.getCompanyName()
					+ "',expanded:true,children:[");
		}

		List<Department> listParent;
		listParent = departmentService.findByParentId(new Long(0));// 最顶层父节点
		for (Department dep : listParent) {
			buff.append("{id:'" + dep.getDepId() + "',text:'"
					+ dep.getDepName() + "',");
			buff.append(findChild(dep.getDepId()));
		}
		if (!listParent.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
		}
		if (StringUtils.isNotEmpty(opt)) {
			buff.append("]");
		} else {
			buff.append("]}]");
		}
		setJsonString(buff.toString());
		return SUCCESS;
	}
	
	/**
	 * 获取公司树 ，不包括物业管理处
	 * 最顶层父节点1开始，0为未加入组织的公司
	 * @return
	 */
	public String treeByLevel() {
		StringBuffer buff = new StringBuffer("[");
		Long parentId = -1L;
		AppUser au = ContextUtil.getCurrentUser();
		if(appUserService.hasRole(au, "ROLE_SUPER")){	//super
			parentId = 1L;
		} else {
			parentId = au.getDepId();
		}
		
		Department thisdep =  departmentService.get(parentId);
		if(thisdep != null){
			buff.append("{id:'" + thisdep.getDepId() + "',text:'" + thisdep.getDepName() + "',");
			buff.append(findChild(thisdep.getDepId()));
		}else{
			List<Department> listParent = departmentService.findByParentId(parentId);
			for (Department dep : listParent) {
				buff.append("{id:'" + dep.getDepId() + "',text:'" + dep.getDepName() + "',");
				buff.append(findChild(dep.getDepId()));
			}
		}

		if (buff.length() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		
		return SUCCESS;
	}
	
	/**
	 * 获取公司树 ,包括了物业管理处
	 * 最顶层父节点1开始，0为未加入组织的公司
	 * @return
	 */
	public String treeAllByLevel() {
		StringBuffer buff = new StringBuffer("[");
		
		List<Department> listParent = departmentService.findByParentId(0L);
		for (Department dep : listParent) {
			buff.append("{id:'" + dep.getDepId() + "',text:'" + dep.getDepName() + "',");
			buff.append(findAllChild(dep.getDepId()));
		}
		
		if (buff.length() > 1) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		
		return SUCCESS;
	}
	public String listByDepId() {
		String depId = getRequest().getParameter("depId");
		StringBuffer buff = new StringBuffer();

		buff.append("[");

		List<Department> listParent = new ArrayList<Department>();
		Department dept = departmentService.get(Long.valueOf(depId));// 最顶层父节点
		listParent.add(dept);
		for (Department dep : listParent) {
			buff.append("{id:'" + dep.getDepId() + "',text:'"
					+ dep.getDepName() + "',");
			buff.append(findChild(dep.getDepId()));
		}
		if (!listParent.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
		}

		buff.append("]");

		setJsonString(buff.toString());
		return SUCCESS;
	}

	public String listByDepIds() {
		String depIds = getRequest().getParameter("depIds");
		String[] depIdsArray = depIds.split(",");

		StringBuffer buff = new StringBuffer();

		buff.append("[");
		for (int i = 0; i < depIdsArray.length; i++) {
			List<Department> listParent = new ArrayList<Department>();
			Department dept = departmentService.get(Long
					.valueOf(depIdsArray[i]));// 最顶层父节点
			listParent.add(dept);
			for (Department dep : listParent) {
				buff.append("{id:'" + dep.getDepId() + "',text:'"
						+ dep.getDepName() + "',");
				buff.append(findChild(dep.getDepId()));
			}
			buff.append(",");
			if (!listParent.isEmpty()) {
				buff.deleteCharAt(buff.length() - 1);
			}
		}

		buff.append("]");

		setJsonString(buff.toString());
		return SUCCESS;
	}

	/**
	 * 寻找子根节点，不包括管理处
	 */
	public String findChild(Long depId) {
		StringBuffer buff1 = new StringBuffer("");
		List<Department> list = departmentService.findByParentId(depId);
		if (list.size() == 0) {
			buff1.append("leaf:true},");
			return buff1.toString();
		} else {
			buff1.append("expanded:true,children:[");
			for (Department dep2 : list) {
				buff1.append("{id:'" + dep2.getDepId() + "',text:'"
						+ dep2.getDepName() + "',");
				buff1.append(findChild(dep2.getDepId()));
			}
			buff1.deleteCharAt(buff1.length() - 1);
			buff1.append("]},");
			return buff1.toString();
		}
	}
	
	/**
	 * 寻找子根节点，包括管理处
	 */
	public String findAllChild(Long depId) {
		StringBuffer buff1 = new StringBuffer("");
		List<Department> list = departmentService.findAllByParentId(depId);
		if (list.size() == 0) {
			buff1.append("leaf:true},");
			return buff1.toString();
		} else {
			buff1.append("expanded:true,children:[");
			for (Department dep2 : list) {
				buff1.append("{id:'" + dep2.getDepId() + "',text:'"
						+ dep2.getDepName() + "',");
				buff1.append(findAllChild(dep2.getDepId()));
			}
			buff1.deleteCharAt(buff1.length() - 1);
			buff1.append("]},");
			return buff1.toString();
		}
	}
	
	public String findChild(Long depId,Integer level) {
		StringBuffer buff1 = new StringBuffer("");
		List<Department> list = departmentService.findByParentId(depId,level,null);
		if (list.size() == 0) {
			buff1.append("leaf:true},");
			return buff1.toString();
		} else {
			buff1.append("expanded:true,children:[");
			for (Department dep2 : list) {
				buff1.append("{id:'" + dep2.getDepId() + "',text:'"
						+ dep2.getDepName() + "',");
				buff1.append(findChild(dep2.getDepId(), level));
			}
			buff1.deleteCharAt(buff1.length() - 1);
			buff1.append("]},");
			return buff1.toString();
		}
	}

	/*
	 * 寻找子根节点,同时根据员工所在部门过滤
	 */
	public String findChildFilter(Long depId, Long pdepId) {
		StringBuffer buff1 = new StringBuffer("");
		List<Department> list = departmentService.findByParentId(depId);
		if (list.size() == 0) {
			buff1.append("leaf:true},");
			return buff1.toString();
		} else {
			buff1.append("expanded:true,children:[");
			for (Department dep2 : list) {
				if (dep2.getDepId() == pdepId) {
					buff1.append("{id:'" + dep2.getDepId() + "',text:'"
							+ dep2.getDepName() + "',");
					buff1.append(findChild(dep2.getDepId()));
				} else {
					buff1.append(findChildFilter(dep2.getDepId(), pdepId));
				}
			}
			buff1.deleteCharAt(buff1.length() - 1);
			buff1.append("]},");
			return buff1.toString();
		}
	}

	
	
	public String add() {
		String cun = ContextUtil.getCurrentUser().getUsername();
		Date now = new Date();
		Long parentId = department.getParentId();
		String depPath = "";
		if (parentId < 1) {
			parentId = new Long(0);
			depPath = "0.";
		} else {
			depPath = departmentService.get(parentId).getPath();
		}
		department.setDepLevel(2);
		department.setDelFlag(Constants.FLAG_UNDELETED);
		department.setCreateBy(cun);
		department.setCreateDate(now);
		department.setUpdateBy(cun);
		department.setUpdateDate(now);
		try {
			departmentService.save(department);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (department != null) {
			depPath += department.getDepId().toString() + ".";
			department.setPath(depPath);
			try {
				departmentService.save(department);
			} catch (Exception e) {
				e.printStackTrace();
			}
			setJsonString("{success:true}");
		} else {
			setJsonString("{success:false}");
		}
		return SUCCESS;
	}

	public String remove() {
		Long depId = Long.parseLong(getRequest().getParameter("depId"));
		String cun = ContextUtil.getCurrentUser().getUsername();
		Date now = new Date();
		Department dep=departmentService.get(depId);
		boolean res = true;
		if(departmentService.getDepListByPath(dep.getPath()).size()>1){
			res = false;
		}else{
			try {
				dep.setDelFlag(Constants.FLAG_DELETED);
				dep.setUpdateBy(cun);
				dep.setUpdateDate(now);
				departmentService.save(dep);
			} catch (Exception e) {
				res = false;
				e.printStackTrace();
			}
		}
		setJsonString("{success:"+res+"}");	
		return SUCCESS;
	}

	public String detail() {
		Long depId = Long.parseLong(getRequest().getParameter("depId"));
		setDepartment(departmentService.get(depId));
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		JSONSerializer serializer = new JSONSerializer();
		sb.append(serializer.exclude(new String[] { "class" }).serialize(
				department));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String get() {
		Long depId = Long.parseLong(getRequest().getParameter("depId"));
		Department department = departmentService.get(depId);
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd")
				.excludeFieldsWithoutExposeAnnotation().create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(department));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	/**
	 * Combo控件数据填写
	 * 
	 */
	public String combo() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.getPagingBean().setPageSize(99999);
		StringBuffer sb = new StringBuffer();
		List<Department> departmentList = departmentService.getAll(filter);
		sb.append("[");
		for (Department department : departmentList) {
			sb.append("['").append(department.getDepId()).append("','")
					.append(department.getDepName()).append("'],");
		}
		if (departmentList.size() > 0) {
			sb.deleteCharAt(sb.length() - 1);
		}
		sb.append("]");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	public String save() {
		String cun = ContextUtil.getCurrentUser().getUsername();
		if (department.getDepId() == null) {
			try {
				Date tm = new Date();
				department.setCreateDate(tm);
				department.setUpdateDate(tm);
				department.setCreateBy(cun);
				department.setUpdateBy(cun);
				departmentService.save(department);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			Department dep = departmentService
					.get(department.getDepId());
			try {
				BeanUtil.copyNotNullProperties(dep,department);
				departmentService.save(dep);
			} catch (Exception ex) {
				logger.error(ex.getMessage());
			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	/**
	 * 处理对部门组织的操作
	 * @return
	 */
	public String depOperate() {
		String cun = ContextUtil.getCurrentUser().getUsername();
		Date now = new Date();
		String newDepName = getRequest().getParameter("newDepName");
		String depNum = getRequest().getParameter("depNum");
		String depIdStr = getRequest().getParameter("depId");
		String parentIdStr = getRequest().getParameter("parentId");
		String opt = getRequest().getParameter("opt");
		if(!parentIdStr.isEmpty()){
			Department pdep = departmentService.get(Long.parseLong(parentIdStr));
			if(!opt.isEmpty() && opt.equals("true") && !depIdStr.isEmpty()){
				department = departmentService.get(Long.parseLong(depIdStr));
				department.setUpdateBy(cun);
				department.setUpdateDate(now);
			}else if(!newDepName.isEmpty() && !depNum.isEmpty()){
				department = new Department();
				department.setDepName(newDepName);
				department.setDepLevel(2);
				department.setCreateBy(cun);
				department.setCreateDate(now);
				department.setDelFlag(Constants.FLAG_UNDELETED);
			}
			
			department.setParentId(pdep.getDepId());
			try {				
				department = departmentService.save(department);
				department.setPath(pdep.getPath()+department.getDepId().toString() + ".");
				departmentService.save(department);
			} catch (Exception e) {
				e.printStackTrace();
				setJsonString("{success:false}");
				return SUCCESS;
			}
		}else{
			setJsonString("{success:false}");
			return SUCCESS;
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	/**
	 * 用于前台检测新增或修改的部门编号是否已经存在
	 * 
	 * @param parentDepId,depId,
	 * @return
	 */
	public String isExist() {
		Long depId;
		String id = getRequest().getParameter("depId");
		if (id == null || id.equals("")) {
			depId = 0L;
		} else {
			depId = Long.parseLong(id);
		}
		Long parDepId = Long.parseLong(getRequest().getParameter("parentDepId"));
		String depCode = getRequest().getParameter("depCode");
		StringBuffer buff = new StringBuffer("{success:true,result:");
		if (departmentService.isExist(depId, parDepId, depCode)) {
			buff.append("false");
		} else {
			buff.append("true");
		}
		buff.append("}");
		setJsonString(buff.toString());
		return SUCCESS;
	}
	
}
