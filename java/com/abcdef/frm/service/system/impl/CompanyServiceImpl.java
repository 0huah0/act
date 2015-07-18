package com.abcdef.frm.service.system.impl;
/*
 *  
 *   
*/
import java.util.List;

import com.abcdef.core.service.impl.BaseServiceImpl;
import com.abcdef.core.web.paging.PagingBean;
import com.abcdef.frm.dao.system.CompanyDao;
import com.abcdef.frm.model.system.Company;
import com.abcdef.frm.service.system.CompanyService;


public  class CompanyServiceImpl extends BaseServiceImpl<Company> implements
		CompanyService {
	
	private CompanyDao companyDao;
	
	public CompanyServiceImpl(CompanyDao companyDao) {
		super(companyDao);
		this.companyDao=companyDao;
	}

	@Override
	public List<Company> findCompany() {
		
		return companyDao.findCompany();
	}
}
