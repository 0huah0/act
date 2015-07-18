package com.abcdef.frm.dao.system;
/*
 *  
 *  
*/
import java.util.List;

import com.abcdef.core.dao.BaseDao;
import com.abcdef.core.web.paging.PagingBean;
import com.abcdef.frm.model.system.Department;

public interface DepartmentDao extends BaseDao<Department> {
	/**
	 * 查找下一级部门
	 * @param parentId
	 * @param pb
	 * @return
	 */
	public List<Department> findByParentId(Long parentId,Integer depLevel, PagingBean pb);
	/**
	 * 查找路径下所有部门
	 * @param path
	 * @param pb
	 * @return
	 */
	public List<Department> findByPath(String path, PagingBean pb);
	
	/**
	 * 
	 * @param officeId
	 * @param delFlag
	 * @return
	 */
	public List<Department> getByOfficeId(Long officeId,Short delFlag);
	
	/**
	 * 
	 * @param path
	 * @param level
	 * @return
	 */
	public List<Department> findByPath(String path, int level);
	public List<Department> getChildByParentId(Long depId, Short delFlag);
	public List<Department> getDepListByPath(String path);
	
	public List<Department> findAllByParentId(Long parentId,Integer depLevel, PagingBean pb);
	
}
