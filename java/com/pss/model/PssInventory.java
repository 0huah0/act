package com.pss.model;

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import com.abcdef.core.model.BaseModel;
import com.abcdef.core.model.CheckCompleteResult;
import com.abcdef.core.model.GenericModel;

public class PssInventory extends BaseModel implements GenericModel {
	private static final long serialVersionUID = 1L;
	
	//alias

	private String warehouseId;
	private String materialId;
	private Long alertNum;
	private Long allNum;
	private Long goodPdtNum;
	private Long rejectsNum;
	private java.util.Date createDate;
	private java.lang.String createBy;
	private java.util.Date updateDate;
	private java.lang.String updateBy;

	
	public Long getAlertNum() {
		return this.alertNum;
	}
	
	public void setAlertNum(Long value) {
		this.alertNum = value;
	}
	public Long getAllNum() {
		return this.allNum;
	}
	
	public void setAllNum(Long value) {
		this.allNum = value;
	}
	public Long getGoodPdtNum() {
		return this.goodPdtNum;
	}
	
	public void setGoodPdtNum(Long value) {
		this.goodPdtNum = value;
	}
	public Long getRejectsNum() {
		return this.rejectsNum;
	}
	
	public void setRejectsNum(Long value) {
		this.rejectsNum = value;
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
			.toString();
	}
	
	public int hashCode() {
		return new HashCodeBuilder()
			.toHashCode();
	}
	
	@Override
	public CheckCompleteResult checkComplete() {
		String msg = "";
		CheckCompleteResult result = new CheckCompleteResult();
		result.setMessage(msg);
		return result;
	}

	public String getWarehouseId() {
		return warehouseId;
	}

	public void setWarehouseId(String warehouseId) {
		this.warehouseId = warehouseId;
	}

	public String getMaterialId() {
		return materialId;
	}

	public void setMaterialId(String materialId) {
		this.materialId = materialId;
	}
}

