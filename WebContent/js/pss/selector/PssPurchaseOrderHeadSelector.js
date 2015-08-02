/*
 * Powered By [shi_zenghua@qq.com]
 */
 
/**
 * 採購單选择器
 */
 PssPurchaseOrderHeadSelector = {
	/**
	 * @param {} isSingle 是否单选
	 * @param {} callbackOrConf 回调函数或配置选项，若为map类型，则表示为配置选项
	 * @param {} reset data
	 * @return {}
	 */
	getView : function(isSingle,data,callback) {
		var window = new Ext.Window({
			title : '请选择採購單',
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
							var rows = Ext.getCmp('PssPurchaseOrderHeadSelectGrid').getSelectionModel().getSelections();
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
			id : 'PssPurchaseOrderHeadSelectGrid',
			autoHeight : true,//height:360,
			cm : new Ext.grid.ColumnModel({
				columns : [sm,
						new Ext.grid.RowNumberer()
						,{
							header : '採購單編號（採購單代碼2位(PO)+當前日期8位(yyyyMMdd)+流水號6位）',
							width : 120,
							dataIndex : 'poHeadId'
						}
												,{
							header : '供應商編號/供應商代號',
							width : 120,
							dataIndex : 'supplierId'
						}
												,{
							header : '定價總金額',
							width : 120,
							dataIndex : 'priceAmount'
						}
												,{
							header : '建議售價總金額',
							width : 120,
							dataIndex : 'salePriceAmount'
						}
												,{
							header : '成交價總金額',
							width : 120,
							dataIndex : 'payAmount'
						}
												,{
							header : '備註',
							width : 120,
							dataIndex : 'remark'
						}
												,{
							header : '創建日期',
							width : 120,
							dataIndex : 'createDate',renderer:function(v){if(v){return new Date(v).format("Y-m-d H:i");}else{return "";}}
						}
												,{
							header : '創建人員',
							width : 120,
							dataIndex : 'createBy'
						}
												,{
							header : '修改日期',
							width : 120,
							dataIndex : 'updateDate',renderer:function(v){if(v){return new Date(v).format("Y-m-d H:i");}else{return "";}}
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
					url : __ctxPath + '/system/listPssPurchaseOrderHead.do'
				}),
				params : {
					start : 0,
					limit : 12
				},
				reader : new Ext.data.JsonReader({
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['poHeadId','supplierId','priceAmount','salePriceAmount','payAmount','remark','createDate','createBy','updateDate','updateBy']
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
			id : 'PssPurchaseOrderHeadSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
								searchPanel.getForm().submit({
									url:__ctxPath+'/system/listPssPurchaseOrderHead.do',
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
							Ext.getCmp('PssPurchaseOrderHeadSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '採購單查詢',
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
									fieldLabel : '供應商編號/供應商代號',
									maxLength:18,
									name : "pssPurchaseOrderHead.supplierId"
								},{
									fieldLabel : '成交價總金額',
									maxLength:18,
									name : "pssPurchaseOrderHead.payAmount"
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									xtype:"hidden",name : "pssPurchaseOrderHead.createBy"
								},{
									xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '定價總金額',
									maxLength:18,
									name : "pssPurchaseOrderHead.priceAmount"
								},{
									fieldLabel : '備註',
									maxLength:18,
									name : "pssPurchaseOrderHead.remark"
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									xtype:"hidden",name : "pssPurchaseOrderHead.updateDate"
								},{
								xtype:'hidden'
								}]//
					},{
						items : [{
									xtype:'hidden',
									fieldLabel : '採購單編號（採購單代碼2位(PO)+當前日期8位(yyyyMMdd)+流水號6位）',
									maxLength:18,
									name : "pssPurchaseOrderHead.poHeadId"
								},{
									fieldLabel : '建議售價總金額',
									maxLength:18,
									name : "pssPurchaseOrderHead.salePriceAmount"
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									xtype:"hidden",name : "pssPurchaseOrderHead.createDate"
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									xtype:"hidden",name : "pssPurchaseOrderHead.updateBy"
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
