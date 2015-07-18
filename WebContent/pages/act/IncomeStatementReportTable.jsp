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
	String ris_sdt = request.getParameter("ris_sdt");
	String ris_edt = request.getParameter("ris_edt");
	JournalDetailDao jdDao = (JournalDetailDao) AppUtil.getBean("journalDetailDao");
	List<JournalDetail> jdlsOpRev = jdDao.listIncomeStatementOpRev(ris_sdt,ris_edt);
	List<JournalDetail> jdlsOpCost = jdDao.listIncomeStatementOpCost(ris_sdt,ris_edt);
	List<JournalDetail> jdlsOpExp = jdDao.listIncomeStatementOpExp(ris_sdt,ris_edt);
	List<JournalDetail> jdlsNonOpRev = jdDao.listIncomeStatementNonOpRev(ris_sdt,ris_edt);
	List<JournalDetail> jdlsNonOpExp = jdDao.listIncomeStatementNonOpExp(ris_sdt,ris_edt);
	request.setAttribute("jdlsOpRev", jdlsOpRev);
	request.setAttribute("jdlsOpCost", jdlsOpCost);
	request.setAttribute("jdlsOpExp", jdlsOpExp);
	request.setAttribute("jdlsNonOpRev", jdlsNonOpRev);
	request.setAttribute("jdlsNonOpExp", jdlsNonOpExp);
	request.setAttribute("printRange",((ris_sdt==""||ris_sdt==null)&&(ris_edt==""||ris_edt==null))?"全部":ris_sdt+"~"+ris_edt);
