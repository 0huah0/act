/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssWarehouseView');
PssWarehouseView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssWarehouseView.superclass.constructor.call(this, {
					id : 'PssWarehouseView',
					title : '倉庫',
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
					xtype : 'fieldset',
					title : '倉庫',
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
										name : 'pssWarehouse.id',
										id : 'id',
										xtype : 'hidden',
										value : recId||''
									},{
										fieldLabel : '名稱',
										maxLength:18,
										allowBlank : false,
										name : 'pssWarehouse.NameEnum',
										id : 'NameEnum'
									},{
										fieldLabel : '創建日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssWarehouse.CreateDateEnum',
										id : 'CreateDateEnum'
									},{
										fieldLabel : '修改日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssWarehouse.UpdateDateEnum',
										id : 'UpdateDateEnum'
						     }]
						},{
							items : [{
										xtype : 'hidden'
									},{
										fieldLabel : '描述',
										maxLength:18,
										allowBlank : false,
										name : 'pssWarehouse.DescEnum',
										id : 'DescEnum'
									},{
										fieldLabel : '創建人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssWarehouse.CreateByEnum',
										id : 'CreateByEnum'
									},{
										fieldLabel : '修改人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssWarehouse.UpdateByEnum',
										id : 'UpdateByEnum'
					         }]
						}]
					}]
				}]
			}]
		});
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/act/listPssWarehouse.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['id'
								,NameEnum
								,DescEnum
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
							header : '名稱',
							width : 120,
							dataIndex : 'NameEnum'
						},{
							header : '描述',
							width : 120,
							dataIndex : 'DescEnum'
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
							return '&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssWarehouseView.edit('
							+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssWarehouseView.remove('
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
					id : 'PssWarehouseGrid',
					region : 'center',
					tbar : (isGranted('_PssWarehouseAdd') ? new Ext.Toolbar({
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
	}
});

PssWarehouseView.remove = function(id) {
	var grid = Ext.getCmp("PssWarehouseGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/act/multiDelPssWarehouse.do',
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

PssWarehouseView.edit = function(id) {
	new PssWarehouseForm({
				recId : id
			}).show();
};
