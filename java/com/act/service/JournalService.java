package com.act.service;

import java.util.Date;

import com.abcdef.core.service.BaseService;
import com.act.model.JournalHead;
public interface JournalService extends BaseService<JournalHead>{
	
	String post(Date sdt, Date edt,String user) throws Exception;
	
	String backup(Date sdt, Date edt,String user)throws Exception;
	
	String restore(Date sdt, Date edt,String user)throws Exception;
	
	String clear(Date sdt, Date edt,String user)throws Exception;
	
}
