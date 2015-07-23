package com.pss.model;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import com.abcdef.core.model.BaseModel;
import com.abcdef.core.model.CheckCompleteResult;
import com.abcdef.core.model.GenericModel;

public class PssProductImage extends BaseModel implements GenericModel {
	private static final long serialVersionUID = 1L;
	
	//alias

	//可以直接使用: @Length(max=50,message="用户名长度不能大于50")显示错误消息
	//columns START
	private java.lang.String pdtId;
	private java.lang.String pdtImgId;
	private java.lang.String desc;
	private java.lang.Integer sn;
	private java.lang.Integer isCover;
	private java.util.Date createDate;
	private java.lang.String createBy;
	private java.util.Date updateDate;
	private java.lang.String updateBy;
	//columns END

	public void setPdtImgId(java.lang.String value) {
		this.pdtImgId = value;
	}
	
	public java.lang.String getPdtImgId() {
		return this.pdtImgId;
	}
	
	public java.lang.String getPdtId() {
		return this.pdtId;
	}
	
	public void setPdtId(java.lang.String value) {
		this.pdtId = value;
	}
	public java.lang.String getDesc() {
		return this.desc;
	}
	
	public void setDesc(java.lang.String value) {
		this.desc = value;
	}
	public java.lang.Integer getSn() {
		return this.sn;
	}
	
	public void setSn(java.lang.Integer value) {
		this.sn = value;
	}
	public java.lang.Integer getIsCover() {
		return this.isCover;
	}
	
	public void setIsCover(java.lang.Integer value) {
		this.isCover = value;
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
			.append("PdtId",getPdtId())
			.append("PdtImgId",getPdtImgId())
			.append("Desc",getDesc())
			.append("Sn",getSn())
			.append("IsCover",getIsCover())
			.append("CreateDate",getCreateDate())
			.append("CreateBy",getCreateBy())
			.append("UpdateDate",getUpdateDate())
			.append("UpdateBy",getUpdateBy())
			.toString();
	}
	
	public int hashCode() {
		return new HashCodeBuilder()
			.append(getPdtImgId())
			.toHashCode();
	}
	
	public boolean equals(Object obj) {
		if(obj instanceof PssProductImage == false) return false;
		if(this == obj) return true;
		PssProductImage other = (PssProductImage)obj;
		return new EqualsBuilder()
			.append(getPdtImgId(),other.getPdtImgId())
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

