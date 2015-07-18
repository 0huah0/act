package com.abcdef.frm.dao.system;
/*
 *  
 *  
*/
import java.util.HashMap;
import java.util.List;
import java.util.Set;

import com.abcdef.core.dao.BaseDao;
import com.abcdef.frm.model.system.AppRole;

/**
 * 用户
 * @author 
 *
 */
public interface AppRoleDao extends BaseDao<AppRole>{
	//public AppRole getByRoleName(String roleName);
	public AppRole getByRoleCode(String roleCode);
	/**
	 * 获取安全认证的数据源
	 * @return
	 */
	public HashMap<String,Set<String>>getSecurityDataSource();
	
	//public List<AppRole> findDepRole(long roleId, String path);
}
