package com.abcdef.frm.dao.info.impl;
/*
 *  
 * 
*/
import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.abcdef.frm.dao.info.AppTipsDao;
import com.abcdef.frm.model.info.AppTips;

@SuppressWarnings("unchecked")
public class AppTipsDaoImpl extends BaseDaoImpl<AppTips> implements AppTipsDao{

	public AppTipsDaoImpl() {
		super(AppTips.class);
	}

}