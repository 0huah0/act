/*
 * Powered By [shi_zenghua@qq.com]
 */
 
/**
 * 產品圖片表选择器
 */
 PssProductImageSelector = {
	/**
	 * @param {} isSingle 是否单选
	 * @param {} callbackOrConf 回调函数或配置选项，若为map类型，则表示为配置选项
	 * @param {} reset data
	 * @return {}
	 */
	getView : function(isSingle,data,callback) {
		var window = new Ext.Window({
			title : '请选择產品圖片表',
			iconCls:'menu-appuser',
			width : 960,
			modal : true,
			closeAction: 'hide',
			items : [this.initPanel(isSingle,data)],
			buttons : [{
						text : '确认',
						iconCls:'btn-ok',
						handler : function(){
							var rows = Ext.getCmp('PssProductImageSelectGrid').getSelectionModel().getSelections();
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
			id : 'PssProductImageSelectGrid',
			height:300,
			cm : new Ext.grid.ColumnModel({
				columns : [sm,
						new Ext.grid.RowNumberer(),{
							header : '產品編號',
							dataIndex : 'pdtId'
						},{
							header : '產品圖片編號，保存系統框架中檔案上傳的記錄編號。',
							dataIndex : 'pdtImgId'
						},{
							header : '描述',
							dataIndex : 'desc'
						},{
							header : '排序',
							dataIndex : 'sn'
						},{
							header : '是否封面（一個產品只會有一張封面）',
							dataIndex : 'isCover',renderer:function(v){if(0 == v){return "不是";}else if(1 == v){return "是";}}
						},{
							header : '創建日期',
							dataIndex : 'createDate',renderer:function(v){if(v){return new Date(v).format("Y-m-d H:i");}else{return "";}}
						},{
							header : '創建人員',
							dataIndex : 'createBy'
						},{
							header : '修改日期',
							dataIndex : 'updateDate',renderer:function(v){if(v){return new Date(v).format("Y-m-d H:i");}else{return "";}}
						},{
							header : '修改人員',
							dataIndex : 'updateBy'
						},{
							hidden:true,
						}]
			}),
			sm : sm,
			store : new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : __ctxPath + '/pss/listPssProductImage.do'
				}),
				params : {
					start : 0,
					limit : 12
				},
				reader : new Ext.data.JsonReader({
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['pdtId','pdtImgId','desc','sn','isCover','createDate','createBy','updateDate','updateBy']
				}),
				remoteSort : true,
				autoLoad : true
			}),
			viewConfig : {
				width : 120,
				enableRowBody : false,
				showPreview : false
			}
		});
		
		//searchPanel
		var searchPanel = new Ext.FormPanel({
			autoHeight : true,
			frame : true,
			id : 'PssProductImageSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
								searchPanel.getForm().submit({
									url:__ctxPath+'/pss/listPssProductImage.do',
									method:'post',
									success : function(formPanel, action) {
										winGrid.getStore().proxy.conn.url=__ctxPath+'/pss/listPssProductImage.do';
										var result = Ext.util.JSON.decode(action.response.responseText);
										if(data && data.length>0){
											sm.selectRecords(data);
										}
										winGrid.getStore().loadData(result);
									}
								});
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssProductImageSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '產品圖片表查詢',
				layout : 'form',
				items : [{
					layout : 'column',
					columnWidth : 0.33,
					defaults : {
						layout : 'form',
						padding : '0 0 0 20px',
						labelAlign : 'right',
						labelWidth : 120,
						defaults : {
							xtype : 'textfield',
							width : 140
						}
					},
					items : [{
						items : [{
									xtype:'hidden',
									fieldLabel : '產品圖片編號，保存系統框架中檔案上傳的記錄編號。',
									maxLength:18,
									name : "Q_pdtImgId_S_LK"
								},{
									fieldLabel : '是否封面（一個產品只會有一張封面）',
									maxLength:18,
									hiddenName:"Q_isCover_N_EQ",mode:"local",triggerAction:"all",xtype:"combo",store:[[0,"不是"],[1,"是"]]
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									xtype:"hidden",name : "pssProductImage.updateDate"
								},{
									xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '描述',
									maxLength:18,
									name : "Q_desc_S_LK"
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									xtype:"hidden",name : "pssProductImage.createDate"
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									xtype:"hidden",name : "pssProductImage.updateBy"
								},{
								xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '產品編號',
									maxLength:18,
									name : "Q_pdtId_S_LK"
								},{
									fieldLabel : '排序',
									maxLength:18,
									name : "Q_sn_N_EQ"
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									xtype:"hidden",name : "pssProductImage.createBy"
								},{
									xtype:'hidden'
								}]//
					}]
				}]
			}]
		});
		//end of searchPanel
		
		
		return [searchPanel, winGrid];
	}
	
};
