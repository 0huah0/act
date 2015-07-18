/**
 * 
 */
package com.act.action;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.util.ContextUtil;
import com.abcdef.core.web.action.BaseAction;
import com.act.model.JournalHead;
import com.act.service.JournalHeadService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

public class JournalHeadAction extends BaseAction {
	@Resource
	private JournalHeadService journalHeadService;

	private JournalHead journal;

	private String detailStr;

	private long recId;

	public long getRecId() {
		return recId;
	}

	public void setRecId(long recId) {
		this.recId = recId;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		List<JournalHead> list = journalHeadService.getAll(filter);

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"), "refDate");
		buff.append(
				serializer.exclude(new String[] { "class" }).serialize(list))
				.append("}");

		jsonString = buff.toString();
		return SUCCESS;
	}

	/**
	 * 批量删除
	 * 
	 * @return
	 */
	public String multiDel() {
		boolean success = true;
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				try {
					journalHeadService.remove(new Long(id));
				} catch (NumberFormatException e) {
					logger.error(e.getLocalizedMessage());
				} catch (Exception e) {
					success = false;
					logger.error(e.getLocalizedMessage());
				}
			}
		}

		jsonString = "{success:" + success + "}";
		return SUCCESS;
	}

	/**
	 * soft删除
	 * @return
	 */
	public String softDel() {
		boolean success = true;
		
		if(journal.getId()!=null){
			journal = journalHeadService.get(journal.getId());
			journal.setIsDelete(1);
			try {
				journalHeadService.save(journal);
			} catch (Exception e) {
				success = false;
				e.printStackTrace();
			}			
		}
		
		jsonString = "{success:" + success + "}";

		return SUCCESS;
	}
	
	/**
	 * 硬刪除（實體刪除）
	 * @return
	 * Lasted Editor：Donald Su
	 */
	public String hardDel()
	{
		boolean success = true;
		
		// 判断该日记帐的传票日期是否已经有结帐记录
		
		try
		{
			journalHeadService.remove(journal.getId());
		}
		catch (NumberFormatException e)
		{
			logger.error(e.getLocalizedMessage());
		}
		catch (Exception e)
		{
			success = false;
			logger.error(e.getLocalizedMessage());
		}
		
		jsonString = "{success:" + success + "}";

		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		journal = journalHeadService.get(recId);

		JSONSerializer serializer = new JSONSerializer();
		StringBuffer sb = new StringBuffer("{success:true,data:");
		serializer.transform(new DateTransformer("yyyy-MM-dd"), "refDate");
		sb.append(serializer
				.exclude(new String[] {"class","createDate","createBy","updateDate","updateBy"})
				.include("details")
				.serialize(journal)).append("}");
		
		setJsonString(sb.toString());
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save() {
		boolean success = true;
		
		try {
			success = journalHeadService.saveJournal(journal,detailStr); //save
		} catch (Exception e) {
			success = false;
			logger.error(e.getMessage());
		}
		
		if(success){
			setJsonString("{success:true}");
		}else{
			setJsonString("{success:false,msg:'數據異常導致保存失敗'}");
		}
		
		return SUCCESS;
	}


	/**
	 * 過帳
	 * @return
	 */
	public String post(){
		Date sdt = journal.getCreateDate();
		Date edt = journal.getUpdateDate();
		String user = ContextUtil.getCurrentUser().getUsername();
		String json="z=1";
		try {
			json = journalHeadService.post(sdt,edt,user);
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

	/**
	 * @return the detailStr
	 */
	public String getDetailStr() {
		return detailStr;
	}

	/**
	 * @param detailStr
	 *            the detailStr to set
	 */
	public void setDetailStr(String detailStr) {
		this.detailStr = detailStr;
	}

}
