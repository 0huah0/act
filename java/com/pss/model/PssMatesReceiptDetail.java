package com.pss.model;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import com.abcdef.core.model.BaseModel;
import com.abcdef.core.model.CheckCompleteResult;
import com.abcdef.core.model.GenericModel;

public class PssMatesReceiptDetail extends BaseModel implements GenericModel {
	private static final long serialVersionUID = 1L;
	
	//alias

	//可以直接使用: @Length(max=50,message="用户名长度不能大于50")显示错误消息
	//columns START
	private java.lang.String mrHeadId;
	private java.lang.Long mrDetailId;
	private java.lang.String materialId;
	private Long allNum;
	private Long receiptNum;
	private Long rejectNum;
	private java.util.Date createDate;
	private java.lang.String createBy;
	private java.util.Date updateDate;
	private java.lang.String updateBy;
	//columns END

	public void setMrDetailId(java.lang.Long value) {
		this.mrDetailId = value;
	}
	
	public java.lang.Long getMrDetailId() {
		return this.mrDetailId;
	}
	
	public java.lang.String getMrHeadId() {
		return this.mrHeadId;
	}
	
	public void setMrHeadId(java.lang.String value) {
		this.mrHeadId = value;
	}
	public java.lang.String getMaterialId() {
		return this.materialId;
	}
	
	public void setMaterialId(java.lang.String value) {
		this.materialId = value;
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
			.append("MrHeadId",getMrHeadId())
			.append("MrDetailId",getMrDetailId())
			.append("MaterialId",getMaterialId())
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
			.append(getMrDetailId())
			.toHashCode();
	}
	
	public boolean equals(Object obj) {
		if(obj instanceof PssMatesReceiptDetail == false) return false;
		if(this == obj) return true;
		PssMatesReceiptDetail other = (PssMatesReceiptDetail)obj;
		return new EqualsBuilder()
			.append(getMrDetailId(),other.getMrDetailId())
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

