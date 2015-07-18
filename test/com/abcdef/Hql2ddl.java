package com.abcdef;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.cfg.Configuration;
import org.hibernate.cfg.Settings;
import org.hibernate.engine.SessionFactoryImplementor;
import org.hibernate.tool.hbm2ddl.SchemaUpdate;
import org.junit.Test;
import org.springframework.orm.hibernate3.LocalSessionFactoryBean;

import com.abcdef.core.util.AppUtil;

public class Hql2ddl extends BaseTestCase{

	//@Rollback(true)
	@Test
	public void testHql2ddl() {

		LocalSessionFactoryBean localSessionFactory = (LocalSessionFactoryBean) AppUtil
				.getBean("&sessionFactory");
		SessionFactoryImplementor sessionFactory = (SessionFactoryImplementor) AppUtil
				.getBean("sessionFactory");

		Configuration config = localSessionFactory.getConfiguration();
		
		System.out.println("--------------------------------------------");
		String classpath = getClass().getClassLoader().getResource("").getPath();
		System.out.println("CLASSPATH:"+classpath);
		
		/*List<String> fs = getXmlResources(classpath);
		for(String s : fs){
			s = s.substring(classpath.length()-1).replace("\\\\", "/");	
			System.out.println(s);
			config.addResource(s);
		}*/
		
		System.out.println("--------------------------------------------");
		
		Settings settings = sessionFactory.getSettings();
		new SchemaUpdate(config, settings).execute(true, true);
		
		System.out.println("--------------------------------------------");
		
		
//		Resource mappingLocation = new ClassPathResource("Customer.hbm.xml");
//		try {
//			config.addInputStream(mappingLocation.getInputStream());
//		} catch (MappingException e) {
//			e.printStackTrace();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		// 从SessionFactory中拿到属性配置信息
//
		// 请求 Hibernate 创建表
		/*if (settings.isAutoUpdateSchema()) {
			new SchemaUpdate(config, settings).execute(true, true);
		}*/
		// config.buildMapping();
		// Session session =
		// localSessionFactory.getConfiguration().buildSessionFactory().openSession();

		/*Session session = sessionFactory.openSession();
		session = session.getSession(EntityMode.MAP);

		Map c = new HashMap();
		c.put("name", "wangfneg");

		session.save("Customer", c);*/
	}

	@SuppressWarnings("unused")
	private List<String> getXmlResources(String path) {
		List<String> ls = new ArrayList<String>();
		
		File []files = new File(path).listFiles();
		for (File file : files) {
			if(file.isDirectory()){
				ls.addAll(getXmlResources(file.getPath()));
			}
			if(file.isFile()&&file.getName().endsWith(".hbm.xml")){
				ls.add(file.getPath());
			}
		}
		
		return ls;
	}
}
