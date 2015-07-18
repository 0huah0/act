package com.act.dao.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.HibernateException;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.hibernate.type.StandardBasicTypes;

import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.act.dao.AccountingTitleDao;
import com.act.dao.JournalDetailDao;
import com.act.dao.SystemConfigDao;
import com.act.model.AccountTitleJournal;
import com.act.model.JournalDetail;
import com.act.model.SystemConfig;

@SuppressWarnings("unchecked")
public class JournalDetailDaoImpl extends BaseDaoImpl<JournalDetail> implements
		JournalDetailDao {
	@Resource
	AccountingTitleDao accountingTitleDao;
	@Resource
	SystemConfigDao systemConfigDao;
	
	List<SystemConfig> listSystemConfig = null;
	
	public JournalDetailDaoImpl() {
		super(JournalDetail.class);
	}

	@Override
	public List<AccountTitleJournal> get4ajReport(String codeS, String codeE,
			String dateS, String dateE) {

		String condition = "";
		condition += codeS == null || "".equals(codeS) ? ""
				: " and at.code>=:codeS";
		condition += codeS == null || "".equals(codeE) ? ""
				: " and at.code<=:codeE";
		condition += codeS == null || "".equals(dateS) ? ""
				: " and jh.ref_date>=:dateS";
		condition += codeS == null || "".equals(dateE) ? ""
				: " and jh.ref_date<=:dateE";

		String sql = "select jd.code as code,at.name as name,jh.brief as brief,jd.ref_no as refNo,"
				+ "jh.ref_date as refDate,sum(jd.debit_amount) as debitSum,sum(jd.credit_amount) as creditSum"
				+ " from act_journal_detail jd join act_journal_head jh on jd.ref_no=jh.ref_no"
				+ " join act_accounting_title at on jd.code=at.code where jh.is_post=1 "
				+ condition
				+ " group by jd.code,at.name,jh.brief,jd.ref_no,jh.ref_date"
				+ " order by jh.ref_date desc";
		List<AccountTitleJournal> list = null;
		try {
			SQLQuery query = getSession().createSQLQuery(sql);
			if (codeS != null && !"".equals(codeS))
				query.setParameter("codeS", codeS);
			if (codeE != null && !"".equals(codeE))
				query.setParameter("codeE", codeE);
			if (dateS != null && !"".equals(dateS))
				query.setParameter("dateS", dateS);
			if (dateE != null && !"".equals(dateE))
				query.setParameter("dateE", dateE);

			query.addScalar("code", StandardBasicTypes.STRING);
			query.addScalar("name", StandardBasicTypes.STRING);
			query.addScalar("brief", StandardBasicTypes.STRING);
			query.addScalar("refNo", StandardBasicTypes.STRING);
			query.addScalar("refDate", StandardBasicTypes.DATE);
			query.addScalar("debitSum", StandardBasicTypes.DOUBLE);
			query.addScalar("creditSum", StandardBasicTypes.DOUBLE);
			query.setResultTransformer(Transformers
					.aliasToBean(AccountTitleJournal.class));
			list = query.list();
		} catch (HibernateException e) {
			logger.error(e.getMessage());
		}
		return list;
	}

	
	@Override
	public List<AccountTitleJournal> get4ajReport(String code,
			String sdt, String edt) {

		String condition = "";
		condition += code == null || "".equals(code) ? ""
				: " and at.code=:code";
		condition += sdt == null || "".equals(sdt) ? ""
				: " and jh.ref_date>=:dateS";
		condition += edt == null || "".equals(edt) ? ""
				: " and jh.ref_date<=:dateE";

		String sql = "select jd.code as code,at.name as name,jh.brief as brief,jd.ref_no as refNo,"
				+ "jh.ref_date as refDate,sum(jd.debit_amount) as debitSum,sum(jd.credit_amount) as creditSum"
				+ " from act_journal_detail jd join act_journal_head jh on jd.ref_no=jh.ref_no"
				+ " join act_accounting_title at on jd.code=at.code where jh.is_post=1 "
				+ condition
				+ " group by jd.code,at.name,jh.brief,jd.ref_no,jh.ref_date"
				+ " order by jh.ref_date asc";
		List<AccountTitleJournal> list = null;
		try {
			SQLQuery query = getSession().createSQLQuery(sql);
			if (code != null && !"".equals(code))
				query.setParameter("code", code);
			if (sdt != null && !"".equals(sdt))
				query.setParameter("dateS", sdt);
			if (edt != null && !"".equals(edt))
				query.setParameter("dateE", edt);

			query.addScalar("code", StandardBasicTypes.STRING);
			query.addScalar("name", StandardBasicTypes.STRING);
			query.addScalar("brief", StandardBasicTypes.STRING);
			query.addScalar("refNo", StandardBasicTypes.STRING);
			query.addScalar("refDate", StandardBasicTypes.DATE);
			query.addScalar("debitSum", StandardBasicTypes.DOUBLE);
			query.addScalar("creditSum", StandardBasicTypes.DOUBLE);
			query.setResultTransformer(Transformers
					.aliasToBean(AccountTitleJournal.class));
			list = query.list();
		} catch (HibernateException e) {
			logger.error(e.getMessage());
		}
		return list;
	}
	
	
	@Override
	public List<JournalDetail> listByRefNo(String refNo) {
		return findByHql("from JournalDetail where journalHead.refNo = ?",new Object[]{refNo});
	}

	
	
	@Override
	public List<JournalDetail> listActTitleSum(String sdt, String edt) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String condition = "";
		condition += sdt == null || "".equals(sdt) ? ""
				: " and jh.ref_date>=:sd";
		condition += edt == null || "".equals(edt) ? ""
				: " and jh.ref_date<=:ed";
		
		String sql = "select jd.code as code,jd.name as name" +
				",sum(jd.debit_amount) as debitAmount,sum(jd.credit_amount) as creditAmount" +
				" from act_journal_detail jd join act_journal_head jh on jd.ref_no=jh.ref_no where jh.is_post=1" 
				+ condition +
				" group by jd.code";
		
		SQLQuery query = getSession().createSQLQuery(sql);
		if (sdt != null && !"".equals(sdt))
			query.setParameter("sd", sdf.parse(sdt));
		if (edt != null && !"".equals(edt))
			query.setParameter("ed", sdf.parse(edt));
		
		query.addScalar("code", StandardBasicTypes.STRING);
		query.addScalar("name", StandardBasicTypes.STRING);
		query.addScalar("debitAmount", StandardBasicTypes.DOUBLE);
		query.addScalar("creditAmount", StandardBasicTypes.DOUBLE);
		query.setResultTransformer(Transformers.aliasToBean(JournalDetail.class));
		
		List<JournalDetail> sjdList = query.list();
							
		return sjdList;
	}

	
	@Override
	public List<AccountTitleJournal> getAtList(String code, String sdt,
			String edt) {
		String condition = "";
		condition += code == null || "".equals(code) ? ""
				: " and at.code=:code";
		condition += sdt == null || "".equals(sdt) ? ""
				: " and jh.ref_date>=:dateS";
		condition += edt == null || "".equals(edt) ? ""
				: " and jh.ref_date<=:dateE";

		String sql = "select jd.code as code,at.name as name" 
				+ " from act_journal_detail jd join act_journal_head jh on jd.ref_no=jh.ref_no"
				+ " join act_accounting_title at on jd.code=at.code where jh.is_post=1 "
				+ condition
				+ " group by jd.code,at.name order by jd.code asc";
		
		List<AccountTitleJournal> list = null;
		try {
			SQLQuery query = getSession().createSQLQuery(sql);
			if (code != null && !"".equals(code))
				query.setParameter("code", code);
			if (sdt != null && !"".equals(sdt))
				query.setParameter("dateS", sdt);
			if (edt != null && !"".equals(edt))
				query.setParameter("dateE", edt);

			query.addScalar("code", StandardBasicTypes.STRING);
			query.addScalar("name", StandardBasicTypes.STRING);
			query.setResultTransformer(Transformers
					.aliasToBean(AccountTitleJournal.class));
			list = query.list();
		} catch (HibernateException e) {
			logger.error(e.getMessage());
		}
		return list;
	}

	
	
	@Override
	public List<AccountTitleJournal> getATJournalList(String code, String sdt,
			String edt) {
		
		String condition = sdt == null || "".equals(sdt) ? ""
				: " and jh.ref_date>=:dateS";
		
		condition += edt == null || "".equals(edt) ? ""
				: " and jh.ref_date<=:dateE";

		String sql = "select jd.code as code,at.name as name,jh.brief as brief,jd.ref_no as refNo,"
				+ "jh.ref_date as refDate,sum(jd.debit_amount) as debitSum,sum(jd.credit_amount) as creditSum"
				+ " from act_journal_detail jd join act_journal_head jh on jd.ref_no=jh.ref_no"
				+ " join act_accounting_title at on jd.code=at.code where jh.is_post=1 and at.code=:code"
				+ condition
				+ " group by jd.code,at.name,jh.brief,jd.ref_no,jh.ref_date"
				+ " order by jh.ref_date,jd.ref_no";
		List<AccountTitleJournal> list = null;
		try {
			SQLQuery query = getSession().createSQLQuery(sql);
			query.setParameter("code", code);
			
			if (sdt != null && !"".equals(sdt))
				query.setParameter("dateS", sdt);
			if (edt != null && !"".equals(edt))
				query.setParameter("dateE", edt);

			query.addScalar("code", StandardBasicTypes.STRING);
			query.addScalar("name", StandardBasicTypes.STRING);
			query.addScalar("brief", StandardBasicTypes.STRING);
			query.addScalar("refNo", StandardBasicTypes.STRING);
			query.addScalar("refDate", StandardBasicTypes.DATE);
			query.addScalar("debitSum", StandardBasicTypes.DOUBLE);
			query.addScalar("creditSum", StandardBasicTypes.DOUBLE);
			query.setResultTransformer(Transformers
					.aliasToBean(AccountTitleJournal.class));
			list = query.list();
		} catch (HibernateException e) {
			logger.error(e.getMessage());
		}
		return list;
	}
	
	/**
	 * list Income Statement Operating Revenue<br>
	 * for 損益表  <i>計算一段時間內"營業收入"相關科目的借貸匯總</i>
	 * @param sdt
	 * @param sdt
	 * @return
	 * @throws ParseException 
	 */
	@Override
	public List<JournalDetail> listIncomeStatementOpRev(String sdt, String edt) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String condition = "";
		condition += sdt == null || "".equals(sdt) ? ""
				: " and jh.ref_date>=:sd";
		condition += edt == null || "".equals(edt) ? ""
				: " and jh.ref_date<=:ed";
		
		//從系統配置表中獲取「損益表-營業收入」
		try {
			listSystemConfig = systemConfigDao.getSysConfigInfo("IncomeStatementReport", "OpRev");
		}
		catch (Exception e) {
			System.out.print(e);
		}
		
		for(int i=0; i<listSystemConfig.size(); i++) {
			//只有一次循環
			if(listSystemConfig.size() == 1) {
				condition += " and jd.code like '" + listSystemConfig.get(i).getConfigValue() + "%'";
			}
			//有多次循環
			if(listSystemConfig.size() > 1) {
				//第一次循環
				if(i == 0){
					condition += " and (jd.code like '" + listSystemConfig.get(i).getConfigValue() + "%'";
				}
				//最後一次循環
				else if(i == (listSystemConfig.size() - 1)){
					condition += " or jd.code like '" + listSystemConfig.get(i).getConfigValue() + "%')";
				}
				else{
					condition += " or jd.code like '" + listSystemConfig.get(i).getConfigValue() + "%'";
				}
			}
		}
		
		String sql = "select jd.code as code,jd.name as name" +
				",sum(jd.debit_amount) as debitAmount,sum(jd.credit_amount) as creditAmount" +
				" from act_journal_detail jd join act_journal_head jh on jd.ref_no=jh.ref_no where jh.is_post=1" 
				+ condition +
				" group by jd.code" +
				" order by jd.code";
		
		SQLQuery query = getSession().createSQLQuery(sql);
		if (sdt != null && !"".equals(sdt))
			query.setParameter("sd", sdf.parse(sdt));
		if (edt != null && !"".equals(edt))
			query.setParameter("ed", sdf.parse(edt));
		
		query.addScalar("code", StandardBasicTypes.STRING);
		query.addScalar("name", StandardBasicTypes.STRING);
		query.addScalar("debitAmount", StandardBasicTypes.DOUBLE);
		query.addScalar("creditAmount", StandardBasicTypes.DOUBLE);
		query.setResultTransformer(Transformers.aliasToBean(JournalDetail.class));
		
		List<JournalDetail> sjdList = query.list();
							
		return sjdList;
	}
	
	/**
	 * list Income Statement - Operating Costs<br>
	 * for 損益表  <i>計算一段時間內"營業成本"相關科目的借貸匯總</i>
	 * @param sdt
	 * @param sdt
	 * @return
	 * @throws ParseException 
	 */
	@Override
	public List<JournalDetail> listIncomeStatementOpCost(String sdt, String edt) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String condition = "";
		condition += sdt == null || "".equals(sdt) ? ""
				: " and jh.ref_date>=:sd";
		condition += edt == null || "".equals(edt) ? ""
				: " and jh.ref_date<=:ed";
		
		//從系統配置表中獲取「損益表-營業成本」
		try {
			listSystemConfig = systemConfigDao.getSysConfigInfo("IncomeStatementReport", "OpCost");
		}
		catch (Exception e) {
			System.out.print(e);
		}
		
		for(int i=0; i<listSystemConfig.size(); i++) {
			//只有一次循環
			if(listSystemConfig.size() == 1) {
				condition += " and jd.code like '" + listSystemConfig.get(i).getConfigValue() + "%'";
			}
			//有多次循環
			if(listSystemConfig.size() > 1) {
				//第一次循環
				if(i == 0){
					condition += " and (jd.code like '" + listSystemConfig.get(i).getConfigValue() + "%'";
				}
				//最後一次循環
				else if(i == (listSystemConfig.size() - 1)){
					condition += " or jd.code like '" + listSystemConfig.get(i).getConfigValue() + "%')";
				}
				else{
					condition += " or jd.code like '" + listSystemConfig.get(i).getConfigValue() + "%'";
				}
			}
		}
		
		String sql = "select jd.code as code,jd.name as name" +
				",sum(jd.debit_amount) as debitAmount,sum(jd.credit_amount) as creditAmount" +
				" from act_journal_detail jd join act_journal_head jh on jd.ref_no=jh.ref_no where jh.is_post=1" 
				+ condition +
				" group by jd.code" +
				" order by jd.code";
		
		SQLQuery query = getSession().createSQLQuery(sql);
		if (sdt != null && !"".equals(sdt))
			query.setParameter("sd", sdf.parse(sdt));
		if (edt != null && !"".equals(edt))
			query.setParameter("ed", sdf.parse(edt));
		
		query.addScalar("code", StandardBasicTypes.STRING);
		query.addScalar("name", StandardBasicTypes.STRING);
		query.addScalar("debitAmount", StandardBasicTypes.DOUBLE);
		query.addScalar("creditAmount", StandardBasicTypes.DOUBLE);
		query.setResultTransformer(Transformers.aliasToBean(JournalDetail.class));
		
		List<JournalDetail> sjdList = query.list();
							
		return sjdList;
	}
	
	/**
	 * list Income Statement - Operating Expenses<br>
	 * for 損益表  <i>計算一段時間內"營業費用"相關科目的借貸匯總</i>
	 * @param sdt
	 * @param sdt
	 * @return
	 * @throws ParseException 
	 */
	@Override
	public List<JournalDetail> listIncomeStatementOpExp(String sdt, String edt) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String condition = "";
		condition += sdt == null || "".equals(sdt) ? ""
				: " and jh.ref_date>=:sd";
		condition += edt == null || "".equals(edt) ? ""
				: " and jh.ref_date<=:ed";
		
		//從系統配置表中獲取「損益表-營業費用」
		try {
			listSystemConfig = systemConfigDao.getSysConfigInfo("IncomeStatementReport", "OpExp");
		}
		catch (Exception e) {
			System.out.print(e);
		}
		
		for(int i=0; i<listSystemConfig.size(); i++) {
			//只有一次循環
			if(listSystemConfig.size() == 1) {
				condition += " and jd.code like '" + listSystemConfig.get(i).getConfigValue() + "%'";
			}
			//有多次循環
			if(listSystemConfig.size() > 1) {
				//第一次循環
				if(i == 0){
					condition += " and (jd.code like '" + listSystemConfig.get(i).getConfigValue() + "%'";
				}
				//最後一次循環
				else if(i == (listSystemConfig.size() - 1)){
					condition += " or jd.code like '" + listSystemConfig.get(i).getConfigValue() + "%')";
				}
				else{
					condition += " or jd.code like '" + listSystemConfig.get(i).getConfigValue() + "%'";
				}
			}
		}
		
		String sql = "select jd.code as code,jd.name as name" +
				",sum(jd.debit_amount) as debitAmount,sum(jd.credit_amount) as creditAmount" +
				" from act_journal_detail jd join act_journal_head jh on jd.ref_no=jh.ref_no where jh.is_post=1" 
				+ condition +
				" group by jd.code" +
				" order by jd.code";
		
		SQLQuery query = getSession().createSQLQuery(sql);
		if (sdt != null && !"".equals(sdt))
			query.setParameter("sd", sdf.parse(sdt));
		if (edt != null && !"".equals(edt))
			query.setParameter("ed", sdf.parse(edt));
		
		query.addScalar("code", StandardBasicTypes.STRING);
		query.addScalar("name", StandardBasicTypes.STRING);
		query.addScalar("debitAmount", StandardBasicTypes.DOUBLE);
		query.addScalar("creditAmount", StandardBasicTypes.DOUBLE);
		query.setResultTransformer(Transformers.aliasToBean(JournalDetail.class));
		
		List<JournalDetail> sjdList = query.list();
							
		return sjdList;
	}
	
	/**
	 * list Income Statement - Non-Operating Revenue<br>
	 * for 損益表  <i>計算一段時間內"非營業收益"相關科目的借貸匯總</i>
	 * @param sdt
	 * @param sdt
	 * @return
	 * @throws ParseException 
	 */
	@Override
	public List<JournalDetail> listIncomeStatementNonOpRev(String sdt, String edt) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String condition = "";
		condition += sdt == null || "".equals(sdt) ? ""
				: " and jh.ref_date>=:sd";
		condition += edt == null || "".equals(edt) ? ""
				: " and jh.ref_date<=:ed";
		
		//從系統配置表中獲取「損益表-非營業收益」
		try {
			listSystemConfig = systemConfigDao.getSysConfigInfo("IncomeStatementReport", "NonOpRev");
		}
		catch (Exception e) {
			System.out.print(e);
		}
		
		for(int i=0; i<listSystemConfig.size(); i++) {
			//只有一次循環
			if(listSystemConfig.size() == 1) {
				condition += " and jd.code like '" + listSystemConfig.get(i).getConfigValue() + "%'";
			}
			//有多次循環
			if(listSystemConfig.size() > 1) {
				//第一次循環
				if(i == 0){
					condition += " and (jd.code like '" + listSystemConfig.get(i).getConfigValue() + "%'";
				}
				//最後一次循環
				else if(i == (listSystemConfig.size() - 1)){
					condition += " or jd.code like '" + listSystemConfig.get(i).getConfigValue() + "%')";
				}
				else{
					condition += " or jd.code like '" + listSystemConfig.get(i).getConfigValue() + "%'";
				}
			}
		}
		
		String sql = "select jd.code as code,jd.name as name" +
				",sum(jd.debit_amount) as debitAmount,sum(jd.credit_amount) as creditAmount" +
				" from act_journal_detail jd join act_journal_head jh on jd.ref_no=jh.ref_no where jh.is_post=1" 
				+ condition +
				" group by jd.code" +
				" order by jd.code";
		
		SQLQuery query = getSession().createSQLQuery(sql);
		if (sdt != null && !"".equals(sdt))
			query.setParameter("sd", sdf.parse(sdt));
		if (edt != null && !"".equals(edt))
			query.setParameter("ed", sdf.parse(edt));
		
		query.addScalar("code", StandardBasicTypes.STRING);
		query.addScalar("name", StandardBasicTypes.STRING);
		query.addScalar("debitAmount", StandardBasicTypes.DOUBLE);
		query.addScalar("creditAmount", StandardBasicTypes.DOUBLE);
		query.setResultTransformer(Transformers.aliasToBean(JournalDetail.class));
		
		List<JournalDetail> sjdList = query.list();
							
		return sjdList;
	}
	
	/**
	 * list Income Statement - Non-Operating Expenses<br>
	 * for 損益表  <i>計算一段時間內"非營業損失"相關科目的借貸匯總</i>
	 * @param sdt
	 * @param sdt
	 * @return
	 * @throws ParseException 
	 */
	@Override
	public List<JournalDetail> listIncomeStatementNonOpExp(String sdt, String edt) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String condition = "";
		condition += sdt == null || "".equals(sdt) ? ""
				: " and jh.ref_date>=:sd";
		condition += edt == null || "".equals(edt) ? ""
				: " and jh.ref_date<=:ed";
		
		//從系統配置表中獲取「損益表-非營業損失」
		try {
			listSystemConfig = systemConfigDao.getSysConfigInfo("IncomeStatementReport", "NonOpExp");
		}
		catch (Exception e) {
			System.out.print(e);
		}
		
		for(int i=0; i<listSystemConfig.size(); i++) {
			//只有一次循環
			if(listSystemConfig.size() == 1) {
				condition += " and jd.code like '" + listSystemConfig.get(i).getConfigValue() + "%'";
			}
			//有多次循環
			if(listSystemConfig.size() > 1) {
				//第一次循環
				if(i == 0){
					condition += " and (jd.code like '" + listSystemConfig.get(i).getConfigValue() + "%'";
				}
				//最後一次循環
				else if(i == (listSystemConfig.size() - 1)){
					condition += " or jd.code like '" + listSystemConfig.get(i).getConfigValue() + "%')";
				}
				else{
					condition += " or jd.code like '" + listSystemConfig.get(i).getConfigValue() + "%'";
				}
			}
		}
		
		String sql = "select jd.code as code,jd.name as name" +
				",sum(jd.debit_amount) as debitAmount,sum(jd.credit_amount) as creditAmount" +
				" from act_journal_detail jd join act_journal_head jh on jd.ref_no=jh.ref_no where jh.is_post=1" 
				+ condition +
				" group by jd.code" +
				" order by jd.code";
		
		SQLQuery query = getSession().createSQLQuery(sql);
		if (sdt != null && !"".equals(sdt))
			query.setParameter("sd", sdf.parse(sdt));
		if (edt != null && !"".equals(edt))
			query.setParameter("ed", sdf.parse(edt));
		
		query.addScalar("code", StandardBasicTypes.STRING);
		query.addScalar("name", StandardBasicTypes.STRING);
		query.addScalar("debitAmount", StandardBasicTypes.DOUBLE);
		query.addScalar("creditAmount", StandardBasicTypes.DOUBLE);
		query.setResultTransformer(Transformers.aliasToBean(JournalDetail.class));
		
		List<JournalDetail> sjdList = query.list();
							
		return sjdList;
	}
	
	/**
	 * list Balance Sheet - Assets<br>
	 * for 資產負債表  <i>計算一段時間內"資產"相關科目的借貸匯總</i>
	 * @param sdt
	 * @param sdt
	 * @return
	 * @throws ParseException 
	 */
	@Override
	public List<JournalDetail> listBalanceSheetAssets(String sdt, String edt) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String condition = "";
		condition += sdt == null || "".equals(sdt) ? "": " and jh.ref_date>=:sd";
		condition += edt == null || "".equals(edt) ? "": " and jh.ref_date<=:ed";
		
		String sql = "select jd.code as code,jd.name as name" +
				",sum(jd.debit_amount) as debitAmount,sum(jd.credit_amount) as creditAmount" +
				" from act_journal_detail jd join act_journal_head jh on jd.ref_no=jh.ref_no where jh.is_post=1" 
				+ condition +
				" and jd.code like '1%'" +
				" group by jd.code" +
				" order by jd.code";
		
		SQLQuery query = getSession().createSQLQuery(sql);
		if (sdt != null && !"".equals(sdt))
			query.setParameter("sd", sdf.parse(sdt));
		if (edt != null && !"".equals(edt))
			query.setParameter("ed", sdf.parse(edt));
		
		query.addScalar("code", StandardBasicTypes.STRING);
		query.addScalar("name", StandardBasicTypes.STRING);
		query.addScalar("debitAmount", StandardBasicTypes.DOUBLE);
		query.addScalar("creditAmount", StandardBasicTypes.DOUBLE);
		query.setResultTransformer(Transformers.aliasToBean(JournalDetail.class));
		
		List<JournalDetail> sjdList = query.list();
							
		return sjdList;
	}
	
	/**
	 * list Balance Sheet - Liabilities<br>
	 * for 資產負債表  <i>計算一段時間內"負債"相關科目的借貸匯總</i>
	 * @param sdt
	 * @param sdt
	 * @return
	 * @throws ParseException 
	 */
	@Override
	public List<JournalDetail> listBalanceSheetLiabilities(String sdt, String edt) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String condition = "";
		condition += sdt == null || "".equals(sdt) ? "": " and jh.ref_date>=:sd";
		condition += edt == null || "".equals(edt) ? "": " and jh.ref_date<=:ed";
		
		String sql = "select jd.code as code,jd.name as name" +
				",sum(jd.debit_amount) as debitAmount,sum(jd.credit_amount) as creditAmount" +
				" from act_journal_detail jd join act_journal_head jh on jd.ref_no=jh.ref_no where jh.is_post=1" 
				+ condition +
				" and jd.code like '2%'" +
				" group by jd.code" +
				" order by jd.code";
		
		SQLQuery query = getSession().createSQLQuery(sql);
		if (sdt != null && !"".equals(sdt))
			query.setParameter("sd", sdf.parse(sdt));
		if (edt != null && !"".equals(edt))
			query.setParameter("ed", sdf.parse(edt));
		
		query.addScalar("code", StandardBasicTypes.STRING);
		query.addScalar("name", StandardBasicTypes.STRING);
		query.addScalar("debitAmount", StandardBasicTypes.DOUBLE);
		query.addScalar("creditAmount", StandardBasicTypes.DOUBLE);
		query.setResultTransformer(Transformers.aliasToBean(JournalDetail.class));
		
		List<JournalDetail> sjdList = query.list();
							
		return sjdList;
	}
	
	/**
	 * list Balance Sheet - Equity<br>
	 * for 資產負債表  <i>計算一段時間內"業主權益"相關科目的借貸匯總</i>
	 * @param sdt
	 * @param sdt
	 * @return
	 * @throws ParseException 
	 */
	@Override
	public List<JournalDetail> listBalanceSheetEquity(String sdt, String edt) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String condition = "";
		condition += sdt == null || "".equals(sdt) ? "": " and jh.ref_date>=:sd";
		condition += edt == null || "".equals(edt) ? "": " and jh.ref_date<=:ed";
		
		String sql = "select jd.code as code,jd.name as name" +
				",sum(jd.debit_amount) as debitAmount,sum(jd.credit_amount) as creditAmount" +
				" from act_journal_detail jd join act_journal_head jh on jd.ref_no=jh.ref_no where jh.is_post=1" 
				+ condition +
				" and jd.code like '3%'" +
				" group by jd.code" +
				" order by jd.code";
		
		SQLQuery query = getSession().createSQLQuery(sql);
		if (sdt != null && !"".equals(sdt))
			query.setParameter("sd", sdf.parse(sdt));
		if (edt != null && !"".equals(edt))
			query.setParameter("ed", sdf.parse(edt));
		
		query.addScalar("code", StandardBasicTypes.STRING);
		query.addScalar("name", StandardBasicTypes.STRING);
		query.addScalar("debitAmount", StandardBasicTypes.DOUBLE);
		query.addScalar("creditAmount", StandardBasicTypes.DOUBLE);
		query.setResultTransformer(Transformers.aliasToBean(JournalDetail.class));
		
		List<JournalDetail> sjdList = query.list();
		
		return sjdList;
	}
}
