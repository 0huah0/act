/*
 * Powered By [shi_zenghua@qq.com]
 */

package com.pss.service.impl;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.pss.service.PssProductService;
import com.pss.dao.PssProductDao;
import com.pss.model.PssProduct;

public class PssProductServiceImpl extends BaseServiceImpl<PssProduct> implements PssProductService{
	@SuppressWarnings("unused")
	private PssProductDao dao;
	
	public PssProductServiceImpl(PssProductDao dao) {
		super(dao);
		this.dao=dao;
	}
}