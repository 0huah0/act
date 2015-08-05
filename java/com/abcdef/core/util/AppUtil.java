package com.abcdef.core.util;

import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import javax.servlet.ServletContext;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.Node;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import com.abcdef.core.Constants;
import com.abcdef.core.DataInit.DataInit;
import com.abcdef.core.model.OnlineUser;
import com.abcdef.core.web.filter.SecurityInterceptorFilter;
import com.abcdef.frm.model.system.AppFunction;
import com.abcdef.frm.model.system.AppRole;
import com.abcdef.frm.model.system.AppUser;
import com.abcdef.frm.model.system.Company;
import com.abcdef.frm.model.system.FunUrl;
import com.abcdef.frm.model.system.SysConfig;
import com.abcdef.frm.service.system.AppFunctionService;
import com.abcdef.frm.service.system.CompanyService;
import com.abcdef.frm.service.system.FunUrlService;
import com.abcdef.frm.service.system.SysConfigService;

/**
 * 方便取得Spring容器，取得其他服务实例，必须在Spring的配置文件里进行配置
 * 如：<bean id="appUtil" class="com.gdssoft.util.core.AppUtil"/>
 * 也提供整个应用程序的相关配置获取方法
 * 
 *
 */
public class AppUtil implements ApplicationContextAware{
	
	private static Log logger=LogFactory.getLog(AppUtil.class);
	
	private final static String MENU_PATH = "/js/frm/menu";
	/**
	 * 存放应用程序的配置,如邮件服务器等
	 */
	private static Map configMap=new HashMap();
	/**
	 * 应用程序全局对象
	 */
	private static ServletContext servletContext=null;
	
	//存放在线用户,SessionId,OnlineUser
	private static Map<String, OnlineUser> onlineUsers=new LinkedHashMap<String, OnlineUser>();
	
