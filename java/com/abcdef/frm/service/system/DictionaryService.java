package com.abcdef.frm.service.system;
import java.util.List;

import com.abcdef.core.service.BaseService;
import com.abcdef.frm.model.system.Dictionary;

public interface DictionaryService extends BaseService<Dictionary>{

	public List<String> getAllItems();

	public List<String> getAllByItemName(String itemName);
	
	public List<Dictionary> getByItemName(final String itemName);
}


