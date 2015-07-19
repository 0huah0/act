package com.abcdef.frm.service.info;
/*
 *   
 *   
*/
import java.util.Date;
import java.util.List;

import com.abcdef.core.service.BaseService;
import com.abcdef.core.web.paging.PagingBean;
import com.abcdef.frm.model.info.InMessage;
import com.abcdef.frm.model.info.ShortMessage;

public interface InMessageService extends BaseService<InMessage> {

	/**
	 * 读出最新的一条未读信息
	 */
	public InMessage findByRead(Long userId);
	public Integer findByReadFlag(Long userId);
	public List<InMessage> findAll(Long userId,PagingBean pb);
	public List<?> findByUser(Long userId,PagingBean pb);
	public List<?> searchInMessage(Long userId,InMessage inMessage,ShortMessage shortMessage,Date from,Date to,PagingBean pb);
	/**
	 * 查找最新的一条信息
	 * @param userId
	 * @return
	 */
	public InMessage findLatest(Long userId);
}
