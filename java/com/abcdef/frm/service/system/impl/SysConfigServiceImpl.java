package com.abcdef.frm.service.system.impl;
/*
 *   
 *   
*/
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.abcdef.frm.dao.system.SysConfigDao;
import com.abcdef.frm.model.system.SysConfig;
import com.abcdef.frm.service.system.SysConfigService;

public class SysConfigServiceImpl extends BaseServiceImpl<SysConfig> implements SysConfigService{
	private SysConfigDao dao;
	
	public SysConfigServiceImpl(SysConfigDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public SysConfig findByKey(String key) {
		return dao.findByKey(key);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public Map findByType() {
		List<String> list=(List<String>) dao.findTypeKeys();
		Map cList=new HashMap();
		for(String typeKey:list){
			List<SysConfig> confList=dao.findConfigByTypeKey(typeKey);
			cList.put(typeKey, confList);
		}
		return cList;
	}

	@Override
	public SysConfig findDataValueByTkCkey(String typeKey, String configKey) {
		return dao.findDataValueByTkCkey(typeKey,configKey);
	}

	@Override
	public List<SysConfig>  findDataByTypeKey(String typeKey) {
		return dao.findConfigByTypeKey(typeKey);
	}

	@Override
	public void updateDataByKey(String typeKey, String configKey,
			SysConfig sysConfig) {
		dao.updateDataByKey(typeKey, configKey, sysConfig);
	}
	

}