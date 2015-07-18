package com.act.dao.impl;

import java.util.List;

import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.hibernate.type.StandardBasicTypes;

import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.act.dao.SystemConfigDao;
import com.act.model.SystemConfig;

@SuppressWarnings("unchecked")
public class SystemConfigDaoImpl extends BaseDaoImpl<SystemConfig> implements SystemConfigDao{
	
	public SystemConfigDaoImpl() {
		super(SystemConfig.class);
	}

	/**
	 * 根據"配置類型"(configType)查詢系統參數配置信息
	 * @param configType
	 * @return List<SystemConfig>
	 * @throws Exception
	 */
	@Override
	public List<SystemConfig> getSysConfigInfo(String configType) throws Exception {
		String condition = "WHERE 1=1 ";
		condition += configType == null || "".equals(configType) ? "": "AND config_type=:config_type ";
		
		String sql = "SELECT config_code AS configCode, config_value AS configValue "+
					 "FROM system_config " +
					 condition +
					 "ORDER BY sort_no";
		
		SQLQuery query = getSession().createSQLQuery(sql);
		
		if (configType != null && !"".equals(configType)) {
			query.setParameter("config_type", configType);
		}
		
		query.addScalar("configCode", StandardBasicTypes.STRING);
		query.addScalar("configValue", StandardBasicTypes.STRING);
		query.setResultTransformer(Transformers.aliasToBean(SystemConfig.class));
		
		List<SystemConfig> sysConfigList = query.list();
		
		return sysConfigList;
	}
	
	/**
	 * 根據"配置類型"(configType)、"配置代號"(configCode)查詢系統參數配置信息
	 * @param configType
	 * @param configCode
	 * @return List<SystemConfig>
	 * @throws Exception
	 */
	@Override
	public List<SystemConfig> getSysConfigInfo(String configType, String configCode) throws Exception {
		String condition = "WHERE 1=1 ";
		condition += configType == null || "".equals(configType) ? "": "AND config_type=:config_type ";
		condition += configCode == null || "".equals(configCode) ? "": "AND config_code=:config_code ";
		
		String sql = "SELECT config_code AS configCode, config_value AS configValue "+
					 "FROM system_config " +
					 condition +
					 "ORDER BY sort_no";
		
		SQLQuery query = getSession().createSQLQuery(sql);
		
		if (configType != null && !"".equals(configType)) {
			query.setParameter("config_type", configType);
		}
		
		if (configCode != null && !"".equals(configCode)) {
			query.setParameter("config_code", configCode);
		}
		
		query.addScalar("configCode", StandardBasicTypes.STRING);
		query.addScalar("configValue", StandardBasicTypes.STRING);
		query.setResultTransformer(Transformers.aliasToBean(SystemConfig.class));
		
		List<SystemConfig> sysConfigList = query.list();
		
		return sysConfigList;
	}
	
}
