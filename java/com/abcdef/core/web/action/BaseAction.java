package com.abcdef.core.web.action;
import java.util.Enumeration;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;
import com.abcdef.core.web.paging.PagingBean;


/**
 * Ext Base Action for all the request.
 */
public class BaseAction{
	public static final String SUCCESS = "success";
	public static final String INPUT = "input";
	
	private String successResultValue;

	public String getSuccessResultValue() {
		return successResultValue;
	}

	public void setSuccessResultValue(String successResultValue) {
		this.successResultValue = successResultValue;
	}

	public static final String JSON_SUCCESS = "{success:true}";
	
	/**
	 * 当前是升序还是降序排数据
	 */
	protected String dir;
	/**
	 * 排序的字段
	 */
	protected String sort;
	/**
	 * 每页的大小
	 */
	protected Integer limit = 25;
	/**
	 * 开始取数据的索引号
	 */
	protected Integer start = 0;

	protected String jsonString = JSON_SUCCESS;

	public void setJsonString(String jsonString) {
		this.jsonString = jsonString;
	}

	public String getJsonString() {
		return jsonString;
	}

	public BaseAction() {
		this.setSuccessResultValue("/jsonString.jsp");
	}

	protected transient final Log logger = LogFactory.getLog(getClass());

	//protected MailEngine mailEngine;
	
	public final String CANCEL = "cancel";

	public final String VIEW = "view";

	/**
	 * Convenience method to get the request
	 * 
	 * @return current request
	 */
	protected HttpServletRequest getRequest() {
		return ServletActionContext.getRequest();
	}

	/**
	 * Convenience method to get the response
	 * 
	 * @return current response
	 */
	protected HttpServletResponse getResponse() {
		return ServletActionContext.getResponse();
	}

	/**
	 * Convenience method to get the session. This will create a session if one
	 * doesn't exist.
	 * 
	 * @return the session from the request (request.getSession()).
	 */
	protected HttpSession getSession() {
		return getRequest().getSession();
	}

	// ---------------------------Methods------------------------------

	protected PagingBean getInitPagingBean() {
		PagingBean pb = new PagingBean(start,limit);
		return pb;
	}
	
	protected String getRequestParameter() {
		StringBuffer sb = new StringBuffer();
		@SuppressWarnings("rawtypes")
		Enumeration paramEnu = getRequest().getParameterNames();
    	while(paramEnu.hasMoreElements()){
    		String paramName=(String)paramEnu.nextElement();
    		sb.append(paramName);
    		sb.append("=");
    		sb.append(getRequest().getParameter(paramName));
    		sb.append(",");
    	}
    	return sb.substring(0, sb.length()-1);
	}

	public String list() {
		return SUCCESS;
	}

	public String edit() {
		return INPUT;
	}

	public String save() {
		return INPUT;
	}

	public String delete() {
		return SUCCESS;
	}

	public String multiDelete() {
		return SUCCESS;
	}

	public String multiSave() {
		return SUCCESS;
	}

	public String getDir() {
		return dir;
	}

	public void setDir(String dir) {
		this.dir = dir;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}
	
	public String execute() throws Exception {
		HttpServletRequest request=getRequest();   
        String uri=request.getRequestURI();   
        String url=uri.substring(request.getContextPath().length());   
        url=url.replace(".do", ".jsp");   
        url="/pages"+url;
        
        if(logger.isDebugEnabled()){
        	logger.debug("forward url:" + url);
        }
        setSuccessResultValue(url);   
        return SUCCESS;   

	}

}
