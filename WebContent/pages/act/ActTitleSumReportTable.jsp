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
	String sdt = request.getParameter("sdt");
	String edt = request.getParameter("edt");
	JournalDetailDao jdDao = (JournalDetailDao) AppUtil.getBean("journalDetailDao");	
	List<JournalDetail> jdls = jdDao.listActTitleSum(sdt,edt);
	request.setAttribute("jdls", jdls);
	request.setAttribute("printRange",((sdt==""||sdt==null)&&(edt==""||edt==null))?"全部":sdt+"~"+edt);
%>
<title>試算表</title>
</head>
<body>
	<div class="container_table">
		<div class="wrap">
			<div class="c_w">
				<h2>新樺精機股份有限公司</h2>
				<h3>試算表</h3>
				<p>
					<span class="date_range">資料期間：${printRange}</span>
					<span class="time">印表日期：<%=new SimpleDateFormat("yyyy-MM-dd").format(new Date())%></span>
				</p>
				<table id="jdls">
					<tr><td class="t_th">科目代號</td>
						<td class="t_th">會計科目</td>
						<td class="t_th cash">借方金額</td>
						<td class="t_th cash">貸方金額</td>
						<td class="t_th cash">累計餘額（借/貸）</td></tr>
					
					<c:set var="sumd" value="0"/>
					<c:set var="sumc" value="0"/>
					<c:forEach var="detail" items="${jdls}">
						<c:set var="sum" value="${detail.debitAmount-detail.creditAmount}"/>
						<c:set var="dir" value="借"/>
						<c:if test="${sum<0}">
							<c:set var="dir" value="貸"/>
							<c:set var="sum" value="${0-sum}"/>
						</c:if>
						<tr>
							<td>${detail.code}</td>
							<td>${detail.name}</td>
							<td class="cash"><c:if test="${detail.debitAmount!=0}"><fmt:formatNumber value="${detail.debitAmount}" pattern="#.###"/></c:if></td>
							<td class="cash"><c:if test="${detail.creditAmount!=0}"><fmt:formatNumber value="${detail.creditAmount}" pattern="#.###"/></c:if></td>
							<td class="cash"><c:if test="${sum!=0}"><fmt:formatNumber value="${sum}" pattern="#.###"/>(${dir})</c:if></td>
						</tr>
						<c:set var="sumd" value="${sumd+detail.debitAmount}"/>
						<c:set var="sumc" value="${sumc+detail.creditAmount}"/>
					</c:forEach>
					
					<c:set var="remain" value="${sumd-sumc}"/>
					<c:set var="sumDir" value="借"/>
					<c:if test="${sum<0}">
						<c:set var="sumDir" value="貸"/>
						<c:set var="remain" value="${0-remain}"/>
					</c:if>
					<tr><td class="t_th cash" colspan="2">合計</td>
						<td class="t_th cash"><c:if test="${sumd!=0}"><fmt:formatNumber value="${sumd}" pattern="#.###"/></c:if></td>
						<td class="t_th cash"><fmt:formatNumber value="${sumc}" pattern="#.###"/></td>
						<td class="t_th cash"><fmt:formatNumber value="${remain}" pattern="#.###"/>(${sumDir})</td></tr>
				</table>
			</div>
		</div>
	</div>
</body>
</html>