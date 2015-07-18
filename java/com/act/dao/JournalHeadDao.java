/**
 * 
 */
package com.act.dao;

import java.util.Date;

import com.abcdef.core.dao.BaseDao;
import com.act.model.JournalHead;

/**
 * 
 */
public interface JournalHeadDao extends BaseDao<JournalHead>{

	/**
	 * @param sdt
	 * @param edt
	 * @return
	 */
	String post(Date sdt, Date edt,String user)throws Exception ;

	/**
	 * @param sdt
	 * @param edt
	 * @param user
	 * @return
	 */
	String backup(Date sdt, Date edt, String user)throws Exception ;

	/**
	 * @param sdt
	 * @param edt
	 * @param user
	 * @return
	 */
	String restore(Date sdt, Date edt, String user)throws Exception ;

	/**
	 * @param sdt
	 * @param edt
	 * @param user
	 * @return
	 */
	String clear(Date sdt, Date edt, String user)throws Exception ;

}
