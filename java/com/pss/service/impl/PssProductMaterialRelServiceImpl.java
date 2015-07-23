/*
 * Powered By [shi_zenghua@qq.com]
 */

package com.pss.service.impl;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.pss.service.PssProductMaterialRelService;
import com.pss.dao.PssProductMaterialRelDao;
import com.pss.model.PssProductMaterialRel;

public class PssProductMaterialRelServiceImpl extends BaseServiceImpl<PssProductMaterialRel> implements PssProductMaterialRelService{
	@SuppressWarnings("unused")
	private PssProductMaterialRelDao dao;
	
	public PssProductMaterialRelServiceImpl(PssProductMaterialRelDao dao) {
		super(dao);
		this.dao=dao;
	}
}