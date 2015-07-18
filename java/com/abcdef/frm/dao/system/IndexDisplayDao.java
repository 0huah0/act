package com.abcdef.frm.dao.system;
/*
 *   
 *  
*/
import java.util.List;

import com.abcdef.core.dao.BaseDao;
import com.abcdef.frm.model.system.IndexDisplay;

/**
 * 
 * @author 
 *
 */
public interface IndexDisplayDao extends BaseDao<IndexDisplay>{
	/**
	 * 根据当前用户查找相应的模块。
	 * @param userId
	 * @return
	 */
	public List<IndexDisplay> findByUser(Long userId);
}