/*
 * Powered By [shi_zenghua@qq.com]
 */
 package com.pss.service.impl;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.pss.service.PssPoAttachmentService;
import com.pss.dao.PssPoAttachmentDao;
import com.pss.model.PssPoAttachment;

public class PssPoAttachmentServiceImpl extends BaseServiceImpl<PssPoAttachment> implements PssPoAttachmentService{
	@SuppressWarnings("unused")
	private PssPoAttachmentDao dao;
	
	public PssPoAttachmentServiceImpl(PssPoAttachmentDao dao) {
		super(dao);
		this.dao=dao;
	}
}