package com.abcdef.frm.service.system.impl;
/*
 *   
 *   
*/
import java.util.List;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.abcdef.frm.dao.system.IndexDisplayDao;
import com.abcdef.frm.model.system.IndexDisplay;
import com.abcdef.frm.service.system.IndexDisplayService;

public class IndexDisplayServiceImpl extends BaseServiceImpl<IndexDisplay> implements IndexDisplayService{
	private IndexDisplayDao dao;
	
	public IndexDisplayServiceImpl(IndexDisplayDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<IndexDisplay> findByUser(Long userId) {
		return dao.findByUser(userId);
	}

}