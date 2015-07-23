/*
 * Powered By [shi_zenghua@qq.com]
 */

package com.pss.service.impl;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.pss.service.PssMaterialService;
import com.pss.dao.PssMaterialDao;
import com.pss.model.PssMaterial;

public class PssMaterialServiceImpl extends BaseServiceImpl<PssMaterial> implements PssMaterialService{
	@SuppressWarnings("unused")
	private PssMaterialDao dao;
	
	public PssMaterialServiceImpl(PssMaterialDao dao) {
		super(dao);
		this.dao=dao;
	}
}