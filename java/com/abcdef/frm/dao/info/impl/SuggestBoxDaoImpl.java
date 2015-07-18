package com.abcdef.frm.dao.info.impl;

/*
 *   
 *  
 */

import java.util.List;

import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.abcdef.frm.dao.info.SuggestBoxDao;
import com.abcdef.frm.model.info.SuggestBox;

@SuppressWarnings("unchecked")
public class SuggestBoxDaoImpl extends BaseDaoImpl<SuggestBox> implements
		SuggestBoxDao
{

	public SuggestBoxDaoImpl()
	{
		super(SuggestBox.class);
	}

	@Override
	public List<SuggestBox> getAll(Object[] param, QueryFilter filter)
	{
		String hql = " from SuggestBox sb where sb.subject like'%{SUBJECT}%'  and sb.queryPwd='1'";
		hql += " and sb.senderFullname like '%{SENDER}%' and sb.createtime between '{TF}' and '{TT}'";
		hql += "  and  ( (sb.recUid ={UID} or sb.senderId={UID}) or (sb.isOpen=0 and sb.status !=0 ))";
		hql = hql.replace("{SUBJECT}", param[0].toString());
		hql = hql.replace("{SENDER}", param[1].toString());
		hql = hql.replace("{TF}", param[2].toString());
		hql = hql.replace("{TT}", param[3].toString());
		hql = hql.replace("{UID}", param[4].toString());		
		logger.debug(hql);
		return findByHql(hql, null, filter.getPagingBean());

	}

	@Override
	public List<SuggestBox> listResAll(Object[] param, QueryFilter filter)
	{
		String hql = " from SuggestBox sb where sb.subject like'%{SUBJECT}%'  and sb.queryPwd='2' ";
		hql += " and sb.senderFullname like '%{SENDER}%' and sb.createtime between '{TF}' and '{TT}'";
		hql += "  and (  (sb.recUid={RECID}  or sb.senderId={UID} )  or (  sb.isOpen=0 and sb.status !=0 ) )";
		hql = hql.replace("{SUBJECT}", param[0].toString());
		hql = hql.replace("{SENDER}", param[1].toString());
		hql = hql.replace("{TF}", param[2].toString());
		hql = hql.replace("{TT}", param[3].toString());
		hql = hql.replace("{UID}", param[4].toString());
		hql = hql.replace("{RECID}", param[6].toString());
		
		logger.debug(hql);
		return findByHql(hql, null, filter.getPagingBean());
	}
}