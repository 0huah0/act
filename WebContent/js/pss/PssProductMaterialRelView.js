/*
 * Powered By [shi_zenghua@qq.com]
 */
 
Ext.ns('PssProductMaterialRelView');
PssProductMaterialRelView = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssProductMaterialRelView.superclass.constructor.call(this, {
					id : 'PssProductMaterialRelView',
					title : '產品原料關係表',
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
									name : "pssProductMaterialRel.materialId"
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									xtype:"hidden",name : "pssProductMaterialRel.createBy"
								},{
								xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '原料類型（一個產品只會對應一個成品原料）',
									maxLength:18,
									hiddenName:"Q_type_N_EQ",mode:"local",triggerAction:"all",xtype:"combo",store:[[1,"原物料"],[2,"半成品"],[3,"成品"]]
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									xtype:"hidden",name : "pssProductMaterialRel.updateDate"
								},{
									xtype:'hidden'
								}]//
					},{
						items : [{
									xtype:'hidden',
									fieldLabel : '產品編號',
									maxLength:18,
									name : "pssProductMaterialRel.pdtId"
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									xtype:"hidden",name : "pssProductMaterialRel.createDate"
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									xtype:"hidden",name : "pssProductMaterialRel.updateBy"
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
					url : __ctxPath + '/pss/listPssProductMaterialRel.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['pdtId','materialId','type','createDate','createBy','updateDate','updateBy'
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
							dataIndex : 'pdtId'
						},{
							header : '原料編號/原料代號',
							dataIndex : 'materialId'
						},{
							header : '原料類型（一個產品只會對應一個成品原料）',
							dataIndex : 'type',renderer:function(v){if(1 == v){return "原物料";}else if(2 == v){return "半成品";}else if(3 == v){return "成品";}}
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
						dataIndex : 'pdtId',//
						renderer : function(v,m,r) {
							return isGranted('_PssProductMaterialRelEdit') ?('&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssProductMaterialRelView.edit(\''
							+ v + '\')"></button><button title="刪除" value=" " class="btn-del" onclick="PssProductMaterialRelView.remove(\''
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
					id : 'PssProductMaterialRelGrid',
					height : 380,
					tbar : (isGranted('_PssProductMaterialRelEdit') ? new Ext.Toolbar({
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
						Ext.Msg.alert("信息", "該項沒能被刪除！");
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

//end of view static method
