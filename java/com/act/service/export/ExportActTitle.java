/**
 * 
 */
package com.act.service.export;

import java.util.List;

import jxl.write.Label;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

import com.act.model.AccountingTitle;

/**
 *科目導出到excel
 */
public class ExportActTitle extends ExportBaseService{

	/* (non-Javadoc)
	 * @see com.act.service.export.ExportService#doMain(java.util.List)
	 */
	@SuppressWarnings("unchecked")
	@Override
	void doMain(Object data) throws RowsExceededException,
			WriteException {
		
		ws.addCell(new Label(0, curRow, "科目代號",formatTitle));
		ws.addCell(new Label(1, curRow, "會計科目",formatTitle));
		ws.addCell(new Label(2, curRow, "借方金額",formatTitleR));
		ws.addCell(new Label(3, curRow, "貸方金額",formatTitleR));
		curRow++;
		
		List<AccountingTitle> detailList = (List<AccountingTitle>) data;
		for(AccountingTitle actTitle : detailList){
			ws.setRowView(curRow, 300);// 正文行高300
			for(int j=0;j<4;j++){
				switch(j){
					case 0:{
				        ws.addCell(new Label(j,curRow,actTitle.getCode(),format1));
				        ws.setColumnView(j, 20);// 设置列宽
				        break;}
					case 1:{ 
				        ws.addCell(new Label(j,curRow,actTitle.getName(),format1));
				        ws.setColumnView(j, 20);
				        break;}
					case 2:{ 	
				        ws.addCell(new jxl.write.Number(j,curRow,0,formatR));
				        ws.setColumnView(j, 20);
				        break;}
					case 3: {
						ws.addCell(new jxl.write.Number(j,curRow,0,formatR));
				        ws.setColumnView(j, 20);
				        break;}
				}
			}
			curRow++;
		}
	
		ws.setRowView(bodyRow, 400);// bodyRow中的第一行
	}
	
	
}
