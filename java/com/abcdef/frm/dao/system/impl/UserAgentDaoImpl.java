package com.abcdef.frm.dao.system.impl;
/*
 *   
 *  
*/
import java.util.List;

import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.abcdef.frm.dao.system.UserAgentDao;
import com.abcdef.frm.model.system.UserAgent;

@SuppressWarnings("unchecked")
public class UserAgentDaoImpl extends BaseDaoImpl<UserAgent> implements UserAgentDao{

	public UserAgentDaoImpl() {
		super(UserAgent.class);
	}
	/**
	 * 取得某个用户的代理用户列表
	 * @param userId
	 * @return
	 */
	public List<UserAgent> getByUserId(Long userId){
		String hql="from UserAgent ua where ua.userId=?";
		return findByHql(hql, new Object[]{userId});
	}
	
	/**
	 * 
	 * @param userId
	 * @param grantUId
	 * @return
	 */
	public UserAgent getByUserIdGrantId(Long userId,Long grantUId){
		String hql="from UserAgent ua where ua where ua.userId=? and ua.grantUId=?";
		return(UserAgent)findUnique(hql, new Object[]{userId,grantUId});
	}
	@Override
	public List<UserAgent> getByGrantUId(Long grantUId) {
		String hql="from UserAgent ua where ua.grantUId=?";
		return findByHql(hql, new Object[]{grantUId});
	}

}