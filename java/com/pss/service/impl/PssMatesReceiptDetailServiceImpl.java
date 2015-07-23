/*
 * Powered By [shi_zenghua@qq.com]
 */

package com.pss.service.impl;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.pss.service.PssMatesReceiptDetailService;
import com.pss.dao.PssMatesReceiptDetailDao;
import com.pss.model.PssMatesReceiptDetail;

public class PssMatesReceiptDetailServiceImpl extends BaseServiceImpl<PssMatesReceiptDetail> implements PssMatesReceiptDetailService{
	@SuppressWarnings("unused")
	private PssMatesReceiptDetailDao dao;
	
	public PssMatesReceiptDetailServiceImpl(PssMatesReceiptDetailDao dao) {
		super(dao);
		this.dao=dao;
	}
}