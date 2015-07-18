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
 * GlobalType Base Java Bean, base class for the.ent.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * ������������
 */
public class GlobalType extends BaseModel implements GenericModel {	

    /**
	 * 
	 */
	private static final long serialVersionUID = 6934355052040788349L;
	
	protected Long proTypeId;
	protected String typeName;
	protected String path;
	protected Integer depth;
	protected Long parentId;
	protected String nodeKey;
	protected String catKey;
	protected Integer sn;


	/**
	 * Default Empty Constructor for class GlobalType
	 */
	public GlobalType () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class GlobalType
	 */
	public GlobalType (
		 Long in_proTypeId
        ) {
		this.setProTypeId(in_proTypeId);
    }

    

	/**
	 * 	 * @return Long
     * @hibernate.id column="proTypeId" type="java.lang.Long" generator-class="native"
	 */
	public Long getProTypeId() {
		return this.proTypeId;
	}
	
	/**
	 * Set the proTypeId
	 */	
	public void setProTypeId(Long aValue) {
		this.proTypeId = aValue;
	}	

	/**
	 * 名称	 * @return String
	 * @hibernate.property column="typeName" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getTypeName() {
		return this.typeName;
	}
	
	/**
	 * Set the typeName
	 * @spring.validator type="required"
	 */	
	public void setTypeName(String aValue) {
		this.typeName = aValue;
	}	

	/**
	 * 路径	 * @return String
	 * @hibernate.property column="path" type="java.lang.String" length="64" not-null="true" unique="false"
	 */
	public String getPath() {
		return this.path;
	}
	
	/**
	 * Set the path
	 * @spring.validator type="required"
	 */	
	public void setPath(String aValue) {
		this.path = aValue;
	}	

	/**
	 * 层次	 * @return Integer
	 * @hibernate.property column="depth" type="java.lang.Integer" length="10" not-null="true" unique="false"
	 */
	public Integer getDepth() {
		return this.depth;
	}
	
	/**
	 * Set the depth
	 * @spring.validator type="required"
	 */	
	public void setDepth(Integer aValue) {
		this.depth = aValue;
	}	


	/**
	 * 父节点	 * @return Long
	 * @hibernate.property column="parentId" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getParentId() {
		return this.parentId;
	}
	
	/**
	 * Set the parentId
	 */	
	public void setParentId(Long aValue) {
		this.parentId = aValue;
	}	

	/**
	 * 节点Key	 * @return Long
	 * @hibernate.property column="nodeKey" type="java.lang.String" length="64" not-null="true" unique="false"
	 */
	public String getNodeKey() {
		return this.nodeKey;
	}
	
	/**
	 * Set the nodeKey
	 * @spring.validator type="required"
	 */	
	public void setNodeKey(String aValue) {
		this.nodeKey = aValue;
	}	

	/**
	 * 节点分类Key	 * @return Long
	 * @hibernate.property column="Catkey" type="java.lang.String" length="64" not-null="true" unique="false"
	 */
	public String getCatKey() {
		return this.catKey;
	}
	
	/**
	 * Set the catKey
	 * @spring.validator type="required"
	 */	
	public void setCatKey(String aValue) {
		this.catKey = aValue;
	}	

	/**
	 * 序号	 * @return Integer
	 * @hibernate.property column="sn" type="java.lang.Integer" length="10" not-null="true" unique="false"
	 */
	public Integer getSn() {
		return this.sn;
	}
	
	/**
	 * Set the sn
	 * @spring.validator type="required"
	 */	
	public void setSn(Integer aValue) {
		this.sn = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof GlobalType)) {
			return false;
		}
		GlobalType rhs = (GlobalType) object;
		return new EqualsBuilder()
				.append(this.proTypeId, rhs.proTypeId)
				.append(this.typeName, rhs.typeName)
				.append(this.path, rhs.path)
				.append(this.depth, rhs.depth)
				.append(this.parentId, rhs.parentId)
				.append(this.nodeKey, rhs.nodeKey)
				.append(this.catKey, rhs.catKey)
				.append(this.sn, rhs.sn)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.proTypeId) 
				.append(this.typeName) 
				.append(this.path) 
				.append(this.depth) 
				.append(this.parentId) 
				.append(this.nodeKey) 
				.append(this.catKey) 
				.append(this.sn) 
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
