/*
 * Powered By [shi_zenghua@qq.com]
 */
 
Ext.ns('PssSupplierMaterialRelView');
PssSupplierMaterialRelView = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssSupplierMaterialRelView.superclass.constructor.call(this, {
					id : 'PssSupplierMaterialRelView',
					title : '供應商原料關係表',
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
									xtype:'hidden',
									fieldLabel : '原料編號/原料代號',
									maxLength:18,
									name : "pssSupplierMaterialRel.materialId"
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									xtype:"hidden",name : "pssSupplierMaterialRel.createDate"
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									xtype:"hidden",name : "pssSupplierMaterialRel.updateBy"
								},{
								xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '產品定價(單價)',
									maxLength:18,
									name : "pssSupplierMaterialRel.price"
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									xtype:"hidden",name : "pssSupplierMaterialRel.createBy"
								},{
									xtype:'hidden'
								}]//
					},{
						items : [{
									xtype:'hidden',
									fieldLabel : '供應商編號/供應商代號',
									maxLength:18,
									name : "pssSupplierMaterialRel.supplierId"
								},{
									fieldLabel : '產品建議售價(單價)',
									maxLength:18,
									name : "pssSupplierMaterialRel.salePrice"
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									xtype:"hidden",name : "pssSupplierMaterialRel.updateDate"
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
					url : __ctxPath + '/pss/listPssSupplierMaterialRel.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['supplierId','materialId','price','salePrice','createDate','createBy','updateDate','updateBy'
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
							header : '供應商編號/供應商代號',
							dataIndex : 'supplierId'
						},{
							header : '原料編號/原料代號',
							dataIndex : 'materialId'
						},{
							header : '產品定價(單價)',
							dataIndex : 'price'
						},{
							header : '產品建議售價(單價)',
							dataIndex : 'salePrice'
						},{
							header : '創建日期',
							dataIndex : 'createDate',renderer:function(v){if(v){return new Date(v).format("Y-m-d H:i");}else{return "";}}
						},{
							header : '創建人員',
							dataIndex : 'createBy'
						},{
							header : '修改日期',
							dataIndex : 'updateDate',renderer:function(v){if(v){return new Date(v).format("Y-m-d H:i");}else{return "";}}
						},{
							header : '修改人員',
							dataIndex : 'updateBy'
						},{
						header : '管理',
						dataIndex : 'supplierId',//
						renderer : function(v,m,r) {
							return isGranted('_PssSupplierMaterialRelEdit') ?('&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssSupplierMaterialRelView.edit(\''
							+ v + '\')"></button><button title="刪除" value=" " class="btn-del" onclick="PssSupplierMaterialRelView.remove(\''
							+ v + '\')"></button>'):'';
						}
					}],
			defaults : {
				sortable : true,
				menuDisabled : false,
				width : 120
			}
		});

		this.gridPanel = new Ext.grid.GridPanel({
					id : 'PssSupplierMaterialRelGrid',
					height : 380,
					tbar : (isGranted('_PssSupplierMaterialRelEdit') ? new Ext.Toolbar({
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
PssSupplierMaterialRelView.remove = function(id) {
	var grid = Ext.getCmp("PssSupplierMaterialRelGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/pss/multiDelPssSupplierMaterialRel.do',
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

PssSupplierMaterialRelView.edit = function(id) {
	new PssSupplierMaterialRelForm({
				recId : id
			}).show();
};

//end of view static method
