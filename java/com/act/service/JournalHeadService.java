/**
 * 
 */
package com.act.service;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.abcdef.core.service.BaseService;
import com.act.model.AccountTitleJournal;
import com.act.model.AccountingTitle;
import com.act.model.JournalDetail;
import com.act.model.JournalHead;

/**
 * 
 */
public interface JournalHeadService extends BaseService<JournalHead>{

	/**
	 * @param journal
	 * @return
	 * @throws Exception 
	 */
	boolean saveJournal(JournalHead journal,String detailStr) throws Exception;

	/**
	 * @param sdt
	 * @param edt
	 * @return
	 * @throws Exception 
	 */
	String post(Date sdt, Date edt,String user) throws Exception;

	/**
	 * @param filter
	 * @return
	 */
	Map<AccountingTitle, List<JournalHead>> getActTitleJournalList(String codeGE,String codeLE,String refDateGE,String refDateLE);

	/**
	 * 為總分類帳整合數據
	 * @param codeGE 
	 * @param codeLE
	 * @param refDateGE
	 * @param refDateLE
	 * @return
	 */
	Map<Map<String, String>, List<AccountTitleJournal>> getAJList(
			String codeGE, String codeLE, String refDateGE, String refDateLE);

	/**
	 * 為總分類帳整合數據
	 * @param code
	 * @param refDateGE
	 * @param refDateLE
	 * @return
	 */
	Map<Map<String, String>, List<AccountTitleJournal>> getAJList(
			String code, String refDateGE, String refDateLE);

	/**
	 * 試算表
	 * @param sdt
	 * @param edt
	 * @return
	 * @throws ParseException 
	 */
	List<JournalDetail> listActTitleSum(String sdt, String edt) throws ParseException;
	
	/**
	 * Income Statement
	 * @param sdt
	 * @param edt
	 * @return
	 * @throws ParseException 
	 */
	Map<String, List<JournalDetail>> listIncomeStatement(String sdt, String edt) throws ParseException;
	
	/**
	 * Balance Sheet 
	 * @param sdt
	 * @param edt
	 * @return
	 * @throws ParseException 
	 */
	Map<String, List<JournalDetail>> listBalanceSheet(String sdt, String edt) throws ParseException;
}
