/*
 * Powered By [shi_zenghua@qq.com]
 */
Ext.ns('PssInventoryChangeView');
PssInventoryChangeView = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssInventoryChangeView.superclass.constructor.call(this, {
					id : 'PssInventoryChangeView',
					title : '庫存變動記錄',
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
			id : 'PssInventoryChangeSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssInventoryChangeSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssInventoryChangeGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssInventoryChangeSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '庫存變動記錄查詢',
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
									fieldLabel : '倉庫編號/倉庫代號',
									maxLength:18,
									name : 'S_warehouseId_S_LK'
								},{
									fieldLabel : '變更數量',
									maxLength:18,
									name : 'S_num_L_EQ'
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
									fieldLabel : '原料編號/原料代號',
									maxLength:18,
									name : 'S_materialId_S_LK'
								},{
									fieldLabel : '變更原因',
									maxLength:18,
									name : 'S_reason_N_EQ',xtype:"combo",store:[[1,"出貨"],[2,"收貨"],[3,"生產取出"],[4,"生產存入"],[5,"..."]]
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
					},{
						items : [{
									fieldLabel : '記錄編號',
									maxLength:18,
									name : 'S_changeId_L_EQ'
								},{
									fieldLabel : '變更類型',
									maxLength:18,
									name : 'S_type_N_EQ',xtype:"combo",store:[[1,"增加"],[2,"減少"]]
								},{
									fieldLabel : '原因記錄編號（當REASON為1、2時，分別保存出貨單編號、收貨單編號；為4、5時不保存）。',
									maxLength:18,
									name : 'S_recordId_S_LK'
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									name : 'S_createBy_S_LK'
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
					url : __ctxPath + '/pss/listPssInventoryChange.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['changeId','warehouseId','materialId','type','num','reason','recordId','remark','createDate','createBy','updateDate','updateBy'
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
							header : '記錄編號',
							dataIndex : 'changeId'
						},{
							header : '倉庫編號/倉庫代號',
							dataIndex : 'warehouseId'
						},{
							header : '原料編號/原料代號',
							dataIndex : 'materialId'
						},{
							header : '變更類型',
							dataIndex : 'type',renderer:function(v){if(1 == v){return "增加";}else if(2 == v){return "減少";}}
						},{
							header : '變更數量',
							dataIndex : 'num'
						},{
							header : '變更原因',
							dataIndex : 'reason',renderer:function(v){if(1 == v){return "出貨";}else if(2 == v){return "收貨";}else if(3 == v){return "生產取出";}else if(4 == v){return "生產存入";}else if(5 == v){return "...";}}
						},{
							header : '原因記錄編號（當REASON為1、2時，分別保存出貨單編號、收貨單編號；為4、5時不保存）。',
							dataIndex : 'recordId'
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
						dataIndex : 'changeId',//
						renderer : function(v,m,r) {
							return isGranted('_PssInventoryChangeEdit') ?('&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssInventoryChangeView.edit('
							+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssInventoryChangeView.remove('
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
					id : 'PssInventoryChangeGrid',
					tbar : (isGranted('_PssInventoryChangeEdit') ? new Ext.Toolbar({
								id : 'PssInventoryChangeFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增庫存變動記錄',
											handler : function() {
												new PssInventoryChangeForm().show();
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
PssInventoryChangeView.remove = function(id) {
	var grid = Ext.getCmp("PssInventoryChangeGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/pss/multiDelPssInventoryChange.do',
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

PssInventoryChangeView.edit = function(id) {
	new PssInventoryChangeForm({
				recId : id
			}).show();
};

//end of view static method
