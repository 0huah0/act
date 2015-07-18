/**
 * 
 */
package com.act.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.act.service.SystemConfigService;
import com.act.dao.SystemConfigDao;
import com.act.model.SystemConfig;

/**
 *
 */
public class SystemConfigServiceImpl extends
		BaseServiceImpl<SystemConfig> implements SystemConfigService {
	
	private SystemConfigDao dao;

	public SystemConfigServiceImpl(SystemConfigDao dao) {
		super(dao);
		this.dao = dao;
	}

	@Resource
	private SystemConfigDao sysConfigDao;
	
	@Override
	public List<SystemConfig> getSysConfigInfo(String configType) throws Exception {
		return dao.getSysConfigInfo(configType);
	}
	
}
