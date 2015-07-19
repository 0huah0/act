package com.abcdef.frm.model.system;

import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.abcdef.core.model.CheckCompleteResult;
import com.abcdef.core.model.GenericModel;

public class AppUser extends com.abcdef.core.model.BaseModel implements GenericModel, UserDetails{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 系统用户ID，由初始化数据加入
	 */
	public static Long SYSTEM_USER = -1L;
	/**
	 * 超级管理员ID,由初始化数据加入
	 */
	public static Long SUPER_USER = 1L;
	
	
    private Long userId;
	
	private String username;
	
	private String password;
	
	private Employee employee;
	
	private Short status;
	
	private Short delFlag;
	
	private Date createDate;
	
	private String createBy;
	
	private Date updateDate;
	
	private String updateBy;
	
	transient private Set<AppRole> roles;
	
	/**
	 * Default Empty Constructor for class AppUser
	 */
	public AppUser () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class AppUser
	 */
	public AppUser (Long in_userId) {
		this.setUserId(in_userId);
    }
	
	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	
	public String getFullname() {
		if (employee != null) return employee.getFullname();
		else	return "";
	}
	
	

	/**
	 * 用于存储该用户的权限
	 */
	private Set<String> rights=new HashSet<String>();
	
	public Set<String> getRights() {
		return rights;
	}
	public void setRights(Set<String> rights) {
		this.rights = rights;
	}
	
	
	/**
	 * 取得所有的Function的权限，则以_为开头的权限
	 * @return
	 */
	public String getFunctionRights(){
		StringBuffer sb=new StringBuffer();
		
		Iterator<String>it=rights.iterator();
		
		while(it.hasNext()){
			sb.append(it.next()).append(",");
		}
		
		if(rights.size()>0){
			sb.deleteCharAt(sb.length()-1);
		}
		
		return sb.toString();
	}
	


	/**
	 * 	 * @return Long
     * @hibernate.id column="userId" type="java.lang.Long" generator-class="native"
	 */
	public Long getUserId() {
		return this.userId;
	}
	
	/**
	 * Set the userId
	 */	
	public void setUserId(Long aValue) {
		this.userId = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="username" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getUsername() {
		return this.username;
	}
	
	/**
	 * Set the username
	 * @spring.validator type="required"
	 */	
	public void setUsername(String aValue) {
		this.username = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="password" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getPassword() {
		return this.password;
	}
	
	/**
	 * Set the password
	 * @spring.validator type="required"
	 */	
	public void setPassword(String aValue) {
		this.password = aValue;
	}	

	

	/**
	 * 	 * @return Short
	 * @hibernate.property column="status" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getStatus() {
		return this.status;
	}
	
	/**
	 * Set the status
	 * @spring.validator type="required"
	 */	
	public void setStatus(Short aValue) {
		this.status = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */

	public Short getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(Short delFlag) {
		this.delFlag = delFlag;
	}
	
	
	
	
	

	public java.util.Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(java.util.Date createDate) {
		this.createDate = createDate;
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

	public java.util.Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(java.util.Date updateDate) {
		this.updateDate = updateDate;
	}

	public Set<AppRole> getRoles() {
		return roles;
	}

	public void setRoles(Set<AppRole> roles) {
		this.roles = roles;
	}
	
	
	/**
	 * implements UserDetails 需要实现的方法
	 */
	@Override
	public Set<GrantedAuthority> getAuthorities() {
		Set<GrantedAuthority> rights = new HashSet<GrantedAuthority>(); 
		for (AppRole role : roles) {
			rights.add(role);
		}
		rights.add(new SimpleGrantedAuthority("ROLE_PUBLIC"));
		return rights;
	}
	/**
	 * implements UserDetails 需要实现的方法
	 */
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	/**
	 * implements UserDetails 需要实现的方法
	 */
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	/**
	 * implements UserDetails 需要实现的方法
	 */
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	
	
	/**
	 * 判断是否有效
	 */
	public boolean isEnabled() {
		if(status==1){
			return true;
		}
		return false;
	}
	
	//overwrite for 
	
	/**
	 * Return the Id (pk) of the entity
	 */
	public String getId() {
		return userId.toString();
	}
	/**
	 * 获取员工ID
	 * @return
	 */
	public Long getEmployeeId() {
		return this.employee.getId();
	}
	/**
	 * 获取员工所在部门的ID
	 * @return
	 */
	public Long getDepId() {
		Department dept = this.employee.getDepartment();
		if (dept != null) {
			return this.employee.getDepartment().getDepId();
		} else {
			return (long)-1;
		}
	}
	
	/**
	 * 判断是否管理员
	 * @return
	 */
	public Boolean isSuperUser() {	
		boolean flag = false;
		if (this.userId == AppUser.SUPER_USER) 
			flag = true;
		return flag;
	}

	@Override
	public CheckCompleteResult checkComplete() {
		String msg = "";
		CheckCompleteResult result = new CheckCompleteResult();
		if (null==this.username || this.username=="") {
			result.setIsComplete(false);
			msg = "[账号名不能为空]";
		}/*
		if (null==this.password || this.password=="") {
			result.setIsComplete(false);
			msg += "[密码不能为空]";
		}*/
		if (null!=this.employee) {
			//检查有没有对应的员工信息
			CheckCompleteResult subResult = this.employee.checkComplete();
			if (null==subResult || !subResult.isComplete()) {
				result.setIsComplete(false);
				msg += subResult.getMessage();
			}
		} else {
			result.setIsComplete(false);
			msg += "[员工信息不能为空]";
		}
		result.setMessage(msg);
		return result;
	}

}
