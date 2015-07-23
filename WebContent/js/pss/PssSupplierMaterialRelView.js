/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssSupplierMaterialRelView');
PssSupplierMaterialRelView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssSupplierMaterialRelView.superclass.constructor.call(this, {
					id : 'PssSupplierMaterialRelView',
					title : '供應商原料關係表',
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
			id : 'PssSupplierMaterialRelSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssSupplierMaterialRelSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssSupplierMaterialRelGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssSupplierMaterialRelSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '供應商原料關係表查詢',
				layout : 'form',
				items : [{
					xtype : 'fieldset',
					title : '供應商原料關係表',
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
										name : 'pssSupplierMaterialRel.id',
										id : 'id',
										xtype : 'hidden',
										value : recId||''
									},{
										fieldLabel : '供應商編號/供應商代號',
										maxLength:18,
										allowBlank : false,
										name : 'pssSupplierMaterialRel.supplierId',
										id : 'supplierId'
									},{
										fieldLabel : '產品定價(單價)',
										maxLength:18,
										allowBlank : false,
										name : 'pssSupplierMaterialRel.price',
										id : 'price'
									},{
										fieldLabel : '創建日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssSupplierMaterialRel.createDate',
										id : 'createDate'
									},{
										fieldLabel : '修改日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssSupplierMaterialRel.updateDate',
										id : 'updateDate'
						     }]
						},{
							items : [{
										xtype : 'hidden'
									},{
										fieldLabel : '原料編號/原料代號',
										maxLength:18,
										allowBlank : false,
										name : 'pssSupplierMaterialRel.materialId',
										id : 'materialId'
									},{
										fieldLabel : '產品建議售價(單價)',
										maxLength:18,
										allowBlank : false,
										name : 'pssSupplierMaterialRel.salePrice',
										id : 'salePrice'
									},{
										fieldLabel : '創建人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssSupplierMaterialRel.createBy',
										id : 'createBy'
									},{
										fieldLabel : '修改人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssSupplierMaterialRel.updateBy',
										id : 'updateBy'
					         }]
						}]
					}]
				}]
			}]
		});
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/act/listPssSupplierMaterialRel.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['id'
								,'supplierId'
								,'materialId'
								,'price'
								,'salePrice'
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
							header : '供應商編號/供應商代號',
							width : 120,
							dataIndex : 'supplierId'
						},{
							header : '原料編號/原料代號',
							width : 120,
							dataIndex : 'materialId'
						},{
							header : '產品定價(單價)',
							width : 120,
							dataIndex : 'price'
						},{
							header : '產品建議售價(單價)',
							width : 120,
							dataIndex : 'salePrice'
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
							return '&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssSupplierMaterialRelView.edit('
							+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssSupplierMaterialRelView.remove('
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
					id : 'PssSupplierMaterialRelGrid',
					region : 'center',
					tbar : (isGranted('_PssSupplierMaterialRelAdd') ? new Ext.Toolbar({
								id : 'PssSupplierMaterialRelFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增供應商原料關係表',
											handler : function() {
												new PssSupplierMaterialRelForm().show();
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

PssSupplierMaterialRelView.remove = function(id) {
	var grid = Ext.getCmp("PssSupplierMaterialRelGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/act/multiDelPssSupplierMaterialRel.do',
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

PssSupplierMaterialRelView.edit = function(id) {
	new PssSupplierMaterialRelForm({
				recId : id
			}).show();
};
