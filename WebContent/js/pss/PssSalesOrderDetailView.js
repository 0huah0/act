/*
 * Powered By [shi_zenghua@qq.com]
 */
 
Ext.ns('PssSalesOrderDetailView');
PssSalesOrderDetailView = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssSalesOrderDetailView.superclass.constructor.call(this, {
					id : 'PssSalesOrderDetailView',
					title : '銷貨單子項',
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
			id : 'PssSalesOrderDetailSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssSalesOrderDetailSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssSalesOrderDetailGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssSalesOrderDetailSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '銷貨單子項查詢',
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
									fieldLabel : '銷貨單明細編號',
									maxLength:18,
									name : "Q_soDetailId_L_EQ"
								},{
									fieldLabel : '產品定價',
									maxLength:18,
									name : "Q_pdtPrice_L_EQ"
								},{
									fieldLabel : '小計',
									maxLength:18,
									name : "Q_amount_L_EQ"
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									xtype:"hidden",name : "pssSalesOrderDetail.updateDate"
								},{
								xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '產品編號',
									maxLength:18,
									name : "Q_pdtId_S_LK"
								},{
									fieldLabel : '產品建議售價',
									maxLength:18,
									name : "Q_pdtSalePrice_L_EQ"
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									xtype:"hidden",name : "pssSalesOrderDetail.createDate"
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									xtype:"hidden",name : "pssSalesOrderDetail.updateBy"
								},{
									xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '銷貨單編號',
									maxLength:18,
									name : "Q_soHeadId_S_LK"
								},{
									fieldLabel : '產品數量',
									maxLength:18,
									name : "Q_pdtNum_L_EQ"
								},{
									fieldLabel : '產品實際售價',
									maxLength:18,
									name : "Q_pdtRealPrice_L_EQ"
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									xtype:"hidden",name : "pssSalesOrderDetail.createBy"
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
					url : __ctxPath + '/pss/listPssSalesOrderDetail.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['soHeadId','soDetailId','pdtId','pdtNum','pdtPrice','pdtSalePrice','pdtRealPrice','amount','createDate','createBy','updateDate','updateBy'
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
							header : '銷貨單編號',
							dataIndex : 'soHeadId'
						},{
							header : '銷貨單明細編號',
							dataIndex : 'soDetailId'
						},{
							header : '產品編號',
							dataIndex : 'pdtId'
						},{
							header : '產品數量',
							dataIndex : 'pdtNum'
						},{
							header : '產品定價',
							dataIndex : 'pdtPrice'
						},{
							header : '產品建議售價',
							dataIndex : 'pdtSalePrice'
						},{
							header : '產品實際售價',
							dataIndex : 'pdtRealPrice'
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
						dataIndex : 'soDetailId',//
						renderer : function(v,m,r) {
							return isGranted('_PssSalesOrderDetailEdit') ?('&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssSalesOrderDetailView.edit(\''
							+ v + '\')"></button><button title="刪除" value=" " class="btn-del" onclick="PssSalesOrderDetailView.remove(\''
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
					id : 'PssSalesOrderDetailGrid',
					height : 380,
					tbar : (isGranted('_PssSalesOrderDetailEdit') ? new Ext.Toolbar({
								id : 'PssSalesOrderDetailFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增銷貨單子項',
											handler : function() {
												new PssSalesOrderDetailForm().show();
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
PssSalesOrderDetailView.remove = function(id) {
	var grid = Ext.getCmp("PssSalesOrderDetailGrid");
	if(id && id != 'undefind'){	//后台删
			Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						url : __ctxPath
								+ '/pss/multiDelPssSalesOrderDetail.do',
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

PssSalesOrderDetailView.edit = function(id) {
	new PssSalesOrderDetailForm({
				recId : id
			}).show();
};

PssSalesOrderDetailView.read = function(id) {
	new PssSalesOrderDetailForm({
				recId : id,
				read : true
			}).show();
};

//end of view static method
