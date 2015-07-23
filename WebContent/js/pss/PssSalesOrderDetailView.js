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
										name : 'pssSalesOrderDetail.id',
										id : 'id',
										xtype : 'hidden',
										value : recId||''
									},{
										fieldLabel : '銷貨單編號',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.SoHeadIdEnum',
										id : 'SoHeadIdEnum'
									},{
										fieldLabel : '產品數量',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.PdtNumEnum',
										id : 'PdtNumEnum'
									},{
										fieldLabel : '產品建議售價',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.PdtSalePriceEnum',
										id : 'PdtSalePriceEnum'
									},{
										fieldLabel : '小計',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.AmountEnum',
										id : 'AmountEnum'
									},{
										fieldLabel : '創建人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.CreateByEnum',
										id : 'CreateByEnum'
									},{
										fieldLabel : '修改人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.UpdateByEnum',
										id : 'UpdateByEnum'
						     }]
						},{
							items : [{
										xtype : 'hidden'
									},{
										fieldLabel : '產品編號',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.PdtIdEnum',
										id : 'PdtIdEnum'
									},{
										fieldLabel : '產品定價',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.PdtPriceEnum',
										id : 'PdtPriceEnum'
									},{
										fieldLabel : '產品實際售價',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.PdtRealPriceEnum',
										id : 'PdtRealPriceEnum'
									},{
										fieldLabel : '創建日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.CreateDateEnum',
										id : 'CreateDateEnum'
									},{
										fieldLabel : '修改日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderDetail.UpdateDateEnum',
										id : 'UpdateDateEnum'
					         }]
						}]
					}]
				}]
			}]
		});
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/act/listPssSalesOrderDetail.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['id'
								,SoHeadIdEnum
								,PdtIdEnum
								,PdtNumEnum
								,PdtPriceEnum
								,PdtSalePriceEnum
								,PdtRealPriceEnum
								,AmountEnum
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
							header : '銷貨單編號',
							width : 120,
							dataIndex : 'SoHeadIdEnum'
						},{
							header : '產品編號',
							width : 120,
							dataIndex : 'PdtIdEnum'
						},{
							header : '產品數量',
							width : 120,
							dataIndex : 'PdtNumEnum'
						},{
							header : '產品定價',
							width : 120,
							dataIndex : 'PdtPriceEnum'
						},{
							header : '產品建議售價',
							width : 120,
							dataIndex : 'PdtSalePriceEnum'
						},{
							header : '產品實際售價',
							width : 120,
							dataIndex : 'PdtRealPriceEnum'
						},{
							header : '小計',
							width : 120,
							dataIndex : 'AmountEnum'
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
						+ '/act/multiDelPssSalesOrderDetail.do',
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
