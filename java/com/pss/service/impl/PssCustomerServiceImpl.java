/*
 * Powered By [shi_zenghua@qq.com]
 */

package com.pss.service.impl;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.pss.service.PssCustomerService;
import com.pss.dao.PssCustomerDao;
import com.pss.model.PssCustomer;

public class PssCustomerServiceImpl extends BaseServiceImpl<PssCustomer> implements PssCustomerService{
	@SuppressWarnings("unused")
	private PssCustomerDao dao;
	
	public PssCustomerServiceImpl(PssCustomerDao dao) {
		super(dao);
		this.dao=dao;
	}
}