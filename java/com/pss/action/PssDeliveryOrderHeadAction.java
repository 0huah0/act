/*
 * Powered By [shi_zenghua@qq.com]
 */package com.pss.action;

import java.util.List;
import javax.annotation.Resource;
import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.web.action.BaseAction;
import flexjson.JSONSerializer;
import com.pss.model.PssDeliveryOrderHead;
import com.pss.service.PssDeliveryOrderHeadService;

public class PssDeliveryOrderHeadAction extends BaseAction {
	@Resource
	private PssDeliveryOrderHeadService pssDeliveryOrderHeadService;
	
	private PssDeliveryOrderHead pssDeliveryOrderHead;
	
	public void setPssDeliveryOrderHead(PssDeliveryOrderHead pssDeliveryOrderHead) {
		this.pssDeliveryOrderHead = pssDeliveryOrderHead;
	}
	
	public PssDeliveryOrderHead getPssDeliveryOrderHead() {
		return this.pssDeliveryOrderHead;
	}
	
	
	/**
	 * 記錄的新增和修改
	 */
	public String save() {
		boolean sus = true;
		try {
			pssDeliveryOrderHeadService.save(pssDeliveryOrderHead);
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
					filter.addFilter("Q_doHeadId_S_SIN", ids);
					List<PssDeliveryOrderHead> list = pssDeliveryOrderHeadService.getAll(filter);
					for (PssDeliveryOrderHead pssDeliveryOrderHead : list) {
							pssDeliveryOrderHeadService.remove(pssDeliveryOrderHead);
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
		filter.addFilter("Q_doHeadId_S_EQ", id);
		List<PssDeliveryOrderHead> list = pssDeliveryOrderHeadService.getAll(filter);
		PssDeliveryOrderHead pssDeliveryOrderHead = new PssDeliveryOrderHead();
		if(list.size() != 0){
			pssDeliveryOrderHead = list.get(0);
		}
 
		// 将数据转成JSON格式
		StringBuffer buff = new StringBuffer("{success:true,data:");
		JSONSerializer json = new JSONSerializer();
		buff.append(json.serialize(pssDeliveryOrderHead));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	
	/**
	 * 显示列表
	 */
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<PssDeliveryOrderHead> list = pssDeliveryOrderHeadService.getAll(filter);
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
