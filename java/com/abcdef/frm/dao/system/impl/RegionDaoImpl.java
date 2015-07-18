package com.abcdef.frm.dao.system.impl;
/*
 *   
 *  
*/
import java.util.List;

import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.abcdef.frm.dao.system.RegionDao;
import com.abcdef.frm.model.system.Region;

public class RegionDaoImpl extends BaseDaoImpl<Region> implements RegionDao{

	public RegionDaoImpl() {
		super(Region.class);
	}

	/**
	 * 查出所有的省份
	 */
	@Override
	public List<Region> getProvince() {
		Long parentId = 0l;
		String hql = "from Region r where r.parentId = ?";
		return findByHql(hql, new Object[]{parentId});
	}
	
	/**
	 * 根据省份的ID查出该省所有的市
	 */
	@Override
	public List<Region> getCity(Long regionId) {
		String hql = "from Region r where r.parentId = ?";
		return findByHql(hql, new Object[]{regionId});
	}


}