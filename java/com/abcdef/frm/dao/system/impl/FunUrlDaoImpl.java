package com.abcdef.frm.dao.system.impl;
/*
 *   
 *  
*/
import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.abcdef.frm.dao.system.FunUrlDao;
import com.abcdef.frm.model.system.FunUrl;

public class FunUrlDaoImpl extends BaseDaoImpl<FunUrl> implements FunUrlDao{

	public FunUrlDaoImpl() {
		super(FunUrl.class);
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.gdssoft.framework.dao.system.FunUrlDao#getByPathFunId(java.lang.String, java.lang.Long)
	 */
	public FunUrl getByPathFunId(String path,Long funId){
		String hql="from FunUrl fu where fu.urlPath=? and fu.appFunction.functionId=? ";
		return (FunUrl)findUnique(hql, new Object[]{path,funId});
	}

}