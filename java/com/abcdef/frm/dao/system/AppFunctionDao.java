package com.abcdef.frm.dao.system;
/*
 *   
 *  
*/
import com.abcdef.core.dao.BaseDao;
import com.abcdef.frm.model.system.AppFunction;

/**
 * 
 * @author 
 *
 */
public interface AppFunctionDao extends BaseDao<AppFunction>{
	/**
	 * 按Key 取得Function的值
	 * @param key
	 * @return
	 */
	public AppFunction getByKey(String key);
}