/**
 * 
 */
package com.act.service.export;

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
public class ExportIncomeStatements extends ExportBaseService{
	public ExportIncomeStatements(){
		//column= 5;
		super(4);
	}
	
	/* (non-Javadoc)
	 * @see com.act.service.export.ExportService#doMain(java.util.List)
	 */
	@SuppressWarnings("unchecked")
	@Override
	void doMain(Object data) throws RowsExceededException,
			WriteException {
		
		ws.addCell(new Label(0, curRow, "項　　目",formatTitle));
		ws.mergeCells(2, bodyRow, column-1, bodyRow);//合并3，4，5列单元格
		curRow++;
		
		ws.addCell(new Label(0, curRow, "會計科目",formatTitle));
		ws.addCell(new Label(1, curRow, "借方金額",formatTitleR));
		ws.addCell(new Label(2, curRow, "貸方金額",formatTitleR));
		ws.addCell(new Label(3, curRow, "合　　計",formatTitleR));
		curRow++;
		//---------------------------------------------------------
		
		
		double endNum = 0;
		
		Map<String,List<JournalDetail>> map = (Map<String,List<JournalDetail>>) data;
		ws.setRowView(curRow, 400);// 正文行高400
		ws.addCell(new Label(0, curRow, "營業收入",formatTitle));
		curRow ++;
		printGroupDetail(curRow,map.get("YYSR"));//營業收入
		
		
		
		ws.setRowView(curRow, 400);// 正文行高400
		ws.addCell(new Label(0, curRow, "營業成本",formatTitle));
		curRow ++;
		printGroupDetail(curRow,map.get("YYCB"));//營業成本
		
		
		
		ws.setRowView(curRow, 400);// 正文行高400
		ws.addCell(new Label(0, curRow, "營業費用",formatTitle));
		curRow ++;
		printGroupDetail(curRow,map.get("YYFY"));//營業費用
		
		
		ws.setRowView(curRow, 400);// 正文行高400
		ws.addCell(new Label(0, curRow, "非營業收益",formatTitle));
		curRow ++;
		printGroupDetail(curRow,map.get("FYYSY"));//非營業收益
		
		
		ws.setRowView(curRow, 400);// 正文行高400
		ws.addCell(new Label(0, curRow, "非營業損失",formatTitle));
		curRow ++;
		printGroupDetail(curRow,map.get("FYYSS"));//非營業損失
		
		
		ws.addCell(new Label(0, curRow, "純益（純損）",formatTitle));
		ws.mergeCells(0, curRow, 2, curRow);
		ws.addCell(new jxl.write.Number(3, curRow, endNum,formatTitleR));
		ws.mergeCells(3, curRow, 4, curRow);
		
		curRow ++;
		//---------------------------------------------------------
		
		ws.mergeCells(2, bodyRow, column-1, bodyRow);//合并3，4，5列单元格
		ws.setRowView(bodyRow, 400);
		ws.setRowView(bodyRow+1, 400);
	}

	private void printGroupDetail(int curRow, List<JournalDetail> detList) throws RowsExceededException,WriteException{
		for (JournalDetail jd : detList)  {
			ws.setRowView(curRow, 300);// 正文行高300				
			for(int k = 0; k < column; k++){
				switch(k){
					case 0:{
				        ws.addCell(new Label(k,curRow,jd.getName(),format1));
				        ws.setColumnView(k, 20);// 设置列宽
				        break;}
					case 1:{ 
				        ws.addCell(new jxl.write.Number(k,curRow,jd.getDebitAmount(),formatR));
				        ws.setColumnView(k, 20);
				        break;}
					case 2:{ 
						 ws.addCell(new jxl.write.Number(k,curRow,jd.getCreditAmount(),formatR));
				        ws.setColumnView(k, 20);
				        break;}
					case 3:{ 
						ws.addCell(new jxl.write.Number(k,curRow,0,formatR));
				        ws.setColumnView(k, 20);
				        break;}
				}
			}
			curRow ++;
		}
	}
	
	
}
