/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssMaterialView');
PssMaterialView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssMaterialView.superclass.constructor.call(this, {
					id : 'PssMaterialView',
					title : '原料',
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
			id : 'PssMaterialSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssMaterialSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssMaterialGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssMaterialSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '原料查詢',
				layout : 'form',
				items : [{
					xtype : 'fieldset',
					title : '原料',
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
										fieldLabel : '原料名稱',
										maxLength:18,
										allowBlank : false,
										name : 'pssMaterial.name',
										id : 'name'
									},{
										fieldLabel : '有效否，0：無效、1：有效。',
										maxLength:18,
										allowBlank : false,
										name : 'pssMaterial.active',
										id : 'active'
									},{
										fieldLabel : '修改日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssMaterial.updateDate',
										id : 'updateDate'
									},{
									}]
						},{
							items : [{
										fieldLabel : '單位，1：個、2：塊、3：條、4：片、5：公斤、6：公噸、7：...。',
										maxLength:18,
										allowBlank : false,
										name : 'pssMaterial.unit',
										id : 'unit'
									},{
										fieldLabel : '創建日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssMaterial.createDate',
										id : 'createDate'
									},{
										fieldLabel : '修改人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssMaterial.updateBy',
										id : 'updateBy'
									},{
									}]
						},{
							items : [{
										fieldLabel : '原料編號/原料代號',
										maxLength:18,
										allowBlank : false,
										name : 'pssMaterial.materialId',
										id : 'materialId'
									},{
										fieldLabel : '描述',
										maxLength:18,
										allowBlank : false,
										name : 'pssMaterial.desc',
										id : 'desc'
									},{
										fieldLabel : '創建人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssMaterial.createBy',
										id : 'createBy'
									},{
									}]
						}]
					}]
				}]
			}]
		});
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/pss/listPssMaterial.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['id'
								,'materialId'
								,'name'
								,'unit'
								,'desc'
								,'active'
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
							header : '原料編號/原料代號',
							width : 120,
							dataIndex : 'materialId'
						},{
							header : '原料名稱',
							width : 120,
							dataIndex : 'name'
						},{
							header : '單位，1：個、2：塊、3：條、4：片、5：公斤、6：公噸、7：...。',
							width : 120,
							dataIndex : 'unit'
						},{
							header : '描述',
							width : 120,
							dataIndex : 'desc'
						},{
							header : '有效否，0：無效、1：有效。',
							width : 120,
							dataIndex : 'active'
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
							return '&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssMaterialView.edit('
							+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssMaterialView.remove('
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
					id : 'PssMaterialGrid',
					region : 'center',
					tbar : (isGranted('_PssMaterialAdd') ? new Ext.Toolbar({
								id : 'PssMaterialFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增原料',
											handler : function() {
												new PssMaterialForm().show();
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

PssMaterialView.remove = function(id) {
	var grid = Ext.getCmp("PssMaterialGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/pss/multiDelPssMaterial.do',
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

PssMaterialView.edit = function(id) {
	new PssMaterialForm({
				recId : id
			}).show();
};
