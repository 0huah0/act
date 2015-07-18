package com.abcdef.frm.service.system;
/*
 * 
 *  
*/
import java.util.List;

import com.abcdef.core.service.BaseService;
import com.abcdef.core.web.paging.PagingBean;
import com.abcdef.frm.model.system.Department;

public interface DepartmentService extends BaseService<Department> {

	/**
	 * exclude deleted
	 * @param parentId
	 * @return
	 */
	public List<Department> findByParentId(Long parentId);
	
	public List<Department> findByParentId(Long parentId,Integer depLevel, PagingBean pb);
	
	public List<Department> findByPath(String path);
	
	public List<Department> findByPath(String path, PagingBean pb);
	
	public List<Department> getByOfficeId(Long officeId, Short delFlag);

	public List<Department> findByPath(String path, int level);

	public List<Department> getChildByParentId(Long depId, Short delFlag);

	public List<Department> getDepListByPath(String path);
	
	public boolean isExist(Long depId,Long parDepId,String depCode);
	
	public List<Department> findAllByParentId(Long parentId);
	
}
