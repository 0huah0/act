<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.abcdef.core.util.AppUtil"%>
<%@page import="com.abcdef.core.util.ContextUtil"%>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String basePath = request.getContextPath();

	//登录成功后，需要把该用户显示至在线用户
	AppUtil.addOnlineUser(request.getSession().getId(),ContextUtil.getCurrentUser());
	if (ContextUtil.getCurrentUser().getRights().contains("__ALL")) {
		request.setAttribute("IS_MANAGER", true);
	}
	String ip = null;
	if (request.getHeader("x-forwarded-for") == null) {
		ip = request.getLocalAddr();
	} else {
		ip = request.getHeader("x-forwarded-for");
	}
	request.setAttribute("ip", ip);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%@page import="java.util.Enumeration"%><html>
<head>
<link rel="shortcut icon" href="images/favicon1.ico">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="msthemecompatible" content="no">
<title><%=AppUtil.getCompanyName()%> - <%=AppUtil.getApplicationName()%></title>

<link rel="stylesheet" type="text/css" href="<%=basePath%>/ext3/resources/css/ext-all-notheme.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/ext3/ux/css/Portal.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/ext3/ux/css/Ext.ux.UploadDialog.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/ext3/ux/css/ux-all.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/ext3/ux/caltask/calendar.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/admin.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/proTable.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/resources/css/examples.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/resources/css/calendar.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/desktop.css"/>

<script type="text/javascript" src="<%=basePath%>/js/framework/dynamic.jsp"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ext-all.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ext-basex.js"></script>

<script type="text/javascript" src="<%=basePath%>/ext3/ux/ColumnHeaderGroup.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ux/CheckColumn.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ux/RowExpander.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ux/RowEditor.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ux/Fckeditor.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ux/FileUploadField.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ux/UploadDialog.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ux/PortalColumn.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ux/Portal.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ux/Portlet.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ux/PageComboResizer.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ux/PagingMemoryProxy.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ux/PagingStore.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ux/Toast.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ux/TabCloseMenu.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ux/DateTimeField.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ux/miframe.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ux/GroupSummary.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ux/Ext.ux.IconCombob.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ux/Ext.ux.grid.RowActions.js"></script>
<script type="text/javascript" src="<%=basePath%>/ext3/ux/XmlTreeLoader.js"></script>

<script type="text/javascript" src="<%=basePath%>/js/core/AppUtil.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/core/date.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/core/ScriptMgr.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/core/ScrollText.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/core/SystemCalendar.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/core/TreeSelector.js"></script>

<script type="text/javascript" src="<%=basePath%>/js/core/ux/HTExt.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/core/ux/TreePanelEditor.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/core/ux/TreeXmlLoader.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/core/ux/TreeCombo.js"></script>

<script type="text/javascript" src="<%=basePath%>/js/framework/App.import.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/framework/info/MessageWin.js"></script>	
<script type="text/javascript" src="<%=basePath%>/js/framework/info/MessageReplyWin.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/framework/selector/OnlineUserSelector.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/framework/sound/soundmanager2.js"></script>

<script type="text/javascript">
	Ext.apply(Ext.form.TextField.prototype,{ 
	    validator:function(text){
	          return !(this.allowBlank==false && Ext.util.Format.trim(text).length==0);
	    }
	});
	var __companyName="<%=AppUtil.getCompanyName()%>";
	Ext.onReady(function(){
	   	  var storeTheme=getCookie('theme');
	   	  if(storeTheme==null || storeTheme==''){
		   	  storeTheme='ext-all';
	   	  }
	      Ext.util.CSS.swapStyleSheet("theme", __ctxPath+"/ext3/resources/css/"+storeTheme+".css");  			     
    });
</script>
<script type="text/javascript" src="<%=basePath%>/js/framework/IndexPage.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/framework/App.home.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/framework/App.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/core/map.js"></script>
<script type="text/javascript">
	Ext.onReady(function(){
		var viewId='<%=request.getParameter("viewId")%>';
		if (viewId != null && viewId != '' && viewId != 'null') {
			App.clickTopTab(viewId);
		}
	});
</script>

</head>
<body>
	<div id="loading">
		<div class="loading-indicator">
			<img src="<%=basePath%>/images/loading.gif" alt="" width="153"
				height="16" style="margin-right: 8px;" align="absmiddle" />
			<div class="clear"></div>
			正在加载，请稍候......
		</div>
	</div>
	<div id="loading-mask"></div>

	<div id="app-header" style="display: none">
		<div id="header-left">
			<img id="CompanyLogo" src="<%=basePath + AppUtil.getCompanyLogo()%>"
				height="50" style="max-width: 260px;" />
		</div>
		<div id="header-main" style="margin-left: 25px">
			<div id="topInfoPanel"
				style="float: left; padding-bottom: 3px; padding-left: 10px">
			</div>
			<div class="clear"></div>
			<ul id="header-topnav">
				<li class="activeli"><a href="#" onclick="App.MyDesktopClick()"
					class="menu-desktop">桌面</a></li>
				<li class="commonli"><a href="#"
					onclick="App.clickTopTab('MessageManageView')"
					class="menu-top-message">个人消息</a></li>
			</ul>
		</div>
		<div id="header-right">
			<div id="currentTime">
				<span id="nowTime"></span><span id="nowTime2"></span>
			</div>
			<div id="setting"></div>
			<div id="searchFormDisplay"
				style="width: 260px; float: right; padding-top: 8px;">
				<div style="float: right; padding-right: 10px;">
					<div id="welcomeMsg">欢迎您，
						<security:authentication property="principal.fullname" />
						，[<a href="#" onclick="IndexPage.resetPassword()">修改密码</a>]&nbsp;[<a
							href="<%=basePath%>/j_logout.do">注销</a>]
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>