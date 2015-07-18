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
public class ExportBalanceSheet extends ExportBaseService{
	public ExportBalanceSheet(){
		//column= 5;
		super(6);
	}
	
	/* (non-Javadoc)
	 * @see com.act.service.export.ExportService#doMain(java.util.List)
	 */
	@SuppressWarnings("unchecked")
	@Override
	void doMain(Object data) throws RowsExceededException,
			WriteException {
		//欄位標題列
		ws.addCell(new Label(0, curRow, "會計科目", formatTitle));
		ws.addCell(new Label(1, curRow, "小計", formatTitleR));
		ws.addCell(new Label(2, curRow, "合計", formatTitleR));
		ws.addCell(new Label(3, curRow, "會計科目", formatTitle_LeftDotLine));
		ws.addCell(new Label(4, curRow, "小計", formatTitleR));
		ws.addCell(new Label(5, curRow, "合計", formatTitleR));
		ws.setRowView(bodyRow, 400);
		curRow++;
		
		int curRowLeft = curRow;
		int curRowRight = curRow;
		
		DecimalFormat df = new DecimalFormat("#.###");
		
		Map<String, List<JournalDetail>> map = (Map<String, List<JournalDetail>>) data;
		
		List<JournalDetail> assetsList = map.get("assets");
		List<JournalDetail> liabilitiesList = map.get("liabilities");
		List<JournalDetail> equityList = map.get("equity");
		
		/**
		 * list Balance Sheet - Assets<br>
		 * for 資產負債表  <i>計算一段時間內"資產"相關科目的借貸匯總</i>
		 */
		//"資產"區塊標題
		ws.addCell(new Label(0, curRowLeft, "資產", formatBlockL_NoLine));
		ws.mergeCells(0, curRowLeft, 2, curRowLeft);
		ws.setRowView(curRowLeft, 500);
		curRowLeft++;
		
		//"資產"區塊內容
		double assetsSingleRemain = 0;
		double assetsRemain = 0;
		for(JournalDetail detail : assetsList){
			ws.setRowView(curRowLeft, 300);// 正文行高300
			assetsSingleRemain = detail.getDebitAmount()-detail.getCreditAmount();
			for(int j=0; j<3; j++) {
				switch(j) {
					case 0: {
				        ws.addCell(new Label(j, curRowLeft, detail.getName(), format1));
				        ws.setColumnView(j, 30);// 设置列宽
				        break;
				    }
					case 1: {
						if(assetsSingleRemain >= 0) {
							ws.addCell(new Label(j, curRowLeft, df.format(assetsSingleRemain), formatR));
						}
						else {
							ws.addCell(new Label(j, curRowLeft, "("+df.format(0-assetsSingleRemain)+")", formatR));
						}
				        
				        ws.setColumnView(j, 15);
				        break;
				    }
					case 2: { 	
				        ws.addCell(new jxl.write.Label(j, curRowLeft, "", formatR));
				        ws.setColumnView(j, 15);
				        break;
				    }
				}
			}
			
			assetsRemain = assetsRemain + assetsSingleRemain;
			curRowLeft++;
		}
		
		/**
		 * list Balance Sheet - Liabilities<br>
		 * for 資產負債表  <i>計算一段時間內"負債"相關科目的借貸匯總</i>
		 */
		//"負債"區塊標題
		ws.addCell(new Label(3, curRowRight, "負債", formatBlockL_NoLine_LeftDotLine));
		ws.mergeCells(3, curRowRight, 5, curRowRight);
		ws.setRowView(curRowRight, 500);
		curRowRight++;
		
		//"負債"區塊內容
		double liabilitiesSingleRemain = 0;
		double liabilitiesRemain = 0;
		for(JournalDetail detail : liabilitiesList){
			ws.setRowView(curRowRight, 300);// 正文行高300
			liabilitiesSingleRemain = detail.getCreditAmount()-detail.getDebitAmount();
			for(int j=3; j<6; j++) {
				switch(j) {
					case 3: {
				        ws.addCell(new Label(j, curRowRight, detail.getName(), format1_LeftDotLine));
				        ws.setColumnView(j, 30);// 设置列宽
				        break;
				    }
					case 4: {
						if(liabilitiesSingleRemain >= 0) {
							ws.addCell(new Label(j, curRowRight, df.format(liabilitiesSingleRemain), formatR));
						}
						else {
							ws.addCell(new Label(j, curRowRight, "("+df.format(0-liabilitiesSingleRemain)+")", formatR));
						}
				        
				        ws.setColumnView(j, 15);
				        break;
				    }
					case 5: { 	
				        ws.addCell(new jxl.write.Label(j, curRowRight, "", formatR));
				        ws.setColumnView(j, 15);
				        break;
				    }
				}
			}
			
			liabilitiesRemain = liabilitiesRemain + liabilitiesSingleRemain;
			curRowRight++;
		}
		
		//"負債"區塊總計
		ws.addCell(new Label(3, curRowRight, "負債總計", formatBlockL_NoLine_LeftDotLine));
		
		if(liabilitiesRemain >= 0) {
			ws.addCell(new jxl.write.Label(5, curRowRight, df.format(liabilitiesRemain), formatBlockR_NoLine));
		}
		else {
			ws.addCell(new jxl.write.Label(5, curRowRight, "("+df.format(0 - liabilitiesRemain)+")", formatBlockR_NoLine));
		}
		
		ws.mergeCells(3, curRowRight, 4, curRowRight);
		ws.setRowView(curRowRight, 500);
		curRowRight++;
		
		/**
		 * list Balance Sheet - Equity<br>
		 * for 資產負債表  <i>計算一段時間內"業主權益"相關科目的借貸匯總</i>
		 */
		//"業主權益"區塊標題
		ws.addCell(new Label(3, curRowRight, "業主權益", formatBlockL_NoLine_LeftDotLine));
		ws.mergeCells(3, curRowRight, 5, curRowRight);
		ws.setRowView(curRowRight, 500);
		curRowRight++;
		
		//"業主權益"區塊內容
		double equitySingleRemain = 0;
		double equityRemain = 0;
		for(JournalDetail detail : equityList){
			ws.setRowView(curRowRight, 300);// 正文行高300
			equitySingleRemain = detail.getCreditAmount()-detail.getDebitAmount();
			for(int j=3; j<6; j++) {
				switch(j) {
					case 3: {
				        ws.addCell(new Label(j, curRowRight, detail.getName(), format1_LeftDotLine));
				        ws.setColumnView(j, 30);// 设置列宽
				        break;
				    }
					case 4: {
						if(equitySingleRemain >= 0) {
							ws.addCell(new Label(j, curRowRight, df.format(equitySingleRemain), formatR));
						}
						else {
							ws.addCell(new Label(j, curRowRight, "("+df.format(0-equitySingleRemain)+")", formatR));
						}
				        
				        ws.setColumnView(j, 15);
				        break;
				    }
					case 5: { 	
				        ws.addCell(new jxl.write.Label(j, curRowRight, "", formatR));
				        ws.setColumnView(j, 15);
				        break;
				    }
				}
			}
			
			equityRemain = equityRemain + equitySingleRemain;
			curRowRight++;
		}
		
		//"業主權益"區塊總計
		ws.addCell(new Label(3, curRowRight, "業主權益總計", formatBlockL_NoLine_LeftDotLine));
		
		if(equityRemain >= 0) {
			ws.addCell(new jxl.write.Label(5, curRowRight, df.format(equityRemain), formatBlockR_NoLine));
		}
		else {
			ws.addCell(new jxl.write.Label(5, curRowRight, "("+df.format(0 - equityRemain)+")", formatBlockR_NoLine));
		}
		
		ws.mergeCells(3, curRowRight, 4, curRowRight);
		ws.setRowView(curRowRight, 500);
		curRowRight++;
		
		//判斷左右兩邊的Row數量
		if(curRowLeft > curRowRight) {//左側高於右側
			for(int i=curRowRight; i< curRowLeft; i++) {
				ws.addCell(new Label(3, i, "", format1_LeftDotLine));
				curRowRight++;
			}
		}
		else if(curRowLeft < curRowRight) {//右側高於左側
			for(int i=curRowLeft; i< curRowRight; i++) {
				curRowLeft++;
			}
		}
		
		/**
		 * 資產總額
		 */
		ws.addCell(new Label(0, curRowLeft, "資產總額", formatgrossProfitL));
		if(assetsRemain >= 0) {
			ws.addCell(new Label(2, curRowLeft, df.format(assetsRemain), formatgrossProfitR));
		}
		else {
			ws.addCell(new Label(2, curRowLeft, "("+df.format(0 - assetsRemain)+")", formatgrossProfitR));
		}
		
		ws.mergeCells(0, curRowLeft, 1, curRowLeft);
		ws.setRowView(curRowLeft, 500);
		
		/**
		 * 負債及業主權益總額
		 */
		double rightSideRemain = liabilitiesRemain + equityRemain;
		
		ws.addCell(new Label(3, curRowRight, "負債及業主權益總額", formatgrossProfitL_LeftDotLine));
		if(rightSideRemain >= 0) {
			ws.addCell(new Label(5, curRowRight, df.format(rightSideRemain), formatgrossProfitR));
		}
		else {
			ws.addCell(new Label(5, curRowRight, "("+df.format(0 - rightSideRemain)+")", formatgrossProfitR));
		}
		
		ws.mergeCells(3, curRowRight, 4, curRowRight);
		ws.setRowView(curRowRight, 500);
	}
}
