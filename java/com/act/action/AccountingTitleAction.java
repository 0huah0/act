/**
 * 
 */
package com.act.action;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.util.BeanUtil;
import com.abcdef.core.util.ContextUtil;
import com.abcdef.core.web.action.BaseAction;
import com.act.model.AccountingTitle;
import com.act.service.AccountingTitleService;

import flexjson.JSONSerializer;
import flexjson.transformer.DateTransformer;

/**
 *
 */
public class AccountingTitleAction extends BaseAction {
	@Resource
	private AccountingTitleService accountingTitleService;
	
	private AccountingTitle actTitle;
	
	private long recId;
	
	public long getRecId() {
		return recId;
	}

	public void setRecId(long recId) {
		this.recId = recId;
	}

	public AccountingTitle getActTitle() {
		return actTitle;
	}

	public void setActTitle(AccountingTitle actTitle) {
		this.actTitle = actTitle;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_isDelete_N_EQ", "0");
		List<AccountingTitle> list = accountingTitleService.getAll(filter);

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		JSONSerializer serializer = new JSONSerializer()
			.transform(new DateTransformer("yyyy-MM-dd"),new String[] {"createDate","updateDate"})
			.exclude(new String[] { "class","parent" });
		
		buff.append(serializer.serialize(list)).append("}");

		jsonString = buff.toString();
		return SUCCESS;
	}
	
	/**
	 * 批量刪除（實體刪除）
	 * @return
	 * Lasted Editor：Donald Su
	 */
	public String multiDel()
	{
		boolean success  = true;
		String[] ids = getRequest().getParameterValues("ids");
		
		if (ids != null)
		{
			for (String id : ids)
			{
				// 判斷該科目是否已經被日記帳使用（暫時利用資料庫的外鍵約束）
				
				try
				{
					accountingTitleService.remove(new Long(id));
				}
				catch (NumberFormatException e)
				{
					logger.error(e.getLocalizedMessage());
				}
				catch (Exception e)
				{
					success  = false;
					logger.error(e.getLocalizedMessage());
				}
			}
		}

		jsonString = "{success:"+success+"}";

		return SUCCESS;
	}

	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		actTitle = accountingTitleService.get(recId);

		JSONSerializer json = new JSONSerializer();
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(json.exclude(new String[] { "class","parent"}).serialize(actTitle));
		sb.append("}");
		setJsonString(sb.toString());


		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		boolean success  = true;
		String un = ContextUtil.getCurrentUser().getUsername();
		Date date = new Date();
		try {
			if (actTitle.getId() == null) {
				actTitle.setIsBasic(0);
				actTitle.setIsDelete(0);
				actTitle.setCreateBy(un);
				actTitle.setCreateDate(date);

				if(actTitle.getParent() != null){
					AccountingTitle parent = accountingTitleService.get(actTitle.getParent().getId());
					actTitle.setParent(parent);
					actTitle.setLr(parent.getLr());
					actTitle.setLevel(parent.getLevel()+1);
				}else{
					actTitle.setLevel(1);
				}
			} else {
				AccountingTitle orgactTitle = accountingTitleService
						.get(actTitle.getId());
				BeanUtil.copyNotNullProperties(orgactTitle, actTitle);
				actTitle = orgactTitle;
			}
			
			actTitle.setUpdateBy(un);
			actTitle.setUpdateDate(date);
			accountingTitleService.save(actTitle);
		} catch (Exception ex) {
			success  = false;
			logger.error(ex.getMessage());
		}		
		
		setJsonString("{success:"+success+"}");
		return SUCCESS;
	}

	public String load() {
		// Map conf = accountingTitleService.load();
		// JSONSerializer json = JsonUtil.getJSONSerializer("");
		// setJsonString("{success:true,data:" + json.serialize(conf) + "}");
		return SUCCESS;
	}

	public String tree() {
		StringBuffer buff = new StringBuffer("[");
		QueryFilter filter = new QueryFilter(0,Integer.MAX_VALUE);
		filter.addFilter("Q_isDelete_N_EQ", "0");
		filter.addFilter("Q_level_N_EQ", "1");
		List<AccountingTitle> listParent = accountingTitleService.getAll(filter);
		//List<AccountingTitle> listParent = accountingTitleService.findByParentId(parentId);

		if(listParent.size()>0){
			for (AccountingTitle dep : listParent) {
				buff.append("{id:'" + dep.getId() + "',text:'"+ dep.getCode()+"-"+dep.getName() + "',code:'"+ dep.getCode() + "',name:'"+ dep.getName() + "',");
				buff.append(findAllChild(dep.getId()));
			}
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		
		if(getRequest().getParameter("Q_")==null){
			setJsonString(buff.toString());
		}else{
			setJsonString("[{id:null,code:'',expanded:true,text:'---全部---',children:"+buff.toString()+"}]");
		}
		
		
		return SUCCESS;
	}
	
	private String findAllChild(Long parentId) {
		StringBuffer buff1 = new StringBuffer("");
		QueryFilter filter = new QueryFilter(0,Integer.MAX_VALUE);
		filter.addFilter("Q_isDelete_N_EQ", "0");
		filter.addFilter("Q_parent.id_L_EQ", ""+parentId);
		
		List<AccountingTitle> list = accountingTitleService.getAll(filter);
		if (list.size() == 0) {
			buff1.append("leaf:true},");
			return buff1.toString();
		} else {
			buff1.append("expanded:true,children:[");
			for (AccountingTitle dep2 : list) {
				buff1.append("{id:'" + dep2.getId() + "',text:'"
						+ dep2.getCode()+"-"+dep2.getName() + "',code:'"+ dep2.getCode() + "',name:'"+ dep2.getName() + "',");
				buff1.append(findAllChild(dep2.getId()));
			}
			buff1.deleteCharAt(buff1.length() - 1);
			buff1.append("]},");
			return buff1.toString();
		}
	}
}
