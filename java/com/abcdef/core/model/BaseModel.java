package com.abcdef.core.model;
import java.io.Serializable;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import flexjson.JSON;
/**
 * Base model
 * @author 
 *
 */
public class BaseModel implements Serializable{
	protected Log logger=LogFactory.getLog(BaseModel.class);
	private Integer version;
	@JSON(include=false)
	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}
	
	public String toString() {
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		return new ToStringBuilder(this).append(gson.toJson(this)).toString();
	}
}
