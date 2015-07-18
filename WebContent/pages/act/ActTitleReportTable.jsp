<%@page pageEncoding="UTF-8"%>
<%@page import="com.abcdef.core.command.QueryFilter"%>
<%@page import="com.abcdef.core.util.AppUtil"%>
<%@page import="com.act.service.JournalHeadService"%>
<%@page import="com.act.model.JournalHead"%>
<%@page import="com.act.model.JournalDetail"%>
<%@page import="com.act.model.AccountingTitle"%>
<%@page import="com.act.model.AccountTitleJournal"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>

<html>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<head>
<%
	String code = request.getParameter("code");
	String refDateGE = request.getParameter("refDateGE");
	String refDateLE = request.getParameter("refDateLE");
	JournalHeadService arService = (JournalHeadService) AppUtil.getBean("journalHeadService");
	Map<Map<String, String>, List<AccountTitleJournal>> ajMap = arService.getAJList(code, refDateGE, refDateLE);
	request.setAttribute("ajMap", ajMap);
	request.setAttribute("printRange",((refDateGE==""||refDateGE==null)&&(refDateLE==""||refDateLE==null))?"全部":refDateGE+" ~ "+refDateLE);
%>
<title>總分類帳報表</title>
</head>
<body>
	<div class="container_table">
		<div class="wrap">
			<div class="c_w">
				<h2>新樺精機股份有限公司</h2>
				<h3>總分類帳報表</h3>
				<p>
					<span class="date_range">資料期間：${printRange}</span>
					<span class="time">印表日期：<%=new SimpleDateFormat("yyyy-MM-dd").format(new Date())%></span>
				</p>
				<table id="ajMap">
					<tr><td class="t_th">科目代號</td>
						<td class="t_th">會計科目</td>
						<td class="t_th" colspan="3"></td></tr>
					<tr><td class="t_th">傳票日期</td>
						<td class="t_th">傳票編號</td>
						<td class="t_th">摘要</td>
						<td class="t_th cash">借方金額</td>
						<td class="t_th cash">貸方金額</td></tr>
							
					
					<c:forEach var="aj_obj" items="${ajMap}">
						<c:set var="da" value="0"/>
						<c:set var="ca" value="0"/>
						<tr>
							<td>${aj_obj.key.code}</td>
							<td>${aj_obj.key.name}</td>
							<td colspan="3"></td>
						</tr>
						<c:forEach var="jh" items="${aj_obj.value}">
							<tr>
								<td>${jh.refDate}</td>
								<td>${jh.refNo}</td>
								<td>${jh.brief}</td>
								<td class="cash">${jh.debitSum}</td>
								<td class="cash">${jh.creditSum}</td>
							</tr>
							<c:set var="da" value="${jh.debitSum+da}"/>
							<c:set var="ca" value="${jh.creditSum+ca}"/>
						</c:forEach>
						<tr>
							<td class="t_th" colspan="3">合計</td>
							<td class="t_th cash"><fmt:formatNumber value="${da}" pattern="#.###"/></td>
							<td class="t_th cash"><fmt:formatNumber value="${ca}" pattern="#.###"/></td>
						</tr>
					</c:forEach>
					<hr/>
				</table>
			</div>
		</div>
	</div>
</body>
</html>