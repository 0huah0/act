/*
 * Powered By [shi_zenghua@qq.com]
 */

package com.pss.service.impl;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.pss.service.PssSalesOrderDetailService;
import com.pss.dao.PssSalesOrderDetailDao;
import com.pss.model.PssSalesOrderDetail;

public class PssSalesOrderDetailServiceImpl extends BaseServiceImpl<PssSalesOrderDetail> implements PssSalesOrderDetailService{
	@SuppressWarnings("unused")
	private PssSalesOrderDetailDao dao;
	
	public PssSalesOrderDetailServiceImpl(PssSalesOrderDetailDao dao) {
		super(dao);
		this.dao=dao;
	}
}