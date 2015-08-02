/*
 * Powered By [shi_zenghua@qq.com]
 */
Ext.ns('PssDeliveryOrderDetailView');
PssDeliveryOrderDetailView = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssDeliveryOrderDetailView.superclass.constructor.call(this, {
					id : 'PssDeliveryOrderDetailView',
					title : '出貨單子項',
					iconCls : 'menu-planmanage',
					region : 'center',
					items : [this.searchPanel, this.gridPanel]
		});
	},
	initUIComponents : function() {
		//searchPanel
		this.searchPanel = new Ext.FormPanel({
			autoHeight : true,
			frame : true,
			id : 'PssDeliveryOrderDetailSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssDeliveryOrderDetailSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssDeliveryOrderDetailGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssDeliveryOrderDetailSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '出貨單子項查詢',
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
									fieldLabel : '出貨單明細編號',
									maxLength:18,
									name : 'S_doDetailId_L_EQ'
								},{
									fieldLabel : '接收數量',
									maxLength:18,
									name : 'S_receiptNum_L_EQ'
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									name : 'S_createBy_S_LK'
								},{
								xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '產品編號',
									maxLength:18,
									name : 'S_pdtId_S_LK'
								},{
									fieldLabel : '退回數量',
									maxLength:18,
									name : 'S_rejectNum_L_EQ'
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									name : 'S_updateDate_D_DL'
								},{
									xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '出貨單編號',
									maxLength:18,
									name : 'S_doHeadId_S_LK'
								},{
									fieldLabel : '出貨數量',
									maxLength:18,
									name : 'S_allNum_L_EQ'
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
		
		
		//store
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/pss/listPssDeliveryOrderDetail.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['doHeadId','doDetailId','pdtId','allNum','receiptNum','rejectNum','createDate','createBy','updateDate','updateBy'
					]
		});
		
		//this.store.setDefaultSort('id', 'asc');
		this.store.load({
				params : {
						start : 0,
						limit : 25
				}
		});
		var cm = new Ext.grid.ColumnModel({
				columns : [new Ext.grid.RowNumberer(),{
							header : '出貨單編號',
							dataIndex : 'doHeadId'
						},{
							header : '出貨單明細編號',
							dataIndex : 'doDetailId'
						},{
							header : '產品編號',
							dataIndex : 'pdtId'
						},{
							header : '出貨數量',
							dataIndex : 'allNum'
						},{
							header : '接收數量',
							dataIndex : 'receiptNum'
						},{
							header : '退回數量',
							dataIndex : 'rejectNum'
						},{
							header : '創建日期',
							dataIndex : 'createDate'
						},{
							header : '創建人員',
							dataIndex : 'createBy'
						},{
							header : '修改日期',
							dataIndex : 'updateDate'
						},{
							header : '修改人員',
							dataIndex : 'updateBy'
						},{
						header : '管理',
						dataIndex : 'doDetailId',//
						renderer : function(v,m,r) {
							return isGranted('_PssDeliveryOrderDetailEdit') ?('&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssDeliveryOrderDetailView.edit('
							+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssDeliveryOrderDetailView.remove('
							+ v + ')"></button>'):'';
						}
					}],
			defaults : {
				sortable : true,
				menuDisabled : false,
				width : 120
			}
		});

		this.gridPanel = new Ext.grid.GridPanel({
					id : 'PssDeliveryOrderDetailGrid',
					tbar : (isGranted('_PssDeliveryOrderDetailEdit') ? new Ext.Toolbar({
								id : 'PssDeliveryOrderDetailFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增出貨單子項',
											handler : function() {
												new PssDeliveryOrderDetailForm().show();
											}
										})]
							}) : null),
					store : this.store,
					//autoExpandColumn :'remark1',
					loadMask : true,
					autoHeight : true,
					cm : cm,
					bbar : new Ext.PagingToolbar({
								pageSize : 25,
								store : this.store,
								displayInfo : true,
								displayMsg : '當前顯示從{0}至{1}，共{2}條記錄',
								emptyMsg : "無記錄"
							})
				});
		//end of store
	}
});// end of main view


//view static method
PssDeliveryOrderDetailView.remove = function(id) {
	var grid = Ext.getCmp("PssDeliveryOrderDetailGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/pss/multiDelPssDeliveryOrderDetail.do',
				params : {
					ids : id
				},
				method : 'post',
				success : function(response, options) {
					var dbJson = eval("(" + response.responseText + ")");
					if(dbJson.success){
						Ext.ux.Toast.msg("信息", "成功刪除！");
						grid.getStore().reload({
							params : {
								start : 0,
								limit : 25
							}
						});
					}else{
						Ext.Msg.alert("信息", "該項沒能被刪除！");
					}
				}
			});
		}
	});
};

PssDeliveryOrderDetailView.edit = function(id) {
	new PssDeliveryOrderDetailForm({
				recId : id
			}).show();
};

//end of view static method
