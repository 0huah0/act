/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssSalesOrderDetailView');
PssSalesOrderDetailView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssSalesOrderDetailView.superclass.constructor.call(this, {
					id : 'PssSalesOrderDetailView',
					title : '銷貨單子項',
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
			id : 'PssSalesOrderDetailSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssSalesOrderDetailSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssSalesOrderDetailGrid')
								});
							}
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
					xtype : 'fieldset',
					title : '銷貨單子項',
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
										fieldLabel : '銷貨單明細編號',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.soDetailId',
										id : 'soDetailId'
									},{
										fieldLabel : '產品定價',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.pdtPrice',
										id : 'pdtPrice'
									},{
										fieldLabel : '小計',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.amount',
										id : 'amount'
									},{
										fieldLabel : '修改日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.updateDate',
										id : 'updateDate'
									},{
									}]
						},{
							items : [{
										fieldLabel : '產品編號',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.pdtId',
										id : 'pdtId'
									},{
										fieldLabel : '產品建議售價',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.pdtSalePrice',
										id : 'pdtSalePrice'
									},{
										fieldLabel : '創建日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.createDate',
										id : 'createDate'
									},{
										fieldLabel : '修改人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.updateBy',
										id : 'updateBy'
									},{
									}]
						},{
							items : [{
										fieldLabel : '銷貨單編號',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.soHeadId',
										id : 'soHeadId'
									},{
										fieldLabel : '產品數量',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.pdtNum',
										id : 'pdtNum'
									},{
										fieldLabel : '產品實際售價',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.pdtRealPrice',
										id : 'pdtRealPrice'
									},{
										fieldLabel : '創建人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.createBy',
										id : 'createBy'
									},{
									}]
						}]
					}]
				}]
			}]
		});
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/pss/listPssSalesOrderDetail.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['id'
								,'soHeadId'
								,'soDetailId'
								,'pdtId'
								,'pdtNum'
								,'pdtPrice'
								,'pdtSalePrice'
								,'pdtRealPrice'
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
							header : '銷貨單編號',
							width : 120,
							dataIndex : 'soHeadId'
						},{
							header : '銷貨單明細編號',
							width : 120,
							dataIndex : 'soDetailId'
						},{
							header : '產品編號',
							width : 120,
							dataIndex : 'pdtId'
						},{
							header : '產品數量',
							width : 120,
							dataIndex : 'pdtNum'
						},{
							header : '產品定價',
							width : 120,
							dataIndex : 'pdtPrice'
						},{
							header : '產品建議售價',
							width : 120,
							dataIndex : 'pdtSalePrice'
						},{
							header : '產品實際售價',
							width : 120,
							dataIndex : 'pdtRealPrice'
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
							return '&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssSalesOrderDetailView.edit('
							+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssSalesOrderDetailView.remove('
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
					id : 'PssSalesOrderDetailGrid',
					region : 'center',
					tbar : (isGranted('_PssSalesOrderDetailAdd') ? new Ext.Toolbar({
								id : 'PssSalesOrderDetailFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增銷貨單子項',
											handler : function() {
												new PssSalesOrderDetailForm().show();
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

PssSalesOrderDetailView.remove = function(id) {
	var grid = Ext.getCmp("PssSalesOrderDetailGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/pss/multiDelPssSalesOrderDetail.do',
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

PssSalesOrderDetailView.edit = function(id) {
	new PssSalesOrderDetailForm({
				recId : id
			}).show();
};
