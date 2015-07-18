package com.abcdef.frm.service.system;
/*
 *  
 *   
*/
import java.util.List;

import com.abcdef.core.exception.ExistException;
import com.abcdef.core.exception.NotCompleteException;
import com.abcdef.core.exception.NotExistException;
import com.abcdef.core.service.BaseService;
import com.abcdef.core.web.paging.PagingBean;
import com.abcdef.frm.model.system.AppUser;


public interface AppUserService extends BaseService<AppUser>{
	
	/**
	 * 根据账号查找，目前是提供给登入时使用
	 * @param username
	 * @return
	 */
	public AppUser getByUserName(String username);
	/**
	 * 根据角色查找用户，不分页
	 * @param roleId
	 * @return
	 */
	public List<AppUser> findByRoleId(Long roleId);
	/**
	 * 根据角色查找用户
	 * @param roleId
	 * @param pb 分页器
	 * @return
	 */
	public List<AppUser> findByRoleId(Long roleId, PagingBean pb);
	/**
	 * 根据员工编号查找用户
	 * @param empCode 员工编号
	 * @return
	 */
	public List<AppUser> findByEmpCode(String empCode);
	/**
	 * 根据部门查找用户
	 * @param path 部门路径的编码
	 * @return
	 */
	public List<AppUser> findByDepartment(String path);
	/**
	 * 根据部门查找用户，不分页
	 * @param path 部门路径的编码
	 * @param pb 分页器
	 * @return
	 */
	public List<AppUser> findByDepartment(String path, PagingBean pb);
	
	/**
	 * 取得没有被某个用户代理的所有账号
	 * @param userId 
	 * @param fullname 用户姓名模糊查询
	 * @param pb 分页器
	 * @return
	 */
	public List<AppUser> findUnAgents(final Long userId, String fullname, PagingBean pb);
	
	/**
	 * 保存(新增、更新)
	 * @param appUser
	 * @return 保存之后的实体
	 * @throws NotCompleteException 输入信息不完整
	 * @throws ExistException 用户的账号已存在：Username不允许重复
	 * @throws NotExistException 更新对象不存在
	 */
	public AppUser save(AppUser appUser) throws NotCompleteException, ExistException, NotExistException;

	/**
	 * 移除用户 - by userId
	 * @param userId 
	 * @throws NotExistException 移除对象不存在
	 */
	public Boolean remove(Long userId) throws NotExistException;
	
	/**
	 * 检查au用户是否存在该角色
	 * @param au AppUser
	 * @param roleCode
	 * @return
	 */
	public boolean hasRole(AppUser au,String roleCode);
	
	/**
	 *用户基本信息修改 
	 * @param appUser
	 */
	public void selfAlter(AppUser appUser);
	public boolean isExit(String empCode);
	public boolean validate(String userName);
}
