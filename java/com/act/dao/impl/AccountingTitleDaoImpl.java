package com.act.dao.impl;

import java.util.List;

import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.act.dao.AccountingTitleDao;
import com.act.model.AccountingTitle;

@SuppressWarnings("unchecked")
public class AccountingTitleDaoImpl extends BaseDaoImpl<AccountingTitle> implements AccountingTitleDao{
	public AccountingTitleDaoImpl() {
		super(AccountingTitle.class);
	}

	@Override
	public AccountingTitle getByCode(String key) {
		String hql = "from AccountingTitle where code = ?";
		List<AccountingTitle> list = findByHql(hql, new String[]{key});
		return list.size()>0?list.get(0):null;
	}
}
