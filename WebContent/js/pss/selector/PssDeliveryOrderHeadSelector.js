/*
 * Powered By [shi_zenghua@qq.com]
 */
/**
 * 出貨單选择器
 */
 PssDeliveryOrderHeadSelector = {
	/**
	 * @param {} isSingle 是否单选
	 * @param {} callbackOrConf 回调函数或配置选项，若为map类型，则表示为配置选项
	 * @param {} reset data
	 * @return {}
	 */
	getView : function(isSingle,data,callback) {
		var window = new Ext.Window({
			title : '请选择出貨單',
			iconCls:'menu-appuser',
			width : 640,
			autoHeight : true,
			autuScroll:true,
			modal : true,
			closeAction: 'hide',
			items : [this.initPanel(isSingle,data)],
			buttons : [{
						text : '确认',
						iconCls:'btn-ok',
						handler : function(){
							var rows = Ext.getCmp('PssDeliveryOrderHeadSelectGrid').getSelectionModel().getSelections();
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
			id : 'PssDeliveryOrderHeadSelectGrid',
			autoHeight : true,//height:360,
			cm : new Ext.grid.ColumnModel({
				columns : [sm,
						new Ext.grid.RowNumberer()
						,{
							header : '出貨單編號（出貨單代碼2位(DO)+當前日期8位(yyyyMMdd)+流水號6位）',
							width : 120,
							dataIndex : 'doHeadId'
						}
												,{
							header : '銷貨單編號',
							width : 120,
							dataIndex : 'soHeadId'
						}
												,{
							header : '出貨倉庫編號/倉庫代號',
							width : 120,
							dataIndex : 'warehouseId'
						}
												,{
							header : '送貨人電話',
							width : 120,
							dataIndex : 'diliverTel'
						}
												,{
							header : '送貨人名稱',
							width : 120,
							dataIndex : 'diliverName'
						}
												,{
							header : '收貨人名稱',
							width : 120,
							dataIndex : 'receiverName'
						}
												,{
							header : '收貨人電話',
							width : 120,
							dataIndex : 'receiverTel'
						}
												,{
							header : '出貨發票號碼 (應收帳款)',
							width : 120,
							dataIndex : 'doInvoice'
						}
												,{
							header : '備註',
							width : 120,
							dataIndex : 'remark'
						}
												,{
							header : '創建日期',
							width : 120,
							dataIndex : 'createDate'
						}
												,{
							header : '創建人員',
							width : 120,
							dataIndex : 'createBy'
						}
												,{
							header : '修改日期',
							width : 120,
							dataIndex : 'updateDate'
						}
												,{
							header : '修改人員',
							width : 120,
							dataIndex : 'updateBy'
						}
						]
			}),
			sm : sm,
			store : new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : __ctxPath + '/system/listPssDeliveryOrderHead.do'
				}),
				params : {
					start : 0,
					limit : 12
				},
				reader : new Ext.data.JsonReader({
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['doHeadId','soHeadId','warehouseId','diliverTel','diliverName','receiverName','receiverTel','doInvoice','remark','createDate','createBy','updateDate','updateBy']
				}),
				remoteSort : true
			}),
			viewConfig : {
				forceFit : true,
				enableRowBody : false,
				showPreview : false
			}
		});
		
		//searchPanel
		var searchPanel = new Ext.FormPanel({
			autoHeight : true,
			frame : true,
			id : 'PssDeliveryOrderHeadSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
								searchPanel.getForm().submit({
									url:__ctxPath+'/system/listPssDeliveryOrderHead.do',
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
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssDeliveryOrderHeadSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '出貨單查詢',
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
									fieldLabel : '銷貨單編號',
									maxLength:18,
									name : 'S_soHeadId_S_LK'
								},{
									fieldLabel : '送貨人名稱',
									maxLength:18,
									name : 'S_diliverName_S_LK'
								},{
									fieldLabel : '出貨發票號碼 (應收帳款)',
									maxLength:18,
									name : 'S_doInvoice_S_LK'
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									name : 'S_createBy_S_LK'
								},{
									xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '出貨倉庫編號/倉庫代號',
									maxLength:18,
									name : 'S_warehouseId_S_LK'
								},{
									fieldLabel : '收貨人名稱',
									maxLength:18,
									name : 'S_receiverName_S_LK'
								},{
									fieldLabel : '備註',
									maxLength:18,
									name : 'S_remark_S_LK'
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									name : 'S_updateDate_D_DL'
								},{
								xtype:'hidden'
								}]//
					},{
						items : [{
									xtype:'hidden',
									fieldLabel : '出貨單編號（出貨單代碼2位(DO)+當前日期8位(yyyyMMdd)+流水號6位）',
									maxLength:18,
									name : 'S_doHeadId_S_LK'
								},{
									fieldLabel : '送貨人電話',
									maxLength:18,
									name : 'S_diliverTel_S_LK'
								},{
									fieldLabel : '收貨人電話',
									maxLength:18,
									name : 'S_receiverTel_S_LK'
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									name : 'S_createDate_D_DL'
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									name : 'S_updateBy_S_LK'
								},{
									xtype:'hidden'
								}]//
					}]
				}]
			}]
		});
		//end of searchPanel
		
		
		return new Ext.Panel({
			items : [searchPanel, winGrid]
		});
	}
	
};
