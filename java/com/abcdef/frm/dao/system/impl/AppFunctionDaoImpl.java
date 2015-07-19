package com.abcdef.frm.dao.system.impl;
/*
 *   
 *  
*/
import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.abcdef.frm.dao.system.AppFunctionDao;
import com.abcdef.frm.model.system.AppFunction;

@SuppressWarnings("unchecked")
public class AppFunctionDaoImpl extends BaseDaoImpl<AppFunction> implements AppFunctionDao{

	public AppFunctionDaoImpl() {
		super(AppFunction.class);
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.gdssoft.framework.dao.system.AppFunctionDao#getByKey(java.lang.String)
	 */
	public AppFunction getByKey(String key){
		String hql="from AppFunction af where af.funKey=?";
		return (AppFunction)findUnique(hql, new String[]{key});
	}

}