	private static ApplicationContext appContext;
	
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.appContext=applicationContext;
	}

	/**
	 * 系统的左边导航菜单文档，当系统启动时，
	 * 由系统去解析menu.xml，并放置系统，供权限菜单使用
	 */
	private static Document lefMenuDocument=null;
	
	/**
	 * 公共菜单
	 */
	private static Document publicDocument=null;
	
	/**
	 * 公共菜单IDs
	 */
	private static Set<String> publicMenuIds=null; 
	
	
	public static Document getLeftMenuDocument(){
		return lefMenuDocument;
	}
	
	public static void setLeftMenuDocument(Document doc){
		lefMenuDocument=doc;
	}

	
	public static Document getPublicDocument() {
		return publicDocument;
	}

	public static void setPublicDocument(Document pubDoc) {
		publicDocument = pubDoc;
	}

	public static void setPublicMenuIds(Set<String> pubIds) {
		publicMenuIds = pubIds;
	}

	/**
	 * 取得Bean
	 * @param beanId
	 * @return
	 */
	public static Object getBean(String beanId){
		return appContext.getBean(beanId);
	}
	/**
	 * 返回在线用户
	 * @return
	 */
	public static Map<String,OnlineUser> getOnlineUsers(){
		return onlineUsers;
	}
	/**
	 * 移除在线用户 
	 * @param sessionId
	 */
	public static void removeOnlineUser(String sessionId){
		onlineUsers.remove(sessionId);
	} 
	
	public static void addOnlineUser(String sessionId,AppUser user){
		
		if(!onlineUsers.containsKey(sessionId) && null != user){
			OnlineUser onlineUser=new OnlineUser();
			if (user.getEmployee() != null) {
				onlineUser.setFullname(user.getEmployee().getFullname());
				onlineUser.setSex(user.getEmployee().getSex());
			}
			onlineUser.setSessionId(sessionId);
			onlineUser.setUsername(user.getUsername());
			onlineUser.setUserId(user.getUserId());
			if(!user.isSuperUser() && user.getEmployee()!=null){
			  onlineUser.setDepPath("."+user.getEmployee().getDepartment().getPath());
			}
			Set<AppRole> roles = user.getRoles();
			StringBuffer roleIds = new StringBuffer(",");
			for(AppRole role : roles){
				roleIds.append(role.getRoleId()+",");
			}
			onlineUser.setRoleIds(roleIds.toString());
			onlineUsers.put(sessionId, onlineUser);
		}
	}
	
	/**
	 * 取得应用程序的绝对路径
	 * @return
	 */
	public static String getAppAbsolutePath(){
		return servletContext.getRealPath("/");
	}
	
	/**
	 * 取得流程表单模板的目录的绝对路径
	 * @return
	 */
	public static String getFlowFormAbsolutePath(){
		String path=(String)configMap.get("app.flowFormPath");
		if(path==null) path="/WEB-INF/FlowForm/";
		return getAppAbsolutePath()+path;
		
	}
	
	public static String getMobileFlowFlowAbsPath(){
		return getAppAbsolutePath() + "/mobile/flow/FlowForm/";
	}
	
	/**
	 * 重新加载安全权限匹配的数据源
	 */
	public static void reloadSecurityDataSource(){
		SecurityInterceptorFilter securityInterceptorFilter=(SecurityInterceptorFilter)AppUtil.getBean("securityInterceptorFilter");
		securityInterceptorFilter.loadDataSource();
	}
	
	/**
	 * 应用程序启动时调用
	 * @param servletContext
	 */
	 public static void init(ServletContext in_servletContext){
	    	servletContext=in_servletContext;
	    	
	    	//读取来自config.properties文件的配置,并且放入configMap内,应用程序共同使用
	    	String filePath=servletContext.getRealPath("/WEB-INF/");
	    	String configFilePath=filePath+"/config.properties";
	    	Properties props=new Properties();
	    	try{
	    		FileInputStream fis=new FileInputStream(configFilePath);
	    		Reader r = new InputStreamReader(fis, "UTF-8"); 
	    		props.load(r);
	    		Iterator it= props.keySet().iterator();
	    		while(it.hasNext()){
	    			String key=(String)it.next();
	    			configMap.put(key, props.get(key));
	    		}
	    	}catch(Exception ex){
	    		logger.error(ex.getMessage());
	    	}
	    	
	    	
	    	reloadSysConfig();
	    	
	    	CompanyService companyService=(CompanyService)getBean("companyService");
	    	List<Company> cList=companyService.findCompany();
	    	if(cList.size()>0){
	    		Company company=cList.get(0);
	    		configMap.put(Constants.LOGO_PATH,company.getLogo());
	    		configMap.put(Constants.COMPANY_NAME,company.getCompanyName());
	    	}
	    	//加载菜单转换器
			String xslStyle=servletContext.getRealPath(MENU_PATH)+"/menu-left.xsl";
			Document doc = getOrignalMenuDocument();
			try{
				//把menu.xml中的Function元素去除，为系统的左菜单显示加快下载速度
				Document finalDoc=XmlUtil.styleDocument(doc,xslStyle);
				AppUtil.setLeftMenuDocument(finalDoc);
			}catch(Exception ex){
				logger.error("menux.xml trasform has error:" + ex.getMessage());
			}
			
			//加载公共权限，为用户认证提供方便
			String publicStyle=servletContext.getRealPath(MENU_PATH)+"/menu-public.xsl";
			try{
				Document publicDoc=XmlUtil.styleDocument(doc, publicStyle);
				HashSet pubIds=new HashSet();
				Element rootEl=publicDoc.getRootElement();
				 List idNodes=rootEl.selectNodes("/Menus//*");
				 for(int i=0;i<idNodes.size();i++){
					 Element el=(Element)idNodes.get(i);
					 Attribute attr= el.attribute("id");
					 if(attr!=null){
						 pubIds.add(attr.getValue());
					 }
				 }
				 
				 setPublicMenuIds(pubIds);
				 setPublicDocument(publicDoc);
					
			}catch(Exception ex){
				logger.error("menu.xml + menu-public.xsl transform has error:" + ex.getMessage());
			}
			
			//初始化安装
	    	if(isSetupMode()){
	    		/* 把流程从框架中剥离，后续考虑以模块形式接入进行，降低耦合。许健
	    		logger.info("开始初始化系统的缺省流程...");
		    	//ProcessInit.initFlows(getAppAbsolutePath());
		    	logger.info("结束初始化系统的缺省流程...");
	    		*/
	    		logger.info("初始化数据~	开始...");
	    		DataInit.init(getAppAbsolutePath());
	    		logger.info("初始化数据~	结束...");
	    		//将proper 写为 非安装模式
	    		com.abcdef.core.util.PropertiesUtil.writeKey(configFilePath, "setupMode", "false");
	    	}
			
			
			
			
	  }
	 
	 /**
	  * 取得未经转化的menu.xml文档,即直接加载menu.xml的Document
	  * @return
	  */
	 public static Document getOrignalMenuDocument(){
		 String menuFilePath = servletContext.getRealPath(MENU_PATH)+"/menu.xml";
		 Document doc = XmlUtil.load(menuFilePath);
		 return doc;
	 }
	 
	 /**
	  * 取得用于授权的文档，即转化后，去掉url的元素
	  * @return
	  */
	 public static Document getGrantMenuDocument(){
		String xslStyle = servletContext.getRealPath(MENU_PATH)+"/menu-grant.xsl";
		Document finalDoc=null;
		try{
			finalDoc=XmlUtil.styleDocument(getOrignalMenuDocument(),xslStyle);
		}catch(Exception ex){
			logger.error("menu.xml + menu-grant.xsl transform has error:" + ex.getMessage());
		}
		return finalDoc;
	 }
	 
	 /**
	  * 取得公共的菜单文档，即menu.xml文件中标注为isPublic=true的属性
	  * @return
	  */
	 public static Document getPublicMenuDocument(){
		return publicDocument;
	 }
	 
	 /**
	  * 取得当前配置文件中的公共菜单的ID
	  * @return
	  */
	 public static Set<String> getPublicMenuIds(){
		 return publicMenuIds;
	 }
	 
	 public static void synMenu() throws Exception{
		 AppFunctionService appFunctionService=(AppFunctionService)getBean("appFunctionService");
			FunUrlService funUrlService=(FunUrlService)getBean("funUrlService");
			
			//同步menu.xml中的功能菜单配置至app_function表
			
			List funNodeList=getOrignalMenuDocument().getRootElement().selectNodes("/Menus/Items//Item/Function");
			
			for(int i=0;i<funNodeList.size();i++){
				Element funNode=(Element)funNodeList.get(i);
				
				String key=funNode.attributeValue("id");
//				logger.info("id:" + key);
				String name=funNode.attributeValue("text");
				
				AppFunction appFunction=appFunctionService.getByKey(key);
				
				if(appFunction==null){	
					appFunction=new AppFunction(key,name);
				}else{
					appFunction.setFunName(name);
				}
				
				List urlNodes=funNode.selectNodes("./url");
				
				appFunctionService.save(appFunction);
				
				for(int k=0;k<urlNodes.size();k++){
					Node urlNode=(Node)urlNodes.get(k);
					String path=urlNode.getText();
					FunUrl fu=funUrlService.getByPathFunId(path, appFunction.getFunctionId());
					if(fu==null){
						fu=new FunUrl();
						fu.setUrlPath(path);
						fu.setAppFunction(appFunction);
						//TODO 保存和移除
						funUrlService.save(fu);
					}
				}
			}

	 }
	 
	 /*
	  * 是否同步菜单
	  */
	 public static boolean getIsSynMenu(){
	    String synMenu=(String)configMap.get("isSynMenu");
	    if("true".equals(synMenu)){
	    	return true;
	    }
	    return false;
	 }
	 
	/**
	 * 获取系统配置MAP 
	 */
	 public static Map getSysConfig(){
		 return configMap;
	 }
	 
	 public static void reloadSysConfig(){
			SysConfigService sysConfigService=(SysConfigService)getBean("sysConfigService");
	    	List<SysConfig> list=sysConfigService.getAll();
	    	for(SysConfig conf:list){
	    		configMap.put(conf.getConfigKey(),conf.getDataValue());
	    	}
	 }
	 
	 public static String getCompanyLogo(){
		 String defaultLogoPath=Constants.DEFAULT_LOGO;
		 String path=(String)configMap.get(Constants.LOGO_PATH);
		 if(StringUtils.isNotEmpty(path)){
			 //defaultLogoPath="/attachFiles/"+path;
			 defaultLogoPath=path;
		 }
		 return defaultLogoPath;
	 }
	 
	 public static String getCompanyName(){
		 String defaultName=Constants.DEFAULT_COMPANYNAME;
		 String companyName=(String)configMap.get(Constants.COMPANY_NAME);
		 if(StringUtils.isNotEmpty(companyName)){
			 defaultName=companyName;
		 }
		 return defaultName;
	 }
	 public static String getApplicationName(){
		 String defaultName=Constants.DEFAULT_APPLICATIONNAME;
		 String applicationName=(String)configMap.get(Constants.APPLICATION_NAME);
		 if(StringUtils.isNotEmpty(applicationName)){
			 defaultName=applicationName;
		 }
		 return defaultName;
	 }
	 /**
	  * 是否为安装模式
	  * @return
	  */
	 public static boolean isSetupMode(){
		 String isSetupMode=(String)configMap.get("setupMode");
		 if("true".equals(isSetupMode)){
			 return true;
		 }
		 return false;
	 }
	
}
