package com.abcdef.frm.dao.system.impl;
/*
 *   
 *  
*/
import java.util.List;

import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.abcdef.frm.dao.system.SysConfigDao;
import com.abcdef.frm.model.system.SysConfig;

@SuppressWarnings("unchecked")
public class SysConfigDaoImpl extends BaseDaoImpl<SysConfig> implements SysConfigDao{

	public SysConfigDaoImpl() {
		super(SysConfig.class);
	}

	@Override
	public SysConfig findByKey(String key) {
		String hql1="from com.abcdef.frm.model.system.SysConfig vo where vo.configKey=?";
		List<SysConfig> list=findByHql(hql1,new Object[]{key});
		return (SysConfig)list.get(0);
	}

	@Override
	public List<SysConfig> findConfigByTypeKey(String typeKey) {
		String hql="from com.abcdef.frm.model.system.SysConfig vo where vo.typeKey=?";
		Object[] objs={typeKey};
		return findByHql(hql, objs);
	}

	@Override
	public List<SysConfig> findTypeKeys() {
		String sql="select vo.typeKey from SysConfig vo group by vo.typeKey";
		return findByHql(sql);
	}
	
	@Override
	public SysConfig findDataValueByTkCkey(String typeKey,String configKey) {
		String hql="from com.abcdef.frm.model.system.SysConfig vo where vo.typeKey=? and vo.configKey=?";
		Object[] objs={typeKey,configKey};
		List<SysConfig> list=findByHql(hql, objs);
		if(list.size()!=0){
			return (SysConfig)list.get(0);
		}else {
			return null;
		}
		
	}

	@Override
	public void updateDataByKey(String typeKey, String configKey,
			SysConfig sysConfig) {
		String sql = "update SYS_CONFIG set dataValue='"+ sysConfig.getDataValue()+"'" +
					" where configKey='"+ configKey +"'" +
					" and typeKey='"+ typeKey +"'";
		jdbcTemplate.execute(sql);
	}
	
	
}