/*
 * Powered By [shi_zenghua@qq.com]
 */
 
/**
 * 銷貨單选择器
 */
 PssSalesOrderHeadSelector = {
	/**
	 * @param {} isSingle 是否单选
	 * @param {} callbackOrConf 回调函数或配置选项，若为map类型，则表示为配置选项
	 * @param {} reset data
	 * @return {}
	 */
	getView : function(isSingle,data,callback) {
		var window = new Ext.Window({
			title : '请选择銷貨單',
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
							var rows = Ext.getCmp('PssSalesOrderHeadSelectGrid').getSelectionModel().getSelections();
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
			id : 'PssSalesOrderHeadSelectGrid',
			autoHeight : true,//height:360,
			cm : new Ext.grid.ColumnModel({
				columns : [sm,
						new Ext.grid.RowNumberer()
						,{
							header : '銷貨單編號（銷貨單代碼2位(SO)+當前日期8位(yyyyMMdd)+流水號6位）',
							width : 120,
							dataIndex : 'soHeadId'
						}
												,{
							header : '客戶編號',
							width : 120,
							dataIndex : 'customerId'
						}
												,{
							header : '客戶採購單編號',
							width : 120,
							dataIndex : 'custPoNo'
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
							header : '實際售價總金額',
							width : 120,
							dataIndex : 'payAmount'
						}
												,{
							header : '優惠金額',
							width : 120,
							dataIndex : 'discountAmount'
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
					url : __ctxPath + '/system/listPssSalesOrderHead.do'
				}),
				params : {
					start : 0,
					limit : 12
				},
				reader : new Ext.data.JsonReader({
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['soHeadId','customerId','custPoNo','priceAmount','salePriceAmount','payAmount','discountAmount','remark','createDate','createBy','updateDate','updateBy']
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
			id : 'PssSalesOrderHeadSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
								searchPanel.getForm().submit({
									url:__ctxPath+'/system/listPssSalesOrderHead.do',
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
							Ext.getCmp('PssSalesOrderHeadSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '銷貨單查詢',
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
									fieldLabel : '客戶編號',
									maxLength:18,
									name : "pssSalesOrderHead.customerId"
								},{
									fieldLabel : '建議售價總金額',
									maxLength:18,
									name : "pssSalesOrderHead.salePriceAmount"
								},{
									fieldLabel : '備註',
									maxLength:18,
									name : "pssSalesOrderHead.remark"
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									xtype:"hidden",name : "pssSalesOrderHead.updateDate"
								},{
									xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '客戶採購單編號',
									maxLength:18,
									name : "pssSalesOrderHead.custPoNo"
								},{
									fieldLabel : '實際售價總金額',
									maxLength:18,
									name : "pssSalesOrderHead.payAmount"
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									xtype:"hidden",name : "pssSalesOrderHead.createDate"
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									xtype:"hidden",name : "pssSalesOrderHead.updateBy"
								},{
								xtype:'hidden'
								}]//
					},{
						items : [{
									xtype:'hidden',
									fieldLabel : '銷貨單編號（銷貨單代碼2位(SO)+當前日期8位(yyyyMMdd)+流水號6位）',
									maxLength:18,
									name : "pssSalesOrderHead.soHeadId"
								},{
									fieldLabel : '定價總金額',
									maxLength:18,
									name : "pssSalesOrderHead.priceAmount"
								},{
									fieldLabel : '優惠金額',
									maxLength:18,
									name : "pssSalesOrderHead.discountAmount"
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									xtype:"hidden",name : "pssSalesOrderHead.createBy"
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
