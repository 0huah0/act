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
 * IndexDisplay Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * ���������������������������������������������
 */
public class IndexDisplay extends BaseModel implements GenericModel {

    protected Long indexId;
	protected String portalId;
	protected Integer colNum;
	protected Integer rowNum;
	protected com.abcdef.frm.model.system.AppUser appUser;


	/**
	 * Default Empty Constructor for class IndexDisplay
	 */
	public IndexDisplay () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class IndexDisplay
	 */
	public IndexDisplay (
		 Long in_indexId
        ) {
		this.setIndexId(in_indexId);
    }

	
	public com.abcdef.frm.model.system.AppUser getAppUser () {
		return appUser;
	}	
	
	public void setAppUser (com.abcdef.frm.model.system.AppUser in_appUser) {
		this.appUser = in_appUser;
	}
    

	/**
	 * 	 * @return Long
     * @hibernate.id column="indexId" type="java.lang.Long" generator-class="native"
	 */
	public Long getIndexId() {
		return this.indexId;
	}
	
	/**
	 * Set the indexId
	 */	
	public void setIndexId(Long aValue) {
		this.indexId = aValue;
	}	

	/**
	 * Portal ID	 * @return String
	 * @hibernate.property column="portalId" type="java.lang.String" length="64" not-null="true" unique="false"
	 */
	public String getPortalId() {
		return this.portalId;
	}
	
	/**
	 * Set the portalId
	 * @spring.validator type="required"
	 */	
	public void setPortalId(String aValue) {
		this.portalId = aValue;
	}	

	/**
	 * 用户ID	 * @return Long
	 */
	public Long getUserId() {
		return this.getAppUser()==null?null:this.getAppUser().getUserId();
	}
	
	/**
	 * Set the userId
	 */	
	public void setUserId(Long aValue) {
	    if (aValue==null) {
	    	appUser = null;
	    } else if (appUser == null) {
	        appUser = new com.abcdef.frm.model.system.AppUser(aValue);
	        appUser.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
			appUser.setUserId(aValue);
	    }
	}	

	/**
	 * 列号	 * @return Integer
	 * @hibernate.property column="colNum" type="java.lang.Integer" length="10" not-null="true" unique="false"
	 */
	public Integer getColNum() {
		return this.colNum;
	}
	
	/**
	 * Set the colNum
	 * @spring.validator type="required"
	 */	
	public void setColNum(Integer aValue) {
		this.colNum = aValue;
	}	

	/**
	 * 行号	 * @return Integer
	 * @hibernate.property column="rowNum" type="java.lang.Integer" length="10" not-null="true" unique="false"
	 */
	public Integer getRowNum() {
		return this.rowNum;
	}
	
	/**
	 * Set the rowNum
	 * @spring.validator type="required"
	 */	
	public void setRowNum(Integer aValue) {
		this.rowNum = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof IndexDisplay)) {
			return false;
		}
		IndexDisplay rhs = (IndexDisplay) object;
		return new EqualsBuilder()
				.append(this.indexId, rhs.indexId)
				.append(this.portalId, rhs.portalId)
						.append(this.colNum, rhs.colNum)
				.append(this.rowNum, rhs.rowNum)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.indexId) 
				.append(this.portalId) 
						.append(this.colNum) 
				.append(this.rowNum) 
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
