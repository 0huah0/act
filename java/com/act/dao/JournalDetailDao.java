/**
 * 
 */
package com.act.dao;

import java.text.ParseException;
import java.util.List;

import com.abcdef.core.dao.BaseDao;
import com.act.model.AccountTitleJournal;
import com.act.model.JournalDetail;

/**
 * 
 */
public interface JournalDetailDao extends BaseDao<JournalDetail>{

	/**
	 * @param codeS
	 * @param codeE
	 * @param dateS
	 * @param dateE
	 * @return
	 */
	List<AccountTitleJournal> get4ajReport(String codeS, String codeE,
			String dateS, String dateE);

	/**
	 * @param code
	 * @param refDateGE
	 * @param refDateLE
	 * @return
	 */
	List<AccountTitleJournal> get4ajReport(String code, String refDateGE,
			String refDateLE);
	
	/**
	 * @param refNo
	 * @return
	 */
	List<JournalDetail> listByRefNo(String refNo);
	
	/**
	 * list ActTitleSum<br>
	 * for試算表  <i>計算一段時間內各科目的借貸的匯總</i>
	 * @param sdt
	 * @param sdt
	 * @return
	 * @throws ParseException 
	 */
	List<JournalDetail> listActTitleSum(String sdt,String edt) throws ParseException;

	/**
	 * @param code
	 * @param sdt
	 * @param edt
	 * @return
	 */
	List<AccountTitleJournal> getAtList(String code, String sdt, String edt);

	/**
	 * @param code
	 * @param sdt
	 * @param edt
	 * @return
	 */
	List<AccountTitleJournal> getATJournalList(String code, String sdt,
			String edt);

	/**
	 * list Income Statement Operating Revenue<br>
	 * for 損益表  <i>計算一段時間內"營業收入"相關科目的借貸匯總</i>
	 * @param sdt
	 * @param sdt
	 * @return
	 * @throws ParseException 
	 */
	List<JournalDetail> listIncomeStatementOpRev(String sdt,String edt) throws ParseException;
	
	/**
	 * list Income Statement Operating Revenue<br>
	 * for 損益表  <i>計算一段時間內"營業成本"相關科目的借貸匯總</i>
	 * @param sdt
	 * @param sdt
	 * @return
	 * @throws ParseException 
	 */
	List<JournalDetail> listIncomeStatementOpCost(String sdt,String edt) throws ParseException;
	
	/**
	 * list Income Statement Operating Revenue<br>
	 * for 損益表  <i>計算一段時間內"營業費用"相關科目的借貸匯總</i>
	 * @param sdt
	 * @param sdt
	 * @return
	 * @throws ParseException 
	 */
	List<JournalDetail> listIncomeStatementOpExp(String sdt,String edt) throws ParseException;
	
	/**
	 * list Income Statement Operating Revenue<br>
	 * for 損益表  <i>計算一段時間內"非營業收益"相關科目的借貸匯總</i>
	 * @param sdt
	 * @param sdt
	 * @return
	 * @throws ParseException 
	 */
	List<JournalDetail> listIncomeStatementNonOpRev(String sdt,String edt) throws ParseException;
	
	/**
	 * list Income Statement Operating Revenue<br>
	 * for 損益表  <i>計算一段時間內"非營業損失"相關科目的借貸匯總</i>
	 * @param sdt
	 * @param sdt
	 * @return
	 * @throws ParseException 
	 */
	List<JournalDetail> listIncomeStatementNonOpExp(String sdt,String edt) throws ParseException;
	
	/**
	 * list Balance Sheet - Assets<br>
	 * for 資產負債表  <i>計算一段時間內"資產"相關科目的借貸匯總</i>
	 * @param sdt
	 * @param sdt
	 * @return
	 * @throws ParseException 
	 */
	List<JournalDetail> listBalanceSheetAssets(String sdt,String edt) throws ParseException;
	
	/**
	 * list Balance Sheet - Liabilities<br>
	 * for 資產負債表  <i>計算一段時間內"負債"相關科目的借貸匯總</i>
	 * @param sdt
	 * @param sdt
	 * @return
	 * @throws ParseException 
	 */
	List<JournalDetail> listBalanceSheetLiabilities(String sdt,String edt) throws ParseException;
	
	/**
	 * list Balance Sheet - Equity<br>
	 * for 資產負債表  <i>計算一段時間內"業主權益"相關科目的借貸匯總</i>
	 * @param sdt
	 * @param sdt
	 * @return
	 * @throws ParseException 
	 */
	List<JournalDetail> listBalanceSheetEquity(String sdt,String edt) throws ParseException;
	
}
