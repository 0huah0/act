/**
 * 
 */
package com.act.service.export;

import java.util.Iterator;
import java.util.List;

import jxl.write.Label;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

import com.act.model.JournalDetail;
import com.act.model.JournalHead;

/**
 *日記帳導出到excel
 */
public class ExportJournal extends ExportBaseService{

	/* (non-Javadoc)
	 * @see com.act.service.export.ExportService#doMain(java.util.List)
	 */
	@Override
	void doMain(Object data) throws RowsExceededException,
			WriteException {
		ws.addCell(new Label(0, curRow, "傳票日期",formatTitle));
		ws.addCell(new Label(1, curRow, "傳票編號",formatTitle));
		ws.addCell(new Label(2, curRow, "摘要",formatTitle));
		curRow++;
		
		ws.addCell(new Label(0, curRow, "科目代碼",formatTitle));
		ws.addCell(new Label(1, curRow, "會計科目",formatTitle));
		ws.addCell(new Label(2, curRow, "借方金額",formatTitleR));
		ws.addCell(new Label(3, curRow, "貸方金額",formatTitleR));
		curRow++;
		
		@SuppressWarnings("unchecked")
		List<JournalHead> list = (List<JournalHead>) data;
		for(JournalHead head:list){
			ws.setRowView(curRow, 300);// 正文行高300
			for(int j=0;j<3;j++){
				switch(j){
					case 0:{
				        ws.addCell(new Label(j,curRow,sdf.format(head.getRefDate()),format2));
				        ws.setColumnView(j, 20);// 设置列宽
				        break;}
					case 1:{ 
				        ws.addCell(new Label(j,curRow,head.getRefNo(),format2));
				        ws.setColumnView(j, 20);
				        break;}
					case 2:{ 	
				        ws.addCell(new Label(j,curRow,head.getBrief()==null?"":head.getBrief(),format2));
				        ws.setColumnView(j, 20);
				        break;}
				}
			}
			ws.mergeCells(2, curRow, 3, curRow);//合并3,4列
			curRow ++;
			double dam = 0;
			double dcm = 0;
			for (Iterator<JournalDetail> it = (Iterator<JournalDetail>) head.getDetails().iterator();it.hasNext();) {
				JournalDetail jd = (JournalDetail)it.next();
				ws.setRowView(curRow, 300);// 正文行高300				
				for(int k=0;k<4;k++){
					switch(k){
						case 0:{
					        ws.addCell(new Label(k,curRow,jd.getCode(),format1));
					        ws.setColumnView(k, 20);// 设置列宽
					        break;}
						case 1:{ 
					        ws.addCell(new Label(k,curRow,jd.getName(),format1));
					        ws.setColumnView(k, 20);
					        break;}
						case 2:{ 	
							
							Double da = jd.getDebitAmount();
							da = (da==null?0:da);
							
					        ws.addCell(new jxl.write.Number(k,curRow,da,formatR));
					        ws.setColumnView(k, 20);
					        
					        dam += da;
					        break;}
						case 3:{
							Double ca = jd.getCreditAmount();
							ca = (ca==null?0:ca);
							
					        ws.addCell(new jxl.write.Number(k,curRow,ca,formatR));
					        ws.setColumnView(k, 20);
					        
					        dcm += ca;
					        break;}
					}
				}
				curRow ++;
			}
			
			ws.addCell(new Label(0, curRow, "合計：",formatTitle));
			ws.addCell(new jxl.write.Number(2, curRow, dam,formatTitleR));
			ws.addCell(new jxl.write.Number(3, curRow, dcm,formatTitleR));
			ws.mergeCells(0, curRow, 1, curRow);
			curRow ++;
		}
	
		ws.mergeCells(2, bodyRow, 3, bodyRow);//body第1行3，4列单元格
		ws.setRowView(bodyRow, 400);// body第2行高400
		ws.setRowView(bodyRow+1, 400);// body第3行高400
	}
	
	
}
