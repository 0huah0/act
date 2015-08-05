/*
 * Powered By [shi_zenghua@qq.com]
 */
 
/**
 * 收貨單子項选择器
 */
 PssMatesReceiptDetailSelector = {
	/**
	 * @param {} isSingle 是否单选
	 * @param {} callbackOrConf 回调函数或配置选项，若为map类型，则表示为配置选项
	 * @param {} reset data
	 * @return {}
	 */
	getView : function(isSingle,data,callback) {
		var window = new Ext.Window({
			title : '请选择收貨單子項',
			iconCls:'menu-appuser',
			width : 960,
			modal : true,
			closeAction: 'hide',
			items : [this.initPanel(isSingle,data)],
			buttons : [{
						text : '确认',
						iconCls:'btn-ok',
						handler : function(){
							var rows = Ext.getCmp('PssMatesReceiptDetailSelectGrid').getSelectionModel().getSelections();
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
			id : 'PssMatesReceiptDetailSelectGrid',
			height:300,
			cm : new Ext.grid.ColumnModel({
				columns : [sm,
						new Ext.grid.RowNumberer(),{
							header : '收貨單編號',
							dataIndex : 'mrHeadId'
						},{
							header : '收貨單明細編號',
							dataIndex : 'mrDetailId'
						},{
							header : '原料編號',
							dataIndex : 'materialId'
						},{
							header : '來貨數量',
							dataIndex : 'allNum'
						},{
							header : '接收數量',
							dataIndex : 'receiptNum'
						},{
							header : '退回數量',
							dataIndex : 'rejectNum'
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
					url : __ctxPath + '/pss/listPssMatesReceiptDetail.do'
				}),
				params : {
					start : 0,
					limit : 12
				},
				reader : new Ext.data.JsonReader({
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['mrHeadId','mrDetailId','materialId','allNum','receiptNum','rejectNum','createDate','createBy','updateDate','updateBy']
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
			id : 'PssMatesReceiptDetailSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
								searchPanel.getForm().submit({
									url:__ctxPath+'/pss/listPssMatesReceiptDetail.do',
									method:'post',
									success : function(formPanel, action) {
										winGrid.getStore().proxy.conn.url=__ctxPath+'/pss/listPssMatesReceiptDetail.do';
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
							Ext.getCmp('PssMatesReceiptDetailSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '收貨單子項查詢',
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
									fieldLabel : '收貨單明細編號',
									maxLength:18,
									name : "Q_mrDetailId_L_EQ"
								},{
									fieldLabel : '接收數量',
									maxLength:18,
									name : "Q_receiptNum_L_EQ"
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									xtype:"hidden",name : "pssMatesReceiptDetail.createBy"
								},{
									xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '原料編號',
									maxLength:18,
									name : "Q_materialId_S_LK"
								},{
									fieldLabel : '退回數量',
									maxLength:18,
									name : "Q_rejectNum_L_EQ"
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									xtype:"hidden",name : "pssMatesReceiptDetail.updateDate"
								},{
								xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '收貨單編號',
									maxLength:18,
									name : "Q_mrHeadId_S_LK"
								},{
									fieldLabel : '來貨數量',
									maxLength:18,
									name : "Q_allNum_L_EQ"
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									xtype:"hidden",name : "pssMatesReceiptDetail.createDate"
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									xtype:"hidden",name : "pssMatesReceiptDetail.updateBy"
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
