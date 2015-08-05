package com.abcdef.core.web.listener;

import javax.servlet.ServletContextEvent;

import org.springframework.web.context.ContextLoaderListener;

import com.abcdef.core.util.AppUtil;

public class StartupListener extends ContextLoaderListener {
	
	public void contextInitialized(ServletContextEvent event) {

		super.contextInitialized(event);
		//初始化应用程序工具类 
		AppUtil.init(event.getServletContext());
		
		//是否同步菜单
		boolean isAynMenu=AppUtil.getIsSynMenu();
		
		if(isAynMenu){
			try {
				AppUtil.synMenu();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
}
