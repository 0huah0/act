package com.abcdef.frm.dao.system;
/*
 *   
 *  
*/
import java.util.List;

import com.abcdef.core.dao.BaseDao;
import com.abcdef.frm.model.system.Company;

/**
 * @author Student LHH
 *
 */
public interface CompanyDao extends BaseDao<Company> {
	
	public List<Company> findByHql(final String hql);
	public List<Company> findCompany();
	
}
