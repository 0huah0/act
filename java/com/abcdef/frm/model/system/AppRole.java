package com.abcdef.frm.model.system;

/*
 *  
 *  
*/

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;

import com.abcdef.core.model.BaseModel;
import com.abcdef.core.model.CheckCompleteResult;
import com.abcdef.core.model.GenericModel;
import com.google.gson.annotations.Expose;

public class AppRole extends BaseModel implements GenericModel,GrantedAuthority {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public static String ROLE_PUBLIC = "ROLE_PUBLIC";

	public static String ROLE_ANONYMOUS = "ROLE_ANONYMOUS";

	/**
	 * 超级管理员的角色ID
	 */
	public static final Long SUPER_ROLEID = -1L;
	/**
	 * 通用角色ID
	 */
	public static final Long COMMON_ROLEID = -2L;
	/**
	 * 超级权限
	 */
	public static final String SUPER_RIGHTS = "__ALL";
	
	@Expose
	private Long roleId;
	@Expose
	private String roleName;
	@Expose
	private String roleCode;
	@Expose
	private String roleDesc;
	@Expose
	private Short status;
	@Expose
	private String rights;
	@Expose
	protected Date createDate;
	@Expose
	protected String createBy;
	@Expose
	protected Date updateDate;
	@Expose
	protected String updateBy;

	private Set<AppFunction> functions = new HashSet<AppFunction>();
	
	private Set<AppUser> appUsers = new HashSet<AppUser>();

	public AppRole() {

	}

	public Set<AppUser> getAppUsers() {
		return appUsers;
	}

	public void setAppUsers(Set<AppUser> appUsers) {
		this.appUsers = appUsers;
	}

	public String getRights() {
		return rights;
	}

	public void setRights(String rights) {
		this.rights = rights;
	}

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getRoleDesc() {
		return roleDesc;
	}

	public void setRoleDesc(String roleDesc) {
		this.roleDesc = roleDesc;
	}

	public Short getStatus() {
		return status;
	}

	public void setStatus(Short status) {
		this.status = status;
	}

	@Override
	public String getAuthority() {
		return roleCode;
	}

	public int compareTo(Object o) {
		return 0;
	}
/*整合jbpm需要实现其org.jbpm.api.identity.Group接口
	@Override
	public String getId() {
		return roleId.toString();
	}

	@Override
	public String getName() {
		return roleName;
	}

	@Override
	public String getType() {// 作为参与的侯选人
		return Participation.CANDIDATE;
	}
*/
	
	public Set<AppFunction> getFunctions() {
		return functions;
	}

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
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

	public void setFunctions(Set<AppFunction> functions) {
		this.functions = functions;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((roleId == null) ? 0 : roleId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AppRole other = (AppRole) obj;
		if (roleId == null) {
			if (other.roleId != null)
				return false;
		} else if (!roleId.equals(other.roleId))
			return false;
		return true;
	}

	@Override
	public CheckCompleteResult checkComplete() {
		String msg = "";
		CheckCompleteResult result = new CheckCompleteResult();
		if (null==this.roleCode || this.roleCode=="") {
			result.setIsComplete(false);
			msg = "[角色编号为空]";
		}
		if (null==this.roleName || this.roleName=="") {
			result.setIsComplete(false);
			msg = "[角色名称为空]";
		}
		if (null==this.status) {
			result.setIsComplete(false);
			msg = "[角色状态为空]";
		}
		result.setMessage(msg);
		return result;
	}
}
