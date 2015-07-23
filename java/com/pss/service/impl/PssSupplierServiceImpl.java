/*
 * Powered By [shi_zenghua@qq.com]
 */

package com.pss.service.impl;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.pss.service.PssSupplierService;
import com.pss.dao.PssSupplierDao;
import com.pss.model.PssSupplier;

public class PssSupplierServiceImpl extends BaseServiceImpl<PssSupplier> implements PssSupplierService{
	@SuppressWarnings("unused")
	private PssSupplierDao dao;
	
	public PssSupplierServiceImpl(PssSupplierDao dao) {
		super(dao);
		this.dao=dao;
	}
}