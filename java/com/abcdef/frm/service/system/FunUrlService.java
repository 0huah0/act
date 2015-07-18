package com.abcdef.frm.service.system;
/*
 * 
 *  
*/
import com.abcdef.core.service.BaseService;
import com.abcdef.frm.model.system.FunUrl;

public interface FunUrlService extends BaseService<FunUrl>{
	/**
	 * 按path及functionId查找
	 * @param path
	 * @param funId
	 * @return
	 */
	public FunUrl getByPathFunId(String path,Long funId);
}


