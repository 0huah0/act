/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssSalesOrderHeadView');
PssSalesOrderHeadView = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssSalesOrderHeadView.superclass.constructor.call(this, {
					id : 'PssSalesOrderHeadView',
					title : '銷貨單',
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
			id : 'PssSalesOrderHeadSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssSalesOrderHeadSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssSalesOrderHeadGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssSalesOrderHeadSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '銷貨單查詢',
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
									name : 'Q_soHeadId_S_LK'
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									name : 'Q_createBy_S_LK'
								}]//
					},{
						items : [{
									fieldLabel : '客戶採購單編號',
									maxLength:18,
									name : 'Q_custPoNo_S_LK'
								},{
									fieldLabel : '備註',
									maxLength:18,
									name : 'Q_remark_S_LK'
								}]//
					},{
						items : [{
									fieldLabel : '客戶編號',
									maxLength:18,
									name : 'Q_customerId_S_LK'
								}]//
					}]
				}]
			}]
		});
		//end of searchPanel
		
		
		//store
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/pss/listPssSalesOrderHead.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['soHeadId','customerId','custPoNo','priceAmount','salePriceAmount','payAmount','discountAmount','remark','createDate','createBy','updateDate','updateBy'
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
							dataIndex : 'soHeadId',
							renderer:function(v){
								return '<a class="huaCellHref" onclick="PssSalesOrderHeadView.read(\''+ v + '\')">'+v+'</a>';
							}
						},{
							header : '客戶編號',
							dataIndex : 'customerId'
						},{
							header : '客戶採購單編號',
							dataIndex : 'custPoNo'
						},{
							header : '定價總金額',
							dataIndex : 'priceAmount'
						},{
							header : '建議售價總金額',
							dataIndex : 'salePriceAmount'
						},{
							header : '實際售價總金額',
							dataIndex : 'payAmount'
						},{
							header : '優惠金額',
							dataIndex : 'discountAmount'
						},{
							header : '產品圖片',
							dataIndex : 'soHeadId',
							renderer:function(v){
								return '<a class="huaGridHref" href="#" onclick="PssSalesOrderHeadView.imgsShow(\''+v+'\');">查看</a>'; 
							}
						},{
							header : '備註',
							align: 'left',
							dataIndex : 'remark'
						},{
							header : '創建日期',
							dataIndex : 'createDate',
							renderer:function(v){if(v){return new Date(v).format("Y-m-d H:i");}else{return "";}}
						},{
							header : '創建人員',
							dataIndex : 'createBy'
						},{
							header : '修改日期',
							dataIndex : 'updateDate',
							renderer:function(v){if(v){return new Date(v).format("Y-m-d H:i");}else{return "";}}
						},{
							header : '修改人員',
							dataIndex : 'updateBy'
						},{
							header : '管理',
							width : 80,
							align: 'left',
							dataIndex : 'soHeadId',//
							renderer : function(v,m,r) {
								return isGranted('_PssSalesOrderHeadEdit') ?('&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssSalesOrderHeadView.edit(\''
										+ v + '\')"></button><button title="刪除" value=" " class="btn-del" onclick="PssSalesOrderHeadView.remove(\''
										+ v + '\')"></button>'):'';
							}
						}],
			defaults : {
				sortable : true,
				align: 'right',
				menuDisabled : false,
				width : 120
			}
		});

		this.gridPanel = new Ext.grid.GridPanel({
					id : 'PssSalesOrderHeadGrid',
					height : 380,
					tbar : (isGranted('_PssSalesOrderHeadEdit') ? new Ext.Toolbar({
								id : 'PssSalesOrderHeadFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增銷貨單',
											handler : function() {
												new PssSalesOrderHeadForm().show();
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
PssSalesOrderHeadView.remove = function(id) {
	var grid = Ext.getCmp("PssSalesOrderHeadGrid");
	if(id && id != 'undefind'){	//后台删
		Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
			if (btn == 'yes') {
				Ext.Ajax.request({
					url : __ctxPath
							+ '/pss/multiDelPssSalesOrderHead.do',
					params : {
						ids : id
					},
					method : 'post',
					success : function(response, options) {
						var dbJson = eval("(" + response.responseText + ")");
						if(dbJson.success){
							Ext.ux.Toast.msg("信息", "成功刪除！");
							grid.getStore().reload();
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

PssSalesOrderHeadView.edit = function(id) {
	new PssSalesOrderHeadForm({
				recId : id
			}).show();
};

PssSalesOrderHeadView.read = function(id) {
	new PssSalesOrderHeadForm({
				recId : id,
				read : true
			}).show();
};

PssSalesOrderHeadView.imgsShow = function(pid){
	Ext.Ajax.request({
		url : __ctxPath + '/pss/listPssSoAttachment.do?Q_soHeadId_S_EQ='+pid,
	    success : function(response , options ) {
	    	var jr = Ext.util.JSON.decode(response.responseText);
    		var fids = [];
    		if(jr.result.length>0){
    			for(var i=0;i<jr.result.length;i++){
    				fids.push(jr.result[i].soAttachId);
    			}
    		}
    		FileUtil.imgsShow(fids.join(','));
		}
	});
}
//end of view static method
