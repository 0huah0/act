package com.abcdef.frm.service.system;
/*
 *  
 *   
*/
import java.util.List;

import com.abcdef.core.exception.ExistException;
import com.abcdef.core.exception.NotCompleteException;
import com.abcdef.core.exception.NotExistException;
import com.abcdef.core.service.BaseService;
import com.abcdef.frm.model.system.Employee;

public interface EmployeeService extends BaseService<Employee>{

	public Employee getByEmpCode(String empCode);
	/**
	 * 保存、更新
	 * @param employee
	 * @return 保存之后的实体
	 * @throws NotCompleteException 输入信息不完整
	 * @throws ExistException 员工工号已存在：empCode不允许重复
	 * @throws NotExistException 更新对象不存在
	 */
	public Employee save(Employee employee) throws NotCompleteException, ExistException, NotExistException;

	/**
	 * 移除
	 * @param employeeId 
	 * @throws NotExistException 移除对象不存在
	 */
	public Boolean remove(Long employeeId) throws NotExistException;
	public List<Employee> getByDepId(Long depId);
	
	public Employee doUpdate(Employee employee) throws NotExistException;
	
	public Employee merge(Employee employee);
	
}
