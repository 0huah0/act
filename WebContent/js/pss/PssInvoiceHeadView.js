/*
 * Powered By [shi_zenghua@qq.com]
 */
 
Ext.ns('PssInvoiceHeadView');
PssInvoiceHeadView = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssInvoiceHeadView.superclass.constructor.call(this, {
					id : 'PssInvoiceHeadView',
					title : '發票',
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
			id : 'PssInvoiceHeadSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssInvoiceHeadSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssInvoiceHeadGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssInvoiceHeadSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '發票查詢',
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
									fieldLabel : '客戶編號/供應商編號（TYPE=1時，該欄位存客戶編號，TYPE=2時，該欄位存供應商編號）',
									maxLength:18,
									name : "Q_cusOrSupId_S_LK"
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									xtype:"hidden",name : "pssInvoiceHead.createDate"
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									xtype:"hidden",name : "pssInvoiceHead.updateBy"
								},{
								xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '發票金額',
									maxLength:18,
									name : "Q_invAmount_L_EQ"
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									xtype:"hidden",name : "pssInvoiceHead.createBy"
								},{
									xtype:'hidden'
								}]//
					},{
						items : [{
									xtype:'hidden',
									fieldLabel : '發票編號',
									maxLength:18,
									name : "Q_invoiceHeadId_S_LK"
								},{
									fieldLabel : '類型',
									maxLength:18,
									hiddenName:"Q_type_N_EQ",mode:"local",triggerAction:"all",xtype:"combo",store:[[1,"出貨發票"],[2,"收貨發票"]]
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									xtype:"hidden",name : "pssInvoiceHead.updateDate"
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
					url : __ctxPath + '/pss/listPssInvoiceHead.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['invoiceHeadId','cusOrSupId','invAmount','type','createDate','createBy','updateDate','updateBy'
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
							header : '發票編號',
							dataIndex : 'invoiceHeadId'
						},{
							header : '客戶編號/供應商編號（TYPE=1時，該欄位存客戶編號，TYPE=2時，該欄位存供應商編號）',
							dataIndex : 'cusOrSupId'
						},{
							header : '發票金額',
							dataIndex : 'invAmount'
						},{
							header : '類型',
							dataIndex : 'type',renderer:function(v){if(1 == v){return "出貨發票";}else if(2 == v){return "收貨發票";}}
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
						dataIndex : 'invoiceHeadId',//
						renderer : function(v,m,r) {
							return isGranted('_PssInvoiceHeadEdit') ?('&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssInvoiceHeadView.edit(\''
							+ v + '\')"></button><button title="刪除" value=" " class="btn-del" onclick="PssInvoiceHeadView.remove(\''
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
					id : 'PssInvoiceHeadGrid',
					height : 380,
					tbar : (isGranted('_PssInvoiceHeadEdit') ? new Ext.Toolbar({
								id : 'PssInvoiceHeadFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增發票',
											handler : function() {
												new PssInvoiceHeadForm().show();
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
PssInvoiceHeadView.remove = function(id) {
	var grid = Ext.getCmp("PssInvoiceHeadGrid");
	if(id && id != 'undefind'){	//后台删
			Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						url : __ctxPath
								+ '/pss/multiDelPssInvoiceHead.do',
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

PssInvoiceHeadView.edit = function(id) {
	new PssInvoiceHeadForm({
				recId : id
			}).show();
};

PssInvoiceHeadView.read = function(id) {
	new PssInvoiceHeadForm({
				recId : id,
				read : true
			}).show();
};

//end of view static method
