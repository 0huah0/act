package com.pss.model;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import com.abcdef.core.model.BaseModel;
import com.abcdef.core.model.CheckCompleteResult;
import com.abcdef.core.model.GenericModel;

public class PssPurchaseOrderDetail extends BaseModel implements GenericModel {
	private static final long serialVersionUID = 1L;
	
	//alias

	//可以直接使用: @Length(max=50,message="用户名长度不能大于50")显示错误消息
	//columns START
	private java.lang.String poHeadId;
	private java.lang.Long poDetailId;
	private java.lang.String materialId;
	private Long materialNum;
	private Long materialPrice;
	private Long materialSalePrice;
	private Long amount;
	private java.util.Date createDate;
	private java.lang.String createBy;
	private java.util.Date updateDate;
	private java.lang.String updateBy;
	//columns END

	public void setPoDetailId(java.lang.Long value) {
		this.poDetailId = value;
	}
	
	public java.lang.Long getPoDetailId() {
		return this.poDetailId;
	}
	
	public java.lang.String getPoHeadId() {
		return this.poHeadId;
	}
	
	public void setPoHeadId(java.lang.String value) {
		this.poHeadId = value;
	}
	public java.lang.String getMaterialId() {
		return this.materialId;
	}
	
	public void setMaterialId(java.lang.String value) {
		this.materialId = value;
	}
	public Long getMaterialNum() {
		return this.materialNum;
	}
	
	public void setMaterialNum(Long value) {
		this.materialNum = value;
	}
	public Long getMaterialPrice() {
		return this.materialPrice;
	}
	
	public void setMaterialPrice(Long value) {
		this.materialPrice = value;
	}
	public Long getMaterialSalePrice() {
		return this.materialSalePrice;
	}
	
	public void setMaterialSalePrice(Long value) {
		this.materialSalePrice = value;
	}
	public Long getAmount() {
		return this.amount;
	}
	
	public void setAmount(Long value) {
		this.amount = value;
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
			.append("PoDetailId",getPoDetailId())
			.append("MaterialId",getMaterialId())
			.append("MaterialNum",getMaterialNum())
			.append("MaterialPrice",getMaterialPrice())
			.append("MaterialSalePrice",getMaterialSalePrice())
			.append("Amount",getAmount())
			.append("CreateDate",getCreateDate())
			.append("CreateBy",getCreateBy())
			.append("UpdateDate",getUpdateDate())
			.append("UpdateBy",getUpdateBy())
			.toString();
	}
	
	public int hashCode() {
		return new HashCodeBuilder()
			.append(getPoDetailId())
			.toHashCode();
	}
	
	public boolean equals(Object obj) {
		if(obj instanceof PssPurchaseOrderDetail == false) return false;
		if(this == obj) return true;
		PssPurchaseOrderDetail other = (PssPurchaseOrderDetail)obj;
		return new EqualsBuilder()
			.append(getPoDetailId(),other.getPoDetailId())
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

