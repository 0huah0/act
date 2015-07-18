package com.abcdef.frm.service.system;
/*
 * 
 *  
*/
import com.abcdef.core.exception.ExistException;
import com.abcdef.core.exception.NotCompleteException;
import com.abcdef.core.exception.NotExistException;
import com.abcdef.core.service.BaseService;
import com.abcdef.frm.model.system.AppFunction;

public interface AppFunctionService extends BaseService<AppFunction>{
	/**
	 * 按Key 取得Function的值
	 * @param key
	 * @return
	 */
	public AppFunction getByKey(String key);
	
	/**
	 * 
	 * @param appFunction
	 * @return 
	 * @throws InputNotCompleteException 
	 */
	public AppFunction save(AppFunction appFunction) throws NotCompleteException;
	/**
	 * 
	 * @param appFunction
	 * @return 
	 * @throws InputNotCompleteException 
	 * @throws ExistException 
	 */
	public Boolean remove(Long funId) throws NotCompleteException, NotExistException;
}


