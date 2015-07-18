package com.act.model;

import java.util.Date;

import com.abcdef.core.model.BaseModel;

public class AccountTitleJournal extends BaseModel {
	
	private static final long serialVersionUID = 1L;
	
	private String code;
	
	private String name;
	
	private String brief;
	
	private String refNo;
	
	private Date refDate;
	
	private Double debitSum;
	
	private Double creditSum;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBrief() {
		return brief;
	}

	public void setBrief(String brief) {
		this.brief = brief;
	}

	public String getRefNo() {
		return refNo;
	}

	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}

	public Date getRefDate() {
		return refDate;
	}

	public void setRefDate(Date refDate) {
		this.refDate = refDate;
	}

	public Double getDebitSum() {
		return debitSum;
	}

	public void setDebitSum(Double debitSum) {
		this.debitSum = debitSum;
	}

	public Double getCreditSum() {
		return creditSum;
	}

	public void setCreditSum(Double creditSum) {
		this.creditSum = creditSum;
	}

}
