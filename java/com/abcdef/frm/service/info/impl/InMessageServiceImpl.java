package com.abcdef.frm.service.info.impl;
/*
 *   
 *   
*/

import java.util.Date;
import java.util.List;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.abcdef.core.web.paging.PagingBean;
import com.abcdef.frm.dao.info.InMessageDao;
import com.abcdef.frm.model.info.InMessage;
import com.abcdef.frm.model.info.ShortMessage;
import com.abcdef.frm.service.info.InMessageService;

public class InMessageServiceImpl extends BaseServiceImpl<InMessage> implements
		InMessageService {

	private InMessageDao dao;
	public InMessageServiceImpl(InMessageDao dao) {
		super(dao);
		this.dao=dao;
	}
	@Override
	public InMessage findByRead(Long userId) {
		return dao.findByRead(userId);
	}
	@Override
	public Integer findByReadFlag(Long userId) {
		return dao.findByReadFlag(userId);
	}
	@Override
	public List<InMessage> findAll(Long userId, PagingBean pb) {
		return dao.findAll(userId, pb);
	}
	@Override
	public List<?> findByUser(Long userId, PagingBean pb) {
		return dao.findByUser(userId, pb);
	}
	@Override
	public List<?> searchInMessage(Long userId, InMessage inMessage,
			ShortMessage shortMessage, Date from, Date to, PagingBean pb) {
		return dao.searchInMessage(userId, inMessage, shortMessage, from, to, pb);
	}
	@Override
	public InMessage findLatest(Long userId) {
		return dao.findLatest(userId);
	}

}
