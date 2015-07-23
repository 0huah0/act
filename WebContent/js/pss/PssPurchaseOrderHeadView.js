/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssPurchaseOrderHeadView');
PssPurchaseOrderHeadView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssPurchaseOrderHeadView.superclass.constructor.call(this, {
					id : 'PssPurchaseOrderHeadView',
					title : '採購單',
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
			id : 'PssPurchaseOrderHeadSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssPurchaseOrderHeadSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssPurchaseOrderHeadGrid')
								});
							}
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
					xtype : 'fieldset',
					title : '採購單',
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
										name : 'pssPurchaseOrderHead.id',
										id : 'id',
										xtype : 'hidden',
										value : recId||''
									},{
										fieldLabel : '供應商編號/供應商代號',
										maxLength:18,
										allowBlank : false,
										name : 'pssPurchaseOrderHead.SupplierIdEnum',
										id : 'SupplierIdEnum'
									},{
										fieldLabel : '建議售價總金額',
										maxLength:18,
										allowBlank : false,
										name : 'pssPurchaseOrderHead.SalePriceAmountEnum',
										id : 'SalePriceAmountEnum'
									},{
										fieldLabel : '備註',
										maxLength:18,
										allowBlank : false,
										name : 'pssPurchaseOrderHead.RemarkEnum',
										id : 'RemarkEnum'
									},{
										fieldLabel : '創建人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssPurchaseOrderHead.CreateByEnum',
										id : 'CreateByEnum'
									},{
										fieldLabel : '修改人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssPurchaseOrderHead.UpdateByEnum',
										id : 'UpdateByEnum'
						     }]
						},{
							items : [{
										xtype : 'hidden'
									},{
										fieldLabel : '定價總金額',
										maxLength:18,
										allowBlank : false,
										name : 'pssPurchaseOrderHead.PriceAmountEnum',
										id : 'PriceAmountEnum'
									},{
										fieldLabel : '成交價總金額',
										maxLength:18,
										allowBlank : false,
										name : 'pssPurchaseOrderHead.PayAmountEnum',
										id : 'PayAmountEnum'
									},{
										fieldLabel : '創建日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssPurchaseOrderHead.CreateDateEnum',
										id : 'CreateDateEnum'
									},{
										fieldLabel : '修改日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssPurchaseOrderHead.UpdateDateEnum',
										id : 'UpdateDateEnum'
					         }]
						}]
					}]
				}]
			}]
		});
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/act/listPssPurchaseOrderHead.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['id'
								,SupplierIdEnum
								,PriceAmountEnum
								,SalePriceAmountEnum
								,PayAmountEnum
								,RemarkEnum
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
							header : '供應商編號/供應商代號',
							width : 120,
							dataIndex : 'SupplierIdEnum'
						},{
							header : '定價總金額',
							width : 120,
							dataIndex : 'PriceAmountEnum'
						},{
							header : '建議售價總金額',
							width : 120,
							dataIndex : 'SalePriceAmountEnum'
						},{
							header : '成交價總金額',
							width : 120,
							dataIndex : 'PayAmountEnum'
						},{
							header : '備註',
							width : 120,
							dataIndex : 'RemarkEnum'
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
							return '&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssPurchaseOrderHeadView.edit('
							+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssPurchaseOrderHeadView.remove('
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
					id : 'PssPurchaseOrderHeadGrid',
					region : 'center',
					tbar : (isGranted('_PssPurchaseOrderHeadAdd') ? new Ext.Toolbar({
								id : 'PssPurchaseOrderHeadFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增採購單',
											handler : function() {
												new PssPurchaseOrderHeadForm().show();
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

PssPurchaseOrderHeadView.remove = function(id) {
	var grid = Ext.getCmp("PssPurchaseOrderHeadGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/act/multiDelPssPurchaseOrderHead.do',
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

PssPurchaseOrderHeadView.edit = function(id) {
	new PssPurchaseOrderHeadForm({
				recId : id
			}).show();
};
