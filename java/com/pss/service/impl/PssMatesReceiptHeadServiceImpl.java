/*
 * Powered By [shi_zenghua@qq.com]
 */

package com.pss.service.impl;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.pss.service.PssMatesReceiptHeadService;
import com.pss.dao.PssMatesReceiptHeadDao;
import com.pss.model.PssMatesReceiptHead;

public class PssMatesReceiptHeadServiceImpl extends BaseServiceImpl<PssMatesReceiptHead> implements PssMatesReceiptHeadService{
	@SuppressWarnings("unused")
	private PssMatesReceiptHeadDao dao;
	
	public PssMatesReceiptHeadServiceImpl(PssMatesReceiptHeadDao dao) {
		super(dao);
		this.dao=dao;
	}
}