%>
<title>試算表</title>
</head>
<body>
	<div class="container_table">
		<div class="wrap">
			<div class="c_w">
				<h2>新樺精機股份有限公司</h2>
				<h3>損益表</h3>
				<p>
					<span class="date_range">資料期間：${printRange}</span>
					<span class="time">印表日期：<%=new SimpleDateFormat("yyyy-MM-dd").format(new Date())%></span>
				</p>
				<table id="jdlsIncomeStatement">
					<tr>
						<td class="t_th">科目代號</td>
						<td class="t_th">會計科目</td>
						<td class="t_th cash">借方金額</td>
						<td class="t_th cash">貸方金額</td>
						<td class="t_th cash">合計</td>
					</tr>
					
					<!-- 營業收入 -->
					<tr>
						<td class="t_th_2" colspan="5">營業收入</td>
					</tr>
					
					<c:set var="opRevSumd" value="0"/>
					<c:set var="opRevSumc" value="0"/>
					<c:forEach var="detailOpRev" items="${jdlsOpRev}">
						<tr>
							<td>${detailOpRev.code}</td>
							<td>${detailOpRev.name}</td>
							<td class="cash"><c:if test="${detailOpRev.debitAmount!=0}"><fmt:formatNumber value="${detailOpRev.debitAmount}" pattern="#.###"/></c:if></td>
							<td class="cash"><c:if test="${detailOpRev.creditAmount!=0}"><fmt:formatNumber value="${detailOpRev.creditAmount}" pattern="#.###"/></c:if></td>
							<td class="cash"></td>
						</tr>
						<c:set var="opRevSumd" value="${opRevSumd+detailOpRev.debitAmount}"/>
						<c:set var="opRevSumc" value="${opRevSumc+detailOpRev.creditAmount}"/>
					</c:forEach>
					
					<c:set var="opRevRemain" value="${opRevSumc-opRevSumd}"/>
					
					<tr>
						<td class="t_th_2" colspan="2">營業收入總計</td>
						<c:if test="${opRevRemain>=0}">
							<td class="t_th_2 cash"></td>
							<td class="t_th_2 cash"><fmt:formatNumber value="${opRevRemain}" pattern="#.###"/></td>
						</c:if>
						<c:if test="${opRevRemain<0}">
							<td class="t_th_2 cash"></td>
							<td class="t_th_2 cash">(<fmt:formatNumber value="${0-opRevRemain}" pattern="#.###"/>)</td>
						</c:if>
						<td class="t_th_2 cash"></td>
					</tr>
					
					<!-- 營業成本 -->
					<tr>
						<td class="t_th_2" colspan="5">營業成本</td>
					</tr>
					
					<c:set var="opCostSumd" value="0"/>
					<c:set var="opCostSumc" value="0"/>
					<c:forEach var="detailOpCost" items="${jdlsOpCost}">
						<tr>
							<td>${detailOpCost.code}</td>
							<td>${detailOpCost.name}</td>
							<td class="cash"><c:if test="${detailOpCost.debitAmount!=0}"><fmt:formatNumber value="${detailOpCost.debitAmount}" pattern="#.###"/></c:if></td>
							<td class="cash"><c:if test="${detailOpCost.creditAmount!=0}"><fmt:formatNumber value="${detailOpCost.creditAmount}" pattern="#.###"/></c:if></td>
							<td class="cash"></td>
						</tr>
						<c:set var="opCostSumd" value="${opCostSumd+detailOpCost.debitAmount}"/>
						<c:set var="opCostSumc" value="${opCostSumc+detailOpCost.creditAmount}"/>
					</c:forEach>
					
					<c:set var="opCostRemain" value="${opCostSumd-opCostSumc}"/>
					
					<tr>
						<td class="t_th_2" colspan="2">營業成本總計</td>
						<c:if test="${opCostRemain>=0}">
							<td class="t_th_2 cash"><fmt:formatNumber value="${opCostRemain}" pattern="#.###"/></td>
							<td class="t_th_2 cash"></td>
						</c:if>
						<c:if test="${opCostRemain<0}">
							<td class="t_th_2 cash">(<fmt:formatNumber value="${0-opCostRemain}" pattern="#.###"/>)</td>
							<td class="t_th_2 cash"></td>
						</c:if>
						<td class="t_th_2 cash"></td>
					</tr>
					
					<!-- 營業毛利 -->
					<c:set var="grossProfit" value="${opRevRemain-opCostRemain}"/>
					
					<tr>
						<td class="t_th" colspan="4">營業毛利</td>
						<c:if test="${grossProfit>=0}">
							<td class="t_th cash"><fmt:formatNumber value="${grossProfit}" pattern="#.###"/></td>
						</c:if>
						<c:if test="${grossProfit<0}">
							<td class="t_th cash">(<fmt:formatNumber value="${0-grossProfit}" pattern="#.###"/>)</td>
						</c:if>
					</tr>
					
					<!-- 營業費用 -->
					<tr>
						<td class="t_th_2" colspan="5">營業費用</td>
					</tr>
					
					<c:set var="opExpSumd" value="0"/>
					<c:set var="opExpSumc" value="0"/>
					<c:forEach var="detailOpExp" items="${jdlsOpExp}">
						<tr>
							<td>${detailOpExp.code}</td>
							<td>${detailOpExp.name}</td>
							<td class="cash"><c:if test="${detailOpExp.debitAmount!=0}"><fmt:formatNumber value="${detailOpExp.debitAmount}" pattern="#.###"/></c:if></td>
							<td class="cash"><c:if test="${detailOpExp.creditAmount!=0}"><fmt:formatNumber value="${detailOpExp.creditAmount}" pattern="#.###"/></c:if></td>
							<td class="cash"></td>
						</tr>
						<c:set var="opExpSumd" value="${opExpSumd+detailOpExp.debitAmount}"/>
						<c:set var="opExpSumc" value="${opExpSumc+detailOpExp.creditAmount}"/>
					</c:forEach>
					
					<c:set var="opExpRemain" value="${opExpSumd-opExpSumc}"/>
					
					<tr>
						<td class="t_th_2" colspan="2">營業費用總計</td>
						<c:if test="${opExpRemain>=0}">
							<td class="t_th_2 cash"><fmt:formatNumber value="${opExpRemain}" pattern="#.###"/></td>
							<td class="t_th_2 cash"></td>
						</c:if>
						<c:if test="${opExpRemain<0}">
							<td class="t_th_2 cash">(<fmt:formatNumber value="${0-opExpRemain}" pattern="#.###"/>)</td>
							<td class="t_th_2 cash"></td>
						</c:if>
						<td class="t_th_2 cash"></td>
					</tr>
					
					<!-- 營業毛利 -->
					<c:set var="grossProfit" value="${grossProfit-opExpRemain}"/>
					
					<tr>
						<td class="t_th" colspan="4">營業毛利</td>
						<c:if test="${grossProfit>=0}">
							<td class="t_th cash"><fmt:formatNumber value="${grossProfit}" pattern="#.###"/></td>
						</c:if>
						<c:if test="${grossProfit<0}">
							<td class="t_th cash">(<fmt:formatNumber value="${0-grossProfit}" pattern="#.###"/>)</td>
						</c:if>
					</tr>
					
					<!-- 非營業收益 -->
					<tr>
						<td class="t_th_2" colspan="5">非營業收益</td>
					</tr>
					
					<c:set var="nonOpRevSumd" value="0"/>
					<c:set var="nonOpRevSumc" value="0"/>
					<c:forEach var="detailNonOpRev" items="${jdlsNonOpRev}">
						<tr>
							<td>${detailNonOpRev.code}</td>
							<td>${detailNonOpRev.name}</td>
							<td class="cash"><c:if test="${detailNonOpRev.debitAmount!=0}"><fmt:formatNumber value="${detailNonOpRev.debitAmount}" pattern="#.###"/></c:if></td>
							<td class="cash"><c:if test="${detailNonOpRev.creditAmount!=0}"><fmt:formatNumber value="${detailNonOpRev.creditAmount}" pattern="#.###"/></c:if></td>
							<td class="cash"></td>
						</tr>
						<c:set var="nonOpRevSumd" value="${nonOpRevSumd+detailNonOpRev.debitAmount}"/>
						<c:set var="nonOpRevSumc" value="${nonOpRevSumc+detailNonOpRev.creditAmount}"/>
					</c:forEach>
					
					<c:set var="nonOpRevRemain" value="${nonOpRevSumc-nonOpRevSumd}"/>
					
					<tr>
						<td class="t_th_2" colspan="2">非營業收益總計</td>
						<c:if test="${nonOpRevRemain>=0}">
							<td class="t_th_2 cash"></td>
							<td class="t_th_2 cash"><fmt:formatNumber value="${nonOpRevRemain}" pattern="#.###"/></td>
						</c:if>
						<c:if test="${nonOpRevRemain<0}">
							<td class="t_th_2 cash"></td>
							<td class="t_th_2 cash">(<fmt:formatNumber value="${0-nonOpRevRemain}" pattern="#.###"/>)</td>
						</c:if>
						<td class="t_th_2 cash"></td>
					</tr>
					
					<!-- 非營業損失 -->
					<tr>
						<td class="t_th_2" colspan="5">非營業損失</td>
					</tr>
					
					<c:set var="nonOpExpSumd" value="0"/>
					<c:set var="nonOpExpSumc" value="0"/>
					<c:forEach var="detailNonOpExp" items="${jdlsNonOpExp}">
						<tr>
							<td>${detailNonOpExp.code}</td>
							<td>${detailNonOpExp.name}</td>
							<td class="cash"><c:if test="${detailNonOpExp.debitAmount!=0}"><fmt:formatNumber value="${detailNonOpExp.debitAmount}" pattern="#.###"/></c:if></td>
							<td class="cash"><c:if test="${detailNonOpExp.creditAmount!=0}"><fmt:formatNumber value="${detailNonOpExp.creditAmount}" pattern="#.###"/></c:if></td>
							<td class="cash"></td>
						</tr>
						<c:set var="nonOpExpSumd" value="${nonOpExpSumd+detailNonOpExp.debitAmount}"/>
						<c:set var="nonOpExpSumc" value="${nonOpExpSumc+detailNonOpExp.creditAmount}"/>
					</c:forEach>
					
					<c:set var="nonOpExpRemain" value="${nonOpExpSumd-nonOpExpSumc}"/>
					
					<tr>
						<td class="t_th_2" colspan="2">非營業損失總計</td>
						<c:if test="${nonOpExpRemain>=0}">
							<td class="t_th_2 cash"><fmt:formatNumber value="${nonOpExpRemain}" pattern="#.###"/></td>
							<td class="t_th_2 cash"></td>
						</c:if>
						<c:if test="${nonOpExpRemain<0}">
							<td class="t_th_2 cash"></td>
							<td class="t_th_2 cash">(<fmt:formatNumber value="${0-nonOpExpRemain}" pattern="#.###"/>)</td>
						</c:if>
						<td class="t_th_2 cash"></td>
					</tr>
					
					<!-- 純益（純損） -->
					<c:set var="netIncome" value="${grossProfit + nonOpRevRemain - nonOpExpRemain}"/>
					
					<tr>
						<td class="t_th" colspan="4">純益（純損）</td>
						<c:if test="${netIncome>=0}">
							<td class="t_th cash"><fmt:formatNumber value="${netIncome}" pattern="#.###"/></td>
						</c:if>
						<c:if test="${netIncome<0}">
							<td class="t_th cash">(<fmt:formatNumber value="${0-netIncome}" pattern="#.###"/>)</td>
						</c:if>
					</tr>
				</table>
			</div>
		</div>
	</div>
</body>
</html>