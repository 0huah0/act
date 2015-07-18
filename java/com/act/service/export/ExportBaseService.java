/**
 * 
 */
package com.act.service.export;

import java.awt.Color;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.format.Alignment;
import jxl.format.Border;
import jxl.format.BorderLineStyle;
import jxl.format.Colour;
import jxl.format.UnderlineStyle;
import jxl.write.Label;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;

import com.abcdef.core.util.AppUtil;

/**
 *
 */
public abstract class ExportBaseService {
	/**
	 * 用于标示當前行<br/>
	 * 默认curRow = 0;<br/>
	 * here curRow = 3;
	 */
	int curRow = 0;

	/**
	 * bodyRow
	 */
	int bodyRow = 0;

	/**
	 * 表格主体最大列数 默认column = 4;
	 */
	int column = 4;

	Log logger = LogFactory.getLog(ExportBaseService.class);

	WritableFont font1 = new WritableFont(WritableFont.createFont("微软雅黑"), 10,
			WritableFont.NO_BOLD);
	
	WritableFont blockFont1 = new WritableFont(
			WritableFont.createFont("微软雅黑"), 12, WritableFont.BOLD, false,
			UnderlineStyle.NO_UNDERLINE);
	
	WritableFont blockFont1_10 = new WritableFont(
			WritableFont.createFont("微软雅黑"), 10, WritableFont.BOLD, false,
			UnderlineStyle.NO_UNDERLINE);
	
	WritableFont grossProfitFont1 = new WritableFont(
			WritableFont.createFont("微软雅黑"), 12, WritableFont.BOLD, false,
			UnderlineStyle.NO_UNDERLINE);
	
	WritableFont grossProfitFont2 = new WritableFont(
			WritableFont.createFont("微软雅黑"), 12, WritableFont.BOLD, true,
			UnderlineStyle.SINGLE);

	/**
	 * Border.NONE, BorderLineStyle.NONE Alignment.CENTRE
	 */
	WritableCellFormat formatMHead = new WritableCellFormat(new WritableFont(
			WritableFont.createFont("微软雅黑"), 18, WritableFont.BOLD));

	/**
	 * Border.NONE, BorderLineStyle.NONE Alignment.CENTRE
	 */
	WritableCellFormat formatHead = new WritableCellFormat(new WritableFont(
			WritableFont.createFont("微软雅黑"), 14, WritableFont.BOLD));

	/**
	 * Border.TOP, BorderLineStyle.DOUBLE Border.BOTTOM, BorderLineStyle.DOUBLE
	 * jxl.format.Alignment.CENTRE,jxl.format.VerticalAlignment.CENTRE
	 */
	WritableCellFormat formatTitle = new WritableCellFormat(new WritableFont(
			WritableFont.createFont("微软雅黑"), 10, WritableFont.NO_BOLD));
	
	WritableCellFormat formatTitle_LeftDotLine = new WritableCellFormat(new WritableFont(
			WritableFont.createFont("微软雅黑"), 10, WritableFont.NO_BOLD));

	/**
	 * Border.TOP, BorderLineStyle.DOUBLE Border.BOTTOM, BorderLineStyle.DOUBLE
	 * jxl.format.Alignment.RIGHT,jxl.format.VerticalAlignment.CENTRE
	 */
	WritableCellFormat formatTitleR = new WritableCellFormat(new WritableFont(
			WritableFont.createFont("微软雅黑"), 10, WritableFont.NO_BOLD));
	/**
	 * "微软雅黑", 10,WritableFont.NO_BOLD
	 */
	WritableCellFormat format1 = new WritableCellFormat(font1);
	
	WritableCellFormat format1_LeftDotLine = new WritableCellFormat(new WritableFont(
			WritableFont.createFont("微软雅黑"), 10, WritableFont.NO_BOLD));
	/**
	 * "微软雅黑", 10,WritableFont.NO_BOLD, false, UnderlineStyle.NO_UNDERLINE,
	 * Colour.BLUE
	 */
	WritableCellFormat format2 = new WritableCellFormat(new WritableFont(
			WritableFont.createFont("微软雅黑"), 10, WritableFont.NO_BOLD, false,
			UnderlineStyle.NO_UNDERLINE, Colour.BLUE));

	WritableCellFormat formatL = new WritableCellFormat(font1);
	WritableCellFormat formatR = new WritableCellFormat(font1);
	WritableCellFormat formatBlockL = null;
	WritableCellFormat formatBlockR = null;
	WritableCellFormat formatBlockL_NoLine = null;
	WritableCellFormat formatBlockL_NoLine_10 = null;
	WritableCellFormat formatBlockL_NoLine_LeftDotLine = null;
	WritableCellFormat formatBlockR_NoLine = null;
	WritableCellFormat formatBlockR_NoLine_10 = null;
	WritableCellFormat formatgrossProfitL = null;
	WritableCellFormat formatgrossProfitL_LeftDotLine = null;
	WritableCellFormat formatgrossProfitR = null;

