/*
 * Powered By [shi_zenghua@qq.com]
 */
 
/**
 * 銷貨單子項选择器
 */
 PssSalesOrderDetailSelector = {
	/**
	 * @param {} isSingle 是否单选
	 * @param {} callbackOrConf 回调函数或配置选项，若为map类型，则表示为配置选项
	 * @param {} reset data
	 * @return {}
	 */
	getView : function(isSingle,data,callback) {
		var window = new Ext.Window({
			title : '请选择銷貨單子項',
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
							var rows = Ext.getCmp('PssSalesOrderDetailSelectGrid').getSelectionModel().getSelections();
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
			id : 'PssSalesOrderDetailSelectGrid',
			autoHeight : true,//height:360,
			cm : new Ext.grid.ColumnModel({
				columns : [sm,
						new Ext.grid.RowNumberer()
						,{
							header : '銷貨單編號',
							width : 120,
							dataIndex : 'soHeadId'
						}
												,{
							header : '銷貨單明細編號',
							width : 120,
							dataIndex : 'soDetailId'
						}
												,{
							header : '產品編號',
							width : 120,
							dataIndex : 'pdtId'
						}
												,{
							header : '產品數量',
							width : 120,
							dataIndex : 'pdtNum'
						}
												,{
							header : '產品定價',
							width : 120,
							dataIndex : 'pdtPrice'
						}
												,{
							header : '產品建議售價',
							width : 120,
							dataIndex : 'pdtSalePrice'
						}
												,{
							header : '產品實際售價',
							width : 120,
							dataIndex : 'pdtRealPrice'
						}
												,{
							header : '小計',
							width : 120,
							dataIndex : 'amount'
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
					url : __ctxPath + '/system/listPssSalesOrderDetail.do'
				}),
				params : {
					start : 0,
					limit : 12
				},
				reader : new Ext.data.JsonReader({
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['soHeadId','soDetailId','pdtId','pdtNum','pdtPrice','pdtSalePrice','pdtRealPrice','amount','createDate','createBy','updateDate','updateBy']
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
			id : 'PssSalesOrderDetailSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
								searchPanel.getForm().submit({
									url:__ctxPath+'/system/listPssSalesOrderDetail.do',
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
							Ext.getCmp('PssSalesOrderDetailSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '銷貨單子項查詢',
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
									fieldLabel : '銷貨單明細編號',
									maxLength:18,
									name : "pssSalesOrderDetail.soDetailId"
								},{
									fieldLabel : '產品定價',
									maxLength:18,
									name : "pssSalesOrderDetail.pdtPrice"
								},{
									fieldLabel : '小計',
									maxLength:18,
									name : "pssSalesOrderDetail.amount"
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									xtype:"hidden",name : "pssSalesOrderDetail.updateDate"
								},{
									xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '產品編號',
									maxLength:18,
									name : "pssSalesOrderDetail.pdtId"
								},{
									fieldLabel : '產品建議售價',
									maxLength:18,
									name : "pssSalesOrderDetail.pdtSalePrice"
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									xtype:"hidden",name : "pssSalesOrderDetail.createDate"
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									xtype:"hidden",name : "pssSalesOrderDetail.updateBy"
								},{
								xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '銷貨單編號',
									maxLength:18,
									name : "pssSalesOrderDetail.soHeadId"
								},{
									fieldLabel : '產品數量',
									maxLength:18,
									name : "pssSalesOrderDetail.pdtNum"
								},{
									fieldLabel : '產品實際售價',
									maxLength:18,
									name : "pssSalesOrderDetail.pdtRealPrice"
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									xtype:"hidden",name : "pssSalesOrderDetail.createBy"
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
