/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssMatesReceiptDetailView');
PssMatesReceiptDetailView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssMatesReceiptDetailView.superclass.constructor.call(this, {
					id : 'PssMatesReceiptDetailView',
					title : '收貨單子項',
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
			id : 'PssMatesReceiptDetailSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssMatesReceiptDetailSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssMatesReceiptDetailGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssMatesReceiptDetailSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '收貨單子項查詢',
				layout : 'form',
				items : [{
					xtype : 'fieldset',
					title : '收貨單子項',
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
										name : 'pssMatesReceiptDetail.id',
										id : 'id',
										xtype : 'hidden',
										value : recId||''
									},{
										fieldLabel : '收貨單編號',
										maxLength:18,
										allowBlank : false,
										name : 'pssMatesReceiptDetail.mrHeadId',
										id : 'mrHeadId'
									},{
										fieldLabel : '原料編號',
										maxLength:18,
										allowBlank : false,
										name : 'pssMatesReceiptDetail.materialId',
										id : 'materialId'
									},{
										fieldLabel : '接收數量',
										maxLength:18,
										allowBlank : false,
										name : 'pssMatesReceiptDetail.receiptNum',
										id : 'receiptNum'
									},{
										fieldLabel : '創建日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssMatesReceiptDetail.createDate',
										id : 'createDate'
									},{
										fieldLabel : '修改日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssMatesReceiptDetail.updateDate',
										id : 'updateDate'
						     }]
						},{
							items : [{
										xtype : 'hidden'
									},{
										fieldLabel : '收貨單明細編號',
										maxLength:18,
										allowBlank : false,
										name : 'pssMatesReceiptDetail.mrDetailId',
										id : 'mrDetailId'
									},{
										fieldLabel : '來貨數量',
										maxLength:18,
										allowBlank : false,
										name : 'pssMatesReceiptDetail.allNum',
										id : 'allNum'
									},{
										fieldLabel : '退回數量',
										maxLength:18,
										allowBlank : false,
										name : 'pssMatesReceiptDetail.rejectNum',
										id : 'rejectNum'
									},{
										fieldLabel : '創建人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssMatesReceiptDetail.createBy',
										id : 'createBy'
									},{
										fieldLabel : '修改人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssMatesReceiptDetail.updateBy',
										id : 'updateBy'
					         }]
						}]
					}]
				}]
			}]
		});
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/act/listPssMatesReceiptDetail.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['id'
								,'mrHeadId'
								,'mrDetailId'
								,'materialId'
								,'allNum'
								,'receiptNum'
								,'rejectNum'
								,'createDate'
								,'createBy'
								,'updateDate'
								,'updateBy'
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
							header : '收貨單編號',
							width : 120,
							dataIndex : 'mrHeadId'
						},{
							header : '收貨單明細編號',
							width : 120,
							dataIndex : 'mrDetailId'
						},{
							header : '原料編號',
							width : 120,
							dataIndex : 'materialId'
						},{
							header : '來貨數量',
							width : 120,
							dataIndex : 'allNum'
						},{
							header : '接收數量',
							width : 120,
							dataIndex : 'receiptNum'
						},{
							header : '退回數量',
							width : 120,
							dataIndex : 'rejectNum'
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
							return '&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssMatesReceiptDetailView.edit('
							+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssMatesReceiptDetailView.remove('
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
					id : 'PssMatesReceiptDetailGrid',
					region : 'center',
					tbar : (isGranted('_PssMatesReceiptDetailAdd') ? new Ext.Toolbar({
								id : 'PssMatesReceiptDetailFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增收貨單子項',
											handler : function() {
												new PssMatesReceiptDetailForm().show();
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

PssMatesReceiptDetailView.remove = function(id) {
	var grid = Ext.getCmp("PssMatesReceiptDetailGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/act/multiDelPssMatesReceiptDetail.do',
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

PssMatesReceiptDetailView.edit = function(id) {
	new PssMatesReceiptDetailForm({
				recId : id
			}).show();
};
