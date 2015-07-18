package com.abcdef.frm.dao.info.impl;
/*
 *   
 *  
*/
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.abcdef.core.web.paging.PagingBean;
import com.abcdef.frm.dao.info.InMessageDao;
import com.abcdef.frm.model.info.InMessage;
import com.abcdef.frm.model.info.ShortMessage;

@SuppressWarnings("unchecked")
public class InMessageDaoImpl extends BaseDaoImpl<InMessage> implements InMessageDao {

	public InMessageDaoImpl() {
		super(InMessage.class);
	}

	/**
	 * 读出最新的一条未读信息
	 */
	@Override
	public InMessage findByRead(Long userId) {
		String hql="from InMessage vo where vo.readFlag=0 and vo.delFlag=0 and vo.userId=?";
		Object[] objs = {userId};
		List<InMessage> list = findByHql(hql, objs);
		if(list.size()>0){
		return (InMessage)list.get(list.size()-1);
		}else{
			return null;
		}
	}
	

	@Override
	public Integer findByReadFlag(Long userId) {
		
		String hql="select count(*) from InMessage vo where vo.readFlag=0 and vo.delFlag=0 and vo.userId= ?";
		Object count=findUnique(hql,new Object[]{userId});
		return new Integer(count.toString());
		
	}

	@Override
	public List<InMessage> findAll(Long userId, PagingBean pb) {
		String hql="from InMessage vo where vo.userId=?";
		Object[] objs={userId};
		return findByHql(hql, objs,pb);
	}

	@Override
	public List<InMessage> findByShortMessage(ShortMessage shortMessage,PagingBean pb) {
		String hql="from InMessage vo1,ShortMessage vo2 where vo1.shortMessage=?";
		Object[] objs={shortMessage};
		return findByHql(hql, objs,pb);
	}

	@Override
	public List findByUser(Long userId,PagingBean pb) {
		String hql="select vo1,vo2 from InMessage vo1,ShortMessage vo2 where vo1.shortMessage=vo2 and vo2.msgType=1 and vo2.senderId=? order by vo2.sendTime desc";
		Object[] objs={userId};
		return findByHql(hql,objs,pb);
	}

	@Override
	public List findByUser(Long userId) {
		String hql="select vo1,vo2 from InMessage vo1,ShortMessage vo2 where vo1.shortMessage=vo2 and vo2.senderId=?";
		Object[] objs={userId};
		return findByHql(hql,objs);
	}

	/**
	 * 已经发出去的信息
	 */
	
	
	@Override
	public List searchInMessage(Long userId, InMessage inMessage,
			ShortMessage shortMessage, Date from, Date to, PagingBean pb) {
		StringBuffer hql=new StringBuffer("select vo1 ,vo2 from InMessage vo1,ShortMessage vo2 where vo1.shortMessage=vo2 and vo2.msgType=1 and vo2.senderId=?");
		ArrayList paramList=new ArrayList();
		paramList.add(userId);	
		if(to!=null){
			hql.append("and vo2.sendTime <= ?");
			paramList.add(to);
		}
		if(from!=null){
			hql.append("and vo2.sendTime >= ?");
			paramList.add(from);
		}
		if(shortMessage!=null){
			if(shortMessage.getMsgType()!=null){
				hql.append(" and vo2.msgType=?");
				paramList.add(shortMessage.getMsgType());
			}
		}
		if(inMessage!=null){
			if(StringUtils.isNotEmpty(inMessage.getUserFullname())){
				hql.append(" and vo1.userFullname=?");
				paramList.add(inMessage.getUserFullname());
			}
		}
		hql.append(" order by vo2.sendTime desc");
			
		return findByHql(hql.toString(), paramList.toArray(), pb);
	}

	@Override
	public InMessage findLatest(Long userId) {
		String hql="from InMessage vo where vo.delFlag=0 and vo.userId=?";
		Object[] objs = {userId};
		List<InMessage> list = findByHql(hql, objs);
		if(list.size()>0){
			return (InMessage)list.get(list.size()-1);
		}else{
			return null;
		}
	}

	
	
}
