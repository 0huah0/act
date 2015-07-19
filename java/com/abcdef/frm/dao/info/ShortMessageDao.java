package com.abcdef.frm.dao.info;
/*
 *   
 *  
*/
import java.util.Date;
import java.util.List;

import com.abcdef.core.dao.BaseDao;
import com.abcdef.core.web.paging.PagingBean;
import com.abcdef.frm.model.info.ShortMessage;

public interface ShortMessageDao extends BaseDao<ShortMessage> {

	public List<ShortMessage> findAll(Long userId,PagingBean pb);
	public List<ShortMessage> findByUser(Long userId);
	public List<?> searchShortMessage(Long userId,ShortMessage shortMessage,Date from,Date to,PagingBean pb);
}
