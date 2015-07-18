package com.abcdef.frm.service.info.impl;
/*
 *   
 *   
*/
import com.abcdef.core.service.impl.BaseServiceImpl;
import com.abcdef.frm.dao.info.AppTipsDao;
import com.abcdef.frm.model.info.AppTips;
import com.abcdef.frm.service.info.AppTipsService;

public class AppTipsServiceImpl extends BaseServiceImpl<AppTips> implements AppTipsService{
	@SuppressWarnings("unused")
	private AppTipsDao dao;
	
	public AppTipsServiceImpl(AppTipsDao dao) {
		super(dao);
		this.dao=dao;
	}

}