package com.abcdef.frm.service.system.impl;
/*
 *   
 *   
*/
import java.util.List;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.abcdef.frm.dao.system.UserAgentDao;
import com.abcdef.frm.model.system.UserAgent;
import com.abcdef.frm.service.system.UserAgentService;

public class UserAgentServiceImpl extends BaseServiceImpl<UserAgent> implements UserAgentService{
	private UserAgentDao dao;
	
	public UserAgentServiceImpl(UserAgentDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	/**
	 * 取得某个用户的代理用户列表
	 * @param userId
	 * @return
	 */
	public List<UserAgent> getByUserId(Long userId){
		return dao.getByUserId(userId);
	}
	
	public void delUserGrants(Long userId){
		List<UserAgent> list=getByUserId(userId);
		for(UserAgent userAgent:list){
			dao.remove(userAgent);
		}
	}
	
	public UserAgent getByUserIdGrantId(Long userId,Long grantUId){
		return dao.getByUserIdGrantId(userId, grantUId);
	}

	@Override
	public List<UserAgent> getByGrantUId(Long grantUId) {
		// TODO Auto-generated method stub
		return dao.getByGrantUId(grantUId);
	}

}