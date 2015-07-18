/**
 * 
 */
package com.act.service;

import java.util.List;

import com.abcdef.core.service.BaseService;
import com.act.model.SystemConfig;

/**
 * 
 */
public interface SystemConfigService extends BaseService<SystemConfig>{

	/**
	 * 根據"配置類型"(configType)查詢系統參數配置信息
	 * @param configType
	 * @return List<SysConfig>
	 * @throws Exception 
	 */
	List<SystemConfig> getSysConfigInfo(String configType) throws Exception;
}
