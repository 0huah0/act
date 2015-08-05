package com.abcdef.core.log;

import java.lang.reflect.Method;
import java.util.Date;
import javax.annotation.Resource;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.ProceedingJoinPoint;
import com.abcdef.core.util.ContextUtil;
import com.abcdef.frm.model.system.AppUser;
import com.abcdef.frm.model.system.SystemLog;
import com.abcdef.frm.service.system.SystemLogService;

public class LogAspect {
	
	@Resource
	private SystemLogService systemLogService;
	
	private Log logger = LogFactory.getLog(LogAspect.class);

	public Object doSystemLog(ProceedingJoinPoint point) throws Throwable {

		String methodName = point.getSignature().getName();

		// 目标方法不为空
		if (StringUtils.isNotEmpty(methodName)) {
			// set与get方法除外
			if (!(methodName.startsWith("set") || methodName.startsWith("get"))) {

				Class targetClass = point.getTarget().getClass();
				Method method = targetClass.getMethod(methodName);

				if (method != null) {

					boolean hasAnnotation = method.isAnnotationPresent(Action.class);

					if (hasAnnotation) {
						Action annotation = method.getAnnotation(Action.class);
						
						String methodDescp = annotation.description();
						if (logger.isDebugEnabled()) {
							logger.debug("Action method:" + method.getName() + " Description:" + methodDescp);
						}
						//取到当前的操作用户
						AppUser appUser=ContextUtil.getCurrentUser();
						if(appUser!=null){
							try{
								SystemLog sysLog=new SystemLog();
								
								sysLog.setCreatetime(new Date());
								sysLog.setUserId(appUser.getUserId());
								sysLog.setUsername(appUser.getEmployee().getFullname());
								sysLog.setExeOperation(methodDescp);
								//TODO 保存和移除
								systemLogService.save(sysLog);
							}catch(Exception ex){
								logger.error(ex.getMessage());
							}
						}
						
					}
				}

			}
		}
		return point.proceed();
	}

}
