package com.pss.model;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import com.abcdef.core.model.BaseModel;
import com.abcdef.core.model.CheckCompleteResult;
import com.abcdef.core.model.GenericModel;

public class PssSalesOrderHead extends BaseModel implements GenericModel {
	private static final long serialVersionUID = 1L;
	
	//alias

	//可以直接使用: @Length(max=50,message="用户名长度不能大于50")显示错误消息
	//columns START
	private java.lang.String soHeadId;
	private java.lang.String customerId;
	private java.lang.String custPoNo;
	private Long priceAmount;
	private Long salePriceAmount;
	private Long payAmount;
	private Long discountAmount;
	private java.lang.String remark;
	private java.util.Date createDate;
	private java.lang.String createBy;
	private java.util.Date updateDate;
	private java.lang.String updateBy;
	//columns END

	public void setSoHeadId(java.lang.String value) {
		this.soHeadId = value;
	}
	
	public java.lang.String getSoHeadId() {
		return this.soHeadId;
	}
	
	public java.lang.String getCustomerId() {
		return this.customerId;
	}
	
	public void setCustomerId(java.lang.String value) {
		this.customerId = value;
	}
	public java.lang.String getCustPoNo() {
		return this.custPoNo;
	}
	
	public void setCustPoNo(java.lang.String value) {
		this.custPoNo = value;
	}
	public Long getPriceAmount() {
		return this.priceAmount;
	}
	
	public void setPriceAmount(Long value) {
		this.priceAmount = value;
	}
	public Long getSalePriceAmount() {
		return this.salePriceAmount;
	}
	
	public void setSalePriceAmount(Long value) {
		this.salePriceAmount = value;
	}
	public Long getPayAmount() {
		return this.payAmount;
	}
	
	public void setPayAmount(Long value) {
		this.payAmount = value;
	}
	public Long getDiscountAmount() {
		return this.discountAmount;
	}
	
	public void setDiscountAmount(Long value) {
		this.discountAmount = value;
	}
	public java.lang.String getRemark() {
		return this.remark;
	}
	
	public void setRemark(java.lang.String value) {
		this.remark = value;
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
			.append("SoHeadId",getSoHeadId())
			.append("CustomerId",getCustomerId())
			.append("CustPoNo",getCustPoNo())
			.append("PriceAmount",getPriceAmount())
			.append("SalePriceAmount",getSalePriceAmount())
			.append("PayAmount",getPayAmount())
			.append("DiscountAmount",getDiscountAmount())
			.append("Remark",getRemark())
			.append("CreateDate",getCreateDate())
			.append("CreateBy",getCreateBy())
			.append("UpdateDate",getUpdateDate())
			.append("UpdateBy",getUpdateBy())
			.toString();
	}
	
	public int hashCode() {
		return new HashCodeBuilder()
			.append(getSoHeadId())
			.toHashCode();
	}
	
	public boolean equals(Object obj) {
		if(obj instanceof PssSalesOrderHead == false) return false;
		if(this == obj) return true;
		PssSalesOrderHead other = (PssSalesOrderHead)obj;
		return new EqualsBuilder()
			.append(getSoHeadId(),other.getSoHeadId())
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

