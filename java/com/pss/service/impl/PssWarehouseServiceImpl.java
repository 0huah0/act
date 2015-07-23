/*
 * Powered By [shi_zenghua@qq.com]
 */

package com.pss.service.impl;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.pss.service.PssWarehouseService;
import com.pss.dao.PssWarehouseDao;
import com.pss.model.PssWarehouse;

public class PssWarehouseServiceImpl extends BaseServiceImpl<PssWarehouse> implements PssWarehouseService{
	@SuppressWarnings("unused")
	private PssWarehouseDao dao;
	
	public PssWarehouseServiceImpl(PssWarehouseDao dao) {
		super(dao);
		this.dao=dao;
	}
}