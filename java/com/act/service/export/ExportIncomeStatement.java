/**
 * 
 */
package com.act.service.export;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Map;

import jxl.write.Label;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

import com.act.model.JournalDetail;

/**
 *損益表
 *導出到excel
 */
public class ExportIncomeStatement extends ExportBaseService{
	public ExportIncomeStatement(){
		//column= 5;
		super(5);
	}
	
	/* (non-Javadoc)
	 * @see com.act.service.export.ExportService#doMain(java.util.List)
	 */
	@SuppressWarnings("unchecked")
	@Override
	void doMain(Object data) throws RowsExceededException,
			WriteException {
		//欄位標題列
		ws.addCell(new Label(0, curRow, "科目代號", formatTitle));
		ws.addCell(new Label(1, curRow, "會計科目", formatTitle));
		ws.addCell(new Label(2, curRow, "借方金額", formatTitleR));
		ws.addCell(new Label(3, curRow, "貸方金額", formatTitleR));
		ws.addCell(new Label(4, curRow, "合計", formatTitleR));
		ws.setRowView(bodyRow, 400);
		curRow++;
		
		DecimalFormat df = new DecimalFormat("#.###");
		
		Map<String, List<JournalDetail>> map = (Map<String, List<JournalDetail>>) data;
		
		List<JournalDetail> opRevList = map.get("opRev");
		List<JournalDetail> opCostList = map.get("opCost");
		List<JournalDetail> opExpList = map.get("opExp");
		List<JournalDetail> nonOpRevList = map.get("nonOpRev");
		List<JournalDetail> nonOpExpList = map.get("nonOpExp");
		
		/**
		 * list Income Statement - Operating Revenue<br>
		 * for損益表  <i>計算一段時間內"營業收入"相關科目的借貸匯總</i>
		 */
		//"營業收入"區塊標題
		ws.addCell(new Label(0, curRow, "營業收入", formatBlockL_NoLine));
		ws.mergeCells(0, curRow, 4, curRow);
		ws.setRowView(curRow, 500);
		curRow++;
		
		//"營業收入"區塊內容
		double opRevSumDebit = 0;
		double opRevSumCredit = 0;
		for(JournalDetail detail : opRevList){
			ws.setRowView(curRow, 300);// 正文行高300
			for(int j=0; j<5; j++) {
				switch(j) {
					case 0: {
				        ws.addCell(new Label(j, curRow, detail.getCode(), format1));
				        ws.setColumnView(j, 20);// 设置列宽
				        break;
				    }
					case 1: { 
				        ws.addCell(new Label(j, curRow, detail.getName(), format1));
				        ws.setColumnView(j, 20);
				        break;
				    }
					case 2: { 	
						opRevSumDebit += detail.getDebitAmount();
				        
				        if(detail.getDebitAmount() == 0) {
							ws.addCell(new jxl.write.Label(j, curRow, "", formatR));
						}
				        else {
							ws.addCell(new jxl.write.Number(j, curRow, detail.getDebitAmount(), formatR));
						}
				        
				        ws.setColumnView(j, 20);
				        break;
				    }
					case 3: {
						opRevSumCredit += detail.getCreditAmount();
						
						if(detail.getCreditAmount() == 0) {
							ws.addCell(new jxl.write.Label(j, curRow, "", formatR));
						}
						else {
							ws.addCell(new jxl.write.Number(j, curRow, detail.getCreditAmount(), formatR));
						}
						
				        ws.setColumnView(j, 20);
				        break;
				    }
					case 4: {
						ws.addCell(new Label(j, curRow, "", formatR));
				        ws.setColumnView(j, 20);
				        break;
				    }
				}
			}
			curRow++;
		}
		
		//"營業收入"區塊總計
		ws.addCell(new Label(0, curRow, "營業收入總計", formatBlockL));
		
		double opRevRemain = opRevSumCredit - opRevSumDebit;
		
		if(opRevRemain >= 0) {
			ws.addCell(new jxl.write.Label(2, curRow, "", formatBlockR));
			ws.addCell(new jxl.write.Label(3, curRow, df.format(opRevRemain), formatBlockR));
			ws.addCell(new jxl.write.Label(4, curRow, "", formatBlockR));
		}
		else {
			ws.addCell(new jxl.write.Label(2, curRow, "", formatBlockR));
			ws.addCell(new jxl.write.Label(3, curRow, "("+df.format(0 - opRevRemain)+")", formatBlockR));
			ws.addCell(new jxl.write.Label(4, curRow, "", formatBlockR));
		}
		
		ws.mergeCells(0, curRow, 1, curRow);
		ws.setRowView(curRow, 500);
		curRow++;
		
		/**
		 * list Income Statement - Operating Costs<br>
		 * for損益表  <i>計算一段時間內"營業成本"相關科目的借貸匯總</i>
		 */
		//"營業成本"區塊標題
		ws.addCell(new Label(0, curRow, "營業成本", formatBlockL_NoLine));
		ws.mergeCells(0, curRow, 4, curRow);
		ws.setRowView(curRow, 500);
		curRow++;
		
		//"營業成本"區塊內容
		double opCostSumDebit = 0;
		double opCostSumCredit = 0;
		for(JournalDetail detail : opCostList){
			ws.setRowView(curRow, 300);// 正文行高300
			for(int j=0; j<5; j++) {
				switch(j) {
					case 0: {
				        ws.addCell(new Label(j, curRow, detail.getCode(), format1));
				        ws.setColumnView(j, 20);// 设置列宽
				        break;
				    }
					case 1: { 
				        ws.addCell(new Label(j, curRow, detail.getName(), format1));
				        ws.setColumnView(j, 20);
				        break;
				    }
					case 2: { 	
						opCostSumDebit += detail.getDebitAmount();
				        
				        if(detail.getDebitAmount() == 0) {
							ws.addCell(new jxl.write.Label(j, curRow, "", formatR));
						}
				        else {
							ws.addCell(new jxl.write.Number(j, curRow, detail.getDebitAmount(), formatR));
						}
				        
				        ws.setColumnView(j, 20);
				        break;
				    }
					case 3: {
						opCostSumCredit += detail.getCreditAmount();
						
						if(detail.getCreditAmount() == 0) {
							ws.addCell(new jxl.write.Label(j, curRow, "", formatR));
						}
						else {
							ws.addCell(new jxl.write.Number(j, curRow, detail.getCreditAmount(), formatR));
						}
						
				        ws.setColumnView(j, 20);
				        break;
				    }
					case 4: {
						ws.addCell(new Label(j, curRow, "", formatR));
				        ws.setColumnView(j, 20);
				        break;
				    }
				}
			}
			curRow++;
		}
		
		//"營業成本"區塊總計
		ws.addCell(new Label(0, curRow, "營業成本總計", formatBlockL));
		
		double opCostRemain = opCostSumDebit - opCostSumCredit;
		
		if(opCostRemain >= 0) {
			ws.addCell(new jxl.write.Label(2, curRow, df.format(opCostRemain), formatBlockR));
			ws.addCell(new jxl.write.Label(3, curRow, "", formatBlockR));
			ws.addCell(new jxl.write.Label(4, curRow, "", formatBlockR));
		}
		else {
			ws.addCell(new jxl.write.Label(2, curRow, "("+df.format(0 - opCostRemain)+")", formatBlockR));
			ws.addCell(new jxl.write.Label(3, curRow, "", formatBlockR));
			ws.addCell(new jxl.write.Label(4, curRow, "", formatBlockR));
		}
		
		ws.mergeCells(0, curRow, 1, curRow);
		ws.setRowView(curRow, 500);
		curRow++;
		
		/**
		 * 營業毛利（營業收入 - 營業成本）
		 */
		double grossProfit = opRevRemain - opCostRemain;
		
		ws.addCell(new Label(0, curRow, "營業毛利", formatgrossProfitL));
		if(grossProfit >= 0) {
			ws.addCell(new Label(4, curRow, df.format(grossProfit), formatgrossProfitR));
		}
		else {
			ws.addCell(new Label(4, curRow, "("+df.format(0 - grossProfit)+")", formatgrossProfitR));
		}
		
		ws.mergeCells(0, curRow, 3, curRow);
		ws.setRowView(curRow, 500);
		curRow++;
		
		/**
		 * list Income Statement - Operating Expenses<br>
		 * for損益表  <i>計算一段時間內"營業費用"相關科目的借貸匯總</i>
		 */
		//"營業費用"區塊標題
		ws.addCell(new Label(0, curRow, "營業費用", formatBlockL_NoLine));
		ws.mergeCells(0, curRow, 4, curRow);
		ws.setRowView(curRow, 500);
		curRow++;
		
		//"營業費用"區塊內容
		double opExpSumDebit = 0;
		double opExpSumCredit = 0;
		for(JournalDetail detail : opExpList){
			ws.setRowView(curRow, 300);// 正文行高300
			for(int j=0; j<5; j++) {
				switch(j) {
					case 0: {
				        ws.addCell(new Label(j, curRow, detail.getCode(), format1));
				        ws.setColumnView(j, 20);// 设置列宽
				        break;
				    }
					case 1: { 
				        ws.addCell(new Label(j, curRow, detail.getName(), format1));
				        ws.setColumnView(j, 20);
				        break;
				    }
					case 2: { 	
						opExpSumDebit += detail.getDebitAmount();
				        
				        if(detail.getDebitAmount() == 0) {
							ws.addCell(new jxl.write.Label(j, curRow, "", formatR));
						}
				        else {
							ws.addCell(new jxl.write.Number(j, curRow, detail.getDebitAmount(), formatR));
						}
				        
				        ws.setColumnView(j, 20);
				        break;
				    }
					case 3: {
						opExpSumCredit += detail.getCreditAmount();
						
						if(detail.getCreditAmount() == 0) {
							ws.addCell(new jxl.write.Label(j, curRow, "", formatR));
						}
						else {
							ws.addCell(new jxl.write.Number(j, curRow, detail.getCreditAmount(), formatR));
						}
						
				        ws.setColumnView(j, 20);
				        break;
				    }
					case 4: {
						ws.addCell(new Label(j, curRow, "", formatR));
				        ws.setColumnView(j, 20);
				        break;
				    }
				}
			}
			curRow++;
		}
		
		//"營業費用"區塊總計
		ws.addCell(new Label(0, curRow, "營業費用總計", formatBlockL));
		
		double opExpRemain = opExpSumDebit - opExpSumCredit;
		
		if(opExpRemain >= 0) {
			ws.addCell(new jxl.write.Label(2, curRow, df.format(opExpRemain), formatBlockR));
			ws.addCell(new jxl.write.Label(3, curRow, "", formatBlockR));
			ws.addCell(new jxl.write.Label(4, curRow, "", formatBlockR));
		}
		else {
			ws.addCell(new jxl.write.Label(2, curRow, "("+df.format(0 - opExpRemain)+")", formatBlockR));
			ws.addCell(new jxl.write.Label(3, curRow, "", formatBlockR));
			ws.addCell(new jxl.write.Label(4, curRow, "", formatBlockR));
		}
		
		ws.mergeCells(0, curRow, 1, curRow);
		ws.setRowView(curRow, 500);
		curRow++;
		
		/**
		 * 營業毛利（營業收入 - 營業成本 - 營業費用）
		 */
		grossProfit = grossProfit - opExpRemain;
		
		ws.addCell(new Label(0, curRow, "營業毛利", formatgrossProfitL));
		if(grossProfit >= 0) {
			ws.addCell(new Label(4, curRow, df.format(grossProfit), formatgrossProfitR));
		}
		else {
			ws.addCell(new Label(4, curRow, "("+df.format(0 - grossProfit)+")", formatgrossProfitR));
		}
		
		ws.mergeCells(0, curRow, 3, curRow);
		ws.setRowView(curRow, 500);
		curRow++;
		
		/**
		 * list Income Statement - Non-Operating Revenue<br>
		 * for損益表  <i>計算一段時間內"非營業收益"相關科目的借貸匯總</i>
		 */
		//"非營業收益"區塊標題
		ws.addCell(new Label(0, curRow, "非營業收益", formatBlockL_NoLine));
		ws.mergeCells(0, curRow, 4, curRow);
		ws.setRowView(curRow, 500);
		curRow++;
		
		//"非營業收益"區塊內容
		double nonOpRevSumDebit = 0;
		double nonOpRevSumCredit = 0;
		for(JournalDetail detail : nonOpRevList){
			ws.setRowView(curRow, 300);// 正文行高300
			for(int j=0; j<5; j++) {
				switch(j) {
					case 0: {
				        ws.addCell(new Label(j, curRow, detail.getCode(), format1));
				        ws.setColumnView(j, 20);// 设置列宽
				        break;
				    }
					case 1: { 
				        ws.addCell(new Label(j, curRow, detail.getName(), format1));
				        ws.setColumnView(j, 20);
				        break;
				    }
					case 2: { 	
						nonOpRevSumDebit += detail.getDebitAmount();
				        
				        if(detail.getDebitAmount() == 0) {
							ws.addCell(new jxl.write.Label(j, curRow, "", formatR));
						}
				        else {
							ws.addCell(new jxl.write.Number(j, curRow, detail.getDebitAmount(), formatR));
						}
				        
				        ws.setColumnView(j, 20);
				        break;
				    }
					case 3: {
						nonOpRevSumCredit += detail.getCreditAmount();
						
						if(detail.getCreditAmount() == 0) {
							ws.addCell(new jxl.write.Label(j, curRow, "", formatR));
						}
						else {
							ws.addCell(new jxl.write.Number(j, curRow, detail.getCreditAmount(), formatR));
						}
						
				        ws.setColumnView(j, 20);
				        break;
				    }
					case 4: {
						ws.addCell(new Label(j, curRow, "", formatR));
				        ws.setColumnView(j, 20);
				        break;
				    }
				}
			}
			curRow++;
		}
		
		//"非營業收益"區塊總計
		ws.addCell(new Label(0, curRow, "非營業收益總計", formatBlockL));
		
		double nonOpRevRemain = nonOpRevSumCredit - nonOpRevSumDebit;
		
		if(nonOpRevRemain >= 0) {
			ws.addCell(new jxl.write.Label(2, curRow, "", formatBlockR));
			ws.addCell(new jxl.write.Label(3, curRow, df.format(nonOpRevRemain), formatBlockR));
			ws.addCell(new jxl.write.Label(4, curRow, "", formatBlockR));
		}
		else {
			ws.addCell(new jxl.write.Label(2, curRow, "", formatBlockR));
			ws.addCell(new jxl.write.Label(3, curRow, "("+df.format(0 - nonOpRevRemain)+")", formatBlockR));
			ws.addCell(new jxl.write.Label(4, curRow, "", formatBlockR));
		}
		
		ws.mergeCells(0, curRow, 1, curRow);
		ws.setRowView(curRow, 500);
		curRow++;
		
		/**
		 * list Income Statement - Non-Operating Expenses<br>
		 * for損益表  <i>計算一段時間內"非營業損失"相關科目的借貸匯總</i>
		 */
		//"非營業損失"區塊標題
		ws.addCell(new Label(0, curRow, "非營業損失", formatBlockL_NoLine));
		ws.mergeCells(0, curRow, 4, curRow);
		ws.setRowView(curRow, 500);
		curRow++;
		
		//"非營業損失"區塊內容
		double nonOpExpSumDebit = 0;
		double nonOpExpSumCredit = 0;
		for(JournalDetail detail : nonOpExpList){
			ws.setRowView(curRow, 300);// 正文行高300
			for(int j=0; j<5; j++) {
				switch(j) {
					case 0: {
				        ws.addCell(new Label(j, curRow, detail.getCode(), format1));
				        ws.setColumnView(j, 20);// 设置列宽
				        break;
				    }
					case 1: { 
				        ws.addCell(new Label(j, curRow, detail.getName(), format1));
				        ws.setColumnView(j, 20);
				        break;
				    }
					case 2: { 	
						nonOpExpSumDebit += detail.getDebitAmount();
				        
				        if(detail.getDebitAmount() == 0) {
							ws.addCell(new jxl.write.Label(j, curRow, "", formatR));
						}
				        else {
							ws.addCell(new jxl.write.Number(j, curRow, detail.getDebitAmount(), formatR));
						}
				        
				        ws.setColumnView(j, 20);
				        break;
				    }
					case 3: {
						nonOpExpSumCredit += detail.getCreditAmount();
						
						if(detail.getCreditAmount() == 0) {
							ws.addCell(new jxl.write.Label(j, curRow, "", formatR));
						}
						else {
							ws.addCell(new jxl.write.Number(j, curRow, detail.getCreditAmount(), formatR));
						}
						
				        ws.setColumnView(j, 20);
				        break;
				    }
					case 4: {
						ws.addCell(new Label(j, curRow, "", formatR));
				        ws.setColumnView(j, 20);
				        break;
				    }
				}
			}
			curRow++;
		}
		
		//"非營業損失"區塊總計
		ws.addCell(new Label(0, curRow, "非營業損失總計", formatBlockL));
		
		double nonOpExpRemain = nonOpExpSumDebit - nonOpExpSumCredit;
		
		if(nonOpExpRemain >= 0) {
			ws.addCell(new jxl.write.Label(2, curRow, df.format(nonOpExpRemain), formatBlockR));
			ws.addCell(new jxl.write.Label(3, curRow, "", formatBlockR));
			ws.addCell(new jxl.write.Label(4, curRow, "", formatBlockR));
		}
		else {
			ws.addCell(new jxl.write.Label(2, curRow, "("+df.format(0 - nonOpExpRemain)+")", formatBlockR));
			ws.addCell(new jxl.write.Label(3, curRow, "", formatBlockR));
			ws.addCell(new jxl.write.Label(4, curRow, "", formatBlockR));
		}
		
		ws.mergeCells(0, curRow, 1, curRow);
		ws.setRowView(curRow, 500);
		curRow++;
		
		/**
		 * 純益/純損（營業毛利 + 非營業收益 - 非營業損失）
		 */
		double netIncome = grossProfit + nonOpRevRemain - nonOpExpRemain;
		
		ws.addCell(new Label(0, curRow, "純益（純損）", formatgrossProfitL));
		if(netIncome >= 0) {
			ws.addCell(new Label(4, curRow, df.format(netIncome), formatgrossProfitR));
		}
		else {
			ws.addCell(new Label(4, curRow, "("+df.format(0 - netIncome)+")", formatgrossProfitR));
		}
		
		ws.mergeCells(0, curRow, 3, curRow);
		ws.setRowView(curRow, 500);
	}
}
