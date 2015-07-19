package com.abcdef.frm.service.system.impl;
/*
 *   
 *   
*/
import com.abcdef.core.service.impl.BaseServiceImpl;
import com.abcdef.frm.dao.system.SystemLogDao;
import com.abcdef.frm.model.system.SystemLog;
import com.abcdef.frm.service.system.SystemLogService;

public class SystemLogServiceImpl extends BaseServiceImpl<SystemLog> implements SystemLogService{
	public SystemLogServiceImpl(SystemLogDao dao) {
		super(dao);
	}

}