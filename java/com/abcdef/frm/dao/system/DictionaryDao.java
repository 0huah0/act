package com.abcdef.frm.dao.system;

import java.util.List;

import com.abcdef.core.dao.BaseDao;
import com.abcdef.frm.model.system.Dictionary;

/**
 * 
 * @author 
 *
 */
public interface DictionaryDao extends BaseDao<Dictionary>{

	public List<String> getAllItems();

	public List<String> getAllByItemName(String itemName);
	
	public List<Dictionary> getByItemName(final String itemName);
	
}