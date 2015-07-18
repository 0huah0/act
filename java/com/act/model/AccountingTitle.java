package com.act.model;

import java.util.Date;

import com.abcdef.core.model.BaseModel;

public class AccountingTitle extends BaseModel {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long id;
	private String parName;
	
	private String code;
	private String name;
	private String nameEn;
	private String remark;
	private String lr;//'l：左方科目(借餘表示正值，貸餘表示負值)、r：右方科目(貸餘表示正值，借餘表示負值)',
	
	private Integer level;// '1：一級科目(資產、負債、業主權益)、2：二級科目、3：三級科目、4：四級科目',
	private Integer isBasic;//'0：非基礎資料、1：基礎資料',
	private Integer isDelete;
	
	private Date createDate;
	private String createBy;
	private Date updateDate;
	private String updateBy;
	
	private AccountingTitle parent;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getParName() {
		if(this.parName==null){
			this.parName = parent==null?"":(parent.getCode()+"-"+parent.getName());
		}
		return parName;
	}
	public void setParName(String parName) {
		this.parName = parName;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getNameEn() {
		return nameEn;
	}
	public void setNameEn(String nameEn) {
		this.nameEn = nameEn;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getLr() {
		return lr;
	}
	public void setLr(String lr) {
		this.lr = lr;
	}
	public Integer getLevel() {
		return level;
	}
	public void setLevel(Integer level) {
		this.level = level;
	}
	public Integer getIsBasic() {
		return isBasic;
	}
	public void setIsBasic(Integer isBasic) {
		this.isBasic = isBasic;
	}
	public Integer getIsDelete() {
		return isDelete;
	}
	public void setIsDelete(Integer isDelete) {
		this.isDelete = isDelete;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public String getCreateBy() {
		return createBy;
	}
	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}
	public Date getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	public String getUpdateBy() {
		return updateBy;
	}
	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}
	public AccountingTitle getParent() {
		return parent;
	}
	public void setParent(AccountingTitle parent) {
		this.parent = parent;
	}
		
	
}
