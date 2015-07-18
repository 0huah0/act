package com.act.dao.impl;

import java.util.List;

import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.hibernate.type.StandardBasicTypes;

import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.act.dao.AccountingPeriodDao;
import com.act.model.AccountingPeriod;

@SuppressWarnings("unchecked")
public class AccountingPeriodDaoImpl extends BaseDaoImpl<AccountingPeriod> implements AccountingPeriodDao{
	
	public AccountingPeriodDaoImpl() {
		super(AccountingPeriod.class);
	}
	
	/**
	 * 取得所有會計區間信息
	 * @param 
	 * @return List<AccountingPeriod>
	 * @throws Exception
	 */
	@Override
	public List<AccountingPeriod> getAccountingPeriodInfo() throws Exception {
		String condition = "WHERE 1=1 ";
//		condition += configType == null || "".equals(configType) ? "": "AND config_type=:config_type ";
//		condition += configCode == null || "".equals(configCode) ? "": "AND config_code=:config_code ";
		
		String sql = "SELECT period_id, AS id, " +
							"period_type AS type, " +
							"period_y AS year, " +
							"period_hy AS halfYear "+
							"period_s AS season "+
							"period_m AS month "+
							"period_date_s AS startDate "+
							"period_date_e AS endDate "+
					   "FROM act_accounting_period " + condition +
					  "ORDER BY create_date";
		
		SQLQuery query = getSession().createSQLQuery(sql);
		
//		if (configType != null && !"".equals(configType)) {
//			query.setParameter("config_type", configType);
//		}
//		
//		if (configCode != null && !"".equals(configCode)) {
//			query.setParameter("config_code", configCode);
//		}
		
		query.addScalar("id", StandardBasicTypes.LONG);
		query.addScalar("type", StandardBasicTypes.STRING);
		query.addScalar("year", StandardBasicTypes.INTEGER);
		query.addScalar("halfYear", StandardBasicTypes.INTEGER);
		query.addScalar("season", StandardBasicTypes.INTEGER);
		query.addScalar("month", StandardBasicTypes.INTEGER);
		query.addScalar("startDate", StandardBasicTypes.DATE);
		query.addScalar("endDate", StandardBasicTypes.DATE);
		query.setResultTransformer(Transformers.aliasToBean(AccountingPeriod.class));
		
		List<AccountingPeriod> accountingPeriodList = query.list();
		
		return accountingPeriodList;
	}
	
}
