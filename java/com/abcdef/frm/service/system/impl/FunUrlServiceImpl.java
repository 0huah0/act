package com.abcdef.frm.service.system.impl;
/*
 *   
 *   
*/
import com.abcdef.core.service.impl.BaseServiceImpl;
import com.abcdef.frm.dao.system.FunUrlDao;
import com.abcdef.frm.model.system.FunUrl;
import com.abcdef.frm.service.system.FunUrlService;

public class FunUrlServiceImpl extends BaseServiceImpl<FunUrl> implements FunUrlService{
	private FunUrlDao dao;
	
	public FunUrlServiceImpl(FunUrlDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.gdssoft.framework.service.system.FunUrlService#getByPathFunId(java.lang.String, java.lang.Long)
	 */
	public FunUrl getByPathFunId(String path,Long funId){
		return dao.getByPathFunId(path, funId);
	}

}