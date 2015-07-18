package com.abcdef.frm.action.system;

import java.lang.reflect.Type;
import java.util.List;

import javax.annotation.Resource;

import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.web.action.BaseAction;
import com.abcdef.frm.model.system.FunUrl;
import com.abcdef.frm.service.system.FunUrlService;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class FunUrlAction extends BaseAction {
	@Resource
	private FunUrlService funUrlService;
	private FunUrl funUrl;

	private Long urlId;

	public Long getUrlId() {
		return urlId;
	}

	public void setUrlId(Long urlId) {
		this.urlId = urlId;
	}

	public FunUrl getFunUrl() {
		return funUrl;
	}

	public void setFunUrl(FunUrl funUrl) {
		this.funUrl = funUrl;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		List<FunUrl> list = funUrlService.getAll(filter);

		Type type = new TypeToken<List<FunUrl>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");

		Gson gson = new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");

		jsonString = buff.toString();

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
					// TODO 保存和移除
					funUrlService.remove(new Long(id));
				} catch (NumberFormatException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (Exception e) {
					// TODO Auto-generated catch block
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
		FunUrl funUrl = funUrlService.get(urlId);

		Gson gson = new Gson();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(funUrl));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		try {
			// TODO 保存和移除
			funUrlService.save(funUrl);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
