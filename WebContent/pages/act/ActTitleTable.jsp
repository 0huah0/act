<%@page pageEncoding="UTF-8"%>
<%@page import="com.abcdef.core.command.QueryFilter"%>
<%@page import="com.abcdef.core.util.AppUtil"%>
<%@page import="com.act.service.AccountingTitleService"%>
<%@page import="com.act.model.AccountingTitle"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="java.util.List"%>
<html>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<head>
<%
	AccountingTitleService arService = (AccountingTitleService) AppUtil.getBean("accountingTitleService");
	QueryFilter filter = new QueryFilter(request);
	filter.addSorted("code", "asc");
	filter.addSorted("id", "asc");
	filter.getPagingBean().setPageSize(Integer.MAX_VALUE);
	request.setAttribute("actTitleList", arService.getAll(filter));
	String sAct = request.getParameter("Q_code_S_GE");
	String eAct = request.getParameter("Q_code_S_LE");		
	request.setAttribute("printRange",(sAct==null&&eAct==null)?"全部":sAct+" ~ "+eAct);
%>
<title>會計科目資料列印</title>
</head>
<body>
	<div class="container_table">
		<div class="wrap">
			<div class="c_w">
				<h2>新樺精機股份有限公司</h2>
				<h3>會計科目報表</h3>
				<p>
					<span class="date_range">科目代號：${printRange}</span>
					<span class="time">印表日期：<%=new SimpleDateFormat("yyyy-MM-dd").format(new Date())%></span>
				</p>
				<table id="actTitleList">
					<tr><td class="t_th">科目代號</td>
						<td class="t_th">會計科目</td>
						<td class="t_th" align="right">借方金額</td>
						<td class="t_th" align="right">貸方金額</td></tr>
					<c:forEach var="actTitle" items="${actTitleList}">
						<tr>
							<td>${actTitle.code}</td>
							<td>${actTitle.name}</td>
							<td align="right">0</td>
							<td align="right">0</td>
						</tr>
					</c:forEach>	
				</table>
			</div>
		</div>
	</div>
</body>
</html>