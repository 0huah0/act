package com.abcdef.frm.action.system;

import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import com.abcdef.core.Constants;
import com.abcdef.core.util.AppUtil;
import com.abcdef.core.web.action.BaseAction;
import com.abcdef.frm.model.system.Company;
import com.abcdef.frm.service.system.CompanyService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class CompanyAction extends BaseAction {

	private Company company;

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	@Resource
	private CompanyService companyService;

	public String check() {
		List<Company> list = companyService.findCompany();
		if (list.size() > 0) {
			setJsonString("{success:true}");
		} else {
			setJsonString("{success:false}");
		}
		return SUCCESS;
	}

	public String list() {
		List<Company> list = companyService.findCompany();
		if (list.size() > 0) {
			company = list.get(0);
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			StringBuffer cf = new StringBuffer("{success:true,result:[");
			cf.append(gson.toJson(company));
			cf.append("]}");
			setJsonString(cf.toString());
		} else {
			setJsonString("{success:false,message:'还没有填写公司信息'}");
			return SUCCESS;
		}
		return SUCCESS;

	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String add() {
		try {
			companyService.save(company);
		} catch (Exception e) {
			e.printStackTrace();
		}
		Map map = AppUtil.getSysConfig();
		map.remove(Constants.LOGO_PATH);
		map.remove(Constants.COMPANY_NAME);
		map.put(Constants.LOGO_PATH, company.getLogo());
		map.put(Constants.COMPANY_NAME, company.getCompanyName());
		setJsonString("{success:true}");
		return SUCCESS;
	}

	public String delphoto() {
		List<Company> list = companyService.findCompany();
		if (list.size() > 0) {
			company = list.get(0);
			company.setLogo("");
			try {
				companyService.save(company);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return SUCCESS;
	}

}
