/**
 * 
 */
package com.act.service.export;

import jxl.write.Label;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

/**
 *現金流量表
 *導出到excel
 */
public class ExportCashFlow extends ExportBaseService{
	public ExportCashFlow(){
		//column= 5;
		super(3);
	}
	
	/* (non-Javadoc)
	 * @see com.act.service.export.ExportService#doMain(java.util.List)
	 */
	@Override
	void doMain(Object data) throws RowsExceededException,
			WriteException {
		//欄位標題列
		ws.addCell(new Label(0, curRow, "項目", formatTitle));
		ws.addCell(new Label(1, curRow, "小計", formatTitleR));
		ws.addCell(new Label(2, curRow, "合計", formatTitleR));
		ws.setRowView(bodyRow, 400);
		curRow++;
		
		
		
		/**
		 * 營業活動
		 */
		//"營業活動"區塊標題
		ws.addCell(new Label(0, curRow, "營業活動之現金流量：", formatBlockL_NoLine_10));
		ws.mergeCells(0, curRow, 2, curRow);
		ws.setRowView(curRow, 500);
		curRow++;
		
		//"營業活動"區塊內容
		for(int j=0; j<3; j++) {
			switch(j) {
				case 0: {
			        ws.addCell(new Label(j, curRow, "", format1));
			        ws.setColumnView(j, 55);// 设置列宽
			        break;
			    }
				case 1: { 
			        ws.addCell(new Label(j, curRow, "", formatR));
			        ws.setColumnView(j, 20);
			        break;
			    }
				case 2: { 	
					ws.addCell(new jxl.write.Label(j, curRow, "", formatR));
			        ws.setColumnView(j, 20);
			        break;
			    }
			}
		}
		ws.setRowView(curRow, 300);// 正文行高300
		curRow++;
		
		//"營業活動"區塊總計
		ws.addCell(new Label(0, curRow, "營業活動之淨現金流入(流出)", formatBlockR_NoLine_10));
		ws.addCell(new jxl.write.Label(1, curRow, "", formatBlockR_NoLine_10));
		ws.addCell(new jxl.write.Label(2, curRow, "", formatBlockR_NoLine_10));
		ws.setRowView(curRow, 500);
		curRow++;
		
		/**
		 * 投資活動
		 */
		//"投資活動"區塊標題
		ws.addCell(new Label(0, curRow, "投資活動之現金流量：", formatBlockL_NoLine_10));
		ws.mergeCells(0, curRow, 2, curRow);
		ws.setRowView(curRow, 500);
		curRow++;
		
		//"投資活動"區塊內容
		for(int j=0; j<3; j++) {
			switch(j) {
				case 0: {
			        ws.addCell(new Label(j, curRow, "", format1));
			        ws.setColumnView(j, 55);// 设置列宽
			        break;
			    }
				case 1: { 
			        ws.addCell(new Label(j, curRow, "", formatR));
			        ws.setColumnView(j, 20);
			        break;
			    }
				case 2: { 	
					ws.addCell(new jxl.write.Label(j, curRow, "", formatR));
			        ws.setColumnView(j, 20);
			        break;
			    }
			}
		}
		ws.setRowView(curRow, 300);// 正文行高300
		curRow++;
		
		//"投資活動"區塊總計
		ws.addCell(new Label(0, curRow, "投資活動之淨現金流入(流出)", formatBlockR_NoLine_10));
		ws.addCell(new jxl.write.Label(1, curRow, "", formatBlockR_NoLine_10));
		ws.addCell(new jxl.write.Label(2, curRow, "", formatBlockR_NoLine_10));
		ws.setRowView(curRow, 500);
		curRow++;
		
		/**
		 * 融資活動
		 */
		//"融資活動"區塊標題
		ws.addCell(new Label(0, curRow, "融資活動之現金流量：", formatBlockL_NoLine_10));
		ws.mergeCells(0, curRow, 2, curRow);
		ws.setRowView(curRow, 500);
		curRow++;
		
		//"融資活動"區塊內容
		for(int j=0; j<3; j++) {
			switch(j) {
				case 0: {
			        ws.addCell(new Label(j, curRow, "", format1));
			        ws.setColumnView(j, 55);// 设置列宽
			        break;
			    }
				case 1: { 
			        ws.addCell(new Label(j, curRow, "", formatR));
			        ws.setColumnView(j, 20);
			        break;
			    }
				case 2: { 	
					ws.addCell(new jxl.write.Label(j, curRow, "", formatR));
			        ws.setColumnView(j, 20);
			        break;
			    }
			}
		}
		ws.setRowView(curRow, 300);// 正文行高300
		curRow++;
		
		//"融資活動"區塊總計
		ws.addCell(new Label(0, curRow, "融資活動之淨現金流入(流出)", formatBlockR_NoLine_10));
		ws.addCell(new jxl.write.Label(1, curRow, "", formatBlockR_NoLine_10));
		ws.addCell(new jxl.write.Label(2, curRow, "", formatBlockR_NoLine_10));
		ws.setRowView(curRow, 500);
		curRow++;
		
		/**
		 * 本期現金數目
		 */
		//"本期現金數目"區塊標題
		ws.addCell(new Label(0, curRow, "本期現金增加數", formatBlockL_NoLine_10));
		ws.mergeCells(0, curRow, 2, curRow);
		ws.setRowView(curRow, 500);
		curRow++;
		
		//"本期現金數目"區塊內容
		for(int j=0; j<3; j++) {
			switch(j) {
				case 0: {
			        ws.addCell(new Label(j, curRow, "現金（xx年xx月xx日）", format1));
			        ws.setColumnView(j, 55);// 设置列宽
			        break;
			    }
				case 1: { 
			        ws.addCell(new Label(j, curRow, "", formatR));
			        ws.setColumnView(j, 20);
			        break;
			    }
				case 2: { 	
					ws.addCell(new jxl.write.Label(j, curRow, "", formatR));
			        ws.setColumnView(j, 20);
			        break;
			    }
			}
		}
		ws.setRowView(curRow, 300);// 正文行高300
		curRow++;
		for(int j=0; j<3; j++) {
			switch(j) {
				case 0: {
			        ws.addCell(new Label(j, curRow, "現金（oo年oo月oo日）", format1));
			        ws.setColumnView(j, 55);// 设置列宽
			        break;
			    }
				case 1: { 
			        ws.addCell(new Label(j, curRow, "", formatR));
			        ws.setColumnView(j, 20);
			        break;
			    }
				case 2: { 	
					ws.addCell(new jxl.write.Label(j, curRow, "", formatR));
			        ws.setColumnView(j, 20);
			        break;
			    }
			}
		}
		ws.setRowView(curRow, 300);// 正文行高300
		curRow++;
		
		/**
		 * 調節
		 */
		//"調節"區塊標題
		ws.addCell(new Label(0, curRow, "本期淨利及營業活動現金流量之調節：", formatBlockL_NoLine_10));
		ws.mergeCells(0, curRow, 2, curRow);
		ws.setRowView(curRow, 500);
		curRow++;
		
		//"調節"區塊內容
		for(int j=0; j<3; j++) {
			switch(j) {
				case 0: {
			        ws.addCell(new Label(j, curRow, "稅後淨利", format1));
			        ws.setColumnView(j, 55);// 设置列宽
			        break;
			    }
				case 1: { 
			        ws.addCell(new Label(j, curRow, "", formatR));
			        ws.setColumnView(j, 20);
			        break;
			    }
				case 2: { 	
					ws.addCell(new jxl.write.Label(j, curRow, "", formatR));
			        ws.setColumnView(j, 20);
			        break;
			    }
			}
		}
		ws.setRowView(curRow, 300);// 正文行高300
		curRow++;
		for(int j=0; j<3; j++) {
			switch(j) {
				case 0: {
			        ws.addCell(new Label(j, curRow, "調節項目：", format1));
			        ws.setColumnView(j, 55);// 设置列宽
			        break;
			    }
				case 1: { 
			        ws.addCell(new Label(j, curRow, "", formatR));
			        ws.setColumnView(j, 20);
			        break;
			    }
				case 2: { 	
					ws.addCell(new jxl.write.Label(j, curRow, "", formatR));
			        ws.setColumnView(j, 20);
			        break;
			    }
			}
		}
		ws.setRowView(curRow, 300);// 正文行高300
		curRow++;
		for(int j=0; j<3; j++) {
			switch(j) {
				case 0: {
			        ws.addCell(new Label(j, curRow, "", format1));
			        ws.setColumnView(j, 55);// 设置列宽
			        break;
			    }
				case 1: { 
			        ws.addCell(new Label(j, curRow, "", formatR));
			        ws.setColumnView(j, 20);
			        break;
			    }
				case 2: { 	
					ws.addCell(new jxl.write.Label(j, curRow, "", formatR));
			        ws.setColumnView(j, 20);
			        break;
			    }
			}
		}
		ws.setRowView(curRow, 300);// 正文行高300
		curRow++;
		
		//"調節"區塊總計
		ws.addCell(new Label(0, curRow, "營業活動之淨現金流入(流出)", formatBlockR_NoLine_10));
		ws.addCell(new jxl.write.Label(1, curRow, "", formatBlockR_NoLine_10));
		ws.addCell(new jxl.write.Label(2, curRow, "", formatBlockR_NoLine_10));
		ws.setRowView(curRow, 500);
		curRow++;
		
		/**
		 * 不影響現金流量的活動
		 */
		//"不影響現金流量的活動"區塊標題
		ws.addCell(new Label(0, curRow, "不影響現金流量之重要投資與融資活動：", formatBlockL_NoLine_10));
		ws.mergeCells(0, curRow, 2, curRow);
		ws.setRowView(curRow, 500);
		curRow++;
		
		//"不影響現金流量的活動"區塊內容
		for(int j=0; j<3; j++) {
			switch(j) {
				case 0: {
			        ws.addCell(new Label(j, curRow, "", format1));
			        ws.setColumnView(j, 55);// 设置列宽
			        break;
			    }
				case 1: { 
			        ws.addCell(new Label(j, curRow, "", formatR));
			        ws.setColumnView(j, 20);
			        break;
			    }
				case 2: { 	
					ws.addCell(new jxl.write.Label(j, curRow, "", formatR));
			        ws.setColumnView(j, 20);
			        break;
			    }
			}
		}
	}
}
