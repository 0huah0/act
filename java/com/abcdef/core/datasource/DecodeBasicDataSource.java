package com.abcdef.core.datasource;


/**
 * 系统默认对数据库链接字符串等数据进行加密以防止帐密泄漏，<code>DecodeBasicDataSource</code> 扩展
 * <code>BasicDataSource</code>实现解密这些关键数据
 * 
 * @author F3221430
 * 
 */
public class DecodeBasicDataSource extends
		org.apache.commons.dbcp.BasicDataSource {

	@Override
	public synchronized void setPassword(String password) {

//		DESUtil desUtil = new DESUtil("gds+88");
//		String decodePassword = desUtil.decrypt(password);
//		super.setPassword(decodePassword);
		super.setPassword(password);
	}
	
}
