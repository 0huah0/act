/**
 * 
 */
package com.act.service.impl;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.act.dao.AccountingTitleDao;
import com.act.model.AccountingTitle;
import com.act.service.AccountingTitleService;

/**
 *
 */
public class AccountingTitleServiceImpl extends
		BaseServiceImpl<AccountingTitle> implements AccountingTitleService {
	@SuppressWarnings("unused")
	private AccountingTitleDao dao;

	public AccountingTitleServiceImpl(AccountingTitleDao dao) {
		super(dao);
		this.dao = dao;
	}

}
