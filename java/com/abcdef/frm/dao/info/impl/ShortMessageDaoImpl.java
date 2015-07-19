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
import com.abcdef.frm.dao.info.ShortMessageDao;
import com.abcdef.frm.model.info.ShortMessage;

@SuppressWarnings("unchecked")
public class ShortMessageDaoImpl extends BaseDaoImpl<ShortMessage> implements
		ShortMessageDao {

	public ShortMessageDaoImpl() {
		super(ShortMessage.class);
	}

	@Override
	public List<ShortMessage> findAll(Long userId, PagingBean pb) {
		String hql = "from ShortMessage vo where vo.senderId=?";
		Object[] objs = { userId };
		return findByHql(hql, objs, pb);
	}

	@Override
	public List<ShortMessage> findByUser(Long userId) {
		String hql = "from ShortMessage vo where vo.senderId=?";
		Object[] objs = { userId };
		return findByHql(hql, objs);
	}

	/**
	 * 收到的信息
	 */

	@Override
	public List<?> searchShortMessage(Long userId, ShortMessage shortMessage,
			Date from, Date to, PagingBean pb) {
		List<Object> paramList = new ArrayList<Object>();
		StringBuffer hql = new StringBuffer(
				"select vo1,vo2 from InMessage vo1,ShortMessage vo2 where vo1.shortMessage=vo2 and vo1.delFlag=0 and vo1.userId=?");
		paramList.add(userId);
		if (shortMessage != null) {
			if (shortMessage.getMsgType() != null) {
				hql.append(" and vo2.msgType=?");
				paramList.add(shortMessage.getMsgType());
			}
			if (StringUtils.isNotEmpty(shortMessage.getSender())) {
				hql.append(" and vo2.sender=?");
				paramList.add(shortMessage.getSender());
			}
		}
		if (to != null) {
			hql.append("and vo2.sendTime <= ?");
			paramList.add(to);
		}
		if (from != null) {
			hql.append("and vo2.sendTime >= ?");
			paramList.add(from);
		}
		hql.append(" order by vo2.sendTime desc");
		return findByHql(hql.toString(), paramList.toArray(), pb);
	}

}
