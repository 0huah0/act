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
			width : 960,
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
			height:300,
			cm : new Ext.grid.ColumnModel({
				columns : [sm,
						new Ext.grid.RowNumberer(),{
							header : '採購單編號',
							dataIndex : 'poHeadId'
						},{
							header : '採購單明細編號',
							dataIndex : 'poDetailId'
						},{
							header : '原料編號',
							dataIndex : 'materialId'
						},{
							header : '原料數量',
							dataIndex : 'materialNum'
						},{
							header : '原料定價(單價)',
							dataIndex : 'materialPrice'
						},{
							header : '原料建議售價(單價)',
							dataIndex : 'materialSalePrice'
						},{
							header : '小計',
							dataIndex : 'amount'
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
					url : __ctxPath + '/pss/listPssPurchaseOrderDetail.do'
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
			id : 'PssPurchaseOrderDetailSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
								searchPanel.getForm().submit({
									url:__ctxPath+'/pss/listPssPurchaseOrderDetail.do',
									method:'post',
									success : function(formPanel, action) {
										winGrid.getStore().proxy.conn.url=__ctxPath+'/pss/listPssPurchaseOrderDetail.do';
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
									name : "Q_poDetailId_L_EQ"
								},{
									fieldLabel : '原料定價(單價)',
									maxLength:18,
									name : "Q_materialPrice_L_EQ"
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									xtype:"hidden",name : "pssPurchaseOrderDetail.createDate"
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									xtype:"hidden",name : "pssPurchaseOrderDetail.updateBy"
								},{
									xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '原料編號',
									maxLength:18,
									name : "Q_materialId_S_LK"
								},{
									fieldLabel : '原料建議售價(單價)',
									maxLength:18,
									name : "Q_materialSalePrice_L_EQ"
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									xtype:"hidden",name : "pssPurchaseOrderDetail.createBy"
								},{
								xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '採購單編號',
									maxLength:18,
									name : "Q_poHeadId_S_LK"
								},{
									fieldLabel : '原料數量',
									maxLength:18,
									name : "Q_materialNum_L_EQ"
								},{
									fieldLabel : '小計',
									maxLength:18,
									name : "Q_amount_L_EQ"
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									xtype:"hidden",name : "pssPurchaseOrderDetail.updateDate"
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
