/*
 * Powered By [shi_zenghua@qq.com]
 */

package com.pss.service.impl;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.pss.service.PssSalesOrderHeadService;
import com.pss.dao.PssSalesOrderHeadDao;
import com.pss.model.PssSalesOrderHead;

public class PssSalesOrderHeadServiceImpl extends BaseServiceImpl<PssSalesOrderHead> implements PssSalesOrderHeadService{
	@SuppressWarnings("unused")
	private PssSalesOrderHeadDao dao;
	
	public PssSalesOrderHeadServiceImpl(PssSalesOrderHeadDao dao) {
		super(dao);
		this.dao=dao;
	}
}