/*
 * Powered By [shi_zenghua@qq.com]
 */
Ext.ns('PssPurchaseOrderHeadView');
PssPurchaseOrderHeadView = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssPurchaseOrderHeadView.superclass.constructor.call(this, {
					id : 'PssPurchaseOrderHeadView',
					title : '採購單',
					iconCls : 'menu-planmanage',
					region : 'center',
					items : [this.searchPanel, this.gridPanel]
		});
	},
	initUIComponents : function() {
		//searchPanel
		this.searchPanel = new Ext.FormPanel({
			autoHeight : true,
			frame : true,
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
					layout : 'column',
					columnWidth : 0.33,
					defaults : {
						layout : 'form',
						padding : '0 0 0 20px',
						labelAlign : 'right',
						labelWidth : 120,
						defaults : {
							xtype : 'textfield',
							width : 140
						}
					},
					items : [{
						items : [{
									fieldLabel : '供應商編號/供應商代號',
									maxLength:18,
									name : 'S_supplierId_S_LK'
								},{
									fieldLabel : '成交價總金額',
									maxLength:18,
									name : 'S_payAmount_L_EQ'
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									name : 'S_createBy_S_LK'
								},{
								xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '定價總金額',
									maxLength:18,
									name : 'S_priceAmount_L_EQ'
								},{
									fieldLabel : '備註',
									maxLength:18,
									name : 'S_remark_S_LK'
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									name : 'S_updateDate_D_DL'
								},{
									xtype:'hidden'
								}]//
					},{
						items : [{
									xtype:'hidden',
									fieldLabel : '採購單編號（採購單代碼2位(PO)+當前日期8位(yyyyMMdd)+流水號6位）',
									maxLength:18,
									name : 'S_poHeadId_S_LK'
								},{
									fieldLabel : '建議售價總金額',
									maxLength:18,
									name : 'S_salePriceAmount_L_EQ'
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									name : 'S_createDate_D_DL'
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									name : 'S_updateBy_S_LK'
								},{
									xtype:'hidden'
								}]//
					}]
				}]
			}]
		});
		//end of searchPanel
		
		
		//store
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/pss/listPssPurchaseOrderHead.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['poHeadId','supplierId','priceAmount','salePriceAmount','payAmount','remark','createDate','createBy','updateDate','updateBy'
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
							header : '採購單編號（採購單代碼2位(PO)+當前日期8位(yyyyMMdd)+流水號6位）',
							dataIndex : 'poHeadId'
						},{
							header : '供應商編號/供應商代號',
							dataIndex : 'supplierId'
						},{
							header : '定價總金額',
							dataIndex : 'priceAmount'
						},{
							header : '建議售價總金額',
							dataIndex : 'salePriceAmount'
						},{
							header : '成交價總金額',
							dataIndex : 'payAmount'
						},{
							header : '備註',
							dataIndex : 'remark'
						},{
							header : '創建日期',
							dataIndex : 'createDate'
						},{
							header : '創建人員',
							dataIndex : 'createBy'
						},{
							header : '修改日期',
							dataIndex : 'updateDate'
						},{
							header : '修改人員',
							dataIndex : 'updateBy'
						},{
						header : '管理',
						dataIndex : 'poHeadId',//
						renderer : function(v,m,r) {
							return isGranted('_PssPurchaseOrderHeadEdit') ?('&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssPurchaseOrderHeadView.edit('
							+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssPurchaseOrderHeadView.remove('
							+ v + ')"></button>'):'';
						}
					}],
			defaults : {
				sortable : true,
				menuDisabled : false,
				width : 120
			}
		});

		this.gridPanel = new Ext.grid.GridPanel({
					id : 'PssPurchaseOrderHeadGrid',
					tbar : (isGranted('_PssPurchaseOrderHeadEdit') ? new Ext.Toolbar({
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
		//end of store
	}
});// end of main view


//view static method
PssPurchaseOrderHeadView.remove = function(id) {
	var grid = Ext.getCmp("PssPurchaseOrderHeadGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/pss/multiDelPssPurchaseOrderHead.do',
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
						Ext.Msg.alert("信息", "該項沒能被刪除！");
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

//end of view static method
