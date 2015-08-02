/*
 * Powered By [shi_zenghua@qq.com]
 */package com.pss.action;

import java.util.List;
import javax.annotation.Resource;
import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.web.action.BaseAction;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import flexjson.JSONSerializer;
import com.pss.model.PssDeliveryOrderDetail;
import com.pss.service.PssDeliveryOrderDetailService;

public class PssDeliveryOrderDetailAction extends BaseAction {
	@Resource
	private PssDeliveryOrderDetailService pssDeliveryOrderDetailService;
	
	private PssDeliveryOrderDetail pssDeliveryOrderDetail;
	
	public void setPssDeliveryOrderDetail(PssDeliveryOrderDetail pssDeliveryOrderDetail) {
		this.pssDeliveryOrderDetail = pssDeliveryOrderDetail;
	}
	
	public PssDeliveryOrderDetail getPssDeliveryOrderDetail() {
		return this.pssDeliveryOrderDetail;
	}
	
	
	/**
	 * 記錄的新增和修改
	 */
	public String save() {
		boolean sus = true;
		try {
			pssDeliveryOrderDetailService.save(pssDeliveryOrderDetail);
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
				String[] ids = getRequest().getParameterValues("ids");
				if (ids != null && ids.length > 0) {
					for (String id : ids) {
							pssDeliveryOrderDetailService.remove(new Long(id));
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
		
		PssDeliveryOrderDetail pssDeliveryOrderDetail = pssDeliveryOrderDetailService.get(new Long(id));

		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(pssDeliveryOrderDetail));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}
	
	/**
	 * 显示列表
	 */
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<PssDeliveryOrderDetail> list = pssDeliveryOrderDetailService.getAll(filter);
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
