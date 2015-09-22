Ext.ns('FileUtil');

FileUtil.del = function(fileId,callback){
	if(fileId){
		Ext.Ajax.request( {
			url : __ctxPath + '/system/multiDelFileAttach.do?ids='+fileId,
			method : 'post',
			success : function() {
				callback && eval(callback)(fileId);
			}
		});
	}
}

/**
 * @description 图片详细信息展示
 * @class FileUtil
 */
FileUtil.imgShow = function(fileId,obj) {
	var win = new Ext.Window( {
		height : 500,
		width:600,
		modal : true,
		autoScroll : true,
		maximizable : true,
		title : obj?obj.title:'圖片預覽',
		iconCls : 'menu-file',
		layout : 'form',
		region : 'center',
		buttonAlign : 'center',
		html:obj?'<img height="100%" width="100%" src="'+obj.src+'" title="'+obj.title+'"/>':null,
		autoLoad : obj?null:{
			url : __ctxPath + '/system/fileAttachDetail.do?fileId=' + fileId
		},
		buttons : [ {
			text : '关闭',
			iconCls : 'btn-close',
			handler : function() {
				win.close();
			}
		} ]
	});
	win.show();
}

FileUtil.rendererImg = function(domId,fileId) {
	Ext.Ajax.request( {
		url : __ctxPath + '/system/getFileAttach.do',
		method : 'post',
		params : {
			fileId : fileId
		},
		success : function(response , options) {
			var data = Ext.util.JSON.decode(response.responseText).data; 
			if(data){
				Ext.getCmp(domId).body.insertHtml('afterBegin','<span style="width: 215px;"><img style="height: 120px; padding: 10px;" src="' 
						+ __ctxPath + '/attachFiles/'+ data.filePath + '" title="'
						+ data.fileName+'" onClick="FileUtil.imgShow(null,this);"/>'
						+'<img src="images/btn/remove.png" onclick="FileUtil.del('+data.fileId+');this.parentElement.remove();" style="position:relative;left:-25px;top:-115px;cursor:pointer;"></span>');
			}
		}
	});
	
	
}
