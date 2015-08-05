package com.abcdef.core.DataInit;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.Element;

import com.abcdef.core.model.BaseModel;
import com.abcdef.core.service.BaseService;
import com.abcdef.core.util.AppUtil;
import com.abcdef.core.util.XmlUtil;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method; 
/**
 * <P>
 * description:无限树,程序启动数据初始化!总体思路:将xml的model 节点属性转化为Map , 再将Map 转为javaBen 然后即可保存javaBean 到数据库
 * </P>
 * </B>
 */
public class DataInit {
	private static Log logger = LogFactory.getLog(DataInit.class);
	protected static java.text.SimpleDateFormat df = new SimpleDateFormat();
	//初始化入口
	public static void init(String absPath) {
		String confPath = absPath + "/WEB-INF/classes/conf";
		String dataInitFile = confPath + "/data-init.xml";
		Document rootDoc = XmlUtil.load(dataInitFile);
		if (rootDoc != null) {
			Element rootEl = rootDoc.getRootElement();
			initNode(rootEl,null);
		}
		
	}
	//递归调用
	public static void initNode(Element rootEl,Object parentObj) {
		if (rootEl != null) {
			Iterator<Element> model_It = rootEl.elementIterator();
			while (model_It.hasNext()) {
				Element modelEl = model_It.next();
				
				String _class = modelEl.attributeValue("class");
				String _service = modelEl.attributeValue("service");
				String _description = modelEl.attributeValue("description");
				
				
				
				//属性
				List<Element> propertyList =modelEl.selectNodes("property");
				Iterator<Element> modelIt = propertyList.iterator();
				//set
				List<Element> setList =modelEl.selectNodes("set");
				Iterator<Element> setIt = setList.iterator();
				try {
					com.abcdef.core.model.BaseModel model = (com.abcdef.core.model.BaseModel) Class.forName(_class).newInstance();
					BaseService service = (BaseService) AppUtil.getBean(_service);
					//将节点转为Map
					Map<Object,Object> nodeMap=convertNodeToMap(modelIt,parentObj);
					//将Map转为Bean
					model = (BaseModel) convertMapToBean(Class.forName(_class),nodeMap);
					//TODO 保存和移除
					model = (BaseModel) service.save(model);
					service.flush();
					
					//将Bean转为Map
					String primary_key = modelEl.attributeValue("primary-key");
					String key_type = modelEl.attributeValue("key-type");
					Map<Object,Object> beanMap=convertBeanToMap(model);
					Object key_value=beanMap.get(primary_key);
					while (setIt.hasNext()) {
						Element setEl = setIt.next();
						initNode(setEl,key_value);//递归
					}
					
				}catch (Exception e) {
					e.printStackTrace();
				}
				
				
			}
		}
	}
	//将XML 结点转化为Map

	private static Map<Object, Object> convertNodeToMap(Iterator<Element> modelIt,Object parentObj) {
		Map<Object, Object> beanMap = new HashMap<Object, Object>();
		if (modelIt != null) {// 表目录
				//Iterator<Element> modelIt = modelEl.elementIterator();
				while (modelIt.hasNext()) {
					Element propertyEl = modelIt.next();
					String type = propertyEl.attributeValue("type");// 类型
					String name = propertyEl.attributeValue("name");// 属情
					String value = propertyEl.attributeValue("value");// 值
					String foreign_key = propertyEl.attributeValue("foreign-key");
					
					java.lang.Object valueObj = null;
					if(foreign_key!=null&&foreign_key.equals("true")){
						valueObj=parentObj;
					}else{
						valueObj=convertValueObj(type,value,propertyEl);
					}

					beanMap.put(name, valueObj);

				}
		}
		return beanMap;
	}
	
	//将javaBean 转化为 Map 
	private static <T>Map<Object,Object> convertBeanToMap(Object bean) throws IntrospectionException{ 
		Class type = bean.getClass(); 
    Map returnMap = new HashMap(); 
    BeanInfo beanInfo = Introspector.getBeanInfo(type); 

    PropertyDescriptor[] propertyDescriptors =  beanInfo.getPropertyDescriptors(); 
    for (int i = 0; i< propertyDescriptors.length; i++) { 
        PropertyDescriptor descriptor = propertyDescriptors[i]; 
        String propertyName = descriptor.getName(); 
        if (!propertyName.equals("class")) { 
            Method readMethod = descriptor.getReadMethod(); 
           
            try {
				Object result = readMethod.invoke(bean, new Object[0]);
				returnMap.put(propertyName, result); 
			} catch (Exception e) {
				logger.debug("解析方法名:"+readMethod+",有误!");
				//e.printStackTrace();
			} 
            
            
            
        } 
    } 
    return returnMap; 
    }
	
	
	
	
	
	

	//将Map转化为javaBean
	private static <T> T convertMapToBean(Class<T> type, Map<Object, Object> map)
			throws IntrospectionException, InstantiationException,
			IllegalAccessException {
		BeanInfo beanInfo = Introspector.getBeanInfo(type); // 获取类属性
		T t = type.newInstance(); // 创建 JavaBean 对象

		// 给 JavaBean 对象的属性赋值
		for (PropertyDescriptor descriptor : beanInfo.getPropertyDescriptors()) {
			String propertyName = descriptor.getName();
			if (map.containsKey(propertyName)) {
				// 下面一句可以 try 起来，这样当一个属性赋值失败的时候就不会影响其他属性赋值。
				try {
					descriptor.getWriteMethod()
							.invoke(t, map.get(propertyName));
				} catch (Exception e) {
					logger.debug("属性:" + propertyName + ",或值:"
							+ map.get(propertyName) + ":有误!");
					e.printStackTrace();
				}
			}
		}
		return t;
	}
	
	
	//根据xml结点属性,组织适当的值
	private static java.lang.Object convertValueObj(String type,String value,Element propertyEl ) {
		java.lang.Object valueObj = null;
		if (type.equals("java.util.Date") || type.equals("Date")) {// 日期
			String date_format = propertyEl
					.attributeValue("date-format");// 日期格式
			df.applyPattern(date_format);

			String today_value = propertyEl
					.attributeValue("today-value");// 是否当日
			if (today_value != null && today_value.equals("true")) {
				valueObj = new java.util.Date();
			} else {

				if (value != null && !value.equals("")) {
					try {
						valueObj = df.parse(value);
					} catch (ParseException e) {
						e.printStackTrace();
					}
				}
			}

		} else if (type.equals("java.lang.Long")
				|| type.equals("Long")) {
			if (value != null)
				valueObj = new Long(value);
		} else if (type.equals("java.lang.Short")
				|| type.equals("Short")) {
			if (value != null)
				valueObj = new Short(value);
		} else if (type.equals("java.lang.Double")
				|| type.equals("Double")) {
			if (value != null)
				valueObj = new Double(value);
		} else if (type.equals("java.lang.Float")
				|| type.equals("Float")) {
			valueObj = new Float(value);
		} else if (type.equals("java.lang.Integer")
				|| type.equals("Integer")) {
			if (value != null)
				valueObj = new Integer(value);
		} else {
			if (value != null)
				valueObj = new String(value);
		}
		return valueObj;
	}
}
