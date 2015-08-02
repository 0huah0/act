/*
 * Powered By [shi_zenghua@qq.com]
 */
 
Ext.ns('PssMatesReceiptHeadView');
PssMatesReceiptHeadView = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssMatesReceiptHeadView.superclass.constructor.call(this, {
					id : 'PssMatesReceiptHeadView',
					title : '收貨單',
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
			id : 'PssMatesReceiptHeadSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssMatesReceiptHeadSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssMatesReceiptHeadGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssMatesReceiptHeadSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '收貨單查詢',
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
									fieldLabel : '採購單編號',
									maxLength:18,
									name : "pssMatesReceiptHead.poHeadId"
								},{
									fieldLabel : '收貨人電話',
									maxLength:18,
									name : "pssMatesReceiptHead.receiverTel"
								},{
									fieldLabel : '送貨人電話',
									maxLength:18,
									name : "pssMatesReceiptHead.diliverTel"
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									xtype:"hidden",name : "pssMatesReceiptHead.createBy"
								},{
								xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '收貨倉庫編號/倉庫代號',
									maxLength:18,
									name : "pssMatesReceiptHead.warehouseId"
								},{
									fieldLabel : '收貨發票號碼(應付帳款)',
									maxLength:18,
									name : "pssMatesReceiptHead.mrInvoice"
								},{
									fieldLabel : '備註',
									maxLength:18,
									name : "pssMatesReceiptHead.remark"
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									xtype:"hidden",name : "pssMatesReceiptHead.updateDate"
								},{
									xtype:'hidden'
								}]//
					},{
						items : [{
									xtype:'hidden',
									fieldLabel : '收貨單編號（收貨單代碼2位(MR)+當前日期8位(yyyyMMdd)+流水號6位）。',
									maxLength:18,
									name : "pssMatesReceiptHead.mrHeadId"
								},{
									fieldLabel : '收貨人名稱/倉管人員名稱',
									maxLength:18,
									name : "pssMatesReceiptHead.receiverName"
								},{
									fieldLabel : '送貨人名稱',
									maxLength:18,
									name : "pssMatesReceiptHead.diliverName"
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									xtype:"hidden",name : "pssMatesReceiptHead.createDate"
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									xtype:"hidden",name : "pssMatesReceiptHead.updateBy"
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
					url : __ctxPath + '/pss/listPssMatesReceiptHead.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['mrHeadId','poHeadId','warehouseId','receiverName','receiverTel','mrInvoice','diliverName','diliverTel','remark','createDate','createBy','updateDate','updateBy'
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
							header : '收貨單編號（收貨單代碼2位(MR)+當前日期8位(yyyyMMdd)+流水號6位）。',
							dataIndex : 'mrHeadId'
						},{
							header : '採購單編號',
							dataIndex : 'poHeadId'
						},{
							header : '收貨倉庫編號/倉庫代號',
							dataIndex : 'warehouseId'
						},{
							header : '收貨人名稱/倉管人員名稱',
							dataIndex : 'receiverName'
						},{
							header : '收貨人電話',
							dataIndex : 'receiverTel'
						},{
							header : '收貨發票號碼(應付帳款)',
							dataIndex : 'mrInvoice'
						},{
							header : '送貨人名稱',
							dataIndex : 'diliverName'
						},{
							header : '送貨人電話',
							dataIndex : 'diliverTel'
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
						dataIndex : 'mrHeadId',//
						renderer : function(v,m,r) {
							return isGranted('_PssMatesReceiptHeadEdit') ?('&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssMatesReceiptHeadView.edit(\''
							+ v + '\')"></button><button title="刪除" value=" " class="btn-del" onclick="PssMatesReceiptHeadView.remove(\''
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
					id : 'PssMatesReceiptHeadGrid',
					height : 380,
					tbar : (isGranted('_PssMatesReceiptHeadEdit') ? new Ext.Toolbar({
								id : 'PssMatesReceiptHeadFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增收貨單',
											handler : function() {
												new PssMatesReceiptHeadForm().show();
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
PssMatesReceiptHeadView.remove = function(id) {
	var grid = Ext.getCmp("PssMatesReceiptHeadGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/pss/multiDelPssMatesReceiptHead.do',
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

PssMatesReceiptHeadView.edit = function(id) {
	new PssMatesReceiptHeadForm({
				recId : id
			}).show();
};

//end of view static method
