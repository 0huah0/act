/*
 * Powered By [shi_zenghua@qq.com]
 */

package com.pss.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.abcdef.core.command.QueryFilter;
import com.abcdef.core.service.impl.BaseServiceImpl;
import com.abcdef.core.util.ContextUtil;
import com.act.dao.JournalDetailDao;
import com.act.model.JournalDetail;
import com.act.model.JournalHead;
import com.act.service.JournalHeadService;
import com.pss.dao.PssDeliveryOrderHeadDao;
import com.pss.model.PssDeliveryOrderDetail;
import com.pss.model.PssDeliveryOrderHead;
import com.pss.model.PssSalesOrderDetail;
import com.pss.service.PssDeliveryOrderDetailService;
import com.pss.service.PssDeliveryOrderHeadService;
import com.pss.service.PssSalesOrderDetailService;

public class PssDeliveryOrderHeadServiceImpl extends BaseServiceImpl<PssDeliveryOrderHead> implements PssDeliveryOrderHeadService{
	@SuppressWarnings("unused")
	private PssDeliveryOrderHeadDao dao;

	@Resource
	private JournalHeadService journalHeadService;
	@Resource
	private JournalDetailDao journalDetailDao;
	@Resource
	private PssSalesOrderDetailService pssSalesOrderDetailService;
	@Resource
	private PssDeliveryOrderDetailService pssDeliveryOrderDetailService;
	
	public PssDeliveryOrderHeadServiceImpl(PssDeliveryOrderHeadDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	
	/**
	 * 收貨記賬
	 * @throws Exception 
	 */
	@Override
	public void saveJournal(PssDeliveryOrderHead pssDeliveryOrderHead) throws Exception {
		String un = ContextUtil.getCurrentUser().getUsername();
		Date date = new Date();
		
		JournalHead jh = new JournalHead();
		jh.setDataFrom("pss");
		jh.setBrief("出貨自動記賬。出貨單編號"+pssDeliveryOrderHead.getDoHeadId());
		jh.setCreateDate(date);
		jh.setRefDate(date);
		jh.setRefNo(new SimpleDateFormat("yyyyMMdd_HHmmss").format(date));
		jh.setType(1);//日記賬
		jh.setIsBackup(0);
		jh.setIsDelete(0);
		jh.setIsPost(0);
		jh.setCreateBy(un);
		jh.setCreateDate(date);
		
		//收貨單
		QueryFilter filter = new QueryFilter();
		filter.addFilter("Q_doHeadId_S_EQ", pssDeliveryOrderHead.getDoHeadId());
		List<PssDeliveryOrderHead> list = getAll(filter);
		if(list.size()>0){
			pssDeliveryOrderHead = list.get(0);
		}
		
		Double amount = getSumAmount(pssDeliveryOrderHead);
		jh = journalHeadService.save(jh);
		
		JournalDetail jd = new JournalDetail();
		jd.setCode("1211");
		jd.setName("商品存貨");
		jd.setCreditAmount(amount);
		jd.setJournalHead(jh);
		journalDetailDao.save(jd);
		
		JournalDetail jd0 = new JournalDetail();
		jd0.setCode("1141");
		jd0.setName("應收帳款");
		jd0.setDebitAmount(amount);	//借
		jd0.setJournalHead(jh);
		journalDetailDao.save(jd0);
	}

	private Double getSumAmount(PssDeliveryOrderHead pssDeliveryOrderHead) {
		//出貨單
		QueryFilter filter1 = new QueryFilter();
		filter1.addFilter("Q_doHeadId_S_EQ", pssDeliveryOrderHead.getDoHeadId());
		List<PssDeliveryOrderDetail> list = pssDeliveryOrderDetailService.getAll(filter1);
		
		//銷售單明細
		QueryFilter filter = new QueryFilter();
		filter.addFilter("Q_soHeadId_S_EQ", pssDeliveryOrderHead.getSoHeadId());
		List<PssSalesOrderDetail> list1 = pssSalesOrderDetailService.getAll(filter);
		
		Double amountDouble = 0d;
		for (PssDeliveryOrderDetail dd : list) {
			for (PssSalesOrderDetail sd : list1) {
				if(dd.getPdtId().equals(sd.getPdtId())){
					amountDouble += dd.getReceiptNum() * sd.getPdtRealPrice();
				}
			}
		}
		return amountDouble;
	}
}