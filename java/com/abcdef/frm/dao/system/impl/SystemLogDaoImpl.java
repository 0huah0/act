package com.abcdef.frm.dao.system.impl;
/*
 *   
 *  
*/
import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.abcdef.frm.dao.system.SystemLogDao;
import com.abcdef.frm.model.system.SystemLog;

public class SystemLogDaoImpl extends BaseDaoImpl<SystemLog> implements SystemLogDao{

	public SystemLogDaoImpl() {
		super(SystemLog.class);
	}

}