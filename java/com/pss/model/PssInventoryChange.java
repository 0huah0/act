package com.pss.model;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import com.abcdef.core.model.BaseModel;
import com.abcdef.core.model.CheckCompleteResult;
import com.abcdef.core.model.GenericModel;

public class PssInventoryChange extends BaseModel implements GenericModel {
	private static final long serialVersionUID = 1L;
	
	//alias

	//可以直接使用: @Length(max=50,message="用户名长度不能大于50")显示错误消息
	//columns START
	private java.lang.Long changeId;
	private java.lang.String warehouseId;
	private java.lang.String materialId;
	private java.lang.Integer type;
	private Long num;
	private java.lang.Integer reason;
	private java.lang.String recordId;
	private java.lang.String remark;
	private java.util.Date createDate;
	private java.lang.String createBy;
	private java.util.Date updateDate;
	private java.lang.String updateBy;
	//columns END

	public void setChangeId(java.lang.Long value) {
		this.changeId = value;
	}
	
	public java.lang.Long getChangeId() {
		return this.changeId;
	}
	
	public java.lang.String getWarehouseId() {
		return this.warehouseId;
	}
	
	public void setWarehouseId(java.lang.String value) {
		this.warehouseId = value;
	}
	public java.lang.String getMaterialId() {
		return this.materialId;
	}
	
	public void setMaterialId(java.lang.String value) {
		this.materialId = value;
	}
	public java.lang.Integer getType() {
		return this.type;
	}
	
	public void setType(java.lang.Integer value) {
		this.type = value;
	}
	public Long getNum() {
		return this.num;
	}
	
	public void setNum(Long value) {
		this.num = value;
	}
	public java.lang.Integer getReason() {
		return this.reason;
	}
	
	public void setReason(java.lang.Integer value) {
		this.reason = value;
	}
	public java.lang.String getRecordId() {
		return this.recordId;
	}
	
	public void setRecordId(java.lang.String value) {
		this.recordId = value;
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
			.append("ChangeId",getChangeId())
			.append("WarehouseId",getWarehouseId())
			.append("MaterialId",getMaterialId())
			.append("Type",getType())
			.append("Num",getNum())
			.append("Reason",getReason())
			.append("RecordId",getRecordId())
			.append("Remark",getRemark())
			.append("CreateDate",getCreateDate())
			.append("CreateBy",getCreateBy())
			.append("UpdateDate",getUpdateDate())
			.append("UpdateBy",getUpdateBy())
			.toString();
	}
	
	public int hashCode() {
		return new HashCodeBuilder()
			.append(getChangeId())
			.toHashCode();
	}
	
	public boolean equals(Object obj) {
		if(obj instanceof PssInventoryChange == false) return false;
		if(this == obj) return true;
		PssInventoryChange other = (PssInventoryChange)obj;
		return new EqualsBuilder()
			.append(getChangeId(),other.getChangeId())
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

