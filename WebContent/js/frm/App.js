Ext.ns("App");

var PortalItem=function(panelId,column,row){
   this.panelId=panelId;
   this.column=column;
   this.row=row;
};
var UserInfo=function(userId,username,fullname,depId,depName,rights,conf){
	this.userId=userId;
	this.fullname=fullname;
	this.depId=depId;
	this.username = username;
	this.depName=depName;
	this.rights=rights;
	this.portalConfig=conf;
};

var curUserInfo=null;

function isGranted(funKey){
	if(curUserInfo.rights.indexOf('__ALL')!=-1){
		return true;
	}
	if(curUserInfo.rights.indexOf(funKey)!=-1){
		return true;
	}
	return false;
}

App.init = function() {
	Ext.QuickTips.init();
    //Ext.form.Field.prototype.msgTarget = "side" ;
	Ext.BLANK_IMAGE_URL=__ctxPath+'/ext3/resources/images/default/s.gif';
	setTimeout(function() {
				Ext.get('loading').remove();
				Ext.get('loading-mask').fadeOut({remove:true});
				document.getElementById('app-header').style.display='block';
			}, 1000); 
	
	Ext.util.Observable.observeClass(Ext.data.Connection);
	Ext.data.Connection.on('requestcomplete', function(conn, resp,options ){
		if (resp && resp.getResponseHeader){
		    if(resp.getResponseHeader('__timeout')) {
		    	Ext.ux.Toast.msg('提示：','操作已超時，請重新登入!');
	        	window.location.href=__ctxPath+'/index.jsp?randId=' + parseInt(1000*Math.random());
	    	}
	    	if(resp.getResponseHeader('__forbidden')){
	    		Ext.ux.Toast.msg('提示：','無權限訪問：{0}',options.url);
	    	}
		}
	});
	
	Ext.Ajax.request({
			url:__ctxPath+'/system/getCurrentAppUser.do?random=' + Math.random(),
			method:'Get',
			success:function(response,options){
				var object=Ext.util.JSON.decode(response.responseText);
				var user=object.user;
				var conf=user.items;
				curUserInfo=new UserInfo(user.userId, user.username, user.fullname,user.depId,user.depName,user.rights,conf);
				var centerPanel=Ext.getCmp('centerTabPanel');
				var homeTab=centerPanel.add(new AppHome());
			 	centerPanel.activate(homeTab);
			}
	});
	
	var indexPage=new IndexPage();
	
	var viewId=getCookie('viewId');
	if (viewId != null && viewId != '' && viewId!='null') {
		App.clickTopTab(viewId);
	}
};


App.clickTopTab=function(id,params,precall,callback){
	if(precall!=null){
		precall.call(this);
	}
	var tabs = Ext.getCmp('centerTabPanel');
	var tabItem = tabs.getItem(id);
	
	var _id = id;
	if(_id.match("_")){
		_id = id.substring(0,id.indexOf("_"));
	}

	if (tabItem == null) {
		$ImportJs(_id, function(view) {
			tabItem = tabs.add(view);
			tabs.activate(tabItem);
			if(callback!=null){
				callback.call(this);
			}
		},params);
	}else {
		if(callback!=null){
			callback.call(this);
		}
		tabs.activate(tabItem);
	}
};


App.clickNode = function(node) {
	if(node.id==null || node.id=='' || node.id.indexOf('xnode')!=-1){
		return ;
	}
	App.clickTopTab(node.id,Ext.decode(node.attributes.params));
};



//退出系统
App.Logout = function() {
	Ext.Ajax.request({
		url : __ctxPath + '/j_logout.do',
		success : function() {
			window.location.href = __ctxPath + '/login.jsp';
		}
	});
};

//应用程序总入口
Ext.onReady(App.init);
