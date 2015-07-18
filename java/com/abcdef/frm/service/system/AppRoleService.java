package com.abcdef.frm.service.system;
/*
 *  
 *   
*/

import java.util.HashMap;
import java.util.Set;

import com.abcdef.core.exception.ExistException;
import com.abcdef.core.exception.NotCompleteException;
import com.abcdef.core.exception.NotExistException;
import com.abcdef.core.service.BaseService;
import com.abcdef.frm.model.system.AppRole;

public interface AppRoleService extends BaseService<AppRole>{
	//public AppRole getByRoleName(String roleName);
	public AppRole getByRoleCode(String roleCode);
	
	/**
	 * 移除
	 * @param roleId 
	 * @throws NotExistException 移除对象不存在
	 */
	public Boolean remove(Long roleId) throws NotExistException;
	/**
	 * 复制新增，新增的角色将拥有和原角色一样的权限
	 * @param appRole
	 * @return 复制新增之后的实体
	 * @throws NotCompleteException 输入信息不完整
	 * @throws ExistException 角色已存在：roleCode不允许重复
	 * @throws NotExistException 更新对象不存在
	 */
	public AppRole copy(AppRole appRole) throws NotCompleteException, ExistException, NotExistException;
	
	/**
	 * 获取安全认证的数据源
	 * @return
	 */
	public HashMap<String,Set<String>>getSecurityDataSource();

	public void saveOrUpdate(AppRole appRole)throws Exception;

}
