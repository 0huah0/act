/*
 * Powered By [shi_zenghua@qq.com]
 */package com.pss.action;

import java.util.List;
import javax.annotation.Resource;
import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.web.action.BaseAction;
import flexjson.JSONSerializer;
import com.pss.model.PssMatesReceiptDetail;
import com.pss.service.PssMatesReceiptDetailService;

public class PssMatesReceiptDetailAction extends BaseAction {
	@Resource
	private PssMatesReceiptDetailService pssMatesReceiptDetailService;
	
	private PssMatesReceiptDetail pssMatesReceiptDetail;
	
	public void setPssMatesReceiptDetail(PssMatesReceiptDetail pssMatesReceiptDetail) {
		this.pssMatesReceiptDetail = pssMatesReceiptDetail;
	}
	
	public PssMatesReceiptDetail getPssMatesReceiptDetail() {
		return this.pssMatesReceiptDetail;
	}
	
	
	/**
	 * 記錄的新增和修改
	 */
	public String save() {
		boolean sus = true;
		try {
			pssMatesReceiptDetailService.save(pssMatesReceiptDetail);
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
							pssMatesReceiptDetailService.remove(new Long(id));
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
		
		PssMatesReceiptDetail pssMatesReceiptDetail = pssMatesReceiptDetailService.get(new Long(id));
 
		// 将数据转成JSON格式
		StringBuffer buff = new StringBuffer("{success:true,data:");
		JSONSerializer json = new JSONSerializer();
		buff.append(json.serialize(pssMatesReceiptDetail));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	
	/**
	 * 显示列表
	 */
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<PssMatesReceiptDetail> list = pssMatesReceiptDetailService.getAll(filter);
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
