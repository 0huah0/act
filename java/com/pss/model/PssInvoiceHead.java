package com.pss.model;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import com.abcdef.core.model.BaseModel;
import com.abcdef.core.model.CheckCompleteResult;
import com.abcdef.core.model.GenericModel;

public class PssInvoiceHead extends BaseModel implements GenericModel {
	private static final long serialVersionUID = 1L;
	
	//alias

	//可以直接使用: @Length(max=50,message="用户名长度不能大于50")显示错误消息
	//columns START
	private java.lang.String invoiceHeadId;
	private java.lang.String cusOrSupId;
	private Long invAmount;
	private java.lang.Integer type;
	private java.util.Date createDate;
	private java.lang.String createBy;
	private java.util.Date updateDate;
	private java.lang.String updateBy;
	//columns END

	public void setInvoiceHeadId(java.lang.String value) {
		this.invoiceHeadId = value;
	}
	
	public java.lang.String getInvoiceHeadId() {
		return this.invoiceHeadId;
	}
	
	public java.lang.String getCusOrSupId() {
		return this.cusOrSupId;
	}
	
	public void setCusOrSupId(java.lang.String value) {
		this.cusOrSupId = value;
	}
	public Long getInvAmount() {
		return this.invAmount;
	}
	
	public void setInvAmount(Long value) {
		this.invAmount = value;
	}
	public java.lang.Integer getType() {
		return this.type;
	}
	
	public void setType(java.lang.Integer value) {
		this.type = value;
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
			.append("InvoiceHeadId",getInvoiceHeadId())
			.append("CusOrSupId",getCusOrSupId())
			.append("InvAmount",getInvAmount())
			.append("Type",getType())
			.append("CreateDate",getCreateDate())
			.append("CreateBy",getCreateBy())
			.append("UpdateDate",getUpdateDate())
			.append("UpdateBy",getUpdateBy())
			.toString();
	}
	
	public int hashCode() {
		return new HashCodeBuilder()
			.append(getInvoiceHeadId())
			.toHashCode();
	}
	
	public boolean equals(Object obj) {
		if(obj instanceof PssInvoiceHead == false) return false;
		if(this == obj) return true;
		PssInvoiceHead other = (PssInvoiceHead)obj;
		return new EqualsBuilder()
			.append(getInvoiceHeadId(),other.getInvoiceHeadId())
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

