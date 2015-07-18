package com.abcdef.frm.service.system.impl;
/*
 * 
 *  
*/

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.HashMap;

import com.abcdef.core.exception.ExistException;
import com.abcdef.core.exception.NotCompleteException;
import com.abcdef.core.exception.NotExistException;
import com.abcdef.core.model.CheckCompleteResult;
import com.abcdef.core.service.impl.BaseServiceImpl;
import com.abcdef.core.util.BeanUtil;
import com.abcdef.core.util.ContextUtil;
import com.abcdef.frm.dao.system.AppRoleDao;
import com.abcdef.frm.model.system.AppFunction;
import com.abcdef.frm.model.system.AppRole;
import com.abcdef.frm.model.system.AppUser;
import com.abcdef.frm.service.system.AppRoleService;

public class AppRoleServiceImpl extends BaseServiceImpl<AppRole> implements AppRoleService{
	private AppRoleDao dao;
	
	public AppRoleServiceImpl(AppRoleDao dao) {
		super(dao);
		this.dao=dao;
	}
	/*
	@Override
	public AppRole getByRoleName(String roleName){
		return dao.getByRoleName(roleName);
	}
	*/
	@Override
	public AppRole getByRoleCode(String roleCode) {
		return dao.getByRoleCode(roleCode);
	}
	
	@Override
	public Boolean remove(Long roleId) throws NotExistException {
		AppRole appRole = this.get(roleId);
		if (null == appRole) {
			logger.error("角色不存在，传入参数：" + roleId);
			throw new NotExistException("角色不存在");
		} else {
			dao.remove(appRole);
		}
		return null==get(roleId);
	}
	@Override
	public AppRole copy(AppRole appRole) {
		AppRole newRole = new AppRole();
		newRole.setRoleCode(appRole.getRoleCode());
		newRole.setRoleName(appRole.getRoleName());
		newRole.setRoleDesc(appRole.getRoleDesc());
		newRole.setStatus(appRole.getStatus());
		//复制权限
		appRole = dao.get(appRole.getRoleId());
		Set<AppFunction> set = new HashSet<AppFunction>(appRole.getFunctions());
		newRole.setFunctions(set);
		newRole.setRights(appRole.getRights());
		try {
			return this.save(newRole);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	/*
	 * (non-Javadoc)
	 * @see com.gdssoft.framework.service.system.AppRoleService#getSecurityDataSource()
	 */
	@Override
	public HashMap<String,Set<String>>getSecurityDataSource(){
		return dao.getSecurityDataSource();
	}
	
	
	/**
	 * 新增
	 * @param entity
	 * @return
	 * @throws ExistException 对象已存在
	 */
	private AppRole doInsert(AppRole entity) throws ExistException {
		if (null == dao.getByRoleCode(entity.getRoleCode())) {
			AppUser currUser = ContextUtil.getCurrentUser();
			if (null != currUser) {
				entity.setCreateBy(currUser.getUsername());
			}
			entity.setCreateDate(new Date());
			//保存之后重新获取对象实例
			Long newId = dao.save(entity);
			//因save方法会持久化对象实例，根据id取该实例会非常快
			return dao.get(newId);
		} else {
			logger.error("该角色已经存在\n" + entity);
			throw new ExistException("该角色已经存在");
		}
	}
	/**
	 * 更新
	 * @param entity
	 * @return
	 * @throws NotExistException 对象不存在
	 */
	private AppRole doUpdate(AppRole entity) throws NotExistException {
		AppUser currUser = ContextUtil.getCurrentUser();
		//如果实体中有Id则更新
		AppRole old = this.get(entity.getRoleId());
		if (null == old) {
			logger.error("更新的角色不存在，传入参数：" + entity);
			throw new NotExistException("更新的角色不存在");
		} else {
			if (null != currUser) {
				entity.setUpdateBy(currUser.getUsername());
			}
			entity.setUpdateDate(new Date());
			return dao.merge(entity);
		}
	}
	@Override
	public void saveOrUpdate(AppRole appRole) throws Exception{
		AppUser currUser = ContextUtil.getCurrentUser();
		if(null == appRole.getRoleId()){
			appRole.setCreateBy(currUser.getUsername());
			appRole.setCreateDate(new Date());
			try {
				super.save(appRole);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}else{
			AppRole ar = this.get(appRole.getRoleId());
			ar.setRoleName(appRole.getRoleName());
			ar.setRoleDesc(appRole.getRoleDesc());
			ar.setStatus(appRole.getStatus());
			ar.setUpdateBy(currUser.getUsername());
			ar.setCreateDate(new Date());
			super.save(ar);
		}
	}

}
