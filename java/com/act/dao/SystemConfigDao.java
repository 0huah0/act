/**
 * 
 */
package com.act.dao;

import java.util.List;

import com.abcdef.core.dao.BaseDao;
import com.act.model.SystemConfig;

/**
 * 
 */
public interface SystemConfigDao extends BaseDao<SystemConfig>{

	/**
	 * 根據"配置類型"(configType)查詢系統參數配置信息
	 * @param configType
	 * @return List<SystemConfig>
	 * @throws Exception
	 */
	List<SystemConfig> getSysConfigInfo(String configType) throws Exception;
	
	/**
	 * 根據"配置類型"(configType)、"配置代號"(configCode)查詢系統參數配置信息
	 * @param configType
	 * @param configCode
	 * @return List<SystemConfig>
	 * @throws Exception
	 */
	List<SystemConfig> getSysConfigInfo(String configType, String configCode) throws Exception;

}
