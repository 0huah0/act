/**
 * 
 */
package com.act.service.export;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import jxl.write.Label;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

import com.act.model.AccountTitleJournal;

/**
 *為總分類帳報表導出
 */
public class ExportActTitleJournal extends ExportBaseService{
	
	public ExportActTitleJournal(){
		//column= 5;
		super(5);
	}
	/* (non-Javadoc)
	 * @see com.act.service.export.ExportService#doMain(java.util.List)
	 */
	@SuppressWarnings("unchecked")
	@Override
	void doMain(Object obj) throws RowsExceededException,
			WriteException {
		
		ws.addCell(new Label(0, curRow, "科目代號",formatTitle));
		ws.addCell(new Label(1, curRow, "會計科目",formatTitle));
		ws.addCell(new Label(2, curRow, "",formatTitle));
		ws.addCell(new Label(3, curRow, "",formatTitle));
		ws.addCell(new Label(4, curRow, "",formatTitle));
		curRow++;
		
		ws.addCell(new Label(0, curRow, "傳票日期",formatTitle));
		ws.addCell(new Label(1, curRow, "傳票編號",formatTitle));
		ws.addCell(new Label(2, curRow, "摘要",formatTitle));
		ws.addCell(new Label(3, curRow, "借方金額",formatTitleR));
		ws.addCell(new Label(4, curRow, "貸方金額",formatTitleR));
		curRow++;
		
		Map<Map<String, String>, List<AccountTitleJournal>> map = (Map<Map<String, String>, List<AccountTitleJournal>>) obj;
		for(Iterator<Entry<Map<String, String>, List<AccountTitleJournal>>> it = map.entrySet().iterator();it.hasNext();){
			Entry<Map<String, String>, List<AccountTitleJournal>> entry = it.next();
			Map<String, String> kmap = entry.getKey();
			List<AccountTitleJournal> atjList = entry.getValue();
			
			ws.setRowView(curRow, 300);// 正文行高300
			for(int j = 0; j < 2; j++){
				switch(j){
					case 0:{
				        ws.addCell(new Label(j,curRow,kmap.get("code"),format2));
				        ws.setColumnView(j, 20);// 科目代號
				        break;}
					case 1:{ 
				        ws.addCell(new Label(j,curRow,kmap.get("name"),format2));
				        ws.setColumnView(j, 20); //會計科目
				        break;}
				}
			}
			
			curRow ++;
			double dam = 0;
			double dcm = 0;
			for (AccountTitleJournal jh : atjList) {
				ws.setRowView(curRow, 300);// 正文行高300				
				for(int k = 0; k < column; k++){
					switch(k){
						case 0:{
					        ws.addCell(new Label(k,curRow,sdf.format(jh.getRefDate()),format1));
					        ws.setColumnView(k, 20);// 设置列宽
					        break;}
						case 1:{ 
					        ws.addCell(new Label(k,curRow,jh.getRefNo(),format1));
					        ws.setColumnView(k, 20);
					        break;}
						case 2:{ 
					        ws.addCell(new Label(k,curRow,jh.getBrief(),format1));
					        ws.setColumnView(k, 20);
					        break;}
						case 3:{ 	
							Double da = jh.getDebitSum();
							da = (da==null?0:da);
							
					        ws.addCell(new jxl.write.Number(k,curRow,da,formatR));
					        ws.setColumnView(k, 20);
					        
					        dam += da;
					        break;}
						case 4:{
							Double ca = jh.getCreditSum();
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
			ws.mergeCells(0, curRow, 2, curRow);
			ws.addCell(new jxl.write.Number(3, curRow, dam,formatTitleR));
			ws.addCell(new jxl.write.Number(4, curRow, dcm,formatTitleR));
			curRow ++;
		}
		
		
		
		ws.mergeCells(2, bodyRow, column-1, bodyRow);//合并3，4，5列单元格
		ws.setRowView(bodyRow, 400);
		ws.setRowView(bodyRow+1, 400);
	}
	
	
}
