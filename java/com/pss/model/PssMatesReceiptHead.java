package com.pss.model;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import com.abcdef.core.model.BaseModel;
import com.abcdef.core.model.CheckCompleteResult;
import com.abcdef.core.model.GenericModel;

public class PssMatesReceiptHead extends BaseModel implements GenericModel {
	private static final long serialVersionUID = 1L;
	
	//alias

	//可以直接使用: @Length(max=50,message="用户名长度不能大于50")显示错误消息
	//columns START
	private java.lang.String mrHeadId;
	private java.lang.String poHeadId;
	private java.lang.String warehouseId;
	private java.lang.String receiverName;
	private java.lang.String receiverTel;
	private java.lang.String mrInvoice;
	private java.lang.String diliverName;
	private java.lang.String diliverTel;
	private java.lang.String remark;
	private java.util.Date createDate;
	private java.lang.String createBy;
	private java.util.Date updateDate;
	private java.lang.String updateBy;
	//columns END

	public void setMrHeadId(java.lang.String value) {
		this.mrHeadId = value;
	}
	
	public java.lang.String getMrHeadId() {
		return this.mrHeadId;
	}
	
	public java.lang.String getPoHeadId() {
		return this.poHeadId;
	}
	
	public void setPoHeadId(java.lang.String value) {
		this.poHeadId = value;
	}
	public java.lang.String getWarehouseId() {
		return this.warehouseId;
	}
	
	public void setWarehouseId(java.lang.String value) {
		this.warehouseId = value;
	}
	public java.lang.String getReceiverName() {
		return this.receiverName;
	}
	
	public void setReceiverName(java.lang.String value) {
		this.receiverName = value;
	}
	public java.lang.String getReceiverTel() {
		return this.receiverTel;
	}
	
	public void setReceiverTel(java.lang.String value) {
		this.receiverTel = value;
	}
	public java.lang.String getMrInvoice() {
		return this.mrInvoice;
	}
	
	public void setMrInvoice(java.lang.String value) {
		this.mrInvoice = value;
	}
	public java.lang.String getDiliverName() {
		return this.diliverName;
	}
	
	public void setDiliverName(java.lang.String value) {
		this.diliverName = value;
	}
	public java.lang.String getDiliverTel() {
		return this.diliverTel;
	}
	
	public void setDiliverTel(java.lang.String value) {
		this.diliverTel = value;
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
			.append("MrHeadId",getMrHeadId())
			.append("PoHeadId",getPoHeadId())
			.append("WarehouseId",getWarehouseId())
			.append("ReceiverName",getReceiverName())
			.append("ReceiverTel",getReceiverTel())
			.append("MrInvoice",getMrInvoice())
			.append("DiliverName",getDiliverName())
			.append("DiliverTel",getDiliverTel())
			.append("Remark",getRemark())
			.append("CreateDate",getCreateDate())
			.append("CreateBy",getCreateBy())
			.append("UpdateDate",getUpdateDate())
			.append("UpdateBy",getUpdateBy())
			.toString();
	}
	
	public int hashCode() {
		return new HashCodeBuilder()
			.append(getMrHeadId())
			.toHashCode();
	}
	
	public boolean equals(Object obj) {
		if(obj instanceof PssMatesReceiptHead == false) return false;
		if(this == obj) return true;
		PssMatesReceiptHead other = (PssMatesReceiptHead)obj;
		return new EqualsBuilder()
			.append(getMrHeadId(),other.getMrHeadId())
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

