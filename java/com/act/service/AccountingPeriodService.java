/**
 * 
 */
package com.act.service;

import java.util.List;

import com.abcdef.core.service.BaseService;
import com.act.model.AccountingPeriod;

/**
 * 
 */
public interface AccountingPeriodService extends BaseService<AccountingPeriod>{

	/**
	 * 取得所有會計區間信息
	 * @param 
	 * @return List<AccountingPeriod>
	 * @throws Exception
	 */
	List<AccountingPeriod> getAccountingPeriodInfo() throws Exception;
}
