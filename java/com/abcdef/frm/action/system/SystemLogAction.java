package com.abcdef.frm.action.system;

import java.lang.reflect.Type;
import java.util.List;

import javax.annotation.Resource;

import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.web.action.BaseAction;
import com.abcdef.frm.model.system.SystemLog;
import com.abcdef.frm.service.system.SystemLogService;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class SystemLogAction extends BaseAction {
	@Resource
	private SystemLogService systemLogService;
	private SystemLog systemLog;

	private Long logId;

	public Long getLogId() {
		return logId;
	}

	public void setLogId(Long logId) {
		this.logId = logId;
	}

	public SystemLog getSystemLog() {
		return systemLog;
	}

	public void setSystemLog(SystemLog systemLog) {
		this.systemLog = systemLog;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		List<SystemLog> list = systemLogService.getAll(filter);

		Type type = new TypeToken<List<SystemLog>>() {
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
					systemLogService.remove(new Long(id));
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
		SystemLog systemLog = systemLogService.get(logId);

		Gson gson = new Gson();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(systemLog));
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
			systemLogService.save(systemLog);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
