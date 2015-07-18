package com.abcdef.frm.service.info.impl;
/*
 *   
 *   
*/
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.abcdef.core.Constants;
import com.abcdef.core.service.impl.BaseServiceImpl;
import com.abcdef.core.web.paging.PagingBean;
import com.abcdef.frm.dao.info.InMessageDao;
import com.abcdef.frm.dao.info.ShortMessageDao;
import com.abcdef.frm.dao.system.AppUserDao;
import com.abcdef.frm.model.info.InMessage;
import com.abcdef.frm.model.info.ShortMessage;
import com.abcdef.frm.model.system.AppUser;
import com.abcdef.frm.service.info.ShortMessageService;

public class ShortMessageServiceImpl extends BaseServiceImpl<ShortMessage> implements
		ShortMessageService {
	private ShortMessageDao messageDao;
	@Resource
	private InMessageDao inMessageDao;
	@Resource
	private AppUserDao appUserDao;
	
	public ShortMessageServiceImpl(ShortMessageDao dao) {
		super(dao);
		this.messageDao=dao;
	}

	@Override
	public List<ShortMessage> findAll(Long userId, PagingBean pb) {
		return messageDao.findAll(userId, pb);
	}

	@Override
	public List<ShortMessage> findByUser(Long userId) {
		return messageDao.findByUser(userId);
	}

	@Override
	public List searchShortMessage(Long userId,
			ShortMessage shortMessage, Date from, Date to, PagingBean pb) {
		return messageDao.searchShortMessage(userId, shortMessage, from, to, pb);
	}

	public ShortMessage save (Long senderId,String receiveIds,String content,Short msgType){
		
		ShortMessage shortMessage =new ShortMessage();
		shortMessage.setContent(content);
		shortMessage.setMsgType(msgType);
		AppUser curUser=appUserDao.get(senderId);
		if (curUser.getEmployee() != null) {
			shortMessage.setSender(curUser.getEmployee().getFullname());
		}
		shortMessage.setSenderId(curUser.getUserId());
		shortMessage.setSendTime(new Date());
		
		messageDao.save(shortMessage);
		String[]reIds = null;
		if(StringUtils.isNotEmpty(receiveIds)){
			reIds=receiveIds.split("[,]");
		}
		if(reIds!=null){
			for(String userId:reIds){
				InMessage inMsg=new InMessage();
				inMsg.setDelFlag(Constants.FLAG_UNDELETED);
				inMsg.setReadFlag(InMessage.FLAG_UNREAD);
				inMsg.setShortMessage(shortMessage);
				AppUser receiveUser=appUserDao.get(new Long(userId));
				
				inMsg.setUserId(receiveUser.getUserId());
				inMsg.setUserFullname(receiveUser.getEmployee().getFullname());
				inMessageDao.save(inMsg);
			}
		}
		
		return shortMessage;
	}
	
}
