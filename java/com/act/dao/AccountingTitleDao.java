/**
 * 
 */
package com.act.dao;

import com.abcdef.core.dao.BaseDao;
import com.act.model.AccountingTitle;

/**
 * 
 */
public interface AccountingTitleDao extends BaseDao<AccountingTitle>{

	/**
	 * @param key
	 * @return
	 */
	AccountingTitle getByCode(String key);

}
