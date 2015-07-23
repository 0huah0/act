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
import com.pss.model.PssProductMaterialRel;
import com.pss.service.PssProductMaterialRelService;

public class PssProductMaterialRelAction extends BaseAction {
	@Resource
	private PssProductMaterialRelService pssProductMaterialRelService;
	
	private PssProductMaterialRel pssProductMaterialRel;
	
	public void setPssProductMaterialRel(PssProductMaterialRel pssProductMaterialRel) {
		this.pssProductMaterialRel = pssProductMaterialRel;
	}
	
	public PssProductMaterialRel getPssProductMaterialRel() {
		return this.pssProductMaterialRel;
	}
	
	
	/**
	 * 記錄的新增和修改
	 */
	public String save() {
		try {
			pssProductMaterialRelService.save(pssProductMaterialRel);
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
					pssProductMaterialRelService.remove(new Long(id));
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
		PssProductMaterialRel pssProductMaterialRel = pssProductMaterialRelService.get(new Long(id));

		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(pssProductMaterialRel));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}
	
	/**
	 * 显示列表
	 */
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<PssProductMaterialRel> list = pssProductMaterialRelService.getAll(filter);
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
