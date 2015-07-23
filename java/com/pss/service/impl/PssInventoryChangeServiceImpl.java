/*
 * Powered By [shi_zenghua@qq.com]
 */

package com.pss.service.impl;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.pss.service.PssInventoryChangeService;
import com.pss.dao.PssInventoryChangeDao;
import com.pss.model.PssInventoryChange;

public class PssInventoryChangeServiceImpl extends BaseServiceImpl<PssInventoryChange> implements PssInventoryChangeService{
	@SuppressWarnings("unused")
	private PssInventoryChangeDao dao;
	
	public PssInventoryChangeServiceImpl(PssInventoryChangeDao dao) {
		super(dao);
		this.dao=dao;
	}
}