/*
 * Powered By [shi_zenghua@qq.com]
 */package com.pss.action;

import java.util.List;
import javax.annotation.Resource;
import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.web.action.BaseAction;
import flexjson.JSONSerializer;
import com.pss.model.PssMatesReceiptHead;
import com.pss.service.PssMatesReceiptHeadService;

public class PssMatesReceiptHeadAction extends BaseAction {
	@Resource
	private PssMatesReceiptHeadService pssMatesReceiptHeadService;
	
	private PssMatesReceiptHead pssMatesReceiptHead;
	
	public void setPssMatesReceiptHead(PssMatesReceiptHead pssMatesReceiptHead) {
		this.pssMatesReceiptHead = pssMatesReceiptHead;
	}
	
	public PssMatesReceiptHead getPssMatesReceiptHead() {
		return this.pssMatesReceiptHead;
	}
	
	
	/**
	 * 記錄的新增和修改
	 */
	public String save() {
		boolean sus = true;
		try {
			pssMatesReceiptHeadService.save(pssMatesReceiptHead);
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
					filter.addFilter("Q_mrHeadId_S_SIN", ids);
					List<PssMatesReceiptHead> list = pssMatesReceiptHeadService.getAll(filter);
					for (PssMatesReceiptHead pssMatesReceiptHead : list) {
							pssMatesReceiptHeadService.remove(pssMatesReceiptHead);
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
		filter.addFilter("Q_mrHeadId_S_EQ", id);
		List<PssMatesReceiptHead> list = pssMatesReceiptHeadService.getAll(filter);
		PssMatesReceiptHead pssMatesReceiptHead = new PssMatesReceiptHead();
		if(list.size() != 0){
			pssMatesReceiptHead = list.get(0);
		}
 
		// 将数据转成JSON格式
		StringBuffer buff = new StringBuffer("{success:true,data:");
		JSONSerializer json = new JSONSerializer();
		buff.append(json.serialize(pssMatesReceiptHead));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	
	/**
	 * 显示列表
	 */
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<PssMatesReceiptHead> list = pssMatesReceiptHeadService.getAll(filter);
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
