package com.abcdef.frm.dao.info;
/*
 *   
 *  
*/
import java.util.Date;
import java.util.List;

import com.abcdef.core.dao.BaseDao;
import com.abcdef.core.web.paging.PagingBean;
import com.abcdef.frm.model.info.InMessage;
import com.abcdef.frm.model.info.ShortMessage;

public interface InMessageDao extends BaseDao<InMessage> {

	public InMessage findByRead(Long userId);
	public Integer findByReadFlag(Long userId);
	public List<InMessage> findAll(Long userId,PagingBean pb);
	public List<InMessage> findByShortMessage(ShortMessage shortMessage,PagingBean pb);
	public List findByUser(Long userId,PagingBean pb);
	public List findByUser(Long userId);
    /**
     * 查询发送出去的信息
     * @param userId
     * @param inMessage
     * @param shortMessage
     * @param from
     * @param to
     * @param pb
     * @return
     */
	public List searchInMessage(Long userId,InMessage inMessage,ShortMessage shortMessage,Date from,Date to,PagingBean pb);
	/**
	 * 查找最新的一条信息
	 * @param userId
	 * @return
	 */
	public InMessage findLatest(Long userId);
}