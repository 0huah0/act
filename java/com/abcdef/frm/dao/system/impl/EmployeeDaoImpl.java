package com.abcdef.frm.dao.system.impl;

import java.util.List;

import com.abcdef.core.Constants;
import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.abcdef.frm.dao.system.EmployeeDao;
import com.abcdef.frm.model.system.Employee;

@SuppressWarnings("unchecked")
public class EmployeeDaoImpl extends BaseDaoImpl<Employee> implements EmployeeDao{

	public EmployeeDaoImpl() {
		super(Employee.class);
	}

	@Override
	public Employee getByEmpCode(String empCode) {
		String hql = "from Employee e where e.empCode=? and e.delflag=?";
		Object[] params = { empCode, Constants.FLAG_UNDELETED };
		List<Employee> list = findByHql(hql, params);
		Employee employee = null;
		if (list.size() == 1) {
			employee = list.get(0);
		}
		return employee;
	}

	@Override
	public List<Employee> getByDepId(Long depId) {
		final String hql = " from Employee e where e.department.depId=?";
		Object[] params = {depId};
		return findByHql(hql, params);
	}
}