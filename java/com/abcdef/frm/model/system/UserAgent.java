package com.abcdef.frm.model.system;
/*
 *    
 *   
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

import com.abcdef.core.model.BaseModel;
import com.abcdef.core.model.CheckCompleteResult;
import com.abcdef.core.model.GenericModel;

/**
 * UserAgent Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * ������������������������������������������������������������
 */
public class UserAgent extends BaseModel implements GenericModel {

    protected Long grantId;
	protected Long userId;
	protected String fullname;
	protected Long grantUId;
	protected String grantFullname;
	protected Short grantSex;


	/**
	 * Default Empty Constructor for class UserAgent
	 */
	public UserAgent () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class UserAgent
	 */
	public UserAgent (
		 Long in_grantId
        ) {
		this.setGrantId(in_grantId);
    }

    

	/**
	 * 	 * @return Long
     * @hibernate.id column="grantId" type="java.lang.Long" generator-class="native"
	 */
	public Long getGrantId() {
		return this.grantId;
	}
	
	/**
	 * Set the grantId
	 */	
	public void setGrantId(Long aValue) {
		this.grantId = aValue;
	}	

	/**
	 * 代办用户ID	 * @return Long
	 * @hibernate.property column="userId" type="java.lang.Long" length="19" not-null="true" unique="false"
	 */
	public Long getUserId() {
		return this.userId;
	}
	
	/**
	 * Set the userId
	 * @spring.validator type="required"
	 */	
	public void setUserId(Long aValue) {
		this.userId = aValue;
	}	

	/**
	 * 	 * @return String
	 * @hibernate.property column="fullname" type="java.lang.String" length="64" not-null="false" unique="false"
	 */
	public String getFullname() {
		return this.fullname;
	}
	
	/**
	 * Set the fullname
	 */	
	public void setFullname(String aValue) {
		this.fullname = aValue;
	}	

	/**
	 * 被代办用户ID	 * @return Long
	 * @hibernate.property column="grantUId" type="java.lang.Long" length="19" not-null="true" unique="false"
	 */
	public Long getGrantUId() {
		return this.grantUId;
	}
	
	/**
	 * Set the grantUId
	 * @spring.validator type="required"
	 */	
	public void setGrantUId(Long aValue) {
		this.grantUId = aValue;
	}	

	/**
	 * 被代办用户名	 * @return String
	 * @hibernate.property column="grantFullname" type="java.lang.String" length="64" not-null="false" unique="false"
	 */
	public String getGrantFullname() {
		return this.grantFullname;
	}
	
	/**
	 * Set the grantFullname
	 */	
	public void setGrantFullname(String aValue) {
		this.grantFullname = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof UserAgent)) {
			return false;
		}
		UserAgent rhs = (UserAgent) object;
		return new EqualsBuilder()
				.append(this.grantId, rhs.grantId)
				.append(this.userId, rhs.userId)
				.append(this.fullname, rhs.fullname)
				.append(this.grantUId, rhs.grantUId)
				.append(this.grantFullname, rhs.grantFullname)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.grantId) 
				.append(this.userId) 
				.append(this.fullname) 
				.append(this.grantUId) 
				.append(this.grantFullname) 
				.toHashCode();
	}

	public Short getGrantSex() {
		return grantSex;
	}

	public void setGrantSex(Short grantSex) {
		this.grantSex = grantSex;
	}

	@Override
	public CheckCompleteResult checkComplete() {
		String msg = "";
		CheckCompleteResult result = new CheckCompleteResult();
		//TODO 增加检查逻辑
		result.setMessage(msg);
		return result;
	}

	

	

}
