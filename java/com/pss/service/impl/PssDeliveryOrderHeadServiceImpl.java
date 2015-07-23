/*
 * Powered By [shi_zenghua@qq.com]
 */

package com.pss.service.impl;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.pss.service.PssDeliveryOrderHeadService;
import com.pss.dao.PssDeliveryOrderHeadDao;
import com.pss.model.PssDeliveryOrderHead;

public class PssDeliveryOrderHeadServiceImpl extends BaseServiceImpl<PssDeliveryOrderHead> implements PssDeliveryOrderHeadService{
	@SuppressWarnings("unused")
	private PssDeliveryOrderHeadDao dao;
	
	public PssDeliveryOrderHeadServiceImpl(PssDeliveryOrderHeadDao dao) {
		super(dao);
		this.dao=dao;
	}
}