package com.abcdef.frm.service.system.impl;

/*
 *  
 *   
 */
import java.util.List;

import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.service.impl.BaseServiceImpl;
import com.abcdef.core.web.paging.PagingBean;
import com.abcdef.frm.dao.system.DepartmentDao;
import com.abcdef.frm.model.system.Department;
import com.abcdef.frm.service.system.DepartmentService;

public class DepartmentServiceImpl extends BaseServiceImpl<Department>
		implements DepartmentService {

	private DepartmentDao dao;

	public DepartmentServiceImpl(DepartmentDao dao) {
		super(dao);
		this.dao = dao;
	}

	@Override
	public List<Department> findByParentId(Long parentId) {
		return findByParentId(parentId, null, null);
	}

	@Override
	public List<Department> findByParentId(Long parentId, Integer depLevel,
			PagingBean pb) {
		return dao.findByParentId(parentId, depLevel, pb);
	}

	@Override
	public List<Department> findByPath(String path) {
		return findByPath(path, null);
	}

	@Override
	public List<Department> findByPath(String path, PagingBean pb) {
		return dao.findByPath(path, pb);
	}

	@Override
	public List<Department> getByOfficeId(Long officeId, Short delFlag) {
		// TODO Auto-generated method stub
		return dao.getByOfficeId(officeId, delFlag);
	}

	@Override
	public List<Department> findByPath(String path, int level) {
		return dao.findByPath(path, level);
	}

	@Override
	public List<Department> getChildByParentId(Long depId, Short delFlag) {

		return dao.getChildByParentId(depId, delFlag);
	}

	@Override
	public List<Department> getDepListByPath(String path) {

		return dao.getDepListByPath(path);
	}

	@Override
	public boolean isExist(Long depId, Long parDepId, String depCode) {
		// TODO Auto-generated method stub
		boolean exist = false;
		if (depId != 0L) {
			Department dep = this.get(depId);
			if ((dep.getDepCode() == depCode)
					|| (dep.getDepCode().equals(depCode))) {
				exist = false;
			} else {
				QueryFilter filter = new QueryFilter();
				filter.addFilter("Q_parentId_L_EQ", String.valueOf(parDepId));
				filter.addFilter("Q_depCode_S_EQ", depCode);
				List<Department> departmentList = this.getAll(filter);
				if(departmentList.size()>0){
					exist=true;
				}
			}
		} else {
			QueryFilter filter = new QueryFilter();
			filter.addFilter("Q_parentId_L_EQ", String.valueOf(parDepId));
			filter.addFilter("Q_depCode_S_EQ", depCode);
			List<Department> departmentList = this.getAll(filter);
			if(departmentList.size()>0){
				exist=true;
			}
		}
		return exist;
	}

	@Override
	public List<Department> findAllByParentId(Long parentId) {
		// TODO Auto-generated method stub
		return dao.findAllByParentId(parentId, null, null);
	}
}
