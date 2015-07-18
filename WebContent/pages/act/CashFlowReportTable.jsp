<%@page pageEncoding="UTF-8"%>
<%@page import="com.abcdef.core.command.QueryFilter"%>
<%@page import="com.abcdef.core.util.AppUtil"%>
<%@page import="com.act.dao.JournalDetailDao"%>
<%@page import="com.act.model.JournalHead"%>
<%@page import="com.act.model.JournalDetail"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="java.util.List"%>

<html>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<head>
<%
	String rcf_sdt = request.getParameter("rcf_sdt");
	String rcf_edt = request.getParameter("rcf_edt");
	
	JournalDetailDao jdDao = (JournalDetailDao) AppUtil.getBean("journalDetailDao");
	List<JournalDetail> jdlsOpRev = jdDao.listIncomeStatementOpRev(rcf_sdt,rcf_edt);
	
	request.setAttribute("jdlsOpRev", jdlsOpRev);
	request.setAttribute("printRange",((rcf_sdt==""||rcf_sdt==null)&&(rcf_edt==""||rcf_edt==null))?"全部":rcf_sdt+"~"+rcf_edt);
%>
<title>現金流量表</title>
</head>
<body>
	<div class="container_table">
		<div class="wrap">
			<div class="c_w" style="width:75%; margin:0 auto;">
				<h2>新樺精機股份有限公司</h2>
				<h3>現金流量表</h3>
				<p>
					<span class="date_range">資料期間：${printRange}</span>
					<span class="time">印表日期：<%=new SimpleDateFormat("yyyy-MM-dd").format(new Date())%></span>
				</p>
				<table id="scls">
					<tr>
						<td class="t_th" width="50%">項目</td>
						<td class="t_th cash" width="25%">小計</td>
						<td class="t_th cash" width="25%">合計</td>
					</tr>
					
					<!-- 營業活動 -->
					<tr>
						<td class="t_th_3" colspan="3">營業活動之現金流量：</td>
					</tr>
					<tr>
						<td></td>
						<td class="cash"></td>
						<td class="cash"></td>
					</tr>
					<tr>
						<td class="t_th_4">營業活動之淨現金流入(流出)</td>
						<td class="cash"></td>
						<td class="cash"></td>
					</tr>
					
					<!-- 投資活動 -->
					<tr>
						<td class="t_th_3" colspan="3">投資活動之現金流量：</td>
					</tr>
					<tr>
						<td></td>
						<td class="cash"></td>
						<td class="cash"></td>
					</tr>
					<tr>
						<td class="t_th_4">投資活動之淨現金流入(流出)</td>
						<td class="cash"></td>
						<td class="cash"></td>
					</tr>
					
					<!-- 融資活動 -->
					<tr>
						<td class="t_th_3" colspan="3">融資活動之現金流量：</td>
					</tr>
					<tr>
						<td></td>
						<td class="cash"></td>
						<td class="cash"></td>
					</tr>
					<tr>
						<td class="t_th_4">融資活動之淨現金流入(流出)</td>
						<td class="cash"></td>
						<td class="cash"></td>
					</tr>
					
					<!-- 本期現金數目 -->
					<tr>
						<td class="t_th_3">本期現金增加數</td>
						<td class="cash"></td>
						<td class="cash"></td>
					</tr>
					<tr>
						<td>現金（xx年xx月xx日）</td>
						<td class="cash"></td>
						<td class="cash"></td>
					</tr>
					<tr>
						<td>現金（oo年oo月oo日）</td>
						<td class="cash"></td>
						<td class="cash"></td>
					</tr>
					
					<!-- 調節 -->
					<tr>
						<td class="t_th_3" colspan="3">本期淨利及營業活動現金流量之調節：</td>
					</tr>
					<tr>
						<td>稅後淨利</td>
						<td class="cash"></td>
						<td class="cash"></td>
					</tr>
					<tr>
						<td colspan="3">調節項目：</td>
					</tr>
					<tr>
						<td></td>
						<td class="cash"></td>
						<td class="cash"></td>
					</tr>
					<tr>
						<td class="t_th_4">營業活動之淨現金流入(流出)</td>
						<td class="cash"></td>
						<td class="cash"></td>
					</tr>
					
					<!-- 不影響現金流量的活動 -->
					<tr>
						<td class="t_th_3" colspan="3">不影響現金流量之重要投資與融資活動：</td>
					</tr>
					<tr>
						<td></td>
						<td class="cash"></td>
						<td class="cash"></td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</body>
</html>