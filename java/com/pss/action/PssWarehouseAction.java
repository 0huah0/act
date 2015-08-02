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
import com.pss.model.PssWarehouse;
import com.pss.service.PssWarehouseService;

public class PssWarehouseAction extends BaseAction {
	@Resource
	private PssWarehouseService pssWarehouseService;
	
	private PssWarehouse pssWarehouse;
	
	public void setPssWarehouse(PssWarehouse pssWarehouse) {
		this.pssWarehouse = pssWarehouse;
	}
	
	public PssWarehouse getPssWarehouse() {
		return this.pssWarehouse;
	}
	
	
	/**
	 * 記錄的新增和修改
	 */
	public String save() {
		boolean sus = true;
		try {
			pssWarehouseService.save(pssWarehouse);
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
					filter.addFilter("Q_warehouseId_S_SIN", ids);
					List<PssWarehouse> list = pssWarehouseService.getAll(filter);
					for (PssWarehouse pssWarehouse : list) {
							pssWarehouseService.remove(pssWarehouse);
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
		filter.addFilter("Q_warehouseId_S_EQ", id);
		List<PssWarehouse> list = pssWarehouseService.getAll(filter);
		PssWarehouse pssWarehouse = new PssWarehouse();
		if(list.size() != 0){
			pssWarehouse = list.get(0);
		}

		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(pssWarehouse));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}
	
	/**
	 * 显示列表
	 */
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<PssWarehouse> list = pssWarehouseService.getAll(filter);
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
