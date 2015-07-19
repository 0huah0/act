package com.abcdef.frm.model.system;
/*
 *  
 *  
*/

import java.util.Set;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;

import com.abcdef.core.model.BaseModel;
import com.abcdef.core.model.CheckCompleteResult;
import com.abcdef.core.model.GenericModel;

/**
 * AppFunction Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 */
public class AppFunction extends BaseModel implements GenericModel {

	private static final long serialVersionUID = 1L;
	protected Long functionId;
	protected String funKey;
	protected String funName;

	protected java.util.Set<FunUrl> funUrls = new java.util.HashSet<FunUrl>();
	//protected java.util.Set roleFuns = new java.util.HashSet();
	
	/**
	 * Default Empty Constructor for class AppFunction
	 */
	public AppFunction () {
		super();
	}
	
	public AppFunction(String funKey, String funName) {
		super();
		this.funKey = funKey;
		this.funName = funName;
	}



	/**
	 * Default Key Fields Constructor for class AppFunction
	 */
	public AppFunction (
		 Long in_functionId
        ) {
		this.setFunctionId(in_functionId);
    }


	public java.util.Set<FunUrl> getFunUrls () {
		return funUrls;
	}	
	
	public void setFunUrls (Set<FunUrl> in_funUrls) {
		this.funUrls = in_funUrls;
	}
    
	/**
	 * 	 * @return Long
     * @hibernate.id column="functionId" type="java.lang.Long" generator-class="native"
	 */
	public Long getFunctionId() {
		return this.functionId;
	}
	
	/**
	 * Set the functionId
	 */	
	public void setFunctionId(Long aValue) {
		this.functionId = aValue;
	}	

	/**
	 * 权限Key	 * @return String
	 * @hibernate.property column="funKey" type="java.lang.String" length="64" not-null="true" unique="false"
	 */
	public String getFunKey() {
		return this.funKey;
	}
	
	/**
	 * Set the funKey
	 * @spring.validator type="required"
	 */	
	public void setFunKey(String aValue) {
		this.funKey = aValue;
	}	

	/**
	 * 权限名称	 * @return String
	 * @hibernate.property column="funName" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getFunName() {
		return this.funName;
	}
	
	/**
	 * Set the funName
	 * @spring.validator type="required"
	 */	
	public void setFunName(String aValue) {
		this.funName = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof AppFunction)) {
			return false;
		}
		AppFunction rhs = (AppFunction) object;
		return new EqualsBuilder()
				.append(this.functionId, rhs.functionId)
				.append(this.funKey, rhs.funKey)
				.append(this.funName, rhs.funName)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.functionId) 
				.append(this.funKey) 
				.append(this.funName) 
				.toHashCode();
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
