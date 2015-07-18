package com.abcdef.frm.service.system.impl;
/*
 *   
 *   
*/
import java.util.List;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.abcdef.frm.dao.system.RegionDao;
import com.abcdef.frm.model.system.Region;
import com.abcdef.frm.service.system.RegionService;

public class RegionServiceImpl extends BaseServiceImpl<Region> implements RegionService{
	private RegionDao dao;
	
	public RegionServiceImpl(RegionDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<Region> getProvince() {
		return dao.getProvince();
	}

	@Override
	public List<Region> getCity(Long regionId) {
		return dao.getCity(regionId);
	}

}