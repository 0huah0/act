/**
 * 
 */
package com.act.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.act.service.AccountingPeriodService;
import com.act.dao.AccountingPeriodDao;
import com.act.model.AccountingPeriod;

/**
 *
 */
public class AccountingPeriodServiceImpl extends
		BaseServiceImpl<AccountingPeriod> implements AccountingPeriodService {
	
	private AccountingPeriodDao dao;

	public AccountingPeriodServiceImpl(AccountingPeriodDao dao) {
		super(dao);
		this.dao = dao;
	}

	@Resource
	private AccountingPeriodDao accountingPeriodDao;
	
	@Override
	public List<AccountingPeriod> getAccountingPeriodInfo() throws Exception {
		return dao.getAccountingPeriodInfo();
	}
	
}
