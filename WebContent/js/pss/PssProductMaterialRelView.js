/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssProductMaterialRelView');
PssProductMaterialRelView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssProductMaterialRelView.superclass.constructor.call(this, {
					id : 'PssProductMaterialRelView',
					title : '產品原料關係表',
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
			id : 'PssProductMaterialRelSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssProductMaterialRelSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssProductMaterialRelGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssProductMaterialRelSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '產品原料關係表查詢',
				layout : 'form',
				items : [{
					xtype : 'fieldset',
					title : '產品原料關係表',
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
										fieldLabel : '原料編號/原料代號',
										maxLength:18,
										allowBlank : false,
										name : 'pssProductMaterialRel.materialId',
										id : 'materialId'
									},{
										fieldLabel : '創建人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssProductMaterialRel.createBy',
										id : 'createBy'
									},{
									}]
						},{
							items : [{
										fieldLabel : '原料類型，1：原物料、2：半成品、3：成品。一個產品只會對應一個成品原料。',
										maxLength:18,
										allowBlank : false,
										name : 'pssProductMaterialRel.type',
										id : 'type'
									},{
										fieldLabel : '修改日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssProductMaterialRel.updateDate',
										id : 'updateDate'
									},{
									}]
						},{
							items : [{
										fieldLabel : '產品編號',
										maxLength:18,
										allowBlank : false,
										name : 'pssProductMaterialRel.pdtId',
										id : 'pdtId'
									},{
										fieldLabel : '創建日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssProductMaterialRel.createDate',
										id : 'createDate'
									},{
										fieldLabel : '修改人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssProductMaterialRel.updateBy',
										id : 'updateBy'
									},{
									}]
						}]
					}]
				}]
			}]
		});
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/pss/listPssProductMaterialRel.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['id'
								,'pdtId'
								,'materialId'
								,'type'
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
							header : '產品編號',
							width : 120,
							dataIndex : 'pdtId'
						},{
							header : '原料編號/原料代號',
							width : 120,
							dataIndex : 'materialId'
						},{
							header : '原料類型，1：原物料、2：半成品、3：成品。一個產品只會對應一個成品原料。',
							width : 120,
							dataIndex : 'type'
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
							return '&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssProductMaterialRelView.edit('
							+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssProductMaterialRelView.remove('
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
					id : 'PssProductMaterialRelGrid',
					region : 'center',
					tbar : (isGranted('_PssProductMaterialRelAdd') ? new Ext.Toolbar({
								id : 'PssProductMaterialRelFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增產品原料關係表',
											handler : function() {
												new PssProductMaterialRelForm().show();
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

PssProductMaterialRelView.remove = function(id) {
	var grid = Ext.getCmp("PssProductMaterialRelGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/pss/multiDelPssProductMaterialRel.do',
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

PssProductMaterialRelView.edit = function(id) {
	new PssProductMaterialRelForm({
				recId : id
			}).show();
};
