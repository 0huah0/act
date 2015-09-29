/*
 * Powered By [shi_zenghua@qq.com]
 */
 package com.pss.service.impl;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.pss.service.PssProductImageService;
import com.pss.dao.PssProductImageDao;
import com.pss.model.PssProductImage;

public class PssProductImageServiceImpl extends BaseServiceImpl<PssProductImage> implements PssProductImageService{
	@SuppressWarnings("unused")
	private PssProductImageDao dao;
	
	public PssProductImageServiceImpl(PssProductImageDao dao) {
		super(dao);
		this.dao=dao;
	}
}