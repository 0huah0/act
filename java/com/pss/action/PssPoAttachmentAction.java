/*
 * Powered By [shi_zenghua@qq.com]
 */
 package com.pss.action;

import java.util.List;
import javax.annotation.Resource;
import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.web.action.BaseAction;
import flexjson.JSONSerializer;
import com.pss.model.PssPoAttachment;
import com.pss.service.PssPoAttachmentService;

public class PssPoAttachmentAction extends BaseAction {
	@Resource
	private PssPoAttachmentService pssPoAttachmentService;
	
	private PssPoAttachment pssPoAttachment;
	
	public void setPssPoAttachment(PssPoAttachment pssPoAttachment) {
		this.pssPoAttachment = pssPoAttachment;
	}
	
	public PssPoAttachment getPssPoAttachment() {
		return this.pssPoAttachment;
	}
	
	
	/**
	 * 記錄的新增和修改
	 */
	public String save() {
		boolean sus = true;
		try {
			pssPoAttachmentService.save(pssPoAttachment);
		} catch (Exception e) {
			sus = false;
			e.printStackTrace();
		}
		setJsonString("{success:"+sus+"}");
		return SUCCESS;
	}
	
	/**
	 * 批量删除
	 * 
	 * @return
	 */
	public String multiDel() {
		boolean sus = true;
		try {
				String ids = getRequest().getParameter("ids");
				if (ids != null  && ids.length() > 0) {
					QueryFilter filter = new QueryFilter(getRequest());
					filter.addFilter("Q_poAttachId_S_SIN", ids);
					List<PssPoAttachment> list = pssPoAttachmentService.getAll(filter);
					for (PssPoAttachment pssPoAttachment : list) {
							pssPoAttachmentService.remove(pssPoAttachment);
					}
				}
				
		} catch (NumberFormatException e) {
			sus = false;
			e.printStackTrace();
		} catch (Exception e) {
			sus = false;
			e.printStackTrace();
		}
		setJsonString("{success:"+sus+"}");
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		String id = getRequest().getParameter("id");
		
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_poAttachId_S_EQ", id);
		List<PssPoAttachment> list = pssPoAttachmentService.getAll(filter);
		PssPoAttachment pssPoAttachment = new PssPoAttachment();
		if(list.size() != 0){
			pssPoAttachment = list.get(0);
		}
 
		// 将数据转成JSON格式
		StringBuffer buff = new StringBuffer("{success:true,data:");
		JSONSerializer json = new JSONSerializer();
		buff.append(json.serialize(pssPoAttachment));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	
	/**
	 * 显示列表
	 */
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<PssPoAttachment> list = pssPoAttachmentService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");
		JSONSerializer json = new JSONSerializer();
		buff.append(json.serialize(list));

		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	
}
