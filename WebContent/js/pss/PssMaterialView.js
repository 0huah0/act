/*
 * Powered By [shi_zenghua@qq.com]
 */
 
Ext.ns('PssMaterialView');
PssMaterialView = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssMaterialView.superclass.constructor.call(this, {
					id : 'PssMaterialView',
					title : '原料',
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
									fieldLabel : '原料名稱',
									maxLength:18,
									name : "Q_name_S_LK"
								},{
									fieldLabel : '有效否',
									maxLength:18,
									hiddenName:"Q_active_N_EQ",mode:"local",triggerAction:"all",xtype:"combo",store:[[0,"無效"],[1,"有效"]]
								}]//
					},{
						items : [{
									fieldLabel : '單位',
									maxLength:18,
									hiddenName:"Q_unit_N_EQ",mode:"local",triggerAction:"all",xtype:"combo",store:[[1,"個"],[2,"塊"],[3,"條"],[4,"片"],[5,"公斤"],[6,"公噸"],[7,"..."]]
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									xtype:"hidden",name : "pssMaterial.createBy"
								}]//
					},{
						items : [{
									xtype:'hidden',
									fieldLabel : '原料編號/原料代號',
									maxLength:18,
									name : "Q_materialId_S_LK"
								},{
									fieldLabel : '描述',
									maxLength:18,
									name : "Q_desc_S_LK"
								}]//
					}]
				}]
			}]
		});
		//end of searchPanel
		
		
		//store
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/pss/listPssMaterial.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['materialId','name','unit','desc','active','createDate','createBy','updateDate','updateBy'
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
							dataIndex : 'materialId'
						},{
							header : '原料名稱',
							dataIndex : 'name'
						},{
							header : '單位',
							dataIndex : 'unit',renderer:function(v){if(1 == v){return "個";}else if(2 == v){return "塊";}else if(3 == v){return "條";}else if(4 == v){return "片";}else if(5 == v){return "公斤";}else if(6 == v){return "公噸";}else if(7 == v){return "...";}}
						},{
							header : '描述',
							dataIndex : 'desc'
						},{
							header : '有效否',
							dataIndex : 'active',renderer:function(v){if(0 == v){return "無效";}else if(1 == v){return "有效";}}
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
						dataIndex : 'materialId',//
						renderer : function(v,m,r) {
							return isGranted('_PssMaterialEdit') ?('&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssMaterialView.edit(\''
							+ v + '\')"></button><button title="刪除" value=" " class="btn-del" onclick="PssMaterialView.remove(\''
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
					id : 'PssMaterialGrid',
					height : 380,
					tbar : (isGranted('_PssMaterialEdit') ? new Ext.Toolbar({
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
PssMaterialView.remove = function(id) {
	var grid = Ext.getCmp("PssMaterialGrid");
	if(id && id != 'undefind'){	//后台删
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
								Ext.Msg.alert("信息", "該項沒能被刪除！");
							}
						}
					});
				}
			});
	}else{	//前台删
		
	}
};

PssMaterialView.edit = function(id) {
	new PssMaterialForm({
				recId : id
			}).show();
};

PssMaterialView.read = function(id) {
	new PssMaterialForm({
				recId : id,
				read : true
			}).show();
};

//end of view static method
