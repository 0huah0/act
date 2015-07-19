package com.abcdef.frm.dao.system.impl;
/*
 *   
 *  
*/
import java.util.List;

import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.abcdef.frm.dao.system.CompanyDao;
import com.abcdef.frm.model.system.Company;

@SuppressWarnings("unchecked")
public class CompanyDaoImpl extends BaseDaoImpl<Company> implements CompanyDao{

	public CompanyDaoImpl() {
		super(Company.class);
	}

	public List<Company> findCompany(){
		String hql = "from com.abcdef.frm.model.system.Company c";
		return findByHql(hql);
		
	}
	
}
