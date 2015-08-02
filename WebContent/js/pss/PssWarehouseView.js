/*
 * Powered By [shi_zenghua@qq.com]
 */
Ext.ns('PssWarehouseView');
PssWarehouseView = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssWarehouseView.superclass.constructor.call(this, {
					id : 'PssWarehouseView',
					title : '倉庫',
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
			id : 'PssWarehouseSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssWarehouseSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssWarehouseGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssWarehouseSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '倉庫查詢',
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
									fieldLabel : '名稱',
									maxLength:18,
									name : 'S_name_S_LK'
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									name : 'S_createBy_S_LK'
								},{
								xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '描述',
									maxLength:18,
									name : 'S_desc_S_LK'
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
									fieldLabel : '倉庫編號/倉庫代號',
									maxLength:18,
									name : 'S_warehouseId_S_LK'
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
					url : __ctxPath + '/pss/listPssWarehouse.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['warehouseId','name','desc','createDate','createBy','updateDate','updateBy'
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
							header : '倉庫編號/倉庫代號',
							dataIndex : 'warehouseId'
						},{
							header : '名稱',
							dataIndex : 'name'
						},{
							header : '描述',
							dataIndex : 'desc'
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
						dataIndex : 'warehouseId',//
						renderer : function(v,m,r) {
							return isGranted('_PssWarehouseEdit') ?('&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssWarehouseView.edit('
							+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssWarehouseView.remove('
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
					id : 'PssWarehouseGrid',
					tbar : (isGranted('_PssWarehouseEdit') ? new Ext.Toolbar({
								id : 'PssWarehouseFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增倉庫',
											handler : function() {
												new PssWarehouseForm().show();
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
PssWarehouseView.remove = function(id) {
	var grid = Ext.getCmp("PssWarehouseGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/pss/multiDelPssWarehouse.do',
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

PssWarehouseView.edit = function(id) {
	new PssWarehouseForm({
				recId : id
			}).show();
};

//end of view static method
