/*
 * Powered By [shi_zenghua@qq.com]
 */
Ext.ns('PssInventoryView');
PssInventoryView = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssInventoryView.superclass.constructor.call(this, {
					id : 'PssInventoryView',
					title : '庫存',
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
			id : 'PssInventorySearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssInventorySearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssInventoryGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssInventorySearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '庫存查詢',
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
									name : 'S_materialId_S_LK'
								},{
									fieldLabel : '庫存良品數量',
									maxLength:18,
									name : 'S_goodPdtNum_L_EQ'
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									name : 'S_createBy_S_LK'
								},{
								xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '報警水位數量 (According to 良品)',
									maxLength:18,
									name : 'S_alertNum_L_EQ'
								},{
									fieldLabel : '庫存不良品數量',
									maxLength:18,
									name : 'S_rejectsNum_L_EQ'
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
									fieldLabel : '庫存總數量',
									maxLength:18,
									name : 'S_allNum_L_EQ'
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
					url : __ctxPath + '/pss/listPssInventory.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['warehouseId','materialId','alertNum','allNum','goodPdtNum','rejectsNum','createDate','createBy','updateDate','updateBy'
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
							header : '原料編號/原料代號',
							dataIndex : 'materialId'
						},{
							header : '報警水位數量 (According to 良品)',
							dataIndex : 'alertNum'
						},{
							header : '庫存總數量',
							dataIndex : 'allNum'
						},{
							header : '庫存良品數量',
							dataIndex : 'goodPdtNum'
						},{
							header : '庫存不良品數量',
							dataIndex : 'rejectsNum'
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
							return isGranted('_PssInventoryEdit') ?('&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssInventoryView.edit('
							+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssInventoryView.remove('
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
					id : 'PssInventoryGrid',
					tbar : (isGranted('_PssInventoryEdit') ? new Ext.Toolbar({
								id : 'PssInventoryFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增庫存',
											handler : function() {
												new PssInventoryForm().show();
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
PssInventoryView.remove = function(id) {
	var grid = Ext.getCmp("PssInventoryGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/pss/multiDelPssInventory.do',
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

PssInventoryView.edit = function(id) {
	new PssInventoryForm({
				recId : id
			}).show();
};

//end of view static method
