package com.abcdef.frm.model.system;
/*
 *   
 *   
*/


import java.util.Date;

import com.abcdef.core.model.BaseModel;
import com.abcdef.core.model.CheckCompleteResult;
import com.abcdef.core.model.GenericModel;
import com.google.gson.annotations.Expose;

public class Department extends BaseModel implements GenericModel {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Expose
	private Long depId;
	@Expose
	private Long parentId;
	@Expose
	private Integer depLevel;
	@Expose
	private String depCode;
	@Expose
	private String depName;
	@Expose
	private String depDesc;
	@Expose
	private String path;
	private Short delFlag;
	@Expose
	protected Date createDate;
	@Expose
	protected String createBy;
	@Expose
	protected Date updateDate;
	@Expose
	protected String updateBy;
	
	

	public Department() {

	}


	public Long getDepId() {
		return depId;
	}
	public void setDepId(Long depId) {
		this.depId = depId;
	}
	
	
	public String getDepName() {
		return depName;
	}
	public void setDepName(String depName) {
		this.depName = depName;
	}
	
	
	public String getDepDesc() {
		return depDesc;
	}
	public void setDepDesc(String depDesc) {
		this.depDesc = depDesc;
	}
	
	
	public Integer getDepLevel() {
		return depLevel;
	}
	public void setDepLevel(Integer depLevel) {
		this.depLevel = depLevel;
	}
	
	
	public Long getParentId() {
		return parentId;
	}
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
	
	
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}


	public String getDepCode() {
		return depCode;
	}
	public void setDepCode(String depCode) {
		this.depCode = depCode;
	}

	
	public Short getDelFlag() {
		return delFlag;
	}
	public void setDelFlag(Short delFlag) {
		this.delFlag = delFlag;
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
	
	@Override
	public CheckCompleteResult checkComplete() {
		String msg = "";
		CheckCompleteResult result = new CheckCompleteResult();
		if (this.depId != -1) { //跳过系统默认部门资料
			if (null==this.parentId || this.parentId<=0) {
				result.setIsComplete(false);
				msg = "[上级部门不能为空且要大于0]";
			}
			
			if (null==this.depLevel || this.depLevel<=0) {
				result.setIsComplete(false);
				msg += "[部门级别不能为空且要大于0]";
			}
	
			if (null==this.depCode || this.depCode=="") {
				result.setIsComplete(false);
				msg += "[部门标示不能为空]";
			}
			
			if (null==this.depName || this.depName=="") {
				result.setIsComplete(false);
				msg += "[部门名称不能为空]";
			}
		}
		
		result.setMessage(msg);
		return result;
	}

}
