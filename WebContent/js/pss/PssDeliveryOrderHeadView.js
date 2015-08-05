/*
 * Powered By [shi_zenghua@qq.com]
 */
 
Ext.ns('PssDeliveryOrderHeadView');
PssDeliveryOrderHeadView = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssDeliveryOrderHeadView.superclass.constructor.call(this, {
					id : 'PssDeliveryOrderHeadView',
					title : '出貨單',
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
			id : 'PssDeliveryOrderHeadSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssDeliveryOrderHeadSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssDeliveryOrderHeadGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssDeliveryOrderHeadSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '出貨單查詢',
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
									fieldLabel : '銷貨單編號',
									maxLength:18,
									name : "Q_soHeadId_S_LK"
								},{
									fieldLabel : '送貨人名稱',
									maxLength:18,
									name : "Q_diliverName_S_LK"
								},{
									fieldLabel : '出貨發票號碼',// (應收帳款)
									maxLength:18,
									name : "Q_doInvoice_S_LK"
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									xtype:"hidden",name : "Q_createBy_S_LK"
								}]//
					},{
						items : [{
									fieldLabel : '出貨倉庫編號/倉庫代號',
									maxLength:18,
									name : "Q_warehouseId_S_LK"
								},{
									fieldLabel : '收貨人名稱',
									maxLength:18,
									name : "Q_receiverName_S_LK"
								},{
									fieldLabel : '備註',
									maxLength:18,
									name : "Q_remark_S_LK"
								}]//
					},{
						items : [{
									xtype:'hidden',
									fieldLabel : '出貨單編號',
									maxLength:18,
									name : "Q_doHeadId_S_LK"
								},{
									fieldLabel : '送貨人電話',
									maxLength:18,
									name : "Q_diliverTel_S_LK"
								},{
									fieldLabel : '收貨人電話',
									maxLength:18,
									name : "Q_receiverTel_S_LK"
								}]//
					}]
				}]
			}]
		});
		//end of searchPanel
		
		
		//store
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/pss/listPssDeliveryOrderHead.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['doHeadId','soHeadId','warehouseId','diliverTel','diliverName','receiverName','receiverTel','doInvoice','remark','createDate','createBy','updateDate','updateBy'
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
							header : '出貨單編號',
							dataIndex : 'doHeadId'
						},{
							header : '銷貨單編號',
							dataIndex : 'soHeadId'
						},{
							header : '出貨倉庫編號/倉庫代號',
							dataIndex : 'warehouseId'
						},{
							header : '送貨人電話',
							dataIndex : 'diliverTel'
						},{
							header : '送貨人名稱',
							dataIndex : 'diliverName'
						},{
							header : '收貨人名稱',
							dataIndex : 'receiverName'
						},{
							header : '收貨人電話',
							dataIndex : 'receiverTel'
						},{
							header : '出貨發票號碼',
							dataIndex : 'doInvoice'
						},{
							header : '備註',
							dataIndex : 'remark'
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
						dataIndex : 'doHeadId',//
						renderer : function(v,m,r) {
							return isGranted('_PssDeliveryOrderHeadEdit') ?('&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssDeliveryOrderHeadView.edit(\''
							+ v + '\')"></button><button title="刪除" value=" " class="btn-del" onclick="PssDeliveryOrderHeadView.remove(\''
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
					id : 'PssDeliveryOrderHeadGrid',
					height : 380,
					tbar : (isGranted('_PssDeliveryOrderHeadEdit') ? new Ext.Toolbar({
								id : 'PssDeliveryOrderHeadFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增出貨單',
											handler : function() {
												new PssDeliveryOrderHeadForm().show();
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
PssDeliveryOrderHeadView.remove = function(id) {
	var grid = Ext.getCmp("PssDeliveryOrderHeadGrid");
	if(id && id != 'undefind'){	//后台删
			Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						url : __ctxPath
								+ '/pss/multiDelPssDeliveryOrderHead.do',
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

PssDeliveryOrderHeadView.edit = function(id) {
	new PssDeliveryOrderHeadForm({
				recId : id
			}).show();
};

PssDeliveryOrderHeadView.read = function(id) {
	new PssDeliveryOrderHeadForm({
				recId : id,
				read : true
			}).show();
};

//end of view static method
