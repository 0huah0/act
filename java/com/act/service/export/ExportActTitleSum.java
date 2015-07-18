/**
 * 
 */
package com.act.service.export;

import java.text.DecimalFormat;
import java.util.List;

import jxl.write.Label;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

import com.act.model.JournalDetail;

/**
 *試算表
 *導出到excel
 */
public class ExportActTitleSum extends ExportBaseService{
	public ExportActTitleSum(){
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
		
		ws.addCell(new Label(0, curRow, "科目代號",formatTitle));
		ws.addCell(new Label(1, curRow, "會計科目",formatTitle));
		ws.addCell(new Label(2, curRow, "借方金額",formatTitle));
		ws.addCell(new Label(3, curRow, "貸方金額",formatTitleR));
		ws.addCell(new Label(4, curRow, "累計餘額（借/貸）",formatTitleR));
		curRow++;
		
		DecimalFormat df = new DecimalFormat("#.###");
		
		List<JournalDetail> detailList = (List<JournalDetail>) data;
		double sumDebit = 0;
		double sumCredit = 0;
		for(JournalDetail detail : detailList){
			ws.setRowView(curRow, 300);// 正文行高300
			for(int j=0;j<5;j++){
				switch(j){
					case 0:{
				        ws.addCell(new Label(j,curRow,detail.getCode(),format1));
				        ws.setColumnView(j, 20);// 设置列宽
				        break;}
					case 1:{ 
				        ws.addCell(new Label(j,curRow,detail.getName(),format1));
				        ws.setColumnView(j, 20);
				        break;}
					case 2:{ 	
						sumDebit+=detail.getDebitAmount();
				        
				        if(detail.getDebitAmount()==0){
							ws.addCell(new jxl.write.Label(j,curRow,"",formatR));
						}else{
							ws.addCell(new jxl.write.Number(j,curRow,detail.getDebitAmount(),formatR));
						}
				        
				        ws.setColumnView(j, 20);
				        break;}
					case 3: {
						sumCredit += detail.getCreditAmount();
						
						if(detail.getCreditAmount()==0){
							ws.addCell(new jxl.write.Label(j,curRow,"",formatR));
						}else{
							ws.addCell(new jxl.write.Number(j,curRow,detail.getCreditAmount(),formatR));
						}
						
				        ws.setColumnView(j, 20);
				        break;}
					case 4: {
						double more = detail.getDebitAmount()-detail.getCreditAmount();
						String remain = "";
						if(more!=0){
							remain += more<0?df.format(0-more)+"(貸)":df.format(more)+"(借)";
						}
						
						ws.addCell(new Label(j,curRow,remain,formatR));
				        ws.setColumnView(j, 20);
				        break;}
				}
			}
			curRow++;
		}
		ws.addCell(new Label(0, curRow, "合計",formatTitleR));
		
		if(sumDebit==0){
			ws.addCell(new jxl.write.Label(2,curRow,"",formatTitleR));
		}else{
			ws.addCell(new jxl.write.Number(2,curRow,sumDebit,formatTitleR));
		}
		
		if(sumCredit==0){
			ws.addCell(new jxl.write.Label(3,curRow,"",formatTitleR));
		}else{
			ws.addCell(new jxl.write.Number(3,curRow,sumCredit,formatTitleR));
		}
		
		
		String remain = "";
		double more = sumDebit-sumCredit;
		if(more!=0){
			remain += more<0?df.format(0-more)+"(貸)":df.format(more)+"(借)";
		}
		
		ws.addCell(new Label(4,curRow,remain,formatTitleR));
		ws.mergeCells(0, curRow, 1, curRow);
		ws.setRowView(bodyRow, 400);// bodyRow中的第一行
	}
	
	
}