	private String companyName = AppUtil.getCompanyName();

	/**
	 * yyyy-MM-dd
	 */
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

	OutputStream output = null;
	WritableWorkbook wwb = null;
	WritableSheet ws = null;

	/**
	 * 
	 * 表格主体最大列数 默认column = 4;
	 */
	public ExportBaseService(int column) {
		this.column = column;
	}

	public ExportBaseService() {

	}

	/**
	 * 导出程序入口
	 * 
	 * @param data
	 * @param title
	 * @param sdt
	 * @param edt
	 * @throws Exception
	 */
	public void export(Object data, String title, String range) throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		
		response.setHeader("Cache-Control", "private");
		response.setHeader("Pragma", "private");
		response.setContentType("application/vnd.ms-excel;charset=utf-8");
		response.setHeader("Content-Type", "application/force-download");
		
		String fileName = title + "_" + range.substring(range.indexOf("：")+1);
		
		fileName = this.processFileName(request, fileName);
		response.setHeader("Content-disposition", "attachment;filename=" + fileName + ".xls");
		
		//response.setCharacterEncoding("UTF-8");
		//response.setContentType("application/msexcel");
		
		/**
		 * String fileName = new String((title + "_" + range).getBytes("GBK"),"ISO8859-1");
		 * 能在IE和火狐下都不乱码
		 */
		/*try {
			String fileName = new String((title + "_" + range.substring(range.indexOf(":")+1)).getBytes("GBK"),"ISO8859-1");
			response.setHeader("Content-Disposition", "attachment; filename="
					+ fileName + ".xls");
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}*/

