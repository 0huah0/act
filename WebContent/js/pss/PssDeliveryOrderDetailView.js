/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssDeliveryOrderDetailView');
PssDeliveryOrderDetailView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssDeliveryOrderDetailView.superclass.constructor.call(this, {
					id : 'PssDeliveryOrderDetailView',
					title : '出貨單子項',
					iconCls : 'menu-planmanage',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},
	initUIComponents : function() {
		this.searchPanel = new Ext.FormPanel({
			//height : 115,
			frame : true,
			region : 'north',
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
					xtype : 'fieldset',
					title : '出貨單子項',
					items : [{
						layout : 'column',
						columnWidth : 0.5,
						defaults : {
							layout : 'form',
							padding : '0 0 0 20px',
							labelAlign : 'right',
							labelWidth : 80,
							defaults : {
								xtype : 'textfield',
								width : 140
							}
						},
						items : [{
							items : [{
										name : 'pssDeliveryOrderDetail.id',
										id : 'id',
										xtype : 'hidden',
										value : recId||''
									},{
										fieldLabel : '出貨單編號',
										maxLength:18,
										allowBlank : false,
										name : 'pssDeliveryOrderDetail.DoHeadIdEnum',
										id : 'DoHeadIdEnum'
									},{
										fieldLabel : '出貨數量',
										maxLength:18,
										allowBlank : false,
										name : 'pssDeliveryOrderDetail.AllNumEnum',
										id : 'AllNumEnum'
									},{
										fieldLabel : '退回數量',
										maxLength:18,
										allowBlank : false,
										name : 'pssDeliveryOrderDetail.RejectNumEnum',
										id : 'RejectNumEnum'
									},{
										fieldLabel : '創建人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssDeliveryOrderDetail.CreateByEnum',
										id : 'CreateByEnum'
									},{
										fieldLabel : '修改人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssDeliveryOrderDetail.UpdateByEnum',
										id : 'UpdateByEnum'
						     }]
						},{
							items : [{
										xtype : 'hidden'
									},{
										fieldLabel : '產品編號',
										maxLength:18,
										allowBlank : false,
										name : 'pssDeliveryOrderDetail.PdtIdEnum',
										id : 'PdtIdEnum'
									},{
										fieldLabel : '接收數量',
										maxLength:18,
										allowBlank : false,
										name : 'pssDeliveryOrderDetail.ReceiptNumEnum',
										id : 'ReceiptNumEnum'
									},{
										fieldLabel : '創建日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssDeliveryOrderDetail.CreateDateEnum',
										id : 'CreateDateEnum'
									},{
										fieldLabel : '修改日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssDeliveryOrderDetail.UpdateDateEnum',
										id : 'UpdateDateEnum'
					         }]
						}]
					}]
				}]
			}]
		});
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/act/listPssDeliveryOrderDetail.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['id'
								,DoHeadIdEnum
								,PdtIdEnum
								,AllNumEnum
								,ReceiptNumEnum
								,RejectNumEnum
								,CreateDateEnum
								,CreateByEnum
								,UpdateDateEnum
								,UpdateByEnum
							]
				});
		this.store.setDefaultSort('id', 'asc');
		this.store.load({
					params : {
						start : 0,
						limit : 25
					}
				});
		var cm = new Ext.grid.ColumnModel({
			columns : [new Ext.grid.RowNumberer(),{
							header : '出貨單編號',
							width : 120,
							dataIndex : 'DoHeadIdEnum'
						},{
							header : '產品編號',
							width : 120,
							dataIndex : 'PdtIdEnum'
						},{
							header : '出貨數量',
							width : 120,
							dataIndex : 'AllNumEnum'
						},{
							header : '接收數量',
							width : 120,
							dataIndex : 'ReceiptNumEnum'
						},{
							header : '退回數量',
							width : 120,
							dataIndex : 'RejectNumEnum'
						},{
							header : '創建日期',
							width : 120,
							dataIndex : 'CreateDateEnum'
						},{
							header : '創建人員',
							width : 120,
							dataIndex : 'CreateByEnum'
						},{
							header : '修改日期',
							width : 120,
							dataIndex : 'UpdateDateEnum'
						},{
							header : '修改人員',
							width : 120,
							dataIndex : 'UpdateByEnum'
						},{
						header : '管理',
						dataIndex : 'id',
						renderer : function(v,m,r) {
							return '&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssDeliveryOrderDetailView.edit('
							+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssDeliveryOrderDetailView.remove('
							+ v + ')"></button>';
						}
					}],
			defaults : {
				sortable : true,
				menuDisabled : false,
				width : 80
			}
		});

		this.gridPanel = new Ext.grid.GridPanel({
					id : 'PssDeliveryOrderDetailGrid',
					region : 'center',
					tbar : (isGranted('_PssDeliveryOrderDetailAdd') ? new Ext.Toolbar({
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
	}
});

PssDeliveryOrderDetailView.remove = function(id) {
	var grid = Ext.getCmp("PssDeliveryOrderDetailGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/act/multiDelPssDeliveryOrderDetail.do',
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
						Ext.Msg.alert("信息", "該項已經被使用，不能刪除！");
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
