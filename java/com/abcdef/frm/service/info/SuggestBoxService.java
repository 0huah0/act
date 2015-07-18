package com.abcdef.frm.service.info;
/*
 *   
 *   
*/

import java.util.List;

import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.service.BaseService;
import com.abcdef.frm.model.info.SuggestBox;

public interface SuggestBoxService extends BaseService<SuggestBox>{
	
	 List<SuggestBox> getAll(Object[] param, QueryFilter filter);
	 List<SuggestBox> listResAll(Object[] param, QueryFilter filter);
	
}


