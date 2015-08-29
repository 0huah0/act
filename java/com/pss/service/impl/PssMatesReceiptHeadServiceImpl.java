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
import com.pss.dao.PssMatesReceiptHeadDao;
import com.pss.model.PssMatesReceiptDetail;
import com.pss.model.PssMatesReceiptHead;
import com.pss.model.PssPurchaseOrderDetail;
import com.pss.service.PssMaterialService;
import com.pss.service.PssMatesReceiptDetailService;
import com.pss.service.PssMatesReceiptHeadService;
import com.pss.service.PssPurchaseOrderDetailService;

public class PssMatesReceiptHeadServiceImpl extends BaseServiceImpl<PssMatesReceiptHead> implements PssMatesReceiptHeadService{
	
	@SuppressWarnings("unused")
	private PssMatesReceiptHeadDao dao;
	
	@Resource
	private JournalHeadService journalHeadService;
	@Resource
	private JournalDetailDao journalDetailDao;
	@Resource
	private PssMatesReceiptDetailService pssMatesReceiptDetailService;
	@Resource
	private PssPurchaseOrderDetailService pssPurchaseOrderDetailService;
	@Resource
	private PssMaterialService pssMaterialService;
	
	
	public PssMatesReceiptHeadServiceImpl(PssMatesReceiptHeadDao dao) {
		super(dao);
		this.dao=dao;
	}

	/**
	 * 收貨記賬
	 * @throws Exception 
	 */
	@Override
	public void saveJournal(PssMatesReceiptHead pssMatesReceiptHead) throws Exception {
		String un = ContextUtil.getCurrentUser().getUsername();
		Date date = new Date();
		
		JournalHead jh = new JournalHead();
		jh.setDataFrom("pss");//進銷存
		jh.setBrief("收貨自動記賬。收貨單編號"+pssMatesReceiptHead.getMrHeadId());
		jh.setCreateDate(new Date());
		jh.setRefDate(new Date());
		jh.setRefNo(new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date()));
		jh.setType(1);//日記賬
		jh.setIsBackup(0);
		jh.setIsDelete(0);
		jh.setIsPost(0);
		jh.setCreateBy(un);
		jh.setCreateDate(date);
		
		//收貨單
		QueryFilter filter = new QueryFilter();
		filter.addFilter("Q_mrHeadId_S_EQ", pssMatesReceiptHead.getMrHeadId());
		List<PssMatesReceiptHead> list = getAll(filter);
		if(list.size()>0){
			pssMatesReceiptHead = list.get(0);
		}
		jh = journalHeadService.save(jh);
		
		Double amount = getSumAmount(pssMatesReceiptHead);
		
		JournalDetail jd = new JournalDetail();
		jd.setCode("2311");
		jd.setName("應付公司債");
		jd.setCreditAmount(amount);
		jd.setCreateBy(un);
		jd.setCreateDate(date);
		journalDetailDao.save(jd);
		
		JournalDetail jd0 = new JournalDetail();
		jd0.setCode("1226");
		jd0.setName("原料");
		jd0.setDebitAmount(amount);	//借
		jd0.setCreateBy(un);
		jd0.setCreateDate(date);
		journalDetailDao.save(jd);
		
	}

	private Double getSumAmount(PssMatesReceiptHead pssMatesReceiptHead) {
		//收貨單
		QueryFilter filter = new QueryFilter();
		filter.addFilter("Q_mrHeadId_S_EQ", pssMatesReceiptHead.getMrHeadId());
		List<PssMatesReceiptDetail> list = pssMatesReceiptDetailService.getAll(filter);
		
		//採購單
		QueryFilter filter1 = new QueryFilter();
		filter1.addFilter("Q_poHeadId_S_EQ", pssMatesReceiptHead.getPoHeadId());
		List<PssPurchaseOrderDetail> list1 = pssPurchaseOrderDetailService.getAll(filter1);
		
		
		Double amountDouble = 0d;
		for (PssMatesReceiptDetail md : list) {
			for (PssPurchaseOrderDetail od : list1) {
				if(md.getMaterialId().equals(od.getMaterialId())){
					amountDouble += md.getReceiptNum() * od.getMaterialSalePrice();
				}
			}
		}
		return amountDouble;
	}

}