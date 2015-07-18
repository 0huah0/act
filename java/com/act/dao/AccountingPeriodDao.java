/**
 * 
 */
package com.act.dao;

import java.util.List;

import com.abcdef.core.dao.BaseDao;
import com.act.model.AccountingPeriod;

/**
 * 
 */
public interface AccountingPeriodDao extends BaseDao<AccountingPeriod>{

	/**
	 * 取得所有會計區間信息
	 * @param 
	 * @return List<AccountingPeriod>
	 * @throws Exception
	 */
	List<AccountingPeriod> getAccountingPeriodInfo() throws Exception;

}
