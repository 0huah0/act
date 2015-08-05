/*
 * Powered By [shi_zenghua@qq.com]
 */package com.pss.action;

import java.util.List;
import javax.annotation.Resource;
import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.web.action.BaseAction;
import flexjson.JSONSerializer;
import com.pss.model.PssPurchaseOrderHead;
import com.pss.service.PssPurchaseOrderHeadService;

public class PssPurchaseOrderHeadAction extends BaseAction {
	@Resource
	private PssPurchaseOrderHeadService pssPurchaseOrderHeadService;
	
	private PssPurchaseOrderHead pssPurchaseOrderHead;
	
	public void setPssPurchaseOrderHead(PssPurchaseOrderHead pssPurchaseOrderHead) {
		this.pssPurchaseOrderHead = pssPurchaseOrderHead;
	}
	
	public PssPurchaseOrderHead getPssPurchaseOrderHead() {
		return this.pssPurchaseOrderHead;
	}
	
	
	/**
	 * 記錄的新增和修改
	 */
	public String save() {
		boolean sus = true;
		try {
			pssPurchaseOrderHead = pssPurchaseOrderHeadService.save(pssPurchaseOrderHead);
		} catch (Exception e) {
			sus = false;
			e.printStackTrace();
		}
		setJsonString("{success:"+sus+",data:'"+pssPurchaseOrderHead.getPoHeadId()+"'}");

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
					filter.addFilter("Q_poHeadId_S_SIN", ids);
					List<PssPurchaseOrderHead> list = pssPurchaseOrderHeadService.getAll(filter);
					for (PssPurchaseOrderHead pssPurchaseOrderHead : list) {
							pssPurchaseOrderHeadService.remove(pssPurchaseOrderHead);
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
		filter.addFilter("Q_poHeadId_S_EQ", id);
		List<PssPurchaseOrderHead> list = pssPurchaseOrderHeadService.getAll(filter);
		PssPurchaseOrderHead pssPurchaseOrderHead = new PssPurchaseOrderHead();
		if(list.size() != 0){
			pssPurchaseOrderHead = list.get(0);
		}
 
		// 将数据转成JSON格式
		StringBuffer buff = new StringBuffer("{success:true,data:");
		JSONSerializer json = new JSONSerializer();
		buff.append(json.serialize(pssPurchaseOrderHead));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	
	/**
	 * 显示列表
	 */
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<PssPurchaseOrderHead> list = pssPurchaseOrderHeadService.getAll(filter);
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
