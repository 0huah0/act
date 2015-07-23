/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssPurchaseOrderDetailView');
PssPurchaseOrderDetailView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssPurchaseOrderDetailView.superclass.constructor.call(this, {
					id : 'PssPurchaseOrderDetailView',
					title : '採購單子項',
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
			id : 'PssPurchaseOrderDetailSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssPurchaseOrderDetailSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssPurchaseOrderDetailGrid')
								});
							}
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
					xtype : 'fieldset',
					title : '採購單子項',
					items : [{
						layout : 'column',
						columnWidth : 0.33,
						defaults : {
							layout : 'form',
							padding : '0 0 0 20px',
							labelAlign : 'right',
							labelWidth : 100,
							defaults : {
								xtype : 'textfield',
								width : 140
							}
						},
						items : [{
							items : [{
										fieldLabel : '採購單明細編號',
										maxLength:18,
										allowBlank : false,
										name : 'pssPurchaseOrderDetail.poDetailId',
										id : 'poDetailId'
									},{
										fieldLabel : '原料定價(單價)',
										maxLength:18,
										allowBlank : false,
										name : 'pssPurchaseOrderDetail.materialPrice',
										id : 'materialPrice'
									},{
										fieldLabel : '創建日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssPurchaseOrderDetail.createDate',
										id : 'createDate'
									},{
										fieldLabel : '修改人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssPurchaseOrderDetail.updateBy',
										id : 'updateBy'
									},{
									}]
						},{
							items : [{
										fieldLabel : '原料編號',
										maxLength:18,
										allowBlank : false,
										name : 'pssPurchaseOrderDetail.materialId',
										id : 'materialId'
									},{
										fieldLabel : '原料建議售價(單價)',
										maxLength:18,
										allowBlank : false,
										name : 'pssPurchaseOrderDetail.materialSalePrice',
										id : 'materialSalePrice'
									},{
										fieldLabel : '創建人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssPurchaseOrderDetail.createBy',
										id : 'createBy'
									},{
									}]
						},{
							items : [{
										fieldLabel : '採購單編號',
										maxLength:18,
										allowBlank : false,
										name : 'pssPurchaseOrderDetail.poHeadId',
										id : 'poHeadId'
									},{
										fieldLabel : '原料數量',
										maxLength:18,
										allowBlank : false,
										name : 'pssPurchaseOrderDetail.materialNum',
										id : 'materialNum'
									},{
										fieldLabel : '小計',
										maxLength:18,
										allowBlank : false,
										name : 'pssPurchaseOrderDetail.amount',
										id : 'amount'
									},{
										fieldLabel : '修改日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssPurchaseOrderDetail.updateDate',
										id : 'updateDate'
									},{
									}]
						}]
					}]
				}]
			}]
		});
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/pss/listPssPurchaseOrderDetail.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['id'
								,'poHeadId'
								,'poDetailId'
								,'materialId'
								,'materialNum'
								,'materialPrice'
								,'materialSalePrice'
								,'amount'
								,'createDate'
								,'createBy'
								,'updateDate'
								,'updateBy'
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
							header : '採購單編號',
							width : 120,
							dataIndex : 'poHeadId'
						},{
							header : '採購單明細編號',
							width : 120,
							dataIndex : 'poDetailId'
						},{
							header : '原料編號',
							width : 120,
							dataIndex : 'materialId'
						},{
							header : '原料數量',
							width : 120,
							dataIndex : 'materialNum'
						},{
							header : '原料定價(單價)',
							width : 120,
							dataIndex : 'materialPrice'
						},{
							header : '原料建議售價(單價)',
							width : 120,
							dataIndex : 'materialSalePrice'
						},{
							header : '小計',
							width : 120,
							dataIndex : 'amount'
						},{
							header : '創建日期',
							width : 120,
							dataIndex : 'createDate'
						},{
							header : '創建人員',
							width : 120,
							dataIndex : 'createBy'
						},{
							header : '修改日期',
							width : 120,
							dataIndex : 'updateDate'
						},{
							header : '修改人員',
							width : 120,
							dataIndex : 'updateBy'
						},{
						header : '管理',
						dataIndex : 'id',
						renderer : function(v,m,r) {
							return '&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssPurchaseOrderDetailView.edit('
							+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssPurchaseOrderDetailView.remove('
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
					id : 'PssPurchaseOrderDetailGrid',
					region : 'center',
					tbar : (isGranted('_PssPurchaseOrderDetailAdd') ? new Ext.Toolbar({
								id : 'PssPurchaseOrderDetailFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增採購單子項',
											handler : function() {
												new PssPurchaseOrderDetailForm().show();
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

PssPurchaseOrderDetailView.remove = function(id) {
	var grid = Ext.getCmp("PssPurchaseOrderDetailGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/pss/multiDelPssPurchaseOrderDetail.do',
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

PssPurchaseOrderDetailView.edit = function(id) {
	new PssPurchaseOrderDetailForm({
				recId : id
			}).show();
};
