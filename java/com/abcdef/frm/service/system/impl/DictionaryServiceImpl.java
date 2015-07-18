package com.abcdef.frm.service.system.impl;

import java.util.List;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.abcdef.frm.dao.system.DictionaryDao;
import com.abcdef.frm.model.system.Dictionary;
import com.abcdef.frm.service.system.DictionaryService;

public class DictionaryServiceImpl extends BaseServiceImpl<Dictionary> implements DictionaryService{
	private DictionaryDao dao;
	
	public DictionaryServiceImpl(DictionaryDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<String> getAllItems() {
		return dao.getAllItems();
	}

	@Override
	public List<String> getAllByItemName(String itemName) {
		return dao.getAllByItemName(itemName);
	}
	
	@Override
	public List<Dictionary> getByItemName(String itemName) {
		return dao.getByItemName(itemName);
	}

}