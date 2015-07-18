package com.abcdef.frm.service.system;
/*
 *   
 *   
*/
import java.util.List;

import com.abcdef.core.service.BaseService;
import com.abcdef.frm.model.system.UserAgent;

public interface UserAgentService extends BaseService<UserAgent>{
	/**
	 * 取得某个用户的代理用户列表
	 * @param userId
	 * @return
	 */
	public List<UserAgent> getByUserId(Long userId);
	
	public UserAgent getByUserIdGrantId(Long userId,Long grantUId);
	
	public List<UserAgent> getByGrantUId(Long grantUId);
	
	public void delUserGrants(Long userId);
}


