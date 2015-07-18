package com.abcdef.frm.action.system;

import java.lang.reflect.Type;
import java.util.List;
import javax.annotation.Resource;
import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.exception.NotCompleteException;
import com.abcdef.core.exception.NotExistException;
import com.abcdef.core.web.action.BaseAction;
import com.abcdef.frm.model.system.AppFunction;
import com.abcdef.frm.service.system.AppFunctionService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

public class AppFunctionAction extends BaseAction {
	@Resource
	private AppFunctionService appFunctionService;
	private AppFunction appFunction;

	private Long functionId;

	public Long getFunctionId() {
		return functionId;
	}

	public void setFunctionId(Long functionId) {
		this.functionId = functionId;
	}

	public AppFunction getAppFunction() {
		return appFunction;
	}

	public void setAppFunction(AppFunction appFunction) {
		this.appFunction = appFunction;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		List<AppFunction> list = appFunctionService.getAll(filter);

		Type type = new TypeToken<List<AppFunction>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");

		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
				.create();
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
					appFunctionService.remove(new Long(id));
				} catch (NumberFormatException e) {
					e.printStackTrace();
				} catch (NotCompleteException e) {
					e.printStackTrace();
				} catch (NotExistException e) {
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
		AppFunction appFunction = appFunctionService.get(functionId);

		Gson gson = new Gson();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(appFunction));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		try {
			appFunctionService.save(appFunction);
		} catch (NotCompleteException e) {
			e.printStackTrace();
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
