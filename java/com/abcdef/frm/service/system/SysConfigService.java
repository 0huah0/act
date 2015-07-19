package com.abcdef.frm.service.system;
/*
 *   
 *   
*/
import java.util.List;
import java.util.Map;

import com.abcdef.core.service.BaseService;
import com.abcdef.frm.model.system.SysConfig;

public interface SysConfigService extends BaseService<SysConfig>{
	/**
	 * 根据KEY来取配置对象
	 * @param key
	 * @return
	 */
	public SysConfig findByKey(String key);
	
	/**
	 * 按类查找配置列表
	 * @return
	 */
	public Map<?, ?> findByType();
	/**
	 * 根据typeKey和 configKey获得 配置值
	 * @param typeKey
	 * @param configKey
	 * @return
	 */
	public SysConfig findDataValueByTkCkey(String typeKey,String configKey);
	
	public List<SysConfig> findDataByTypeKey(String typeKey);
	
	/**
	 * @Author Super S.Gao
	 * @param typeKey
	 * @param configKey
	 * @param sysConfig
	 */
	public void updateDataByKey(String typeKey,String configKey,SysConfig sysConfig);
}


