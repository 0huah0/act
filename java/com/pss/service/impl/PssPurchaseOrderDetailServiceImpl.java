/*
 * Powered By [shi_zenghua@qq.com]
 */

package com.pss.service.impl;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.pss.service.PssPurchaseOrderDetailService;
import com.pss.dao.PssPurchaseOrderDetailDao;
import com.pss.model.PssPurchaseOrderDetail;

public class PssPurchaseOrderDetailServiceImpl extends BaseServiceImpl<PssPurchaseOrderDetail> implements PssPurchaseOrderDetailService{
	@SuppressWarnings("unused")
	private PssPurchaseOrderDetailDao dao;
	
	public PssPurchaseOrderDetailServiceImpl(PssPurchaseOrderDetailDao dao) {
		super(dao);
		this.dao=dao;
	}
}