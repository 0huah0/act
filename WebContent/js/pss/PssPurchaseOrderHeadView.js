/*
 * Powered By [shi_zenghua@qq.com]
 */
 
Ext.ns('PssPurchaseOrderHeadView');
PssPurchaseOrderHeadView = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssPurchaseOrderHeadView.superclass.constructor.call(this, {
					id : 'PssPurchaseOrderHeadView',
					title : '採購單',
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
			id : 'PssPurchaseOrderHeadSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssPurchaseOrderHeadSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssPurchaseOrderHeadGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssPurchaseOrderHeadSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '採購單查詢',
				layout : 'form',
				items : [{
					layout : 'column',
					columnWidth : 0.33,
					defaults : {
						layout : 'form',
						padding : '0 0 0 20px',
						labelAlign : 'right',
						labelWidth : 140,
						defaults : {
							xtype : 'textfield',
							width : 140
						}
					},
					items : [{
						items : [{
									fieldLabel : '供應商編號/供應商代號',
									maxLength:18,
									name : "Q_supplierId_S_LK"
								},{
									fieldLabel : '成交價總金額大於',
									maxLength:18,
									name : "Q_payAmount_L_GE"
								}]//
					},{
						items : [{
									fieldLabel : '定價總金額大於',
									maxLength:18,
									name : "Q_priceAmount_L_GE"
								},{
									fieldLabel : '備註',
									maxLength:18,
									name : "Q_remark_S_LK"
								}]//
					},{
						items : [{
									xtype:'hidden',
									fieldLabel : '採購單編號',
									maxLength:18,
									name : "Q_poHeadId_S_LK"
								},{
									fieldLabel : '建議售價總金額大於',
									maxLength:18,
									name : "Q_salePriceAmount_L_GE"
								}]//
					}]
				}]
			}]
		});
		//end of searchPanel
		
		
		//store
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/pss/listPssPurchaseOrderHead.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['poHeadId','supplierId','priceAmount','salePriceAmount','payAmount','remark','createDate','createBy','updateDate','updateBy'
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
							dataIndex : 'poHeadId',
							renderer:function(v){
								return '<a class="huaCellHref" onclick="PssPurchaseOrderHeadView.read(\''+ v + '\')">'+v+'</a>';
							}
						},{
							header : '供應商編號/供應商代號',
							dataIndex : 'supplierId'
						},{
							header : '定價總金額',
							dataIndex : 'priceAmount'
						},{
							header : '建議售價總金額',
							dataIndex : 'salePriceAmount'
						},{
							header : '成交價總金額',
							dataIndex : 'payAmount'
						},{
							header : '影本',
							dataIndex : 'poHeadId',
							renderer:function(v){
								return v?'<a class="huaGridHref" href="#" onclick="PssPurchaseOrderHeadView.imgsShow(\''+v+'\');">查看</a>':''; 
							}
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
						dataIndex : 'poHeadId',//
						renderer : function(v,m,r) {
							return isGranted('_PssPurchaseOrderHeadEdit') ?('&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssPurchaseOrderHeadView.edit(\''
							+ v + '\')"></button><button title="刪除" value=" " class="btn-del" onclick="PssPurchaseOrderHeadView.remove(\''
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
					id : 'PssPurchaseOrderHeadGrid',
					height : 380,
					tbar : (isGranted('_PssPurchaseOrderHeadEdit') ? new Ext.Toolbar({
								id : 'PssPurchaseOrderHeadFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增採購單',
											handler : function() {
												new PssPurchaseOrderHeadForm().show();
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
PssPurchaseOrderHeadView.remove = function(id) {
	var grid = Ext.getCmp("PssPurchaseOrderHeadGrid");
	if(id && id != 'undefind'){	//后台删
			Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						url : __ctxPath
								+ '/pss/multiDelPssPurchaseOrderHead.do',
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

PssPurchaseOrderHeadView.edit = function(id) {
	new PssPurchaseOrderHeadForm({
				recId : id
			}).show();
};

PssPurchaseOrderHeadView.read = function(id) {
	new PssPurchaseOrderHeadForm({
				recId : id,
				read : true
			}).show();
};

//end of view static method

PssPurchaseOrderHeadView.imgsShow = function(pid){
	Ext.Ajax.request({
		url : __ctxPath
				+ '/pss/multiDelPssPurchaseOrderHead.do',
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



