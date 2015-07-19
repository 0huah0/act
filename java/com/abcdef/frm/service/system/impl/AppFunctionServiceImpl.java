package com.abcdef.frm.service.system.impl;
/*
 *  
 *  
*/
import com.abcdef.core.exception.NotCompleteException;
import com.abcdef.core.exception.NotExistException;
import com.abcdef.core.service.impl.BaseServiceImpl;
import com.abcdef.frm.dao.system.AppFunctionDao;
import com.abcdef.frm.model.system.AppFunction;
import com.abcdef.frm.service.system.AppFunctionService;

public class AppFunctionServiceImpl extends BaseServiceImpl<AppFunction> implements AppFunctionService{
	private AppFunctionDao dao;
	
	public AppFunctionServiceImpl(AppFunctionDao dao) {
		super(dao);
		this.dao=dao;
	}

	/*
	 * (non-Javadoc)
	 * @see com.gdssoft.framework.service.system.AppFunctionService#getByKey(java.lang.String)
	 */
	public AppFunction getByKey(String key) {
		return dao.getByKey(key);
	}
	
	
	@Override
	public AppFunction save(AppFunction appFunction) throws NotCompleteException {
		String key = appFunction.getFunKey();
		if (null == key || key == "") {
			throw new NotCompleteException();
		} else {
			return dao.saveOrUpdate(appFunction);
		}
	}

	@Override
	public Boolean remove(Long funId) throws NotCompleteException, 
			NotExistException {
		if (null == funId) {
			throw new NotCompleteException("没有输入 Function Id");
		} else {
			AppFunction appFunction = this.get(funId);
			if (null == appFunction)
				throw new NotExistException("Function 不存在");
			else {
				dao.remove(appFunction);
			}
			return null==get(funId);
		}
	}
}