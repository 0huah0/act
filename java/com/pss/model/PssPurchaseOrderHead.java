package com.pss.model;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import com.abcdef.core.model.BaseModel;
import com.abcdef.core.model.CheckCompleteResult;
import com.abcdef.core.model.GenericModel;

public class PssPurchaseOrderHead extends BaseModel implements GenericModel {
	private static final long serialVersionUID = 1L;
	
	//alias

	//可以直接使用: @Length(max=50,message="用户名长度不能大于50")显示错误消息
	//columns START
	private java.lang.String poHeadId;
	private java.lang.String supplierId;
	private Long priceAmount;
	private Long salePriceAmount;
	private Long payAmount;
	private java.lang.String remark;
	private java.util.Date createDate;
	private java.lang.String createBy;
	private java.util.Date updateDate;
	private java.lang.String updateBy;
	//columns END

	public void setPoHeadId(java.lang.String value) {
		this.poHeadId = value;
	}
	
	public java.lang.String getPoHeadId() {
		return this.poHeadId;
	}
	
	public java.lang.String getSupplierId() {
		return this.supplierId;
	}
	
	public void setSupplierId(java.lang.String value) {
		this.supplierId = value;
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
			.append("PoHeadId",getPoHeadId())
			.append("SupplierId",getSupplierId())
			.append("PriceAmount",getPriceAmount())
			.append("SalePriceAmount",getSalePriceAmount())
			.append("PayAmount",getPayAmount())
			.append("Remark",getRemark())
			.append("CreateDate",getCreateDate())
			.append("CreateBy",getCreateBy())
			.append("UpdateDate",getUpdateDate())
			.append("UpdateBy",getUpdateBy())
			.toString();
	}
	
	public int hashCode() {
		return new HashCodeBuilder()
			.append(getPoHeadId())
			.toHashCode();
	}
	
	public boolean equals(Object obj) {
		if(obj instanceof PssPurchaseOrderHead == false) return false;
		if(this == obj) return true;
		PssPurchaseOrderHead other = (PssPurchaseOrderHead)obj;
		return new EqualsBuilder()
			.append(getPoHeadId(),other.getPoHeadId())
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

