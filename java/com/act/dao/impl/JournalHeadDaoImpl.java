package com.act.dao.impl;

import java.util.Date;
import java.util.List;

import com.abcdef.core.dao.impl.BaseDaoImpl;
import com.act.dao.JournalHeadDao;
import com.act.model.JournalHead;
import com.google.gson.Gson;

@SuppressWarnings("unchecked")
public class JournalHeadDaoImpl extends BaseDaoImpl<JournalHead> implements JournalHeadDao{
	public JournalHeadDaoImpl() {
		super(JournalHead.class);
	}

	/**
	 * for print sql
	 * @param string
	 * @param args
	 * @return
	 */
	private int doUpdate(String sql, Object[] args) {
		System.out.println("update:"+sql);
		return jdbcTemplate.update(sql, args);
	}
	
	/**
	 * for print sql
	 * @param sql
	 * @param class1
	 * @param args
	 * @return
	 */
	private List<String> queryForList(String sql, Class<String> cls,
			Object[] args) {
		
		System.out.println("queryForList:"+sql);
		return jdbcTemplate.queryForList(sql,cls,args);
	}
	
	
	
	
	@Override
	public String post(Date sdt, Date edt,String user) throws Exception {
		return "post:"+doUpdate("update act_journal_head set is_post=1,update_by=?,update_date=? " +
				"where ref_date>=? and ref_date<=? and is_post = 0",  new Object[]{user,new Date(),sdt,edt});
	}

	@Override
	public String backup(Date sdt, Date edt, String user) throws Exception {
		
		Object []args = new Object[]{sdt,edt};
		
		
		//未过账记录
		List<String> unpostRefNo = queryForList("select ref_no from act_journal_head where ref_date>=? " +
				"and ref_date<=? and is_post<>1;",String.class,args);

		//备份act_journal_head,将is_backup置为1（便于恢复），其余保存一致
		doUpdate("insert into act_journal_head_backup (journal_head_id,ref_no,ref_date,brief,journal_type,data_from,is_post,is_delete,is_backup,create_date,create_by,update_date,update_by)" +
				" select journal_head_id,ref_no,ref_date,brief,journal_type,data_from,is_post,is_delete,1,create_date,create_by,update_date,update_by from act_journal_head where ref_date>=? " +
				"and ref_date<=? and is_backup=0 and is_post=1;", args );
		
		//备份act_journal_detail
		doUpdate("insert into act_journal_detail_backup select * from act_journal_detail " +
				"where ref_no in (select ref_no from act_journal_head where ref_date>=? and ref_date<=? and is_backup=0 and is_post=1);", args);
		
		int backupCount = doUpdate("update act_journal_head set is_backup=1 " +
				"where ref_date>=? and ref_date<=? and is_backup=0 and is_post=1;", args);
		
		return "backup:"+backupCount+",unpost:"+unpostRefNo.size()+",unpostRefNo:"+new Gson().toJson(unpostRefNo);
	}


	@Override
	public String restore(Date sdt, Date edt, String user) throws Exception {
		
		/* 思路：
		 * 1.统计主表中还在的已备份记录；
		 * 2.还原主表不存在的head记录；
		 * 3.还原主表不存在的detail记录；
		 * 4.删除备份的detail
		 * 5.删除备份的head
		 * 6.将刚还原的head记录的状态修改为“未备份”
		 * */
		Object []args = new Object[]{sdt,edt};
		Object []dbArgs = new Object[]{sdt,edt,sdt,edt};
		//主表中还在的已备份记录，未清除记录
		List<String> unClearRefNo = queryForList("select ref_no from act_journal_head " +
				"where ref_date>=? and ref_date<=? and is_backup=1;",String.class,args);

		//将主表中不存在的已备份记录还原
		doUpdate("insert into act_journal_head select * from act_journal_head_backup where ref_date>=? and ref_date<=? " +
				"and ref_no not in (select ref_no from act_journal_head where ref_date>=? and ref_date<=? and is_backup=1);", dbArgs);
		
		doUpdate("insert into act_journal_detail select jdb.* from act_journal_detail_backup jdb " +
				"join act_journal_head_backup jhb on jdb.ref_no =jhb.ref_no " +
				"where ref_date>=? and ref_date<=? and jhb.ref_no not in ( " +
					"select ref_no from act_journal_head where ref_date>=? and ref_date<=? and is_backup=0);", dbArgs);
		
		//清除备份
		doUpdate("delete from act_journal_detail_backup where ref_no in (select ref_no from act_journal_head_backup  where ref_date>=? and ref_date<=?);", args);
		doUpdate("delete from act_journal_head_backup where ref_date>=? and ref_date<=?;", args);
		
		//更新主表状态为未备份
		int backupCount = doUpdate("update act_journal_head set is_backup=0 where ref_date>=? and ref_date<=? " +
				"and is_backup=1 and is_post=1;", args);
		
		return "restore:"+backupCount+",unClear:"+unClearRefNo.size()+",unpostRefNo:"+new Gson().toJson(unClearRefNo);
	}

	@Override
	public String clear(Date sdt, Date edt, String user) throws Exception {
		
		Object []args = new Object[]{sdt,edt};
		
		//未过账记录
		List<String> unpostRefNo = queryForList("select ref_no from act_journal_head " +
				"where ref_date>=? and ref_date<=? and is_post<>1;",String.class,args);
		
		//未备份记录
		List<String> unbackup = queryForList("select ref_no from act_journal_head " +
				"where ref_date>=? and ref_date<=? and is_backup<>1;",String.class,args);

		//删除act_journal_detail
		doUpdate("delete from act_journal_detail where ref_no in (select ref_no from act_journal_head " +
				"where ref_date>=? and ref_date<=? and is_backup=1 and is_post=1);", args);
				
		//删除act_journal_head
		int clear = doUpdate("delete from act_journal_head where ref_date>=? and ref_date<=? and is_backup=1 and is_post=1;", args );
		
		return "clear:"+clear+",unpost:"+unpostRefNo.size()+",unpostRefNo:"+new Gson().toJson(unpostRefNo)+",unbackup:"+unbackup.size()+",unpostRefNo:"+new Gson().toJson(unbackup);
	}

	
	
}
