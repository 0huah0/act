<%@page pageEncoding="UTF-8"%>
<%@page import="com.abcdef.core.command.QueryFilter"%>
<%@page import="com.abcdef.core.util.AppUtil"%>
<%@page import="com.act.service.JournalHeadService"%>
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
	JournalHeadService arService = (JournalHeadService) AppUtil.getBean("journalHeadService");
	QueryFilter filter = new QueryFilter(request);
	filter.addFilter("Q_isDelete_N_EQ", "0");
	filter.addFilter("Q_isPost_N_EQ", "1");
	filter.addSorted("refDate", "asc");
	filter.addSorted("refNo", "asc");
	filter.getPagingBean().setPageSize(Integer.MAX_VALUE);
	List<JournalHead> list = arService.getAll(filter);
	request.setAttribute("list", list);
	
	String refDateGE = request.getParameter("Q_refDate_D_GE");
	String refDateLE = request.getParameter("Q_refDate_D_LE");
	request.setAttribute("printRange",((refDateGE==""||refDateGE==null)&&(refDateLE==""||refDateLE==null))?"全部":refDateGE+"~"+refDateLE);
%>
<title>損益表</title>
</head>
<body>
	<div class="container_table">
		<div class="wrap">
			<div class="c_w">
				<h2>新樺精機股份有限公司</h2>
				<h3>損益表</h3>
				<p>
					<span>資料期間：${printRange}</span>
					<span class="time">印表日期:<%=new SimpleDateFormat("yyyy-MM-dd").format(new Date())%></span>
				</p>
				<table id="actTitleList">
					<tr>
						<td class="t_th">傳票日期</td>
						<td class="t_th">傳票編號</td>
						<td class="t_th" colspan="2">摘要</td>
					</tr>
					<tr>
						<td class="t_th">科目代碼</td>
						<td class="t_th">會計科目</td>
						<td class="t_th cash">借方金額</td>
						<td class="t_th cash">貸方金額</td>
					</tr>
					<c:forEach var="entity" items="${list}">
						<tr>
							<td style="font-weight: bold;"><fmt:formatDate value="${entity.refDate}" pattern="yyyy-MM-dd" /></td>
							<td style="font-weight: bold;">${entity.refNo}</td>
							<td style="font-weight: bold;" colspan="2">${entity.brief}</td>
						</tr>
						<c:set var="da" value="0"/>
						<c:set var="ca" value="0"/>
						<c:forEach var="detail" items="${entity.details}">
							<tr>
								<td>${detail.code}</td>
								<td>${detail.name}</td>
								<td class="cash"><fmt:formatNumber value="${detail.debitAmount}"/></td>
								<td class="cash">${detail.creditAmount}</td>
							</tr>
							<c:set var="da" value="${detail.debitAmount+da}"/>
							<c:set var="ca" value="${detail.creditAmount+ca}"/>
						</c:forEach>
						<tr>
							<td class="t_th cash" colspan="2" align="center">合計</td>
							<td class="t_th cash">${da}</td>
							<td class="t_th cash">${ca}</td>
						</tr>	
					</c:forEach>
				</table>
			</div>
		</div>
	</div>
</body>
</html>