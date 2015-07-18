/**
 * 
 */
package com.act.service.impl;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import javax.annotation.Resource;

import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.service.impl.BaseServiceImpl;
import com.abcdef.core.util.BeanUtil;
import com.abcdef.core.util.ContextUtil;
import com.act.dao.AccountingTitleDao;
import com.act.dao.JournalDetailDao;
import com.act.dao.JournalHeadDao;
import com.act.model.AccountTitleJournal;
import com.act.model.AccountingTitle;
import com.act.model.JournalDetail;
import com.act.model.JournalHead;
import com.act.service.JournalHeadService;
import com.google.gson.Gson;
import com.google.gson.JsonParseException;

/**
 *
 */
public class JournalHeadServiceImpl extends
		BaseServiceImpl<JournalHead> implements JournalHeadService {
	private JournalHeadDao dao;

	public JournalHeadServiceImpl(JournalHeadDao dao) {
		super(dao);
		this.dao = dao;
	}

	@Resource
	private JournalDetailDao journalDetailDao;
	@Resource
	private JournalHeadDao journalHeadDao;
	@Resource
	private AccountingTitleDao accountingTitleDao;
	
	@Override
	public boolean saveJournal(JournalHead journal,String detailStr) throws Exception {
		
		boolean success = true;
		String un = ContextUtil.getCurrentUser().getUsername();
		Date date = new Date();
		
		if (journal.getId() == null) {
			journal.setCreateBy(un);
			journal.setCreateDate(date);
			journal.setIsBackup(0);
			journal.setIsDelete(0);
			journal.setIsPost(0);
			journal.setDataFrom("act");
		} else {
			JournalHead orgjournal = this.get(journal.getId());
			BeanUtil.copyNotNullProperties(orgjournal, journal);
			journal = orgjournal;
		}
		journal.setUpdateBy(un);
		journal.setUpdateDate(date);
		this.save(journal);
		
		detailStr = detailStr.replaceAll("[\\[|\\]]", "").replace("},{", "};{");
		String[] records = detailStr.split(";");		
		Set<JournalDetail> newls = new HashSet<JournalDetail>();
		Gson gson = new Gson();
		try{
			for (String record : records) {
				JournalDetail njd = gson.fromJson(record, JournalDetail.class);
				JournalDetail jd = njd;
				if(njd.getId()!=null){			//處理更新
					jd = journalDetailDao.get(njd.getId());
					try{
						BeanUtil.copyNotNullProperties(jd, njd);
					}catch(Exception e){
						logger.error(e.getMessage());
					}
				}
				
				jd.setJournalHead(journal);
				journalDetailDao.save(jd);
				//journal.getDetails().add(jd);
				
				newls.add(jd);
			}
			
		}catch(JsonParseException e){
			success = false;
			logger.error("parmas:[detailStr] can not be instance."+e.getMessage());
			throw e;
		}

		
		//處理刪除
		List<JournalDetail> jdList = journalDetailDao.listByRefNo(journal.getRefNo());
		for (JournalDetail jd : jdList) {
			boolean has = false;
			for(JournalDetail njd : newls){
				if(jd.getId() == njd.getId()){
					has = true;
				}
			}
			if(!has){
				journalDetailDao.remove(jd);
			}
		}
		journal.setDetails(newls);
		
		return success;
	}

	@Override
	public String post(Date sdt, Date edt,String user) throws Exception {
		return dao.post(sdt,edt,user);
	}
	
	
	@Override
	public Map<Map<String,String>,List<AccountTitleJournal>> getAJList(String codeGE,String codeLE
			,String refDateGE,String refDateLE) {
		
		List<AccountTitleJournal> al = null;
		Map<Map<String,String>,List<AccountTitleJournal>> map = new HashMap<Map<String,String>,List<AccountTitleJournal>>();
		List<AccountTitleJournal> list = journalDetailDao.get4ajReport(codeGE, codeLE, refDateGE, refDateLE);
		for (AccountTitleJournal act : list) {
			Map<String,String> kmap = new HashMap<String,String>();
			kmap.put("code", act.getCode());
			kmap.put("name", act.getName());
			if(map.get(kmap)!=null){
				al = map.get(kmap);
				al.add(act);
			}else{
				al = new ArrayList<AccountTitleJournal>();
				al.add(act);
			}
			map.put(kmap, al);
		}
		return map;
	}
	
	/**
	 * 為總分類帳整合數據
	 * @param filter 包含查詢參數code和refDate
	 * @return
	 */
	@Override
	public Map<AccountingTitle,List<JournalHead>> getActTitleJournalList(String codeGE,String codeLE
			,String refDateGE,String refDateLE) {
		QueryFilter filter = new QueryFilter(0,Integer.MAX_VALUE);
		filter.addFilter("Q_code_S_GE", codeGE);
		filter.addFilter("Q_code_S_LE", codeLE);
		filter.addSorted("code", "asc");
		filter.getPagingBean().setPageSize(Integer.MAX_VALUE);
		List<AccountingTitle> alist = accountingTitleDao.getAll(filter);//filter by code

		Map<AccountingTitle,List<JournalHead>> map = new HashMap<AccountingTitle,List<JournalHead>>();
		filter = new QueryFilter(0,Integer.MAX_VALUE);
		filter.addFilter("Q_refDate_S_GE", refDateGE);
		filter.addFilter("Q_refDate_S_LE", refDateLE);
		filter.addSorted("refDate", "asc");
		for(AccountingTitle actTitle :alist){
			List<JournalHead> jlist = journalHeadDao.getAll(filter);//filter by date
			double debit;
			double credit;
			JournalDetail jd = null;
			for(JournalHead jh : jlist){
				debit = 0;
				credit = 0;
				for(Iterator<JournalDetail> it = jh.getDetails().iterator();it.hasNext();){
					jd = it.next();
					//if(actTitle.getCode().equals(jd.getCode())){
						debit += jd.getDebitAmount();
						credit += jd.getCreditAmount();
					//}
				}
				jh.setCredit(credit);
				jh.setDebit(debit);
			}
			map.put(actTitle, jlist);
		}
		return map;
	}
	
	/**
	 * 為總分類帳整合數據
	 * @param filter 包含查詢參數code和refDate
	 * @return
	 */
	public Map<AccountingTitle,List<JournalHead>> getActTitleJournalList(String code,String refDateGE,String refDateLE) {
		QueryFilter filter = new QueryFilter(0,Integer.MAX_VALUE);
		filter.addFilter("Q_code_S_EQ", code);
		filter.addSorted("code", "asc");
		filter.getPagingBean().setPageSize(Integer.MAX_VALUE);
		List<AccountingTitle> alist = accountingTitleDao.getAll(filter);//filter by code

		Map<AccountingTitle,List<JournalHead>> map = new HashMap<AccountingTitle,List<JournalHead>>();
		filter = new QueryFilter(0,Integer.MAX_VALUE);
		filter.addFilter("Q_refDate_S_GE", refDateGE);
		filter.addFilter("Q_refDate_S_LE", refDateLE);
		filter.addSorted("refDate", "asc");
		for(AccountingTitle actTitle :alist){
			List<JournalHead> jlist = journalHeadDao.getAll(filter);//filter by date
			double debit;
			double credit;
			JournalDetail jd = null;
			for(JournalHead jh : jlist){
				debit = 0;
				credit = 0;
				for(Iterator<JournalDetail> it = jh.getDetails().iterator();it.hasNext();){
					jd = it.next();
					//if(actTitle.getCode().equals(jd.getCode())){
						debit += jd.getDebitAmount();
						credit += jd.getCreditAmount();
					//}
				}
				jh.setCredit(credit);
				jh.setDebit(debit);
			}
			map.put(actTitle, jlist);
		}
		return map;
	}
	
	public Map<AccountingTitle,List<JournalHead>> getActTitleJournalList1(String codeGE,String codeLE
			,String refDateGE,String refDateLE) {/*
		
		QueryFilter filter = new QueryFilter(0,Integer.MAX_VALUE);
		filter.addFilter("Q_code_S_GE", codeGE);
		filter.addFilter("Q_code_S_LE", codeLE);
		filter.addSorted("code", "asc");
		List<JournalDetail> djList = journalDetailDao.getAll(filter);
		
		Map<String,List<JournalDetail>> jdMap = new HashMap<String,List<JournalDetail>>();
		List<JournalDetail> jdl = null;
		for (JournalDetail jd : djList) {
			if(jdMap.get(jd.getCode())!=null){
				jdl = jdMap.get(jd.getCode());
				jdl.add(jd);
			}else{
				jdl = new ArrayList<JournalDetail>();
				jdl.add(jd);
			}
			jdMap.put(jd.getCode(), jdl);
		}
		
		List<JournalHead> jhl = null;
		Map<String,List<JournalHead>> jhMap = new HashMap<String,List<JournalHead>>();
		for(Iterator<Entry<String, List<JournalDetail>>> it = jdMap.entrySet().iterator();it.hasNext();){
			Entry<String, List<JournalDetail>> entry = it.next();
			List<JournalDetail> jdList = entry.getValue();
			
//			filter = new QueryFilter(0,Integer.MAX_VALUE);
//			filter.addFilter("Q_refDate_S_GE", refDateGE);
//			filter.addFilter("Q_refDate_S_LE", refDateLE);
//			filter.addSorted("refDate", "asc");
//			List<AccountingTitle> alist = accountingTitleDao.getAll(filter);//filter by code
//			
			for (JournalDetail jd : jdList) {
				if(jhMap.get(jd.getCode())!=null){
					jhl = jhMap.get(jd.getCode());
					jhl.add(jd.getJournalHead());
				}else{
					jhl = new ArrayList<JournalHead>();
					jhl.add(jd.getJournalHead());
				}
				jhMap.put(jd.getCode(), jhl);
			}
		}
		jdMap = null;
		
		
		Map<AccountingTitle,List<JournalHead>> ajMap = new HashMap<AccountingTitle,List<JournalHead>>();
		for(Iterator<Entry<String, List<JournalHead>>> it = jhMap.entrySet().iterator();it.hasNext();){
			Entry<String, List<JournalHead>> entry = it.next();
			AccountingTitle act = accountingTitleDao.getByCode(entry.getKey());
			ajMap.put(act, entry.getValue());
		}*/

		//return ajMap;
		return null;
	}

	/**
	 * V2為總分類帳整合數據 :
	 * 		1.更具條件查出title
	 * 		2.查出title對應滿足條件的detail
	 * 		3.組合Map<Map<String, String>, List<AccountTitleJournal>>
	 * @see com.act.service.JournalHeadService#getAJList(java.lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public Map<Map<String, String>, List<AccountTitleJournal>> getAJList(
			String code, String sdt, String edt) {
		
		Map<Map<String,String>,List<AccountTitleJournal>> map 
			= new TreeMap<Map<String,String>,List<AccountTitleJournal>>(
				new Comparator<Map<String,String>>(){
					public int compare(Map<String,String> obj1,Map<String,String> obj2){
						return obj1.get("code").compareTo(obj2.get("code"));
					}
				}
		);
		
		List<AccountTitleJournal> atList = journalDetailDao.getAtList( code,  sdt,  edt);
		
		for (AccountTitleJournal at : atList) {
			List<AccountTitleJournal> al = journalDetailDao.getATJournalList(at.getCode(),  sdt,  edt);
			if(al.size()>0){
				Map<String,String> kmap = new HashMap<String,String>();
				kmap.put("code", at.getCode());
				kmap.put("name", at.getName());
				map.put(kmap, al);
			}
		}
		
		return map;
	}

	
	
	/**
	 * V1為總分類帳整合數據 :
	 * 		直接從detail中提取
	 * @param code
	 * @param sdt
	 * @param edt
	 * @return
	 */
	public Map<Map<String, String>, List<AccountTitleJournal>> getAJList1(
			String code, String sdt, String edt) {
		
		List<AccountTitleJournal> al = null;
		Map<Map<String,String>,List<AccountTitleJournal>> map = new HashMap<Map<String,String>,List<AccountTitleJournal>>();
		List<AccountTitleJournal> list = journalDetailDao.get4ajReport(code, sdt, edt);
		for (AccountTitleJournal act : list) {
			Map<String,String> kmap = new HashMap<String,String>();
			kmap.put("code", act.getCode());
			kmap.put("name", act.getName());
			if(map.get(kmap)!=null){
				al = map.get(kmap);
				al.add(act);
			}else{
				al = new ArrayList<AccountTitleJournal>();
				al.add(act);
			}
			map.put(kmap, al);//需要對al中的記錄按日期升序，編號升序
		}
		return map;
	}

	@Override
	public List<JournalDetail> listActTitleSum(String sdt, String edt) throws ParseException {
		return journalDetailDao.listActTitleSum(sdt, edt);
	}

	@Override
	public Map<String, List<JournalDetail>> listIncomeStatement(String sdt, String edt)
			throws ParseException {
		Map<String, List<JournalDetail>> map = new HashMap<String, List<JournalDetail>>();
		
		map.put("opRev", journalDetailDao.listIncomeStatementOpRev(sdt, edt));
		map.put("opCost", journalDetailDao.listIncomeStatementOpCost(sdt, edt));
		map.put("opExp", journalDetailDao.listIncomeStatementOpExp(sdt, edt));
		map.put("nonOpRev", journalDetailDao.listIncomeStatementNonOpRev(sdt, edt));
		map.put("nonOpExp", journalDetailDao.listIncomeStatementNonOpExp(sdt, edt));
		return map;
	}
	
	@Override
	public Map<String, List<JournalDetail>> listBalanceSheet(String sdt, String edt)
			throws ParseException {
		Map<String, List<JournalDetail>> map = new HashMap<String, List<JournalDetail>>();
		
		map.put("assets", journalDetailDao.listBalanceSheetAssets(sdt, edt));
		map.put("liabilities", journalDetailDao.listBalanceSheetLiabilities(sdt, edt));
		map.put("equity", journalDetailDao.listBalanceSheetEquity(sdt, edt));
		return map;
	}
}
