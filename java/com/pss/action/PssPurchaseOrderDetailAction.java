/*
 * Powered By [shi_zenghua@qq.com]
 */

package com.pss.action;

import java.util.List;
import javax.annotation.Resource;
import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.web.action.BaseAction;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import flexjson.JSONSerializer;
import com.pss.model.PssPurchaseOrderDetail;
import com.pss.service.PssPurchaseOrderDetailService;

public class PssPurchaseOrderDetailAction extends BaseAction {
	@Resource
	private PssPurchaseOrderDetailService pssPurchaseOrderDetailService;
	
	private PssPurchaseOrderDetail pssPurchaseOrderDetail;
	
	public void setPssPurchaseOrderDetail(PssPurchaseOrderDetail pssPurchaseOrderDetail) {
		this.pssPurchaseOrderDetail = pssPurchaseOrderDetail;
	}
	
	public PssPurchaseOrderDetail getPssPurchaseOrderDetail() {
		return this.pssPurchaseOrderDetail;
	}
	
	
	/**
	 * 記錄的新增和修改
	 */
	public String save() {
		try {
			pssPurchaseOrderDetailService.save(pssPurchaseOrderDetail);
		} catch (Exception e) {
			e.printStackTrace();
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	/**
	 * 批量删除
	 * 
	 * @return
	 */
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				try {
					pssPurchaseOrderDetailService.remove(new Long(id));
				} catch (NumberFormatException e) {
					e.printStackTrace();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}

		jsonString = "{success:true}";
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * 
	 * @return
	 */
	public String get() {
		String id = getRequest().getParameter("id");
		PssPurchaseOrderDetail pssPurchaseOrderDetail = pssPurchaseOrderDetailService.get(new Long(id));

		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(pssPurchaseOrderDetail));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}
	
	/**
	 * 显示列表
	 */
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<PssPurchaseOrderDetail> list = pssPurchaseOrderDetailService.getAll(filter);
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