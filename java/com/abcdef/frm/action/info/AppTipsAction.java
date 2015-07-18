package com.abcdef.frm.action.info;

import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;
import org.apache.commons.lang.StringUtils;
import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.util.ContextUtil;
import com.abcdef.core.web.action.BaseAction;
import com.abcdef.frm.model.info.AppTips;
import com.abcdef.frm.service.info.AppTipsService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

public class AppTipsAction extends BaseAction {
	@Resource
	private AppTipsService appTipsService;
	private AppTips appTips;

	private Long tipsId;

	public Long getTipsId() {
		return tipsId;
	}

	public void setTipsId(Long tipsId) {
		this.tipsId = tipsId;
	}

	public AppTips getAppTips() {
		return appTips;
	}

	public void setAppTips(AppTips appTips) {
		this.appTips = appTips;
	}

	/**
	 * 显示列表
	 */
	public String list() {

		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_appUser.userId_L_EQ", ContextUtil
				.getCurrentUserId().toString());
		List<AppTips> list = appTipsService.getAll(filter);

		Type type = new TypeToken<List<AppTips>>() {
		}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
				.append(filter.getPagingBean().getTotalItems()).append(
						",result:");

		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation()
				.setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		buff.append(gson.toJson(list, type));
		buff.append("}");

		jsonString = buff.toString();

		return SUCCESS;
	}

	/**
	 * 批量删除
	 * 
	 * @return
	 * @throws Exception
	 */
	public String multiDel() {
		if (getRequest().getParameter("ids").equals("all")) {
			QueryFilter filter = new QueryFilter(getRequest());
			filter.addFilter("Q_appUser.userId_L_EQ", ContextUtil
					.getCurrentUserId().toString());
			List<AppTips> list = appTipsService.getAll(filter);
			for (AppTips tips : list) {
				try {
					// TODO 保存和移除
					appTipsService.remove(tips.getTipsId());
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		} else {
			String[] ids = getRequest().getParameterValues("ids");
			if (ids != null) {
				for (String id : ids) {
					try {
						// TODO 保存和移除
						appTipsService.remove(new Long(id));
					} catch (NumberFormatException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
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
		AppTips appTips = appTipsService.get(tipsId);

		Gson gson = new Gson();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(appTips));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */
	public String save() {
		String data = getRequest().getParameter("data");
		if (StringUtils.isNotEmpty(data)) {
			Gson gson = new Gson();
			AppTips[] tips = gson.fromJson(data, AppTips[].class);
			for (AppTips tip : tips) {
				if (tip.getTipsId() == -1) {
					tip.setTipsId(null);
					SimpleDateFormat date = new SimpleDateFormat(
							"yyMMddHHmmssSSS");
					String customerNo = date.format(new Date());
					tip.setTipsName("tips" + customerNo);
					tip.setCreateTime(new Date());
				}
				tip.setAppUser(ContextUtil.getCurrentUser());
				try {
					// TODO 保存和移除
					appTipsService.save(tip);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}

}
