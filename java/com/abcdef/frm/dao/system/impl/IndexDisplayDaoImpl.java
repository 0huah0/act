package com.abcdef.frm.dao.system.impl;
/*
 *   
 *  
 */
import java.util.List;

import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.abcdef.frm.dao.system.IndexDisplayDao;
import com.abcdef.frm.model.system.IndexDisplay;

public class IndexDisplayDaoImpl extends BaseDaoImpl<IndexDisplay> implements IndexDisplayDao{

	public IndexDisplayDaoImpl() {
		super(IndexDisplay.class);
	}

	@Override
	public List<IndexDisplay> findByUser(Long userId) {
		String hql="from IndexDisplay vo where vo.appUser.userId=?";
		return findByHql(hql,new Object[]{userId});
	}

}