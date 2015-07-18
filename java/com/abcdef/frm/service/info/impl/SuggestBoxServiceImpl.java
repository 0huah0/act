package com.abcdef.frm.service.info.impl;
/*
 *   
 *   
*/

import java.util.List;

import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.service.impl.BaseServiceImpl;
import com.abcdef.frm.dao.info.SuggestBoxDao;
import com.abcdef.frm.model.info.SuggestBox;
import com.abcdef.frm.service.info.SuggestBoxService;

public class SuggestBoxServiceImpl extends BaseServiceImpl<SuggestBox> implements SuggestBoxService{
	private SuggestBoxDao dao;
	
	public SuggestBoxServiceImpl(SuggestBoxDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	@Override
	public  List<SuggestBox> getAll(Object[] param, QueryFilter filter)
	{
		return dao.getAll(param, filter);
	}

	@Override
	public List<SuggestBox> listResAll(Object[] param, QueryFilter filter)
	{
		return dao.listResAll(param, filter);
	}
	
	

}