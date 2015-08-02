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
import com.pss.model.PssMaterial;
import com.pss.service.PssMaterialService;

public class PssMaterialAction extends BaseAction {
	@Resource
	private PssMaterialService pssMaterialService;
	
	private PssMaterial pssMaterial;
	
	public void setPssMaterial(PssMaterial pssMaterial) {
		this.pssMaterial = pssMaterial;
	}
	
	public PssMaterial getPssMaterial() {
		return this.pssMaterial;
	}
	
	
	/**
	 * 記錄的新增和修改
	 */
	public String save() {
		boolean sus = true;
		try {
			pssMaterialService.save(pssMaterial);
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
					filter.addFilter("Q_materialId_S_SIN", ids);
					List<PssMaterial> list = pssMaterialService.getAll(filter);
					for (PssMaterial pssMaterial : list) {
							pssMaterialService.remove(pssMaterial);
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
		filter.addFilter("Q_materialId_S_EQ", id);
		List<PssMaterial> list = pssMaterialService.getAll(filter);
		PssMaterial pssMaterial = new PssMaterial();
		if(list.size() != 0){
			pssMaterial = list.get(0);
		}

		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(pssMaterial));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}
	
	/**
	 * 显示列表
	 */
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<PssMaterial> list = pssMaterialService.getAll(filter);
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
