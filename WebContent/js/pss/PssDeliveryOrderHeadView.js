/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssDeliveryOrderHeadView');
PssDeliveryOrderHeadView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssDeliveryOrderHeadView.superclass.constructor.call(this, {
					id : 'PssDeliveryOrderHeadView',
					title : '出貨單',
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
			id : 'PssDeliveryOrderHeadSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssDeliveryOrderHeadSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssDeliveryOrderHeadGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssDeliveryOrderHeadSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '出貨單查詢',
				layout : 'form',
				items : [{
					xtype : 'fieldset',
					title : '出貨單',
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
										fieldLabel : '銷貨單編號',
										maxLength:18,
										allowBlank : false,
										name : 'pssDeliveryOrderHead.soHeadId',
										id : 'soHeadId'
									},{
										fieldLabel : '送貨人名稱',
										maxLength:18,
										allowBlank : false,
										name : 'pssDeliveryOrderHead.diliverName',
										id : 'diliverName'
									},{
										fieldLabel : '出貨發票號碼 (應收帳款)',
										maxLength:18,
										allowBlank : false,
										name : 'pssDeliveryOrderHead.doInvoice',
										id : 'doInvoice'
									},{
										fieldLabel : '創建人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssDeliveryOrderHead.createBy',
										id : 'createBy'
									},{
									}]
						},{
							items : [{
										fieldLabel : '出貨倉庫編號/倉庫代號',
										maxLength:18,
										allowBlank : false,
										name : 'pssDeliveryOrderHead.warehouseId',
										id : 'warehouseId'
									},{
										fieldLabel : '收貨人名稱',
										maxLength:18,
										allowBlank : false,
										name : 'pssDeliveryOrderHead.receiverName',
										id : 'receiverName'
									},{
										fieldLabel : '備註',
										maxLength:18,
										allowBlank : false,
										name : 'pssDeliveryOrderHead.remark',
										id : 'remark'
									},{
										fieldLabel : '修改日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssDeliveryOrderHead.updateDate',
										id : 'updateDate'
									},{
									}]
						},{
							items : [{
										fieldLabel : '出貨單編號，出貨單代碼2位(DO)+當前日期8位(yyyyMMdd)+流水號6位。',
										maxLength:18,
										allowBlank : false,
										name : 'pssDeliveryOrderHead.doHeadId',
										id : 'doHeadId'
									},{
										fieldLabel : '送貨人電話',
										maxLength:18,
										allowBlank : false,
										name : 'pssDeliveryOrderHead.diliverTel',
										id : 'diliverTel'
									},{
										fieldLabel : '收貨人電話',
										maxLength:18,
										allowBlank : false,
										name : 'pssDeliveryOrderHead.receiverTel',
										id : 'receiverTel'
									},{
										fieldLabel : '創建日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssDeliveryOrderHead.createDate',
										id : 'createDate'
									},{
										fieldLabel : '修改人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssDeliveryOrderHead.updateBy',
										id : 'updateBy'
									},{
									}]
						}]
					}]
				}]
			}]
		});
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/pss/listPssDeliveryOrderHead.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['id'
								,'doHeadId'
								,'soHeadId'
								,'warehouseId'
								,'diliverTel'
								,'diliverName'
								,'receiverName'
								,'receiverTel'
								,'doInvoice'
								,'remark'
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
							header : '出貨單編號，出貨單代碼2位(DO)+當前日期8位(yyyyMMdd)+流水號6位。',
							width : 120,
							dataIndex : 'doHeadId'
						},{
							header : '銷貨單編號',
							width : 120,
							dataIndex : 'soHeadId'
						},{
							header : '出貨倉庫編號/倉庫代號',
							width : 120,
							dataIndex : 'warehouseId'
						},{
							header : '送貨人電話',
							width : 120,
							dataIndex : 'diliverTel'
						},{
							header : '送貨人名稱',
							width : 120,
							dataIndex : 'diliverName'
						},{
							header : '收貨人名稱',
							width : 120,
							dataIndex : 'receiverName'
						},{
							header : '收貨人電話',
							width : 120,
							dataIndex : 'receiverTel'
						},{
							header : '出貨發票號碼 (應收帳款)',
							width : 120,
							dataIndex : 'doInvoice'
						},{
							header : '備註',
							width : 120,
							dataIndex : 'remark'
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
							return '&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssDeliveryOrderHeadView.edit('
							+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssDeliveryOrderHeadView.remove('
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
					id : 'PssDeliveryOrderHeadGrid',
					region : 'center',
					tbar : (isGranted('_PssDeliveryOrderHeadAdd') ? new Ext.Toolbar({
								id : 'PssDeliveryOrderHeadFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增出貨單',
											handler : function() {
												new PssDeliveryOrderHeadForm().show();
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

PssDeliveryOrderHeadView.remove = function(id) {
	var grid = Ext.getCmp("PssDeliveryOrderHeadGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/pss/multiDelPssDeliveryOrderHead.do',
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

PssDeliveryOrderHeadView.edit = function(id) {
	new PssDeliveryOrderHeadForm({
				recId : id
			}).show();
};
