package com.abcdef.frm.service.system;
/*
 * 
 *  
*/
import java.util.List;

import com.abcdef.core.service.BaseService;
import com.abcdef.frm.model.system.Company;

public interface CompanyService extends BaseService<Company> {

	public List<Company> findCompany();
}
