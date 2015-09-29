/*
 * Powered By [shi_zenghua@qq.com]
 */
 package com.pss.service.impl;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.pss.service.PssSoAttachmentService;
import com.pss.dao.PssSoAttachmentDao;
import com.pss.model.PssSoAttachment;

public class PssSoAttachmentServiceImpl extends BaseServiceImpl<PssSoAttachment> implements PssSoAttachmentService{
	@SuppressWarnings("unused")
	private PssSoAttachmentDao dao;
	
	public PssSoAttachmentServiceImpl(PssSoAttachmentDao dao) {
		super(dao);
		this.dao=dao;
	}
}