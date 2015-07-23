package com.pss.model;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import com.abcdef.core.model.BaseModel;
import com.abcdef.core.model.CheckCompleteResult;
import com.abcdef.core.model.GenericModel;

public class PssDeliveryOrderDetail extends BaseModel implements GenericModel {
	private static final long serialVersionUID = 1L;
	
	//alias

	//可以直接使用: @Length(max=50,message="用户名长度不能大于50")显示错误消息
	//columns START
	private java.lang.String doHeadId;
	private java.lang.Long doDetailId;
	private java.lang.String pdtId;
	private Long allNum;
	private Long receiptNum;
	private Long rejectNum;
	private java.util.Date createDate;
	private java.lang.String createBy;
	private java.util.Date updateDate;
	private java.lang.String updateBy;
	//columns END

	public void setDoDetailId(java.lang.Long value) {
		this.doDetailId = value;
	}
	
	public java.lang.Long getDoDetailId() {
		return this.doDetailId;
	}
	
	public java.lang.String getDoHeadId() {
		return this.doHeadId;
	}
	
	public void setDoHeadId(java.lang.String value) {
		this.doHeadId = value;
	}
	public java.lang.String getPdtId() {
		return this.pdtId;
	}
	
	public void setPdtId(java.lang.String value) {
		this.pdtId = value;
	}
	public Long getAllNum() {
		return this.allNum;
	}
	
	public void setAllNum(Long value) {
		this.allNum = value;
	}
	public Long getReceiptNum() {
		return this.receiptNum;
	}
	
	public void setReceiptNum(Long value) {
		this.receiptNum = value;
	}
	public Long getRejectNum() {
		return this.rejectNum;
	}
	
	public void setRejectNum(Long value) {
		this.rejectNum = value;
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
			.append("DoHeadId",getDoHeadId())
			.append("DoDetailId",getDoDetailId())
			.append("PdtId",getPdtId())
			.append("AllNum",getAllNum())
			.append("ReceiptNum",getReceiptNum())
			.append("RejectNum",getRejectNum())
			.append("CreateDate",getCreateDate())
			.append("CreateBy",getCreateBy())
			.append("UpdateDate",getUpdateDate())
			.append("UpdateBy",getUpdateBy())
			.toString();
	}
	
	public int hashCode() {
		return new HashCodeBuilder()
			.append(getDoDetailId())
			.toHashCode();
	}
	
	public boolean equals(Object obj) {
		if(obj instanceof PssDeliveryOrderDetail == false) return false;
		if(this == obj) return true;
		PssDeliveryOrderDetail other = (PssDeliveryOrderDetail)obj;
		return new EqualsBuilder()
			.append(getDoDetailId(),other.getDoDetailId())
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

