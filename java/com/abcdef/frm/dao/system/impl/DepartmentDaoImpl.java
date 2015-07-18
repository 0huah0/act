package com.abcdef.frm.dao.system.impl;
/*
 *  
 *  
*/
import java.util.List;

import com.abcdef.core.Constants;
import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.abcdef.core.web.paging.PagingBean;
import com.abcdef.frm.dao.system.DepartmentDao;
import com.abcdef.frm.model.system.Department;

@SuppressWarnings("unchecked")
public class DepartmentDaoImpl extends BaseDaoImpl<Department> implements DepartmentDao {

	public DepartmentDaoImpl() {
		super(Department.class);
	}

	@Override
	public List<Department> findByParentId(Long parentId,Integer depLevel, PagingBean pb) {
		final String hql = "from Department d where d.delFlag = "+Constants.FLAG_UNDELETED+" and d.parentId=?"+(depLevel!=null?" and d.depLevel="+depLevel:"");
		Object[] params ={parentId};
		if (null != pb) 
			return findByHql(hql, params, pb);
		else 
			return findByHql(hql, params);
	}

	@Override
	public List<Department> findAllByParentId(Long parentId,Integer depLevel, PagingBean pb) {
		final String hql = "from Department d where d.delFlag = "+Constants.FLAG_UNDELETED+" and d.parentId=?"+(depLevel!=null?" and d.depLevel="+depLevel:"");
		Object[] params ={parentId};
		if (null != pb) 
			return findByHql(hql, params, pb);
		else 
			return findByHql(hql, params);
	}

	@Override
	public List<Department> findByPath(String path, PagingBean pb) {
		String hql="from Department vo where vo.path like ? and  vo.delFlag = "+Constants.FLAG_UNDELETED;
		String[] param={path+"%"};
		if (null != pb) 
			return findByHql(hql, param, pb);
		else 
			return findByHql(hql,param);
	}

	@Override
	public List<Department> getByOfficeId(Long officeId, Short delFlag) {
		final String hql ="select d from Department d,TpOrgOfficeInfo toi where  d=toi.department and toi.id=? and delFlag = ?";
		Object[] params = {officeId,delFlag};
		return findByHql(hql,params);
	}
	
	@Override
	public List<Department> findByPath(String path, int level) {
		String hql="from Department vo where vo.depLevel=? and vo.path like ?  and vo.delFlag = "+Constants.FLAG_UNDELETED;
		List<Department> list = findByHql(hql,new Object[]{level,path+"%"});
		return list;
	}

	@Override
	public List<Department> getChildByParentId(Long depId, Short delFlag) {
		final String hql = "from Department where parentId=? and delFlag=?";
		Object[] params = {depId,delFlag};
		return findByHql(hql,params);
	}

	@Override
	public List<Department> getDepListByPath(String path) {
		final String hql = "from Department where path like '" + path + "%' and delFlag=" + Constants.FLAG_UNDELETED;
		return findByHql(hql);
	}
}
