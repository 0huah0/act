/*
 * Powered By [shi_zenghua@qq.com]
 */

package com.pss.dao.impl;

import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.pss.dao.PssCustomerDao;
import com.pss.model.PssCustomer;
@SuppressWarnings("unchecked")
public class PssCustomerDaoImpl extends BaseDaoImpl<PssCustomer> implements PssCustomerDao{
	public PssCustomerDaoImpl() {
		super(PssCustomer.class);
	}
	
}