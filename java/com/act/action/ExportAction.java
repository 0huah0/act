/**
 * 
 */
package com.act.action;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.web.action.BaseAction;
import com.act.model.AccountingTitle;
import com.act.model.JournalDetail;
import com.act.model.JournalHead;
import com.act.service.AccountingTitleService;
import com.act.service.JournalHeadService;
import com.act.service.export.ExportActTitle;
import com.act.service.export.ExportActTitleJournal;
import com.act.service.export.ExportActTitleSum;
import com.act.service.export.ExportBalanceSheet;
import com.act.service.export.ExportCashFlow;
import com.act.service.export.ExportIncomeStatement;
import com.act.service.export.ExportJournal;

/**
 *
 */
public class ExportAction extends BaseAction {
	@Resource
	private JournalHeadService journalHeadService;
	@Resource
	private AccountingTitleService accountingTitleService;
	
	
	/**
	 * jh:Journal head
	 * 日記帳報表export
	 * （未删除&已过帐）
	 */
	public void jh() {
		QueryFilter filter = new QueryFilter(getRequest());
		//filter.addFilter("Q_isDelete_N_EQ", "0");
		filter.addFilter("Q_isPost_N_EQ", "1");
		filter.addSorted("refDate", "asc");
		filter.addSorted("refNo", "asc");
		filter.getPagingBean().setPageSize(Integer.MAX_VALUE);
		List<JournalHead> list = journalHeadService.getAll(filter);
		String sdt = getRequest().getParameter("Q_refDate_D_GE");
		String edt = getRequest().getParameter("Q_refDate_D_LE");
		String range = "資料期間："+("".equals(sdt) && "".equals(edt) ? "全部" : sdt+ "~" + edt);
		try {
			new ExportJournal().export(list,"日記帳報表",range);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
	}
	
	
	/**
	 * aj:account Journal
	 * 總分類帳 export  
	 * （未删除&已过帐）
	 */
	public void aj() {
		String code = getRequest().getParameter("code");
		String sdt = getRequest().getParameter("refDateGE");
		String edt = getRequest().getParameter("refDateLE");
		String fileName = "總分類帳報表";
		String range = "資料期間:"+("".equals(sdt) && "".equals(edt) ? "全部" : sdt+ "~" + edt);
		try {
			new ExportActTitleJournal().export(journalHeadService.getAJList(code, sdt, edt),fileName ,range);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
	}
	
	/**
	 * at:account title
	 * 會計科目資料
	 */
	public void at() {
		QueryFilter filter = new QueryFilter(getRequest());
		//filter.addFilter("Q_isDelete_N_EQ", "0");
		filter.addSorted("code","asc");
		filter.addSorted("id","asc");
		filter.getPagingBean().setPageSize(Integer.MAX_VALUE);
		
		List<AccountingTitle> list = accountingTitleService.getAll(filter);
		
		String s = getRequest().getParameter("Q_code_S_GE");
		String e = getRequest().getParameter("Q_code_S_LE");
		/*if(list.size()>0){
			s = list.get(0).getCode();
			e = list.get(list.size()-1).getCode();
		}*/
		String range = "科目代號："+("".equals(s) && "".equals(e)? "全部" : s + "~" + e);
		
		String fileName = "會計科目報表";
		try {
			new ExportActTitle().export(list, fileName, range);
		} catch (Exception ex) {
			logger.error(ex.getMessage());
		}
	}
	
	/**
	 * account detail Sum
	 * 試算表
	 */
	public void atSum() {
		String sdt = getRequest().getParameter("sdt");
		String edt = getRequest().getParameter("edt");
		List<JournalDetail> list;
		try {
			list = journalHeadService.listActTitleSum(sdt,edt);
		} catch (ParseException e1) {
			e1.printStackTrace();
			return;
		}
		
		String fileName = "試算表";
		String range = "資料期間:"+("".equals(sdt) && "".equals(edt) ? "全部" : sdt+ "~" + edt);
		try {
			new ExportActTitleSum().export(list, fileName,range);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
	}
	
	
	/**
	 *Income Statement
	 *損益表 - old
	 */
	@SuppressWarnings("unchecked")
	public void income(){
		String sdt = getRequest().getParameter("income_sdt");
		String edt = getRequest().getParameter("income_edt");
		List<JournalDetail> list;
		try {
			list = (List<JournalDetail>) journalHeadService.listIncomeStatement(sdt,edt);
		} catch (ParseException e1) {
			e1.printStackTrace();
			return;
		}
		
		String fileName = "損益表";
		String range = "資料期間:"+("".equals(sdt) && "".equals(edt) ? "全部" : sdt+ "~" + edt);
		try {
			new ExportActTitleSum().export(list, fileName,range);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
	}
	
	/**
	 *Income Statement
	 *損益表 - new
	 */
	public void incomeStatement(){
		String sdt = getRequest().getParameter("sdt");
		String edt = getRequest().getParameter("edt");
		Map<String, List<JournalDetail>> map;
		try {
			map = journalHeadService.listIncomeStatement(sdt,edt);
		} catch (ParseException e1) {
			e1.printStackTrace();
			return;
		}
		
		String fileName = "損益表";
		String range = "資料期間:"+("".equals(sdt) && "".equals(edt) ? "全部" : sdt+ "~" + edt);
		try {
			new ExportIncomeStatement().export(map, fileName,range);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
	}
	
	/**
	 *Balance Sheet
	 *資產負債表
	 */
	public void balanceSheet(){
		String sdt = getRequest().getParameter("sdt");
		String edt = getRequest().getParameter("edt");
		Map<String, List<JournalDetail>> map;
		try {
			map = journalHeadService.listBalanceSheet(sdt,edt);
		} catch (ParseException e1) {
			e1.printStackTrace();
			return;
		}
		
		String fileName = "資產負債表";
		String range = "資料期間:"+("".equals(sdt) && "".equals(edt) ? "全部" : sdt+ "~" + edt);
		try {
			new ExportBalanceSheet().export(map, fileName,range);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
	}
	
	/**
	 *Cash Flow
	 *現金流量表
	 */
	public void cashFlow(){
		String sdt = getRequest().getParameter("sdt");
		String edt = getRequest().getParameter("edt");
		Map<String, List<JournalDetail>> map;
		try {
			map = journalHeadService.listIncomeStatement(sdt,edt);
		} catch (ParseException e1) {
			e1.printStackTrace();
			return;
		}
		
		String fileName = "現金流量表";
		String range = "資料期間:"+("".equals(sdt) && "".equals(edt) ? "全部" : sdt + "~" + edt);
		try {
			new ExportCashFlow().export(map, fileName,range);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
	}
}
