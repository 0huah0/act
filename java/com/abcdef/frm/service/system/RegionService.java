package com.abcdef.frm.service.system;
/*
 *   
 *   
*/
import java.util.List;

import com.abcdef.core.service.BaseService;
import com.abcdef.frm.model.system.Region;

public interface RegionService extends BaseService<Region>{

	public List<Region> getProvince();

	public List<Region> getCity(Long regionId);
	
}


