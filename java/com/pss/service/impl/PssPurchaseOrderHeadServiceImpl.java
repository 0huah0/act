/*
 * Powered By [shi_zenghua@qq.com]
 */

package com.pss.service.impl;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.pss.service.PssPurchaseOrderHeadService;
import com.pss.dao.PssPurchaseOrderHeadDao;
import com.pss.model.PssPurchaseOrderHead;

public class PssPurchaseOrderHeadServiceImpl extends BaseServiceImpl<PssPurchaseOrderHead> implements PssPurchaseOrderHeadService{
	@SuppressWarnings("unused")
	private PssPurchaseOrderHeadDao dao;
	
	public PssPurchaseOrderHeadServiceImpl(PssPurchaseOrderHeadDao dao) {
		super(dao);
		this.dao=dao;
	}
}