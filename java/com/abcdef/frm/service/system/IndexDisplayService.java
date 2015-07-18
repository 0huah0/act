package com.abcdef.frm.service.system;
/*
 *   
 *   
*/
import java.util.List;

import com.abcdef.core.service.BaseService;
import com.abcdef.frm.model.system.IndexDisplay;

public interface IndexDisplayService extends BaseService<IndexDisplay>{
	public List<IndexDisplay> findByUser(Long userId);
}


