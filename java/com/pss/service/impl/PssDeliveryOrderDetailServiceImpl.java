/*
 * Powered By [shi_zenghua@qq.com]
 */

package com.pss.service.impl;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.pss.service.PssDeliveryOrderDetailService;
import com.pss.dao.PssDeliveryOrderDetailDao;
import com.pss.model.PssDeliveryOrderDetail;

public class PssDeliveryOrderDetailServiceImpl extends BaseServiceImpl<PssDeliveryOrderDetail> implements PssDeliveryOrderDetailService{
	@SuppressWarnings("unused")
	private PssDeliveryOrderDetailDao dao;
	
	public PssDeliveryOrderDetailServiceImpl(PssDeliveryOrderDetailDao dao) {
		super(dao);
		this.dao=dao;
	}
}