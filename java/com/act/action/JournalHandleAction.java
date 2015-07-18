/**
 * 
 */
package com.act.action;

import java.util.Date;

import javax.annotation.Resource;

import com.abcdef.core.util.ContextUtil;
import com.abcdef.core.web.action.BaseAction;
import com.act.model.JournalHead;
import com.act.service.JournalService;

/**
 *
 */
public class JournalHandleAction extends BaseAction {
	@Resource
	private JournalService journalService;

	private JournalHead journal;

	private String user = ContextUtil.getCurrentUser().getUsername();
	
	
	
	/**
	 * 過帳
	 * @return
	 */
	public String post(){
		Date sdt = journal.getCreateDate();
		Date edt = journal.getUpdateDate();
		String json="z=1";
		try {
			json = journalService.post(sdt,edt,user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		setJsonString("{success:true,"+json+"}");
		return SUCCESS;		
	}
	
	public String backup(){
		Date sdt = journal.getCreateDate();
		Date edt = journal.getUpdateDate();
		String json="z=1";
		try {
			json = journalService.backup(sdt,edt,user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		setJsonString("{success:true,"+json+"}");
		return SUCCESS;		
	}
	
	/**
	 * restore
	 * @return
	 */
	public String restore(){
		Date sdt = journal.getCreateDate();
		Date edt = journal.getUpdateDate();
		String json="z=1";
		try {
			json = journalService.restore(sdt,edt,user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		setJsonString("{success:true,"+json+"}");
		return SUCCESS;		
	}
	
	/**
	 * clear
	 * @return
	 */
	public String clear(){
		Date sdt = journal.getCreateDate();
		Date edt = journal.getUpdateDate();
		String json="z=1";
		try {
			json = journalService.clear(sdt,edt,user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		setJsonString("{success:true,"+json+"}");
		return SUCCESS;		
	}
	
	/**
	 * @return the journal
	 */
	public JournalHead getJournal() {
		return journal;
	}

	/**
	 * @param journal
	 *            the journal to set
	 */
	public void setJournal(JournalHead journal) {
		this.journal = journal;
	}

}
