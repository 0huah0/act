package com.abcdef.core.web.listener;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import com.abcdef.core.util.AppUtil;

/**
 * 主要用于监听在线用户的信息
 *
 */
public class UserSessionListener implements HttpSessionListener {

    /**
     * Default constructor. 
     */
    public UserSessionListener() {
        
    }

	/**
     * @see HttpSessionListener#sessionCreated(HttpSessionEvent)
     */
    public void sessionCreated(HttpSessionEvent arg0) {
        
    }

	/**
     * @see HttpSessionListener#sessionDestroyed(HttpSessionEvent)
     */
    public void sessionDestroyed(HttpSessionEvent event) {
        //移除该在线用户
    	String sessionId=event.getSession().getId();
        AppUtil.removeOnlineUser(sessionId);
    }
	
}
