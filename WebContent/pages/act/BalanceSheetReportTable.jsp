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
	String rbs_sdt = request.getParameter("rbs_sdt");
	String rbs_edt = request.getParameter("rbs_edt");
	JournalDetailDao jdDao = (JournalDetailDao) AppUtil.getBean("journalDetailDao");
	List<JournalDetail> jdlsAssets = jdDao.listBalanceSheetAssets(rbs_sdt,rbs_edt);
	List<JournalDetail> jdlsLiabilities = jdDao.listBalanceSheetLiabilities(rbs_sdt,rbs_edt);
	List<JournalDetail> jdlsEquity = jdDao.listBalanceSheetEquity(rbs_sdt,rbs_edt);
	request.setAttribute("jdlsAssets", jdlsAssets);
	request.setAttribute("jdlsLiabilities", jdlsLiabilities);
	request.setAttribute("jdlsEquity", jdlsEquity);
	request.setAttribute("printRange",((rbs_sdt==""||rbs_sdt==null)&&(rbs_edt==""||rbs_edt==null))?"全部":rbs_sdt+"~"+rbs_edt);
%>
<title>資產負債表</title>
</head>
<body>
	<div class="container_table">
		<div class="wrap">
			<div class="c_w" style="margin:10px 10px 0px 10px;">
				<h2>新樺精機股份有限公司</h2>
				<h3>資產負債表</h3>
				
				<!-- 上方-左側 -->
				<div style="float:left; width:50%;">
					<p>
						<span class="date_range">資料期間：${printRange}</span>
					</p>
					<!-- 資產 -->
					<table id="BalanceSheet-Assets">
						<tr>
							<td class="t_th" style="width:60%;">會計科目</td>
							<td class="t_th cash" style="width:20%">小計</td>
							<td class="t_th cash" style="width:20%;">合計</td>
						</tr>
						
						<tr>
							<td class="t_th_2" colspan="3">資產</td>
						</tr>
						
						<c:set var="assetsSumd" value="0"/>
						<c:set var="assetsSumc" value="0"/>
						
						<c:forEach var="detailAssets" items="${jdlsAssets}">
							<c:set var="singleRemain" value="${detailAssets.debitAmount-detailAssets.creditAmount}"/>
							<tr>
								<td>${detailAssets.name}</td>
								<c:if test="${singleRemain>=0}">
									<td class="cash"><fmt:formatNumber value="${singleRemain}" pattern="#.###"/></td>
								</c:if>
								<c:if test="${singleRemain<0}">
									<td class="cash">(<fmt:formatNumber value="${0-singleRemain}" pattern="#.###"/>)</td>
								</c:if>
								<td class="cash"></td>
							</tr>
							<c:set var="assetsSumd" value="${assetsSumd+detailAssets.debitAmount}"/>
							<c:set var="assetsSumc" value="${assetsSumc+detailAssets.creditAmount}"/>
						</c:forEach>
						
						<c:set var="assetsRemain" value="${assetsSumd-assetsSumc}"/>
					</table>
				</div>
				
				<!-- 上方-右側 -->
				<div style="float:left; width:50%;">
					<p>
						<span class="time">印表日期：<%=new SimpleDateFormat("yyyy-MM-dd").format(new Date())%></span>
					</p>
					<!-- 負債 -->
					<table id="BalanceSheet-Liabilities-Right">
						<tr>
							<td class="t_th" style="width:60%;">會計科目</td>
							<td class="t_th cash" style="width:20%">小計</td>
							<td class="t_th cash" style="width:20%;">合計</td>
						</tr>
						
						<tr>
							<td class="t_th_2" colspan="3">負債</td>
						</tr>
						
						<c:set var="liabilitiesSumd" value="0"/>
						<c:set var="liabilitiesSumc" value="0"/>
						
						<c:forEach var="detailLiabilities" items="${jdlsLiabilities}">
							<c:set var="singleRemain" value="${detailLiabilities.creditAmount-detailLiabilities.debitAmount}"/>
							<tr>
								<td>${detailLiabilities.name}</td>
								<c:if test="${singleRemain>=0}">
									<td class="cash"><fmt:formatNumber value="${singleRemain}" pattern="#.###"/></td>
								</c:if>
								<c:if test="${singleRemain<0}">
									<td class="cash">(<fmt:formatNumber value="${0-singleRemain}" pattern="#.###"/>)</td>
								</c:if>
								<td class="cash"></td>
							</tr>
							<c:set var="liabilitiesSumd" value="${liabilitiesSumd+detailLiabilities.debitAmount}"/>
							<c:set var="liabilitiesSumc" value="${liabilitiesSumc+detailLiabilities.creditAmount}"/>
						</c:forEach>
						
						<c:set var="liabilitiesRemain" value="${liabilitiesSumc-liabilitiesSumd}"/>
						
						<tr>
							<td class="t_th_2" colspan="2">負債總計</td>
						
							<c:if test="${liabilitiesRemain>=0}">
								<td class="t_th_2 cash"><fmt:formatNumber value="${liabilitiesRemain}" pattern="#.###"/></td>
							</c:if>
							<c:if test="${liabilitiesRemain<0}">
								<td class="t_th_2 cash">(<fmt:formatNumber value="${0-liabilitiesRemain}" pattern="#.###"/>)</td>
							</c:if>
						</tr>
					</table>
					
					<!-- 業主權益 -->
					<table id="BalanceSheet-Equity-Right">
						<tr>
							<td class="t_th_2" colspan="3">業主權益</td>
						</tr>
						
						<c:set var="equitySumd" value="0"/>
						<c:set var="equitySumc" value="0"/>
						
						<c:forEach var="detailEquity" items="${jdlsEquity}">
							<c:set var="singleRemain" value="${detailEquity.creditAmount-detailEquity.debitAmount}"/>
							<tr>
								<td style="width:60%;">${detailEquity.name}</td>
								<c:if test="${singleRemain>=0}">
									<td class="cash" style="width:20%;"><fmt:formatNumber value="${singleRemain}" pattern="#.###"/></td>
								</c:if>
								<c:if test="${singleRemain<0}">
									<td class="cash" style="width:20%;">(<fmt:formatNumber value="${0-singleRemain}" pattern="#.###"/>)</td>
								</c:if>
								<td class="cash" style="width:20%;"></td>
							</tr>
							<c:set var="equitySumd" value="${equitySumd+detailEquity.debitAmount}"/>
							<c:set var="equitySumc" value="${equitySumc+detailEquity.creditAmount}"/>
						</c:forEach>
						
						<c:set var="equityRemain" value="${equitySumc-equitySumd}"/>
						
						<tr>
							<td class="t_th_2" colspan="2">業主權益總計</td>
						
							<c:if test="${equityRemain>=0}">
								<td class="t_th_2 cash"><fmt:formatNumber value="${equityRemain}" pattern="#.###"/></td>
							</c:if>
							<c:if test="${equityRemain<0}">
								<td class="t_th_2 cash">(<fmt:formatNumber value="${0-equityRemain}" pattern="#.###"/>)</td>
							</c:if>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
	<div class="wrap">
		<!-- 下方底部 -->
		<div style="margin:0px 10px 10px 10px;">
			<div style="float:left; width:50%;">
				<!-- 左側 -->
				<table id="BalanceSheet-Bottom-Left">
					<tr>
						<td class="t_th" colspan="2" style="width:80%;">資產總額</td>
						<c:if test="${assetsRemain>=0}">
							<td class="t_th cash" style="width:20%;"><fmt:formatNumber value="${assetsRemain}" pattern="#.###"/></td>
						</c:if>
						<c:if test="${assetsRemain<0}">
							<td class="t_th cash" style="width:20%;">(<fmt:formatNumber value="${0-assetsRemain}" pattern="#.###"/>)</td>
						</c:if>
					</tr>
				</table>
			</div>
			<div style="float:left; width:50%;">
				<!-- 右側 -->
				<table id="BalanceSheet-Bottom-Right">
					<tr>
						<td class="t_th" colspan="2" style="width:80%;">負債及業主權益總額</td>
						<c:if test="${(liabilitiesRemain+equityRemain)>=0}">
							<td class="t_th cash" style="width:20%;"><fmt:formatNumber value="${liabilitiesRemain+equityRemain}" pattern="#.###"/></td>
						</c:if>
						<c:if test="${(liabilitiesRemain+equityRemain)<0}">
							<td class="t_th cash" style="width:20%;">(<fmt:formatNumber value="${0-(liabilitiesRemain+equityRemain)}" pattern="#.###"/>)</td>
						</c:if>
					</tr>
				</table>
			</div>
		</div>
	</div>
</body>
</html>