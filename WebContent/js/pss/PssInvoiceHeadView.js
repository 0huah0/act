/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssInvoiceHeadView');
PssInvoiceHeadView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssInvoiceHeadView.superclass.constructor.call(this, {
					id : 'PssInvoiceHeadView',
					title : '發票',
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
			id : 'PssInvoiceHeadSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssInvoiceHeadSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssInvoiceHeadGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssInvoiceHeadSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '發票查詢',
				layout : 'form',
				items : [{
					xtype : 'fieldset',
					title : '發票',
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
										fieldLabel : '客戶編號/供應商編號，TYPE=1時，該欄位存客戶編號，TYPE=2時，該欄位存供應商編號。',
										maxLength:18,
										allowBlank : false,
										name : 'pssInvoiceHead.cusOrSupId',
										id : 'cusOrSupId'
									},{
										fieldLabel : '創建日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssInvoiceHead.createDate',
										id : 'createDate'
									},{
										fieldLabel : '修改人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssInvoiceHead.updateBy',
										id : 'updateBy'
									},{
									}]
						},{
							items : [{
										fieldLabel : '發票金額',
										maxLength:18,
										allowBlank : false,
										name : 'pssInvoiceHead.invAmount',
										id : 'invAmount'
									},{
										fieldLabel : '創建人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssInvoiceHead.createBy',
										id : 'createBy'
									},{
									}]
						},{
							items : [{
										fieldLabel : '發票編號',
										maxLength:18,
										allowBlank : false,
										name : 'pssInvoiceHead.invoiceHeadId',
										id : 'invoiceHeadId'
									},{
										fieldLabel : '類型，1：出貨發票、2：收貨發票。',
										maxLength:18,
										allowBlank : false,
										name : 'pssInvoiceHead.type',
										id : 'type'
									},{
										fieldLabel : '修改日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssInvoiceHead.updateDate',
										id : 'updateDate'
									},{
									}]
						}]
					}]
				}]
			}]
		});
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/pss/listPssInvoiceHead.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['id'
								,'invoiceHeadId'
								,'cusOrSupId'
								,'invAmount'
								,'type'
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
							header : '發票編號',
							width : 120,
							dataIndex : 'invoiceHeadId'
						},{
							header : '客戶編號/供應商編號，TYPE=1時，該欄位存客戶編號，TYPE=2時，該欄位存供應商編號。',
							width : 120,
							dataIndex : 'cusOrSupId'
						},{
							header : '發票金額',
							width : 120,
							dataIndex : 'invAmount'
						},{
							header : '類型，1：出貨發票、2：收貨發票。',
							width : 120,
							dataIndex : 'type'
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
							return '&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssInvoiceHeadView.edit('
							+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssInvoiceHeadView.remove('
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
					id : 'PssInvoiceHeadGrid',
					region : 'center',
					tbar : (isGranted('_PssInvoiceHeadAdd') ? new Ext.Toolbar({
								id : 'PssInvoiceHeadFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增發票',
											handler : function() {
												new PssInvoiceHeadForm().show();
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

PssInvoiceHeadView.remove = function(id) {
	var grid = Ext.getCmp("PssInvoiceHeadGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/pss/multiDelPssInvoiceHead.do',
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

PssInvoiceHeadView.edit = function(id) {
	new PssInvoiceHeadForm({
				recId : id
			}).show();
};
