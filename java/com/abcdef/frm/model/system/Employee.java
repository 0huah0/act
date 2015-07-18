package com.abcdef.frm.model.system;
/*
 *  
 *  
*/
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

import com.abcdef.core.Constants;
import com.abcdef.core.model.CheckCompleteResult;
import com.abcdef.core.model.GenericModel;
import com.google.gson.annotations.Expose;


/**
 * PersonnelEmployee Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class Employee extends com.abcdef.core.model.BaseModel implements GenericModel {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public static final long DEFAULT_EMPLOYEE_ID = -1L;
	
	protected Long id;
	/**
	 * 员工编号
	 */
	@Expose
	protected String empCode;
	/**
	 * 部门
	 */
	protected Department department;
	/**
	 * 职位
	 */
	@Expose
	protected String position;
	/**
	 * 图像路径
	 */
	@Expose
	protected String imagePath;
	/**
	 * 办公电话
	 */
	@Expose
	protected String officePhone;
	/**
	 * 移动电话
	 */
	@Expose
	protected String mobilePhone;
	/**
	 * 邮件
	 */
	@Expose
	protected String email;
	/**
	 * 传真
	 */
	@Expose
	protected String fax;
	/**
	 * 地址
	 */
	@Expose
	protected String address;
	/**
	 * 邮编
	 */
	@Expose
	protected String zip;
	/**
	 * 生日
	 */
	@Expose
	protected Date birthday;
	/**
	 * 性别
	 */
	@Expose
	protected Short sex;
	/**
	 * 姓名
	 */
	@Expose
	protected String fullname;
	/**
	 * 入职日期
	 */
	@Expose
	protected Date accessionDate;
	/**
	 * 进公司前的总年资
	 */
	@Expose
	protected String beforeSeniority;
	
	/**
	 * 是否离职
	 */
	@Expose
	protected Short isLeaving;
	/**
	 * 离职日期
	 */
	@Expose
	protected Date leaveDate;
	/**
	 * 备注
	 */
	@Expose
	protected String remark;
	
	@Expose
	protected Short delflag;

	@Expose
	protected Date createDate;
	@Expose
	protected String createBy;
	@Expose
	protected Date updateDate;
	@Expose
	protected String updateBy;
	/**
	 * 该员工所有的账号集
	 */
	@Expose
	protected Set<AppUser> appUsers;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmpCode() {
		return empCode;
	}

	public void setEmpCode(String empCode) {
		this.empCode = empCode;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public String getOfficePhone() {
		return officePhone;
	}

	public void setOfficePhone(String officePhone) {
		this.officePhone = officePhone;
	}

	public String getMobilePhone() {
		return mobilePhone;
	}

	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public Short getSex() {
		return sex;
	}

	public void setSex(Short sex) {
		this.sex = sex;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public Date getAccessionDate() {
		return accessionDate;
	}

	public void setAccessionDate(Date accessionDate) {
		this.accessionDate = accessionDate;
	}

	public String getBeforeSeniority() {
		return beforeSeniority;
	}

	public void setBeforeSeniority(String beforeSeniority) {
		this.beforeSeniority = beforeSeniority;
	}

	public Short getIsLeaving() {
		return isLeaving;
	}

	public void setIsLeaving(Short isLeaving) {
		this.isLeaving = isLeaving;
	}

	public Date getLeaveDate() {
		return leaveDate;
	}

	public void setLeaveDate(Date leaveDate) {
		this.leaveDate = leaveDate;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Short getDelflag() {
		return delflag;
	}

	public void setDelflag(Short delflag) {
		this.delflag = delflag;
	}

	public java.util.Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(java.util.Date createDate) {
		this.createDate = createDate;
	}


	public java.util.Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(java.util.Date updateDate) {
		this.updateDate = updateDate;
	}

	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	public String getUpdateBy() {
		return updateBy;
	}

	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}

	public Set<AppUser> getAppUsers() {
		return appUsers;
	}

	public void setAppUsers(Set<AppUser> appUsers) {
		if (null != appUsers) {
			//排除已删除的用户
			Set<AppUser> delUsers = new HashSet<AppUser>();
			for (AppUser user : appUsers) {
				if (Constants.FLAG_DELETED.equals(user.getDelFlag())) {
					delUsers.add(user);
				}
			}
			appUsers.removeAll(delUsers);
		}
		this.appUsers = appUsers;
	}

	/**
	 * @see 员工编号一样认为是同一个员工
	 */
	public boolean equals(Object object) {
		if (!(object instanceof Employee)) {
			return false;
		}
		Employee rhs = (Employee) object;
		return new EqualsBuilder()
				.append(this.empCode, rhs.empCode)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
			.append(this.id) 
			.append(this.empCode)
			.toHashCode();
	}

	@Override
	public CheckCompleteResult checkComplete() {
		String msg = "";
		CheckCompleteResult result = new CheckCompleteResult();
		if (null==this.empCode || this.empCode=="") {
			result.setIsComplete(false);
			msg = "[员工编号不能为空]";
		}
		/*
		if (null!=this.department) {
			//检查有没有对应的部门信息
			CheckCompleteResult subResult = this.department.checkComplete();
			if (null==subResult || !subResult.isComplete()) {
				result.setIsComplete(false);
				msg += subResult.getMessage();
			}
		} else {
			result.setIsComplete(false);
			msg = "[部门信息不能为空]";
		}
		*/
		if (null==this.birthday) {
			result.setIsComplete(false);
			msg += "[生日不能为空]";
		}
		if (null==this.sex || (this.sex!=0 && this.sex!=1)) {
			result.setIsComplete(false);
			msg += "[性别不能为空，且只能是0或1]";
		}
		if (null==this.fullname || this.fullname=="") {
			result.setIsComplete(false);
			msg += "[姓名不能为空]";
		}
		if (null==this.accessionDate) {
			result.setIsComplete(false);
			msg += "[入职日期不能为空]";
		}
		
		result.setMessage(msg);
		return result;
	}
}
