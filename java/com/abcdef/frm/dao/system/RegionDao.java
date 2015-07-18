package com.abcdef.frm.dao.system;
/*
 *   
 *  
*/
import java.util.List;

import com.abcdef.core.dao.BaseDao;
import com.abcdef.frm.model.system.Region;

/**
 * 
 * @author 
 *
 */
public interface RegionDao extends BaseDao<Region>{

	public List<Region> getProvince();

	public List<Region> getCity(Long regionId);
	
}