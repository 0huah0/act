/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssSalesOrderHeadView');
PssSalesOrderHeadView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssSalesOrderHeadView.superclass.constructor.call(this, {
					id : 'PssSalesOrderHeadView',
					title : '銷貨單',
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
			id : 'PssSalesOrderHeadSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssSalesOrderHeadSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssSalesOrderHeadGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssSalesOrderHeadSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '銷貨單查詢',
				layout : 'form',
				items : [{
					xtype : 'fieldset',
					title : '銷貨單',
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
										fieldLabel : '客戶編號',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderHead.customerId',
										id : 'customerId'
									},{
										fieldLabel : '建議售價總金額',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderHead.salePriceAmount',
										id : 'salePriceAmount'
									},{
										fieldLabel : '備註',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderHead.remark',
										id : 'remark'
									},{
										fieldLabel : '修改日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderHead.updateDate',
										id : 'updateDate'
									},{
									}]
						},{
							items : [{
										fieldLabel : '客戶採購單編號',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderHead.custPoNo',
										id : 'custPoNo'
									},{
										fieldLabel : '實際售價總金額',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderHead.payAmount',
										id : 'payAmount'
									},{
										fieldLabel : '創建日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderHead.createDate',
										id : 'createDate'
									},{
										fieldLabel : '修改人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderHead.updateBy',
										id : 'updateBy'
									},{
									}]
						},{
							items : [{
										fieldLabel : '銷貨單編號，銷貨單代碼2位(SO)+當前日期8位(yyyyMMdd)+流水號6位。',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderHead.soHeadId',
										id : 'soHeadId'
									},{
										fieldLabel : '定價總金額',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderHead.priceAmount',
										id : 'priceAmount'
									},{
										fieldLabel : '優惠金額',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderHead.discountAmount',
										id : 'discountAmount'
									},{
										fieldLabel : '創建人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssSalesOrderHead.createBy',
										id : 'createBy'
									},{
									}]
						}]
					}]
				}]
			}]
		});
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/pss/listPssSalesOrderHead.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['id'
								,'soHeadId'
								,'customerId'
								,'custPoNo'
								,'priceAmount'
								,'salePriceAmount'
								,'payAmount'
								,'discountAmount'
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
							header : '銷貨單編號，銷貨單代碼2位(SO)+當前日期8位(yyyyMMdd)+流水號6位。',
							width : 120,
							dataIndex : 'soHeadId'
						},{
							header : '客戶編號',
							width : 120,
							dataIndex : 'customerId'
						},{
							header : '客戶採購單編號',
							width : 120,
							dataIndex : 'custPoNo'
						},{
							header : '定價總金額',
							width : 120,
							dataIndex : 'priceAmount'
						},{
							header : '建議售價總金額',
							width : 120,
							dataIndex : 'salePriceAmount'
						},{
							header : '實際售價總金額',
							width : 120,
							dataIndex : 'payAmount'
						},{
							header : '優惠金額',
							width : 120,
							dataIndex : 'discountAmount'
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
							return '&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssSalesOrderHeadView.edit('
							+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssSalesOrderHeadView.remove('
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
					id : 'PssSalesOrderHeadGrid',
					region : 'center',
					tbar : (isGranted('_PssSalesOrderHeadAdd') ? new Ext.Toolbar({
								id : 'PssSalesOrderHeadFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增銷貨單',
											handler : function() {
												new PssSalesOrderHeadForm().show();
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

PssSalesOrderHeadView.remove = function(id) {
	var grid = Ext.getCmp("PssSalesOrderHeadGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/pss/multiDelPssSalesOrderHead.do',
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

PssSalesOrderHeadView.edit = function(id) {
	new PssSalesOrderHeadForm({
				recId : id
			}).show();
};
