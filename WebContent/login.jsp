<%@page pageEncoding="UTF-8"%>
<%@page import="com.abcdef.core.util.AppUtil"%>

<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="java.util.Enumeration"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="x-ua-compatible" content="ie=7" />
		<link rel="shortcut icon" href="images/favicon3.ico" >
		<title>歡迎登入<%=AppUtil.getApplicationName()%></title>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/ext3/resources/css/ext-all.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/ext3/resources/css/ext-patch.css" />
		<style type="text/css">
		*{ padding:0; margin:0; border:none; list-style:none; text-decoration:none;}
		body{ background:#eee url(images/login/backg.png) center top no-repeat;  font-family: "宋体" , Arial, Helvetica, sans-serif; font-size:12px; color:#fff; margin:0 auto;}
		ul.login { margin:0 auto; width:250px; margin-top:295px;}
		ul.login li { height:28px; line-height:28px; margin-bottom:10px;}
		ul.login li.buttonArea { height:34px; line-height:34px; margin-bottom:0;}
		span.describe { width:65px; display:inline-block; font-size:14px; font-weight:bold; line-height:28px;color: #333;}
		input.login_input { width:176px; padding:0 3px; height:28px; display:inline-block; overflow:hidden; line-height:28px; background:url(images/login/loginBg.gif) right top no-repeat; vertical-align:middle; font-size:14px; font-family:Arial, Helvetica, sans-serif; color:#333;}
		li.buttonArea input { width:84px; height:34px; background:url(images/login/loginBg.gif) no-repeat;}
		li.buttonArea input.loginNow { background-position:left -50px; margin-right:14px;}
		li.buttonArea input.reset { background-position:right -50px;}
		p.center { text-align:center; margin-top:250px;}
		</style>
				<%
		response.addHeader("__timeout","true");
		%>
		<script type="text/javascript">
			var __ctxPath="<%=request.getContextPath() %>";
			var __loginImage=__ctxPath+"<%=AppUtil.getCompanyLogo()%>";
			
			function submitYouFrom(){
			var usernameTemp = document.getElementById('ext-comp-1002').value;
			var passwordTemp = document.getElementById('ext-comp-1003').value;
			
				Ext.Ajax.request( {
					url : __ctxPath + "/login.do",
					params : {
						username:usernameTemp,
						password:passwordTemp
					},
					method : "post",
					success : function(resp,opts) {
						
						var respText = Ext.util.JSON.decode(resp.responseText);
						if(respText.failure==true) {
							Ext.MessageBox.show( {
								title : "操作信息",
								msg : respText.msg,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
							
							return;
						}
						
						//Ext.ux.Toast.msg("信息提示", "成功删除所选记录！");
						window.location.href = __ctxPath + "/index.jsp";
					},
					failure:function(resp,opts) {
						var respText = Ext.util.JSON.decode(resp.responseText);
					}
				});
				
			}
			function reset(){
				document.getElementById('ext-comp-1002').value='';
				document.getElementById('ext-comp-1003').value='';
			}

			function toSuggestBox() {
				window.open(__ctxPath + "/info/suggest.do", "_blank");
			} 
			
		</script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/ext3/adapter/ext/ext-base.gzjs"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/ext3/ext-all.gzjs"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/ext3/ext-lang-zh_CN.js"></script>
	
	</head>
	<body>
		<ul class="login" style="">
	    	<li><span class="describe">帳號:</span><input class="login_input" id="ext-comp-1002" name="username" type="text" value="" /></li>
	        <li><span class="describe">密碼:</span><input class="login_input" id="ext-comp-1003" onkeyDown="if(event.keyCode==13){Javascript:submitYouFrom()}" name="password" d type="password" value="" /></li>
	      <li class="buttonArea"><span class="describe"></span><input class="loginNow" name="" onclick="submitYouFrom()" type="button"/><input class="reset" name="" onclick="reset()" type="button"/></li>
	    </ul>	
	   <!--  <p class="center">ABCDEF</p> -->
	    <script type="text/javascript">
	    	document.getElementById('ext-comp-1002').focus();
	    </script>
</body>
</html>
