/*
 * Powered By [shi_zenghua@qq.com]
 */
 
Ext.ns('PssPurchaseOrderDetailView');
PssPurchaseOrderDetailView = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssPurchaseOrderDetailView.superclass.constructor.call(this, {
					id : 'PssPurchaseOrderDetailView',
					title : '採購單子項',
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
			id : 'PssPurchaseOrderDetailSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssPurchaseOrderDetailSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssPurchaseOrderDetailGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssPurchaseOrderDetailSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '採購單子項查詢',
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
									fieldLabel : '採購單明細編號',
									maxLength:18,
									name : "Q_poDetailId_L_EQ"
								},{
									fieldLabel : '原料定價(單價)',
									maxLength:18,
									name : "Q_materialPrice_L_EQ"
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									xtype:"hidden",name : "pssPurchaseOrderDetail.createDate"
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									xtype:"hidden",name : "pssPurchaseOrderDetail.updateBy"
								},{
								xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '原料編號',
									maxLength:18,
									name : "Q_materialId_S_LK"
								},{
									fieldLabel : '原料建議售價(單價)',
									maxLength:18,
									name : "Q_materialSalePrice_L_EQ"
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									xtype:"hidden",name : "pssPurchaseOrderDetail.createBy"
								},{
									xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '採購單編號',
									maxLength:18,
									name : "Q_poHeadId_S_LK"
								},{
									fieldLabel : '原料數量',
									maxLength:18,
									name : "Q_materialNum_L_EQ"
								},{
									fieldLabel : '小計',
									maxLength:18,
									name : "Q_amount_L_EQ"
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									xtype:"hidden",name : "pssPurchaseOrderDetail.updateDate"
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
					url : __ctxPath + '/pss/listPssPurchaseOrderDetail.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['poHeadId','poDetailId','materialId','materialNum','materialPrice','materialSalePrice','amount','createDate','createBy','updateDate','updateBy'
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
							header : '採購單編號',
							dataIndex : 'poHeadId'
						},{
							header : '採購單明細編號',
							dataIndex : 'poDetailId'
						},{
							header : '原料編號',
							dataIndex : 'materialId'
						},{
							header : '原料數量',
							dataIndex : 'materialNum'
						},{
							header : '原料定價(單價)',
							dataIndex : 'materialPrice'
						},{
							header : '原料建議售價(單價)',
							dataIndex : 'materialSalePrice'
						},{
							header : '小計',
							dataIndex : 'amount'
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
						dataIndex : 'poDetailId',//
						renderer : function(v,m,r) {
							return isGranted('_PssPurchaseOrderDetailEdit') ?('&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssPurchaseOrderDetailView.edit(\''
							+ v + '\')"></button><button title="刪除" value=" " class="btn-del" onclick="PssPurchaseOrderDetailView.remove(\''
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
					id : 'PssPurchaseOrderDetailGrid',
					height : 380,
					tbar : (isGranted('_PssPurchaseOrderDetailEdit') ? new Ext.Toolbar({
								id : 'PssPurchaseOrderDetailFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增採購單子項',
											handler : function() {
												new PssPurchaseOrderDetailForm().show();
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
PssPurchaseOrderDetailView.remove = function(id) {
	var grid = Ext.getCmp("PssPurchaseOrderDetailGrid");
	if(id && id != 'undefind'){	//后台删
			Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						url : __ctxPath
								+ '/pss/multiDelPssPurchaseOrderDetail.do',
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

PssPurchaseOrderDetailView.edit = function(id) {
	new PssPurchaseOrderDetailForm({
				recId : id
			}).show();
};

PssPurchaseOrderDetailView.read = function(id) {
	new PssPurchaseOrderDetailForm({
				recId : id,
				read : true
			}).show();
};

//end of view static method
