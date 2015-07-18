package com.abcdef.frm.dao.system;

import java.util.List;

import com.abcdef.core.dao.BaseDao;
import com.abcdef.frm.model.system.Employee;

public interface EmployeeDao extends BaseDao<Employee> {
	public Employee getByEmpCode(String empCode);

	public List<Employee> getByDepId(Long depId);
}
