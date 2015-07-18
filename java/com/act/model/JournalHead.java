package com.act.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.abcdef.core.model.BaseModel;

public class JournalHead extends BaseModel {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long id;
	private String refNo;
	private Date refDate;
	private String brief;
	private Integer type;//'1：日常分錄、2：調整分錄、3：更新分錄、4：結帳分錄(結清)、5：結帳分錄(結轉)、6：開帳分錄',
	private String dataFrom;
	
	private Integer isBackup;
	private Integer isPost;//'0：未過帳、1：已過帳',
	private Integer isDelete;
	
	private Date createDate;
	private String createBy;
	private Date updateDate;
	private String updateBy;
	
	private Set<JournalDetail> details = new HashSet<JournalDetail>();

	
	private Double debit;
	private Double credit;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getRefDate() {
		return refDate;
	}

	public void setRefDate(Date refDate) {
		this.refDate = refDate;
	}

	public String getBrief() {
		return brief;
	}

	public void setBrief(String brief) {
		this.brief = brief;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getDataFrom() {
		return dataFrom;
	}

	public void setDataFrom(String dataFrom) {
		this.dataFrom = dataFrom;
	}

	public Integer getIsBackup() {
		return isBackup;
	}

	public void setIsBackup(Integer isBackup) {
		this.isBackup = isBackup;
	}

	public Integer getIsPost() {
		return isPost;
	}

	public void setIsPost(Integer isPost) {
		this.isPost = isPost;
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

	public Set<JournalDetail> getDetails() {
		return details;
	}

	public void setDetails(Set<JournalDetail> details) {
		this.details = details;
	}

	/**
	 * @return the refNo
	 */
	public String getRefNo() {
		return refNo;
	}

	/**
	 * @param refNo the refNo to set
	 */
	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}
	
	public void addDetails(JournalDetail journalDetail) {
		this.details.add(journalDetail);
	}

	/**
	 * @return the debit
	 */
	public Double getDebit() {
		return debit;
	}

	/**
	 * @param debit the debit to set
	 */
	public void setDebit(Double debit) {
		this.debit = debit;
	}

	/**
	 * @return the credit
	 */
	public Double getCredit() {
		return credit;
	}

	/**
	 * @param credit the credit to set
	 */
	public void setCredit(Double credit) {
		this.credit = credit;
	}
}
