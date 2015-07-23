package com.pss.model;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import com.abcdef.core.model.BaseModel;
import com.abcdef.core.model.CheckCompleteResult;
import com.abcdef.core.model.GenericModel;

public class PssSupplier extends BaseModel implements GenericModel {
	private static final long serialVersionUID = 1L;
	
	//alias

	//可以直接使用: @Length(max=50,message="用户名长度不能大于50")显示错误消息
	//columns START
	private java.lang.String supplierId;
	private java.lang.String companyNameCn;
	private java.lang.String companyNameEn;
	private java.lang.String legalPersonCode;
	private java.lang.String personInCharge;
	private java.lang.String addr;
	private java.lang.String tel;
	private java.lang.String fax;
	private java.lang.String email;
	private java.lang.String licenseImgId;
	private java.lang.Integer capital;
	private java.lang.Integer empAmount;
	private java.lang.Integer active;
	private java.util.Date createDate;
	private java.lang.String createBy;
	private java.util.Date updateDate;
	private java.lang.String updateBy;
	//columns END

	public void setSupplierId(java.lang.String value) {
		this.supplierId = value;
	}
	
	public java.lang.String getSupplierId() {
		return this.supplierId;
	}
	
	public java.lang.String getCompanyNameCn() {
		return this.companyNameCn;
	}
	
	public void setCompanyNameCn(java.lang.String value) {
		this.companyNameCn = value;
	}
	public java.lang.String getCompanyNameEn() {
		return this.companyNameEn;
	}
	
	public void setCompanyNameEn(java.lang.String value) {
		this.companyNameEn = value;
	}
	public java.lang.String getLegalPersonCode() {
		return this.legalPersonCode;
	}
	
	public void setLegalPersonCode(java.lang.String value) {
		this.legalPersonCode = value;
	}
	public java.lang.String getPersonInCharge() {
		return this.personInCharge;
	}
	
	public void setPersonInCharge(java.lang.String value) {
		this.personInCharge = value;
	}
	public java.lang.String getAddr() {
		return this.addr;
	}
	
	public void setAddr(java.lang.String value) {
		this.addr = value;
	}
	public java.lang.String getTel() {
		return this.tel;
	}
	
	public void setTel(java.lang.String value) {
		this.tel = value;
	}
	public java.lang.String getFax() {
		return this.fax;
	}
	
	public void setFax(java.lang.String value) {
		this.fax = value;
	}
	public java.lang.String getEmail() {
		return this.email;
	}
	
	public void setEmail(java.lang.String value) {
		this.email = value;
	}
	public java.lang.String getLicenseImgId() {
		return this.licenseImgId;
	}
	
	public void setLicenseImgId(java.lang.String value) {
		this.licenseImgId = value;
	}
	public java.lang.Integer getCapital() {
		return this.capital;
	}
	
	public void setCapital(java.lang.Integer value) {
		this.capital = value;
	}
	public java.lang.Integer getEmpAmount() {
		return this.empAmount;
	}
	
	public void setEmpAmount(java.lang.Integer value) {
		this.empAmount = value;
	}
	public java.lang.Integer getActive() {
		return this.active;
	}
	
	public void setActive(java.lang.Integer value) {
		this.active = value;
	}
	public java.util.Date getCreateDate() {
		return this.createDate;
	}
	
	public void setCreateDate(java.util.Date value) {
		this.createDate = value;
	}
	public java.lang.String getCreateBy() {
		return this.createBy;
	}
	
	public void setCreateBy(java.lang.String value) {
		this.createBy = value;
	}
	public java.util.Date getUpdateDate() {
		return this.updateDate;
	}
	
	public void setUpdateDate(java.util.Date value) {
		this.updateDate = value;
	}
	public java.lang.String getUpdateBy() {
		return this.updateBy;
	}
	
	public void setUpdateBy(java.lang.String value) {
		this.updateBy = value;
	}

	public String toString() {
		return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
			.append("SupplierId",getSupplierId())
			.append("CompanyNameCn",getCompanyNameCn())
			.append("CompanyNameEn",getCompanyNameEn())
			.append("LegalPersonCode",getLegalPersonCode())
			.append("PersonInCharge",getPersonInCharge())
			.append("Addr",getAddr())
			.append("Tel",getTel())
			.append("Fax",getFax())
			.append("Email",getEmail())
			.append("LicenseImgId",getLicenseImgId())
			.append("Capital",getCapital())
			.append("EmpAmount",getEmpAmount())
			.append("Active",getActive())
			.append("CreateDate",getCreateDate())
			.append("CreateBy",getCreateBy())
			.append("UpdateDate",getUpdateDate())
			.append("UpdateBy",getUpdateBy())
			.toString();
	}
	
	public int hashCode() {
		return new HashCodeBuilder()
			.append(getSupplierId())
			.toHashCode();
	}
	
	public boolean equals(Object obj) {
		if(obj instanceof PssSupplier == false) return false;
		if(this == obj) return true;
		PssSupplier other = (PssSupplier)obj;
		return new EqualsBuilder()
			.append(getSupplierId(),other.getSupplierId())
			.isEquals();
	}
	
	@Override
	public CheckCompleteResult checkComplete() {
		String msg = "";
		CheckCompleteResult result = new CheckCompleteResult();
		result.setMessage(msg);
		return result;
	}
}

