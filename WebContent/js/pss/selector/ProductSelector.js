/**
 * 用户选择器
 */
ProductSelector = {
	/**
	 * @param {} isSingle 是否单选
	 * @param {} callbackOrConf 回调函数或配置选项，若为map类型，则表示为配置选项
	 * @param {} reset data
	 * @return {}
	 */
	getView : function(isSingle,data,callback) {
		var window = new Ext.Window({
			title : '请选择產品',
			iconCls:'menu-appuser',
			width : 640,
			height : 400,
			autuScroll:true,
			modal : true,
			closeAction: 'hide',
			items : [this.initPanel(isSingle,data)],
			buttons : [{
						text : '确认',
						iconCls:'btn-ok',
						handler : function(){
							var rows = Ext.getCmp('ProductSelectGrid').getSelectionModel().getSelections();
							callback && callback(rows);
							window.close();
						}
					}, {
						text : '关闭',
						iconCls:'btn-cancel',
						handler : function() {
							window.close();
						}
					}]
		});
		return window;
	},

	initPanel : function(isSingle,data) {
		var sm = null;
		if(isSingle){
			sm = new Ext.grid.CheckboxSelectionModel({singleSelect: true});
		}else{
			sm = new Ext.grid.CheckboxSelectionModel();
		}
		var winGrid = new Ext.grid.EditorGridPanel({
			id : 'ProductSelectGrid',
			height:360,
			cm : new Ext.grid.ColumnModel({
				columns : [sm,
						new Ext.grid.RowNumberer(), {
						header : 'username',
						dataIndex : 'username'
					}, {
						header : 'fullname',
						dataIndex : 'fullname'
					}]
			}),
			sm : sm,
			store : new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : __ctxPath + '/system/selectAppUser.do'
				}),
				params : {
					start : 0,
					limit : 12
				},
				reader : new Ext.data.JsonReader({
					root : 'result',
					totalProperty : 'totalCounts',
					id : 'id',
					fields : [{
								name : 'userId',
								type : 'int'
							}, 'fullname','username']
				}),
				remoteSort : true
			}),
			viewConfig : {
				forceFit : true,
				enableRowBody : false,
				showPreview : false
			}
		});
		
		var searchPanel = new Ext.FormPanel( {
				layout:'hbox',
				bodyStyle:'padding:6px 2px 2px 2px',
				layoutConfigs:{
					align:'middle'
				},
				defaultType:'label',
				defaults:{
					margins:'0 4 0 4'
				},
				items:[ {
							text:'用户姓名'
						}, {
							xtype:'textfield',
							name:'Q_fullname_S_LK',
							width:260
						}, {
							xtype:'button',
							text:'查询',
							iconCls:'btn-search',
							handler:function(){
								searchPanel.getForm().submit({
									url:__ctxPath+'/system/listAppUser.do',
									method:'post',
									success : function(formPanel, action) {
										winGrid.getStore().proxy.conn.url=__ctxPath+'/system/listAppUser.do';
										var result = Ext.util.JSON.decode(action.response.responseText);
										if(data && data.length>0){
											sm.selectRecords(data);
										}
										winGrid.getStore().loadData(result);
									}
								});
							}
						}
					]
			}
		);
		
		return new Ext.Panel({
			items : [searchPanel, winGrid]
		});
	}
	
};
