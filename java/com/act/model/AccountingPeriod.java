package com.act.model;

import java.util.Date;

import com.abcdef.core.model.BaseModel;

public class AccountingPeriod extends BaseModel {
	
	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	private String type; // Y：年報區間、HY：半年報區間、Q：季報區間、M：月報區間。
	
	private Integer year; // 使用西元年。
	private Integer halfYear; // 1：上半年、2：下半年。
	private Integer season; // 1：第一季、2：第二季、3：第三季、4：第四季。
	private Integer month; // 1：1月、2：2月、3：3月、4：4月、5：5月、6：6月、7：7月、8：8月、9：9月、10：10月、11：11月、12：12月。
	
	private Date startDate;
	private Date endDate;
	
	private Date createDate;
	private String createBy;
	private Date updateDate;
	private String updateBy;
	
	public Long getId()
	{
		return id;
	}

	public void setId(Long id)
	{
		this.id = id;
	}
	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public Integer getHalfYear() {
		return halfYear;
	}

	public void setHalfYear(Integer halfYear) {
		this.halfYear = halfYear;
	}

	public Integer getSeason() {
		return season;
	}

	public void setSeason(Integer season) {
		this.season = season;
	}
	
	public Integer getMonth() {
		return month;
	}

	public void setMonth(Integer month) {
		this.month = month;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	
	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Date getCreateDate()
	{
		return createDate;
	}

	public void setCreateDate(Date createDate)
	{
		this.createDate = createDate;
	}

	public String getCreateBy()
	{
		return createBy;
	}

	public void setCreateBy(String createBy)
	{
		this.createBy = createBy;
	}

	public Date getUpdateDate()
	{
		return updateDate;
	}

	public void setUpdateDate(Date updateDate)
	{
		this.updateDate = updateDate;
	}

	public String getUpdateBy()
	{
		return updateBy;
	}

	public void setUpdateBy(String updateBy)
	{
		this.updateBy = updateBy;
	}

}
