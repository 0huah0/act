package com.abcdef.frm.dao.info;
/*
 *   
 *  
*/

import java.util.List;

import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.dao.BaseDao;
import com.abcdef.frm.model.info.SuggestBox;

/**
 * 
 * @author 
 *
 */
public interface SuggestBoxDao extends BaseDao<SuggestBox>{
	 List<SuggestBox> getAll(Object[] param, QueryFilter filter);
	 List<SuggestBox> listResAll(Object[] param, QueryFilter filter);
}