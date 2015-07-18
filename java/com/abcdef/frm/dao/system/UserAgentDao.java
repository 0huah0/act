package com.abcdef.frm.dao.system;
/*
 *   
 *  
*/
import java.util.List;

import com.abcdef.core.dao.BaseDao;
import com.abcdef.frm.model.system.UserAgent;

/**
 * 
 * @author 
 *
 */
public interface UserAgentDao extends BaseDao<UserAgent>{
	/**
	 * 取得某个用户的代理用户列表
	 * @param userId
	 * @return
	 */
	public List<UserAgent> getByUserId(Long userId);
	
	public UserAgent getByUserIdGrantId(Long userId,Long grantUId);
	
	public List<UserAgent> getByGrantUId(Long grantUId);
}