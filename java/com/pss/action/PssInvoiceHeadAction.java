/*
 * Powered By [shi_zenghua@qq.com]
 */package com.pss.action;

import java.util.List;
import javax.annotation.Resource;
import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.web.action.BaseAction;
import flexjson.JSONSerializer;
import com.pss.model.PssInvoiceHead;
import com.pss.service.PssInvoiceHeadService;

public class PssInvoiceHeadAction extends BaseAction {
	@Resource
	private PssInvoiceHeadService pssInvoiceHeadService;
	
	private PssInvoiceHead pssInvoiceHead;
	
	public void setPssInvoiceHead(PssInvoiceHead pssInvoiceHead) {
		this.pssInvoiceHead = pssInvoiceHead;
	}
	
	public PssInvoiceHead getPssInvoiceHead() {
		return this.pssInvoiceHead;
	}
	
	
	/**
	 * 記錄的新增和修改
	 */
	public String save() {
		boolean sus = true;
		try {
			pssInvoiceHeadService.save(pssInvoiceHead);
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
					filter.addFilter("Q_invoiceHeadId_S_SIN", ids);
					List<PssInvoiceHead> list = pssInvoiceHeadService.getAll(filter);
					for (PssInvoiceHead pssInvoiceHead : list) {
							pssInvoiceHeadService.remove(pssInvoiceHead);
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
		filter.addFilter("Q_invoiceHeadId_S_EQ", id);
		List<PssInvoiceHead> list = pssInvoiceHeadService.getAll(filter);
		PssInvoiceHead pssInvoiceHead = new PssInvoiceHead();
		if(list.size() != 0){
			pssInvoiceHead = list.get(0);
		}
 
		// 将数据转成JSON格式
		StringBuffer buff = new StringBuffer("{success:true,data:");
		JSONSerializer json = new JSONSerializer();
		buff.append(json.serialize(pssInvoiceHead));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	
	/**
	 * 显示列表
	 */
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<PssInvoiceHead> list = pssInvoiceHeadService.getAll(filter);
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
