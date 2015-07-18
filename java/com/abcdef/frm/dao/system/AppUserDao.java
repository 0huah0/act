package com.abcdef.frm.dao.system;

/*
 *  
 *  
 */
import java.util.List;

import com.abcdef.core.dao.BaseDao;
import com.abcdef.core.web.paging.PagingBean;
import com.abcdef.frm.model.system.AppUser;

public interface AppUserDao extends BaseDao<AppUser> {
	public AppUser findByUserName(String username);
	
	public List<AppUser> findByDepartment(String path, PagingBean pb);

	public List<AppUser> findByRoleId(Long roleId, PagingBean pb);
	
	public List<AppUser> findByFullname(String fullname, PagingBean pb);
	
	public List<AppUser> findUnAgents(final Long userId, String fullname, PagingBean pb);

	public boolean isExit(String empCode);

	public boolean validate(String userName);

	//public List<AppUser> getUserByDepAndRole(Long roleId,Long depId);
	
}
