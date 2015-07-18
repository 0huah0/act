package com.act.service.impl;

import java.util.Date;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.act.dao.JournalHeadDao;
import com.act.model.JournalHead;
import com.act.service.JournalService;

public class JournalServiceImpl extends
		BaseServiceImpl<JournalHead> implements JournalService {
	private JournalHeadDao dao;

	public JournalServiceImpl(JournalHeadDao dao) {
		super(dao);
		this.dao = dao;
	}

	@Override
	public String post(Date sdt, Date edt,String user) throws Exception {
		return dao.post(sdt,edt,user);
	}


	@Override
	public String backup(Date sdt, Date edt, String user)throws Exception {
		return dao.backup(sdt,edt,user);
	}


	@Override
	public String restore(Date sdt, Date edt, String user)throws Exception {
		return dao.restore(sdt,edt,user);
	}


	@Override
	public String clear(Date sdt, Date edt, String user)throws Exception {
		return dao.clear(sdt,edt,user);
	}
	
	
}
