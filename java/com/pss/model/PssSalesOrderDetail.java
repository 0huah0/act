package com.pss.model;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import com.abcdef.core.model.BaseModel;
import com.abcdef.core.model.CheckCompleteResult;
import com.abcdef.core.model.GenericModel;

public class PssSalesOrderDetail extends BaseModel implements GenericModel {
	private static final long serialVersionUID = 1L;
	
	//alias

	//可以直接使用: @Length(max=50,message="用户名长度不能大于50")显示错误消息
	//columns START
	private java.lang.String soHeadId;
	private java.lang.Long soDetailId;
	private java.lang.String pdtId;
	private Long pdtNum;
	private Long pdtPrice;
	private Long pdtSalePrice;
	private Long pdtRealPrice;
	private Long amount;
	private java.util.Date createDate;
	private java.lang.String createBy;
	private java.util.Date updateDate;
	private java.lang.String updateBy;
	//columns END

	public void setSoDetailId(java.lang.Long value) {
		this.soDetailId = value;
	}
	
	public java.lang.Long getSoDetailId() {
		return this.soDetailId;
	}
	
	public java.lang.String getSoHeadId() {
		return this.soHeadId;
	}
	
	public void setSoHeadId(java.lang.String value) {
		this.soHeadId = value;
	}
	public java.lang.String getPdtId() {
		return this.pdtId;
	}
	
	public void setPdtId(java.lang.String value) {
		this.pdtId = value;
	}
	public Long getPdtNum() {
		return this.pdtNum;
	}
	
	public void setPdtNum(Long value) {
		this.pdtNum = value;
	}
	public Long getPdtPrice() {
		return this.pdtPrice;
	}
	
	public void setPdtPrice(Long value) {
		this.pdtPrice = value;
	}
	public Long getPdtSalePrice() {
		return this.pdtSalePrice;
	}
	
	public void setPdtSalePrice(Long value) {
		this.pdtSalePrice = value;
	}
	public Long getPdtRealPrice() {
		return this.pdtRealPrice;
	}
	
	public void setPdtRealPrice(Long value) {
		this.pdtRealPrice = value;
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
			.append("SoHeadId",getSoHeadId())
			.append("SoDetailId",getSoDetailId())
			.append("PdtId",getPdtId())
			.append("PdtNum",getPdtNum())
			.append("PdtPrice",getPdtPrice())
			.append("PdtSalePrice",getPdtSalePrice())
			.append("PdtRealPrice",getPdtRealPrice())
			.append("Amount",getAmount())
			.append("CreateDate",getCreateDate())
			.append("CreateBy",getCreateBy())
			.append("UpdateDate",getUpdateDate())
			.append("UpdateBy",getUpdateBy())
			.toString();
	}
	
	public int hashCode() {
		return new HashCodeBuilder()
			.append(getSoDetailId())
			.toHashCode();
	}
	
	public boolean equals(Object obj) {
		if(obj instanceof PssSalesOrderDetail == false) return false;
		if(this == obj) return true;
		PssSalesOrderDetail other = (PssSalesOrderDetail)obj;
		return new EqualsBuilder()
			.append(getSoDetailId(),other.getSoDetailId())
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

