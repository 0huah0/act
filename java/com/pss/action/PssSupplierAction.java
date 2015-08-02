/*
 * Powered By [shi_zenghua@qq.com]
 */package com.pss.action;

import java.util.List;
import javax.annotation.Resource;
import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.web.action.BaseAction;
import flexjson.JSONSerializer;
import com.pss.model.PssSupplier;
import com.pss.service.PssSupplierService;

public class PssSupplierAction extends BaseAction {
	@Resource
	private PssSupplierService pssSupplierService;
	
	private PssSupplier pssSupplier;
	
	public void setPssSupplier(PssSupplier pssSupplier) {
		this.pssSupplier = pssSupplier;
	}
	
	public PssSupplier getPssSupplier() {
		return this.pssSupplier;
	}
	
	
	/**
	 * 記錄的新增和修改
	 */
	public String save() {
		boolean sus = true;
		try {
			pssSupplierService.save(pssSupplier);
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
					filter.addFilter("Q_supplierId_S_SIN", ids);
					List<PssSupplier> list = pssSupplierService.getAll(filter);
					for (PssSupplier pssSupplier : list) {
							pssSupplierService.remove(pssSupplier);
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
		filter.addFilter("Q_supplierId_S_EQ", id);
		List<PssSupplier> list = pssSupplierService.getAll(filter);
		PssSupplier pssSupplier = new PssSupplier();
		if(list.size() != 0){
			pssSupplier = list.get(0);
		}
 
		// 将数据转成JSON格式
		StringBuffer buff = new StringBuffer("{success:true,data:");
		JSONSerializer json = new JSONSerializer();
		buff.append(json.serialize(pssSupplier));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	
	/**
	 * 显示列表
	 */
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<PssSupplier> list = pssSupplierService.getAll(filter);
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
