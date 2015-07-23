/*
 * Powered By [shi_zenghua@qq.com]
 */

package com.pss.service.impl;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.pss.service.PssSupplierMaterialRelService;
import com.pss.dao.PssSupplierMaterialRelDao;
import com.pss.model.PssSupplierMaterialRel;

public class PssSupplierMaterialRelServiceImpl extends BaseServiceImpl<PssSupplierMaterialRel> implements PssSupplierMaterialRelService{
	@SuppressWarnings("unused")
	private PssSupplierMaterialRelDao dao;
	
	public PssSupplierMaterialRelServiceImpl(PssSupplierMaterialRelDao dao) {
		super(dao);
		this.dao=dao;
	}
}