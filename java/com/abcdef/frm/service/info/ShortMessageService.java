package com.abcdef.frm.service.info;
/*
 *   
 *   
*/
import java.util.Date;
import java.util.List;

import com.abcdef.core.service.BaseService;
import com.abcdef.core.web.paging.PagingBean;
import com.abcdef.frm.model.info.ShortMessage;

public interface ShortMessageService extends BaseService<ShortMessage> {

	public List<ShortMessage> findAll(Long userId,PagingBean pb);
	public List<ShortMessage> findByUser(Long userId);
	public List<?> searchShortMessage(Long userId,ShortMessage shortMessage,Date from,Date to,PagingBean pb);
	
	public ShortMessage save (Long senderId,String receiveIds,String content,Short msgType);
}
