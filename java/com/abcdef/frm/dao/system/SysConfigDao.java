package com.abcdef.frm.dao.system;
/*
 *   
 *  
*/
import java.util.List;

import com.abcdef.core.dao.BaseDao;
import com.abcdef.frm.model.system.SysConfig;

/**
 * 
 * @author 
 *
 */
public interface SysConfigDao extends BaseDao<SysConfig>{
	
	public SysConfig findByKey(String key);
	
	public List<SysConfig> findConfigByTypeKey(String typeKey);
	
	public List<?> findTypeKeys();
	
	/**
	 * lxw add
	 * @param typeKey
	 * @param configKey
	 * @return
	 */
	public SysConfig findDataValueByTkCkey(String typeKey,String configKey);
	
	/**
	 * @author Super S.Gao
	 * @param typeKey
	 * @param configKey
	 * @param sysConfig
	 */
	public void updateDataByKey(String typeKey, String configKey,
			SysConfig sysConfig);
	
}