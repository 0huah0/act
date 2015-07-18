package com.abcdef.frm.dao.system;
/*
 *   
 *  
*/
import com.abcdef.core.dao.BaseDao;
import com.abcdef.frm.model.system.FunUrl;

/**
 * 
 * @author 
 *
 */
public interface FunUrlDao extends BaseDao<FunUrl>{
	/**
	 * 按path及functionId查找
	 * @param path
	 * @param funId
	 * @return
	 */
	public FunUrl getByPathFunId(String path,Long funId);
}