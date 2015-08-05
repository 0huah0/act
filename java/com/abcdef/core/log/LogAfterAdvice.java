package com.abcdef.core.log;

import java.lang.reflect.Method;

import org.aopalliance.aop.Advice;

public class LogAfterAdvice implements Advice{
	
	/**
	 * 保存日志
	 * @param returnObj
	 * @param method
	 * @param args
	 * @param targetObj
	 * @throws Throwable
	 */
	public void afterReturning(Object returnObj, Method method, Object[] args, Object targetObj) throws Throwable {   
		if(method.getName().equals("saveLog")) return;   
		
		System.out.println("save log is ------------>:" + method.getName());
		
	}  

	
}
