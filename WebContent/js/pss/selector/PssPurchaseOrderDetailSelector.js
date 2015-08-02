/*
 * Powered By [shi_zenghua@qq.com]
 */
/**
 * 採購單子項选择器
 */
 PssPurchaseOrderDetailSelector = {
	/**
	 * @param {} isSingle 是否单选
	 * @param {} callbackOrConf 回调函数或配置选项，若为map类型，则表示为配置选项
	 * @param {} reset data
	 * @return {}
	 */
	getView : function(isSingle,data,callback) {
		var window = new Ext.Window({
			title : '请选择採購單子項',
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
							var rows = Ext.getCmp('PssPurchaseOrderDetailSelectGrid').getSelectionModel().getSelections();
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
			id : 'PssPurchaseOrderDetailSelectGrid',
			autoHeight : true,//height:360,
			cm : new Ext.grid.ColumnModel({
				columns : [sm,
						new Ext.grid.RowNumberer()
						,{
							header : '採購單編號',
							width : 120,
							dataIndex : 'poHeadId'
						}
												,{
							header : '採購單明細編號',
							width : 120,
							dataIndex : 'poDetailId'
						}
												,{
							header : '原料編號',
							width : 120,
							dataIndex : 'materialId'
						}
												,{
							header : '原料數量',
							width : 120,
							dataIndex : 'materialNum'
						}
												,{
							header : '原料定價(單價)',
							width : 120,
							dataIndex : 'materialPrice'
						}
												,{
							header : '原料建議售價(單價)',
							width : 120,
							dataIndex : 'materialSalePrice'
						}
												,{
							header : '小計',
							width : 120,
							dataIndex : 'amount'
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
					url : __ctxPath + '/system/listPssPurchaseOrderDetail.do'
				}),
				params : {
					start : 0,
					limit : 12
				},
				reader : new Ext.data.JsonReader({
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['poHeadId','poDetailId','materialId','materialNum','materialPrice','materialSalePrice','amount','createDate','createBy','updateDate','updateBy']
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
			id : 'PssPurchaseOrderDetailSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
								searchPanel.getForm().submit({
									url:__ctxPath+'/system/listPssPurchaseOrderDetail.do',
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
							Ext.getCmp('PssPurchaseOrderDetailSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '採購單子項查詢',
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
									fieldLabel : '採購單明細編號',
									maxLength:18,
									name : 'S_poDetailId_L_EQ'
								},{
									fieldLabel : '原料定價(單價)',
									maxLength:18,
									name : 'S_materialPrice_L_EQ'
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
					},{
						items : [{
									fieldLabel : '原料編號',
									maxLength:18,
									name : 'S_materialId_S_LK'
								},{
									fieldLabel : '原料建議售價(單價)',
									maxLength:18,
									name : 'S_materialSalePrice_L_EQ'
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									name : 'S_createBy_S_LK'
								},{
								xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '採購單編號',
									maxLength:18,
									name : 'S_poHeadId_S_LK'
								},{
									fieldLabel : '原料數量',
									maxLength:18,
									name : 'S_materialNum_L_EQ'
								},{
									fieldLabel : '小計',
									maxLength:18,
									name : 'S_amount_L_EQ'
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									name : 'S_updateDate_D_DL'
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
