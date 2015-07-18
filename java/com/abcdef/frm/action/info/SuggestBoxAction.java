package com.abcdef.frm.action.info;

import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.util.ContextUtil;
import com.abcdef.core.web.action.BaseAction;
import com.abcdef.frm.model.info.SuggestBox;
import com.abcdef.frm.model.system.AppRole;
import com.abcdef.frm.model.system.AppUser;
import com.abcdef.frm.model.system.SysConfig;
import com.abcdef.frm.service.info.SuggestBoxService;
import com.abcdef.frm.service.system.AppRoleService;
import com.abcdef.frm.service.system.AppUserService;
import com.abcdef.frm.service.system.SysConfigService;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class SuggestBoxAction extends BaseAction {

	@Resource
	private SuggestBoxService suggestBoxService;
	@Resource
	private SysConfigService sysConfigService;
	@Resource
	private AppUserService appUserService;
	private SuggestBox suggestBox;

	@Resource
	private AppRoleService appRoleService;

	private Long boxId;

	public Long getBoxId() {
		return boxId;
	}

	public void setBoxId(Long boxId) {
		this.boxId = boxId;
	}

	public SuggestBox getSuggestBox() {
		return suggestBox;
	}

	public void setSuggestBox(SuggestBox suggestBox) {
		this.suggestBox = suggestBox;
	}

	public String mykk() throws ParseException {
		QueryFilter filter = new QueryFilter(getRequest());
		String subject = (String) getRequest().getParameter("Q_subject_S_LK");
		String sender = (String) getRequest().getParameter(
				"Q_senderFullname_S_LK");
		String dtF = (String) getRequest().getParameter("Q_createtime_D_GE");
		String dtE = (String) getRequest().getParameter("Q_createtime_D_LE");
		String cate = (String) getRequest().getParameter("Q_queryPwd_SN_EQ");

		// first load
		if (subject == null) {
			filter.addSorted("createtime", "desc");
		}
		subject = subject != null ? subject : "%";
		sender = sender != null ? sender : "%";
		cate = cate != null ? cate : "1";

		dtF = dtF != null ? dtF : "1900-1-1";
		dtE = dtE != null ? dtE : "3000-1-1";

		dtF = dtF.isEmpty() ? "1900-1-1" : dtF;
		dtE = dtE.isEmpty() ? "3000-1-1" : dtE;

		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat sm = new SimpleDateFormat("yyyy-MM-dd");
		Date d = sm.parse(dtE);
		calendar.setTime(d);
		calendar.add(Calendar.DATE, 1);

		dtE = sm.format(calendar.getTime());

		// 查看当前用户时候属于食堂管理员角色
		String restRoleID = "-99";

		SysConfig restRoleId = sysConfigService.findByKey("restaurantRoleID");
		AppRole restRole = appRoleService.get(new Long(restRoleId
				.getDataValue()));
		AppUser user = ContextUtil.getCurrentUser();
		if (null == user) {
			String currentUserID = (String) getRequest().getParameter(
					"CurrentUserID");
			if (null != currentUserID && !"".equals(currentUserID)) {
				Long userId = Long.parseLong(currentUserID);
				user = appUserService.get(userId);
			}
		}
		Set<AppRole> roles = user.getRoles();

		for (AppRole role : roles) {
			if (role.getRoleId().intValue() == restRole.getRoleId().intValue()) {
				logger.debug("GGG: 当前用户具有食堂管理员角色:"
						+ restRole.getRoleId().toString());
				restRoleID = restRole.getRoleId().toString();
				break;
			}
		}

		Object[] parma = { subject, sender, dtF, dtE, user.getUserId(), cate,
				restRoleID };

		List<SuggestBox> list = null;

		if (cate.equals("1")) {
			list = suggestBoxService.getAll(parma, filter);
		} else {
			list = suggestBoxService.listResAll(parma, filter);
		}

		Type type = new TypeToken<List<SuggestBox>>() {
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
	 * 显示列表
	 */
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<SuggestBox> list = suggestBoxService.getAll(filter);

		Type type = new TypeToken<List<SuggestBox>>() {
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
					suggestBoxService.remove(new Long(id));
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
		AppUser user = ContextUtil.getCurrentUser();
		SuggestBox suggestBox = suggestBoxService.get(boxId);

		Gson gson = new Gson();
		// 将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(suggestBox));
		sb.append("}");
		setJsonString(sb.toString());

		return SUCCESS;
	}

	/**
	 * 添加及保存操作
	 */

	public String save() {
		// 意见箱创建日期
		suggestBox.setCreatetime(new Date());
		// 意见发表人IP
		suggestBox.setSenderIp(getRequest().getRemoteAddr());
		// 取得意见箱配置的接收人ID
		SysConfig suggestId = sysConfigService.findByKey("suggestId");
		AppUser suggestManager = appUserService.get(new Long(suggestId
				.getDataValue()));

		if (suggestManager != null) {
			suggestBox.setRecFullname(suggestManager.getEmployee()
					.getFullname());
			suggestBox.setRecUid(suggestManager.getUserId());
		}

		try {
			// TODO 保存和移除
			suggestBoxService.save(suggestBox);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}

	/**
	 * 意见回复
	 * 
	 * @return
	 */
	public String reply() {
		SuggestBox orgSuggest = suggestBoxService.get(suggestBox.getBoxId());
		AppUser curUser = ContextUtil.getCurrentUser();
		orgSuggest.setReplyId(curUser.getUserId());
		orgSuggest.setIsOpen(suggestBox.getIsOpen());
		orgSuggest.setReplyFullname(curUser.getEmployee().getFullname());
		orgSuggest.setReplyTime(new Date());
		orgSuggest.setStatus(SuggestBox.STATUS_AUDIT);
		orgSuggest.setReplyContent(suggestBox.getReplyContent());
		try {
			// TODO 保存和移除
			suggestBoxService.save(orgSuggest);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}

	/**
	 * 密码访问
	 */
	public String match() {
		SuggestBox orgSuggest = suggestBoxService.get(suggestBox.getBoxId());
		if (orgSuggest.getQueryPwd().equals(suggestBox.getQueryPwd())) {
			setJsonString("{success:true}");
		} else {
			setJsonString("{failure:true}");
		}
		return SUCCESS;
	}
}
