<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page pageEncoding="UTF-8"%>
<%
	String basePath = request.getContextPath();
%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>ABOUT</title>
<style type="text/css">
h2 {
	font-size: 15px;
	font-weight: bold;
}

.funs {
	padding-left: 20px;
}

.funs p {
	font-size: 12px;
}
</style>
</head>
<body>
	<div style="padding-left: 20px;">
		<img src="<%=basePath%>/images/ht-logo.png" />
		<h2>
			版本：<u>v1.0</u>
		</h2>
		<h2>功能内容：</h2>
		<div class="funs">
			<p>--XX管理</p>
			<p>--XX管理</p>
			<p>--XX管理</p>
			<p>--XX管理</p>
		</div>
	</div>
	<br/>
</body>
</html>


