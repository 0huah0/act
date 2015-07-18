package com.abcdef.frm.action.system;

import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.exception.ExistException;
import com.abcdef.core.exception.NotCompleteException;
import com.abcdef.core.exception.NotExistException;
import com.abcdef.core.util.ContextUtil;
import com.abcdef.core.web.action.BaseAction;
import com.abcdef.frm.model.system.AppUser;
import com.abcdef.frm.model.system.Employee;
import com.abcdef.frm.service.system.EmployeeService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 * 员工信息Action类
 */
public class EmployeeAction extends BaseAction {

	@Resource
	private EmployeeService employeeService;
	private Employee employee;

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	/**
	 * @category 根据员工编号获取员工信息
	 * 
	 * @return
	 */
	public String getByEmpCode() {
		if (logger.isDebugEnabled()) {
			logger.debug("Request Parameter：" + getRequestParameter());
		}
		JSONSerializer json = new JSONSerializer();

		Employee employeeNew = employeeService.getByEmpCode(employee
				.getEmpCode());

		int totalCounts = 0;
		if (employeeNew != null)
			totalCounts = 1;

		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,totalCounts:"
				+ totalCounts + ",data:[{'employee':");
		json.transform(new DateTransformer("yyyy-MM-dd"), "accessionDate");
		json.transform(new DateTransformer("yyyy-MM-dd"), "accessionDate");
		json.transform(new DateTransformer("yyyy-MM-dd"), "birthday");
		json.transform(new DateTransformer("yyyy-MM-dd"), "attendWorkDate");
		sb.append(json.exclude(new String[] { "class" }).serialize(employeeNew));

		sb.append("}]}");
		setJsonString(sb.toString());
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername()
					+ "：根据员工编号获取员工信息操作");
		}
		return SUCCESS;
	}

	/**
	 * @category 查询员工信息
	 * 
	 * @return
	 */
	public String get() {
		if (logger.isDebugEnabled()) {
			logger.debug("Request Parameter：" + getRequestParameter());
		}
		Employee newEmployee = null;
		JSONSerializer json = new JSONSerializer();
		newEmployee = employeeService.get(employee.getId());
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,totalCounts:1,data:[");
		json.transform(new DateTransformer("yyyy-MM-dd"), "accessionDate");
		json.transform(new DateTransformer("yyyy-MM-dd"), "leaveDate");
		json.transform(new DateTransformer("yyyy-MM-dd"), "birthday");
		json.transform(new DateTransformer("yyyy-MM-dd"), "attendWorkDate");
		sb.append(json.exclude(new String[] { "class" }).serialize(newEmployee));
		sb.append("]}");
		setJsonString(sb.toString());
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername()
					+ "：查询员工信息操作");
		}
		return SUCCESS;
	}

	/**
	 * @category 添加或保存员工信息
	 */
	public String save() {
		if (logger.isDebugEnabled()) {
			logger.debug("Request Parameter：" + getRequestParameter());
		}

		try {
			employeeService.save(employee);
		} catch (NotCompleteException e) {
			setJsonString("{success:false,msg:'员工信息不完整'}");
		} catch (NotExistException e) {
			setJsonString("{success:false,msg:'员工信息不存在'}");
		} catch (ExistException e) {
			setJsonString("{success:false,msg:'员工信息已经存在'}");
		}
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername()
					+ "：添加或保存员工信息");
		}
		return SUCCESS;
	}

	/**
	 * @category 查詢員工列表
	 */
	public String list() {
		// 必须加上
		logger.debug("Request Parameter : " + super.getRequestParameter());

		QueryFilter filter = new QueryFilter(getRequest());
		// 下面的条件在Service层中已默认添加
		// filter.addFilter("Q_delFlag_SN_EQ",
		// Constants.FLAG_UNDELETED.toString());
		List<Employee> list = employeeService.getAll(filter);

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		JSONSerializer json = new JSONSerializer();
		json.transform(new DateTransformer("yyyy-MM-dd"), "accessionDate");
		json.transform(new DateTransformer("yyyy-MM-dd"), "leaveDate");
		json.transform(new DateTransformer("yyyy-MM-dd"), "birthday");
		json.transform(new DateTransformer("yyyy-MM-dd"), "attendWorkDate");
		String jString = json.exclude(new String[] { "class" }).serialize(list);
		buff.append(jString);
		buff.append("}");
		jsonString = buff.toString();
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername()
					+ "：查询員工列表信息");
		}
		return SUCCESS;
	}

	/**
	 * @category 批量删除用戶
	 * 
	 * @return
	 */
	public String multiDel() {
		if (logger.isDebugEnabled()) {
			logger.debug("Request Parameter：" + getRequestParameter());
		}
		String[] ids = getRequest().getParameterValues("ids");
		setJsonString("{success:true,msg:''}");
		if (ids != null) {
			for (String id : ids) {
				try {
					employeeService.remove(Long.valueOf(id));
				} catch (NumberFormatException e) {
					setJsonString("{success:false,msg:'员工ID有误'}");
				} catch (NotExistException e) {
					setJsonString("{success:false,msg:'员工不存在'}");
				}
			}
		}
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername()
					+ "：批量删除用户信息");
		}
		return SUCCESS;
	}

	/**
	 * @category 查询员工的所有账号
	 * 
	 * @return
	 */
	public String getAppUserListById() {
		// 必须加上
		logger.debug("Request Parameter : " + super.getRequestParameter());

		Employee newEmployee = null;

		newEmployee = employeeService.get(employee.getId());
		Set<AppUser> list = newEmployee.getAppUsers();

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(list.size()).append(",result:");
		JSONSerializer json = new JSONSerializer();
		String jString = json.exclude(new String[] { "class" }).serialize(list);
		buff.append(jString);
		buff.append("}");
		jsonString = buff.toString();
		if (logger.isInfoEnabled()) {
			logger.info(ContextUtil.getCurrentUser().getUsername()
					+ "：查询员工所有账号操作");
		}
		return SUCCESS;
	}

}
