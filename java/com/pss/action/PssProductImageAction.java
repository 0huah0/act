/*
 * Powered By [shi_zenghua@qq.com]
 */
 package com.pss.action;

import java.util.List;
import javax.annotation.Resource;
import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.web.action.BaseAction;
import flexjson.JSONSerializer;
import com.pss.model.PssProductImage;
import com.pss.service.PssProductImageService;

public class PssProductImageAction extends BaseAction {
	@Resource
	private PssProductImageService pssProductImageService;
	
	private PssProductImage pssProductImage;
	
	public void setPssProductImage(PssProductImage pssProductImage) {
		this.pssProductImage = pssProductImage;
	}
	
	public PssProductImage getPssProductImage() {
		return this.pssProductImage;
	}
	
	
	/**
	 * 記錄的新增和修改
	 */
	public String save() {
		boolean sus = true;
		try {
			pssProductImageService.save(pssProductImage);
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
					filter.addFilter("Q_pdtImgId_S_SIN", ids);
					List<PssProductImage> list = pssProductImageService.getAll(filter);
					for (PssProductImage pssProductImage : list) {
							pssProductImageService.remove(pssProductImage);
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
		filter.addFilter("Q_pdtImgId_S_EQ", id);
		List<PssProductImage> list = pssProductImageService.getAll(filter);
		PssProductImage pssProductImage = new PssProductImage();
		if(list.size() != 0){
			pssProductImage = list.get(0);
		}
 
		// 将数据转成JSON格式
		StringBuffer buff = new StringBuffer("{success:true,data:");
		JSONSerializer json = new JSONSerializer();
		buff.append(json.serialize(pssProductImage));
		buff.append("}");
		jsonString = buff.toString();
		return SUCCESS;
	}
	
	/**
	 * 显示列表
	 */
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<PssProductImage> list = pssProductImageService.getAll(filter);
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
