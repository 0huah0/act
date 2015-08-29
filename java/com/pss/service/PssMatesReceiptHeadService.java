/*
 * Powered By [shi_zenghua@qq.com]
 */

package com.pss.service;

import com.abcdef.core.service.BaseService;
import com.pss.model.PssMatesReceiptHead;

public interface PssMatesReceiptHeadService extends BaseService<PssMatesReceiptHead>{

	/**
	 * 收貨記賬
	 * @param pssMatesReceiptHead
	 * @throws Exception 
	 */
	public void saveJournal(PssMatesReceiptHead pssMatesReceiptHead) throws Exception;
	
}