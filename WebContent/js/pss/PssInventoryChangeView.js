/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssInventoryChangeView');
PssInventoryChangeView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssInventoryChangeView.superclass.constructor.call(this, {
					id : 'PssInventoryChangeView',
					title : '庫存變動記錄',
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
					xtype : 'fieldset',
					title : '庫存變動記錄',
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
										fieldLabel : '倉庫編號/倉庫代號',
										maxLength:18,
										allowBlank : false,
										name : 'pssInventoryChange.warehouseId',
										id : 'warehouseId'
									},{
										fieldLabel : '變更數量',
										maxLength:18,
										allowBlank : false,
										name : 'pssInventoryChange.num',
										id : 'num'
									},{
										fieldLabel : '備註',
										maxLength:18,
										allowBlank : false,
										name : 'pssInventoryChange.remark',
										id : 'remark'
									},{
										fieldLabel : '修改日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssInventoryChange.updateDate',
										id : 'updateDate'
									},{
									}]
						},{
							items : [{
										fieldLabel : '原料編號/原料代號',
										maxLength:18,
										allowBlank : false,
										name : 'pssInventoryChange.materialId',
										id : 'materialId'
									},{
										fieldLabel : '變更原因，1：出貨、2：收貨、3：生產取出、4：生產存入、5：...。',
										maxLength:18,
										allowBlank : false,
										name : 'pssInventoryChange.reason',
										id : 'reason'
									},{
										fieldLabel : '創建日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssInventoryChange.createDate',
										id : 'createDate'
									},{
										fieldLabel : '修改人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssInventoryChange.updateBy',
										id : 'updateBy'
									},{
									}]
						},{
							items : [{
										fieldLabel : '記錄編號',
										maxLength:18,
										allowBlank : false,
										name : 'pssInventoryChange.changeId',
										id : 'changeId'
									},{
										fieldLabel : '變更類型，1：增加、2：減少。',
										maxLength:18,
										allowBlank : false,
										name : 'pssInventoryChange.type',
										id : 'type'
									},{
										fieldLabel : '原因記錄編號，當REASON為1、2時，分別保存出貨單編號、收貨單編號；為4、5時不保存。',
										maxLength:18,
										allowBlank : false,
										name : 'pssInventoryChange.recordId',
										id : 'recordId'
									},{
										fieldLabel : '創建人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssInventoryChange.createBy',
										id : 'createBy'
									},{
									}]
						}]
					}]
				}]
			}]
		});
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/pss/listPssInventoryChange.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['id'
								,'changeId'
								,'warehouseId'
								,'materialId'
								,'type'
								,'num'
								,'reason'
								,'recordId'
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
							header : '記錄編號',
							width : 120,
							dataIndex : 'changeId'
						},{
							header : '倉庫編號/倉庫代號',
							width : 120,
							dataIndex : 'warehouseId'
						},{
							header : '原料編號/原料代號',
							width : 120,
							dataIndex : 'materialId'
						},{
							header : '變更類型，1：增加、2：減少。',
							width : 120,
							dataIndex : 'type'
						},{
							header : '變更數量',
							width : 120,
							dataIndex : 'num'
						},{
							header : '變更原因，1：出貨、2：收貨、3：生產取出、4：生產存入、5：...。',
							width : 120,
							dataIndex : 'reason'
						},{
							header : '原因記錄編號，當REASON為1、2時，分別保存出貨單編號、收貨單編號；為4、5時不保存。',
							width : 120,
							dataIndex : 'recordId'
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
							return '&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssInventoryChangeView.edit('
							+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssInventoryChangeView.remove('
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
					id : 'PssInventoryChangeGrid',
					region : 'center',
					tbar : (isGranted('_PssInventoryChangeAdd') ? new Ext.Toolbar({
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
	}
});

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
						Ext.Msg.alert("信息", "該項已經被使用，不能刪除！");
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
