package com.abcdef.core.model;
/**
 * 在线用户
 */
public class OnlineUser {
	/**
	 * sessionId
	 */
	private String sessionId;
	/**
	 * AppUser userId
	 */
	private Long userId;
	/**
	 * AppUser username
	 */
	private String username;
	/**
	 * AppUser fullname
	 */
	private String fullname;

	/**
	 * 部门Path
	 */
	private String depPath;
	/**
	 * 角色IDS
	 */
	private String roleIds;

	private Short sex;
	public OnlineUser() {

	}

	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getDepPath() {
		return depPath;
	}

	public void setDepPath(String depPath) {
		this.depPath = depPath;
	}

	public String getRoleIds() {
		return roleIds;
	}

	public void setRoleIds(String roleIds) {
		this.roleIds = roleIds;
	}

	public Short getSex() {
		return sex;
	}

	public void setSex(Short sex) {
		this.sex = sex;
	}

	
}	
