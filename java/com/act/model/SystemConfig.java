package com.act.model;

import java.util.Date;

import com.abcdef.core.model.BaseModel;

public class SystemConfig extends BaseModel {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	private String configType;
	private String configCode;
	private String configValue;
	private Integer sortNo;
	
	private Date createDate;
	private String createBy;
	private Date updateDate;
	private String updateBy;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getConfigType() {
		return configType;
	}

	public void setConfigType(String configType) {
		this.configType = configType;
	}

	public String getConfigCode() {
		return configCode;
	}

	public void setConfigCode(String configCode) {
		this.configCode = configCode;
	}
	
	public String getConfigValue() {
		return configValue;
	}
	
	public void setConfigValue(String configValue) {
		this.configValue = configValue;
	}
	
	public Integer getSortNo() {
		return sortNo;
	}
	public void setSortNo(Integer sortNo) {
		this.sortNo = sortNo;
	}
	
	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	
	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public String getUpdateBy() {
		return updateBy;
	}

	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}
	
}
