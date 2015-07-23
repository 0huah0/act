/*
 * Powered By [shi_zenghua@qq.com]
 */

package com.pss.service.impl;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.pss.service.PssInvoiceHeadService;
import com.pss.dao.PssInvoiceHeadDao;
import com.pss.model.PssInvoiceHead;

public class PssInvoiceHeadServiceImpl extends BaseServiceImpl<PssInvoiceHead> implements PssInvoiceHeadService{
	@SuppressWarnings("unused")
	private PssInvoiceHeadDao dao;
	
	public PssInvoiceHeadServiceImpl(PssInvoiceHeadDao dao) {
		super(dao);
		this.dao=dao;
	}
}