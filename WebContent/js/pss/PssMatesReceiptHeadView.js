/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssMatesReceiptHeadView');
PssMatesReceiptHeadView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssMatesReceiptHeadView.superclass.constructor.call(this, {
					id : 'PssMatesReceiptHeadView',
					title : '收貨單',
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
			id : 'PssMatesReceiptHeadSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssMatesReceiptHeadSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssMatesReceiptHeadGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssMatesReceiptHeadSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '收貨單查詢',
				layout : 'form',
				items : [{
					xtype : 'fieldset',
					title : '收貨單',
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
										name : 'pssMatesReceiptHead.id',
										id : 'id',
										xtype : 'hidden',
										value : recId||''
									},{
										fieldLabel : '採購單編號',
										maxLength:18,
										allowBlank : false,
										name : 'pssMatesReceiptHead.PoHeadIdEnum',
										id : 'PoHeadIdEnum'
									},{
										fieldLabel : '收貨人名稱/倉管人員名稱',
										maxLength:18,
										allowBlank : false,
										name : 'pssMatesReceiptHead.ReceiverNameEnum',
										id : 'ReceiverNameEnum'
									},{
										fieldLabel : '收貨發票號碼(應付帳款)',
										maxLength:18,
										allowBlank : false,
										name : 'pssMatesReceiptHead.MrInvoiceEnum',
										id : 'MrInvoiceEnum'
									},{
										fieldLabel : '送貨人電話',
										maxLength:18,
										allowBlank : false,
										name : 'pssMatesReceiptHead.DiliverTelEnum',
										id : 'DiliverTelEnum'
									},{
										fieldLabel : '創建日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssMatesReceiptHead.CreateDateEnum',
										id : 'CreateDateEnum'
									},{
										fieldLabel : '修改日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssMatesReceiptHead.UpdateDateEnum',
										id : 'UpdateDateEnum'
						     }]
						},{
							items : [{
										xtype : 'hidden'
									},{
										fieldLabel : '收貨倉庫編號/倉庫代號',
										maxLength:18,
										allowBlank : false,
										name : 'pssMatesReceiptHead.WarehouseIdEnum',
										id : 'WarehouseIdEnum'
									},{
										fieldLabel : '收貨人電話',
										maxLength:18,
										allowBlank : false,
										name : 'pssMatesReceiptHead.ReceiverTelEnum',
										id : 'ReceiverTelEnum'
									},{
										fieldLabel : '送貨人名稱',
										maxLength:18,
										allowBlank : false,
										name : 'pssMatesReceiptHead.DiliverNameEnum',
										id : 'DiliverNameEnum'
									},{
										fieldLabel : '備註',
										maxLength:18,
										allowBlank : false,
										name : 'pssMatesReceiptHead.RemarkEnum',
										id : 'RemarkEnum'
									},{
										fieldLabel : '創建人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssMatesReceiptHead.CreateByEnum',
										id : 'CreateByEnum'
									},{
										fieldLabel : '修改人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssMatesReceiptHead.UpdateByEnum',
										id : 'UpdateByEnum'
					         }]
						}]
					}]
				}]
			}]
		});
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/act/listPssMatesReceiptHead.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['id'
								,PoHeadIdEnum
								,WarehouseIdEnum
								,ReceiverNameEnum
								,ReceiverTelEnum
								,MrInvoiceEnum
								,DiliverNameEnum
								,DiliverTelEnum
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
							header : '採購單編號',
							width : 120,
							dataIndex : 'PoHeadIdEnum'
						},{
							header : '收貨倉庫編號/倉庫代號',
							width : 120,
							dataIndex : 'WarehouseIdEnum'
						},{
							header : '收貨人名稱/倉管人員名稱',
							width : 120,
							dataIndex : 'ReceiverNameEnum'
						},{
							header : '收貨人電話',
							width : 120,
							dataIndex : 'ReceiverTelEnum'
						},{
							header : '收貨發票號碼(應付帳款)',
							width : 120,
							dataIndex : 'MrInvoiceEnum'
						},{
							header : '送貨人名稱',
							width : 120,
							dataIndex : 'DiliverNameEnum'
						},{
							header : '送貨人電話',
							width : 120,
							dataIndex : 'DiliverTelEnum'
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
							return '&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssMatesReceiptHeadView.edit('
							+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssMatesReceiptHeadView.remove('
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
					id : 'PssMatesReceiptHeadGrid',
					region : 'center',
					tbar : (isGranted('_PssMatesReceiptHeadAdd') ? new Ext.Toolbar({
								id : 'PssMatesReceiptHeadFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增收貨單',
											handler : function() {
												new PssMatesReceiptHeadForm().show();
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

PssMatesReceiptHeadView.remove = function(id) {
	var grid = Ext.getCmp("PssMatesReceiptHeadGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/act/multiDelPssMatesReceiptHead.do',
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

PssMatesReceiptHeadView.edit = function(id) {
	new PssMatesReceiptHeadForm({
				recId : id
			}).show();
};
