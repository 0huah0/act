package com.abcdef.frm.service.system.impl;
/*
 *  
 *   
*/
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import com.abcdef.core.Constants;
import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.exception.ExistException;
import com.abcdef.core.exception.NotCompleteException;
import com.abcdef.core.exception.NotExistException;
import com.abcdef.core.model.CheckCompleteResult;
import com.abcdef.core.service.impl.BaseServiceImpl;
import com.abcdef.core.util.ContextUtil;
import com.abcdef.core.web.paging.PagingBean;
import com.abcdef.frm.dao.system.EmployeeDao;
import com.abcdef.frm.model.system.AppUser;
import com.abcdef.frm.model.system.Department;
import com.abcdef.frm.model.system.Employee;
import com.abcdef.frm.service.system.AppUserService;
import com.abcdef.frm.service.system.DepartmentService;
import com.abcdef.frm.service.system.EmployeeService;


public class EmployeeServiceImpl extends BaseServiceImpl<Employee> implements EmployeeService {
	
	private EmployeeDao dao;
	
	@Resource
	private AppUserService appUserService;
	@Resource
	private DepartmentService departmentService;
	
	public EmployeeServiceImpl(EmployeeDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	public Employee getByEmpCode(String empCode) {
		return dao.getByEmpCode(empCode);
	}
	
	/**
	 * 获取所有员工列表，不分页
	 * 默认增加条件：员工没有被标示为已删除
	 */
	@Override
	public List<Employee> getAll() {
		QueryFilter filter = new QueryFilter();
		filter.addFilter("Q_delflag_SN_EQ", Constants.FLAG_UNDELETED.toString());
		return super.getAll(filter);
	}
	
	/**
	 * 获取所有员工列表，分页
	 * 默认增加条件：员工没有被标示为已删除
	 * @param pb 分页器
	 */
	@Override
	public List<Employee> getAll(PagingBean pb) {
		QueryFilter filter = new QueryFilter(
				pb.getStart(),
				pb.getPageSize());
		filter.addFilter("Q_delflag_SN_EQ", Constants.FLAG_UNDELETED.toString());
		return super.getAll(filter);
	}

	/**
	 * 获取所有员工列表，带过滤条件
	 * 默认增加条件：员工没有被标示为已删除
	 * @param filter 过滤条件
	 */
	@Override
	public List<Employee> getAll(QueryFilter filter) {
		filter.addFilter("Q_delflag_SN_EQ", Constants.FLAG_UNDELETED.toString());
		return super.getAll(filter);
	}

	@Override
	public Employee save(Employee employee) throws NotCompleteException, 
			ExistException, NotExistException {
		CheckCompleteResult result = employee.checkComplete();
		if (result.isComplete()) {
			
			//将游离态对象转换成持久态。
			Department department = departmentService.get(employee.getDepartment().getDepId());
			employee.setDepartment(department);
			
			if (employee.getId() != null) {
				return doUpdate(employee);
			} else {
				return doInsert(employee);
			}
		} else {
			logger.error("输入信息不完整" + result.getMessage() + "，传入参数：" + employee);
			throw new NotCompleteException("输入信息不完整");
		}
	}
	
	@Override
	public Boolean remove(Long employeeId) throws NotExistException {
		Employee employee = this.get(employeeId);
		if (null == employee) {
			logger.error("账号不存在，传入参数：" + employeeId);
			throw new NotExistException("账号不存在");
		} else {
			Boolean isSuccess = true;
			Set<AppUser> appUsers = employee.getAppUsers();
			if (null!=appUsers) {
				for (AppUser appUser:appUsers) {
					try {
						appUserService.remove(appUser.getUserId());
					} catch (Exception e) {
						logger.error("删除员工时移除与账号的关系失败，传入参数：" + employeeId + "，账号：" + appUser);
						isSuccess = false;
					} 
				}
			}
			if (isSuccess) {
				dao.remove(employee);
			} else {
				logger.error("删除员工失败，参数：" + employee);
			}
			return null==get(employeeId);
		}
	}
	
	/**
	 * 新增
	 * @param employee
	 * @return
	 * @throws ExistException 对象已存在
	 */
	private Employee doInsert(Employee employee) throws ExistException {
		if (null == dao.getByEmpCode(employee.getEmpCode())) {
			AppUser currUser = ContextUtil.getCurrentUser();
			employee.setDelflag(Constants.FLAG_UNDELETED);
			if (null != currUser) {
				employee.setCreateBy(currUser.getUsername());
			}
			employee.setCreateDate(new Date());
			//保存之后重新获取对象实例
			Long newId = dao.save(employee);
			//因save方法会持久化对象实例，根据id取该实例会非常快
			return dao.get(newId);
		} else {
			logger.error("该员工已经存在\n" + employee);
			throw new ExistException("该员工已经存在");
		}
	}
	/**
	 * 更新
	 * @param employee
	 * @return
	 * @throws NotExistException 对象不存在
	 */
	@Override
	public Employee doUpdate(Employee employee) throws NotExistException {
		AppUser currUser = ContextUtil.getCurrentUser();
		//如果实体中有Id则更新
		Employee old = this.get(employee.getId());
		if (null == old) {
			logger.error("更新的员工不存在，传入参数：" + employee);
			throw new NotExistException("更新的员工不存在");
		} else {
			employee.setDelflag(old.getDelflag());
			if (null != currUser) {
				employee.setUpdateBy(currUser.getUsername());
			}
			employee.setUpdateDate(new Date());
			return dao.merge(employee);
		}
	}

	@Override
	public List<Employee> getByDepId(Long depId) {
		// TODO Auto-generated method stub
		return dao.getByDepId(depId);
	}

	@Override
	public Employee merge(Employee employee) {
		return dao.merge(employee);
	}
}
