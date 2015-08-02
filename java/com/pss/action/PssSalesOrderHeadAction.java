/*
 * Powered By [shi_zenghua@qq.com]
 */package com.pss.action;

import java.util.List;
import javax.annotation.Resource;
import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.web.action.BaseAction;
import flexjson.JSONSerializer;
import com.pss.model.PssSalesOrderHead;
import com.pss.service.PssSalesOrderHeadService;

public class PssSalesOrderHeadAction extends BaseAction {
	@Resource
	private PssSalesOrderHeadService pssSalesOrderHeadService;
	
	private PssSalesOrderHead pssSalesOrderHead;
	
	public void setPssSalesOrderHead(PssSalesOrderHead pssSalesOrderHead) {
		this.pssSalesOrderHead = pssSalesOrderHead;
	}
	
	public PssSalesOrderHead getPssSalesOrderHead() {
		return this.pssSalesOrderHead;
	}
	
	
	/**
	 * 記錄的新增和修改
	 */
	public String save() {
		boolean sus = true;
		try {
			pssSalesOrderHeadService.save(pssSalesOrderHead);
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
					filter.addFilter("Q_soHeadId_S_SIN", ids);
					List<PssSalesOrderHead> list = pssSalesOrderHeadService.getAll(filter);
					for (PssSalesOrderHead pssSalesOrderHead : list) {
							pssSalesOrderHeadService.remove(pssSalesOrderHead);
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
		filter.addFilter("Q_soHeadId_S_EQ", id);
		List<PssSalesOrderHead> list = pssSalesOrderHeadService.getAll(filter);
		PssSalesOrderHead pssSalesOrderHead = new PssSalesOrderHead();
		if(list.size() != 0){
			pssSalesOrderHead = list.get(0);
		}
 
		// 将数据转成JSON格式
		StringBuffer buff = new StringBuffer("{success:true,data:");
		JSONSerializer json = new JSONSerializer();
		buff.append(json.serialize(pssSalesOrderHead));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	
	/**
	 * 显示列表
	 */
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<PssSalesOrderHead> list = pssSalesOrderHeadService.getAll(filter);
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