		try {
			output = response.getOutputStream();
			wwb = Workbook.createWorkbook(output);
			ws = wwb.createSheet(title, 0);
			
			//設定自定義顏色(#51718b)
			Color blockColor1 = Color.decode("#51718b");
			wwb.setColourRGB(Colour.ORANGE, blockColor1.getRed(), blockColor1.getGreen(), blockColor1.getBlue());
			Colour blockFont1Colour = Colour.ORANGE;
			blockFont1.setColour(blockFont1Colour);
			blockFont1_10.setColour(blockFont1Colour);
			formatBlockL = new WritableCellFormat(blockFont1);
			formatBlockR = new WritableCellFormat(blockFont1);
			formatBlockL_NoLine = new WritableCellFormat(blockFont1);
			formatBlockL_NoLine_10 = new WritableCellFormat(blockFont1_10);
			formatBlockL_NoLine_LeftDotLine = new WritableCellFormat(blockFont1);
			formatBlockR_NoLine = new WritableCellFormat(blockFont1);
			formatBlockR_NoLine_10 = new WritableCellFormat(blockFont1_10);
			
			//設定自定義顏色(#c1a16b)
			Color grossProfitColor = Color.decode("#c1a16b");
			wwb.setColourRGB(Colour.GREEN, grossProfitColor.getRed(), grossProfitColor.getGreen(), grossProfitColor.getBlue());
			Colour grossProfitFont1Colour = Colour.GREEN;
			grossProfitFont1.setColour(grossProfitFont1Colour);
			grossProfitFont2.setColour(grossProfitFont1Colour);
			formatgrossProfitL = new WritableCellFormat(grossProfitFont1);
			formatgrossProfitL_LeftDotLine = new WritableCellFormat(grossProfitFont1);
			formatgrossProfitR = new WritableCellFormat(grossProfitFont2);
			
			//初始化样式
			initFormat();

			// main head
			ws.addCell(new Label(0, curRow++, companyName, formatMHead));

			// head
			ws.addCell(new Label(0, curRow++, title, formatHead));

			// border
			ws.addCell(new Label(0, curRow, range, formatL)); // 第二行
			// int middle = column%2==0?(column/2)-1:1;

			ws.addCell(new Label(2, curRow, "印表日期：" + sdf.format(new Date()),
					formatR)); // 第二行
			curRow++;

			// body
			bodyRow = curRow;
			doMain(data); // 調用子類方法

			ws.mergeCells(0, 0, column > 1 ? column - 1 : 1, 0);// 合并main head整行
			ws.mergeCells(0, 1, column > 1 ? column - 1 : 1, 1);// 合并head整行
			ws.mergeCells(0, 2, 1, 2);// merge for range
			ws.mergeCells(2, 2, column - 1, 2);// merge for date

			ws.setRowView(0, 700);
			ws.setRowView(1, 400);
			ws.setRowView(2, 300);

			wwb.write();
			wwb.close();
		} catch (Exception e) {
			// this.logger.warn(e);
			throw e;
		}
	}
	
	/**
	 * IE,Chrome,FireFox下處理文件檔名顯示亂碼
	 * 
	 * @param request
	 * @param fileNames
	 * @throws Exception
	 */
	public String processFileName(HttpServletRequest request, String fileNames) {
		String codedfilename = null;
		
		try {
			String agent = request.getHeader("USER-AGENT");
			
			// IE
			if (null != agent && -1 != agent.indexOf("MSIE") || null != agent && -1 != agent.indexOf("Trident")) {
				String name = java.net.URLEncoder.encode(fileNames, "UTF8");
				codedfilename = name;
			}
			// Chrome、FireFox
			else if (null != agent && -1 != agent.indexOf("Mozilla")) {
				codedfilename = new String(fileNames.getBytes("UTF-8"), "iso-8859-1");
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
		return codedfilename;
	}

	/**
	 * @throws WriteException
	 * 
	 */
	private void initFormat() throws WriteException {
		try {
			// 字段边框样式
			formatTitle.setBorder(Border.TOP, BorderLineStyle.DOUBLE);
			formatTitle.setBorder(Border.BOTTOM, BorderLineStyle.DOUBLE);
			formatTitle.setAlignment(jxl.format.Alignment.LEFT);
			formatTitle.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
			// format1.setBorder(Border.NONE, BorderLineStyle.NONE);
			
			formatTitle_LeftDotLine.setBorder(Border.TOP, BorderLineStyle.DOUBLE);
			formatTitle_LeftDotLine.setBorder(Border.BOTTOM, BorderLineStyle.DOUBLE);
			formatTitle_LeftDotLine.setBorder(Border.LEFT, BorderLineStyle.DASHED);
			formatTitle_LeftDotLine.setAlignment(jxl.format.Alignment.LEFT);
			formatTitle_LeftDotLine.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
			
			format1.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
			format1_LeftDotLine.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
			format1_LeftDotLine.setBorder(Border.LEFT, BorderLineStyle.DASHED);

			formatTitleR.setBorder(Border.TOP, BorderLineStyle.DOUBLE);
			formatTitleR.setBorder(Border.BOTTOM, BorderLineStyle.DOUBLE);
			formatTitleR.setAlignment(jxl.format.Alignment.RIGHT);
			formatTitleR
					.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);

			formatMHead.setBorder(Border.NONE, BorderLineStyle.NONE);
			formatMHead.setAlignment(jxl.format.Alignment.CENTRE);
			formatMHead
					.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);

			formatHead.setBorder(Border.NONE, BorderLineStyle.NONE);
			formatHead.setAlignment(jxl.format.Alignment.CENTRE);
			formatHead
					.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);

			format2.setAlignment(Alignment.LEFT);
			format2.setWrap(true);

			formatL.setAlignment(jxl.format.Alignment.LEFT);
			formatL.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
			formatR.setAlignment(jxl.format.Alignment.RIGHT);
			formatR.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
			formatBlockL.setBorder(Border.TOP, BorderLineStyle.THIN);
			formatBlockL.setAlignment(jxl.format.Alignment.LEFT);
			formatBlockL.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
			formatBlockR.setBorder(Border.TOP, BorderLineStyle.THIN);
			formatBlockR.setAlignment(jxl.format.Alignment.RIGHT);
			formatBlockR.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
			formatBlockL_NoLine.setAlignment(jxl.format.Alignment.LEFT);
			formatBlockL_NoLine.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
			formatBlockL_NoLine_10.setAlignment(jxl.format.Alignment.LEFT);
			formatBlockL_NoLine_10.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
			formatBlockL_NoLine_LeftDotLine.setAlignment(jxl.format.Alignment.LEFT);
			formatBlockL_NoLine_LeftDotLine.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
			formatBlockL_NoLine_LeftDotLine.setBorder(Border.LEFT, BorderLineStyle.DASHED);
			formatBlockR_NoLine.setAlignment(jxl.format.Alignment.RIGHT);
			formatBlockR_NoLine.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
			formatBlockR_NoLine_10.setAlignment(jxl.format.Alignment.RIGHT);
			formatBlockR_NoLine_10.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
			formatgrossProfitL.setAlignment(jxl.format.Alignment.LEFT);
			formatgrossProfitL.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
			formatgrossProfitL_LeftDotLine.setAlignment(jxl.format.Alignment.LEFT);
			formatgrossProfitL_LeftDotLine.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
			formatgrossProfitL_LeftDotLine.setBorder(Border.LEFT, BorderLineStyle.DASHED);
			formatgrossProfitR.setAlignment(jxl.format.Alignment.RIGHT);
			formatgrossProfitR.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);
		} catch (WriteException e) {
			throw e;
		}
	}

	/**
	 * curRow == 2
	 * 
	 * @param ws
	 * @throws WriteException
	 * @throws RowsExceededException
	 */
	abstract void doMain(Object list) throws RowsExceededException,
			WriteException;

}
