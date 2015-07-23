/*
 * Powered By [shi_zenghua@qq.com]
 */

package com.pss.service.impl;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.pss.service.PssInventoryService;
import com.pss.dao.PssInventoryDao;
import com.pss.model.PssInventory;

public class PssInventoryServiceImpl extends BaseServiceImpl<PssInventory> implements PssInventoryService{
	@SuppressWarnings("unused")
	private PssInventoryDao dao;
	
	public PssInventoryServiceImpl(PssInventoryDao dao) {
		super(dao);
		this.dao=dao;
	}
}