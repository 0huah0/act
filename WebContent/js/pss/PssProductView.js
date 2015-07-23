/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssProductView');
PssProductView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssProductView.superclass.constructor.call(this, {
					id : 'PssProductView',
					title : '產品',
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
			id : 'PssProductSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssProductSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssProductGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssProductSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '產品查詢',
				layout : 'form',
				items : [{
					xtype : 'fieldset',
					title : '產品',
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
										name : 'pssProduct.id',
										id : 'id',
										xtype : 'hidden',
										value : recId||''
									},{
										fieldLabel : '產品名稱',
										maxLength:18,
										allowBlank : false,
										name : 'pssProduct.NameEnum',
										id : 'NameEnum'
									},{
										fieldLabel : '單位，1：個、2：塊、3：條、4：片、5：公斤、6：公噸、7：...。',
										maxLength:18,
										allowBlank : false,
										name : 'pssProduct.UnitEnum',
										id : 'UnitEnum'
									},{
										fieldLabel : '產品建議售價(單價)',
										maxLength:18,
										allowBlank : false,
										name : 'pssProduct.SalePriceEnum',
										id : 'SalePriceEnum'
									},{
										fieldLabel : '創建日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssProduct.CreateDateEnum',
										id : 'CreateDateEnum'
									},{
										fieldLabel : '修改日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssProduct.UpdateDateEnum',
										id : 'UpdateDateEnum'
						     }]
						},{
							items : [{
										xtype : 'hidden'
									},{
										fieldLabel : '描述',
										maxLength:18,
										allowBlank : false,
										name : 'pssProduct.DescEnum',
										id : 'DescEnum'
									},{
										fieldLabel : '產品定價(單價)',
										maxLength:18,
										allowBlank : false,
										name : 'pssProduct.PriceEnum',
										id : 'PriceEnum'
									},{
										fieldLabel : '有效否，0：無效、1：有效。',
										maxLength:18,
										allowBlank : false,
										name : 'pssProduct.ActiveEnum',
										id : 'ActiveEnum'
									},{
										fieldLabel : '創建人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssProduct.CreateByEnum',
										id : 'CreateByEnum'
									},{
										fieldLabel : '修改人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssProduct.UpdateByEnum',
										id : 'UpdateByEnum'
					         }]
						}]
					}]
				}]
			}]
		});
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/act/listPssProduct.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['id'
								,NameEnum
								,DescEnum
								,UnitEnum
								,PriceEnum
								,SalePriceEnum
								,ActiveEnum
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
							header : '產品名稱',
							width : 120,
							dataIndex : 'NameEnum'
						},{
							header : '描述',
							width : 120,
							dataIndex : 'DescEnum'
						},{
							header : '單位，1：個、2：塊、3：條、4：片、5：公斤、6：公噸、7：...。',
							width : 120,
							dataIndex : 'UnitEnum'
						},{
							header : '產品定價(單價)',
							width : 120,
							dataIndex : 'PriceEnum'
						},{
							header : '產品建議售價(單價)',
							width : 120,
							dataIndex : 'SalePriceEnum'
						},{
							header : '有效否，0：無效、1：有效。',
							width : 120,
							dataIndex : 'ActiveEnum'
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
							return '&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssProductView.edit('
							+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssProductView.remove('
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
					id : 'PssProductGrid',
					region : 'center',
					tbar : (isGranted('_PssProductAdd') ? new Ext.Toolbar({
								id : 'PssProductFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增產品',
											handler : function() {
												new PssProductForm().show();
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

PssProductView.remove = function(id) {
	var grid = Ext.getCmp("PssProductGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/act/multiDelPssProduct.do',
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

PssProductView.edit = function(id) {
	new PssProductForm({
				recId : id
			}).show();
};
