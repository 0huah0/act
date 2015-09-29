/*
 * Powered By [shi_zenghua@qq.com]
 */
 
Ext.ns('PssProductView');
PssProductView = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssProductView.superclass.constructor.call(this, {
					id : 'PssProductView',
					title : '產品',
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
			id : 'PssProductSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssProductSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssProductGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssProductSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '產品查詢',
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
									fieldLabel : '產品名稱',
									maxLength:18,
									name : "pssProduct.name"
								},{
									fieldLabel : '產品定價(單價)',
									maxLength:18,
									name : "pssProduct.price"
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									xtype:"hidden",name : "pssProduct.createDate"
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									xtype:"hidden",name : "pssProduct.updateBy"
								}]//
					},{
						items : [{
									fieldLabel : '描述',
									maxLength:18,
									name : "pssProduct.desc"
								},{
									fieldLabel : '產品建議售價(單價)',
									maxLength:18,
									name : "pssProduct.salePrice"
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									xtype:"hidden",name : "pssProduct.createBy"
								}]//
					},{
						items : [{
									xtype:'hidden',
									fieldLabel : '產品編號/產品代號',
									maxLength:18,
									name : "pssProduct.productId"
								},{
									fieldLabel : '單位',
									maxLength:18,
									hiddenName:"Q_unit_N_EQ",mode:"local",triggerAction:"all",xtype:"combo",store:[[1,"個"],[2,"塊"],[3,"條"],[4,"片"],[5,"公斤"],[6,"公噸"],[7,"..."]]
								},{
									fieldLabel : '有效否',
									maxLength:18,
									hiddenName:"Q_active_N_EQ",mode:"local",triggerAction:"all",xtype:"combo",store:[[0,"無效"],[1,"有效"]]
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									xtype:"hidden",name : "pssProduct.updateDate"
								}]//
					}]
				}]
			}]
		});
		//end of searchPanel
		
		
		//store
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/pss/listPssProduct.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['productId','name','desc','unit','price','salePrice','active','createDate','createBy','updateDate','updateBy'
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
							header : '產品編號/產品代號',
							dataIndex : 'productId'
						},{
							header : '產品名稱',
							dataIndex : 'name'
						},{
							header : '單位',
							width : 50,
							dataIndex : 'unit',renderer:function(v){if(1 == v){return "個";}else if(2 == v){return "塊";}else if(3 == v){return "條";}else if(4 == v){return "片";}else if(5 == v){return "公斤";}else if(6 == v){return "公噸";}else if(7 == v){return "...";}}
						},{
							header : '產品定價(單價)',
							dataIndex : 'price'
						},{
							header : '產品建議售價(單價)',
							dataIndex : 'salePrice'
						},{
							header : '有效否',width : 50,
							dataIndex : 'active',renderer:function(v){if(0 == v){return "無效";}else if(1 == v){return "有效";}}
						},{
							header : '產品圖片',
							dataIndex : 'productId',
							renderer:function(v){
								return '<a class="huaGridHref" href="#" onclick="PssProductView.imgsShow(\''+v+'\');">查看</a>'; 
							}
						},{
							header : '描述',
							dataIndex : 'desc'
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
							width : 80,
							dataIndex : 'productId',//
							renderer : function(v,m,r,i) {
								var read = '&nbsp;<button title="查看" value=" " class="btn-edit" onclick="PssProductView.edit(\''+ v + '\')"></button>';
								return read + isGranted('_PssProductEdit') ?('&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssProductView.edit(\''
								+ v + '\')"></button>&nbsp;<button title="刪除" value=" " class="btn-del" onclick="PssProductView.remove(\''
								+ v + '\','+i+')"></button>'):'';
							}
						}],
			defaults : {
				sortable : true,
				menuDisabled : false,
				width : 120
			}
		});

		this.gridPanel = new Ext.grid.GridPanel({
					id : 'PssProductGrid',
					height : 380,
					tbar : (isGranted('_PssProductEdit') ? new Ext.Toolbar({
								id : 'PssProductFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增產品',
											handler : function() {
												new PssProductForm().show();
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
PssProductView.remove = function(id,i) {
	var grid = Ext.getCmp("PssProductGrid");
	if(id && id!='undefined'){
		Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
			if (btn == 'yes') {
				Ext.Ajax.request({
					url : __ctxPath
							+ '/pss/multiDelPssProduct.do',
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
	}else{
		grid.getStore().removeAt(i);
	}
	
};

PssProductView.edit = function(id) {
	new PssProductForm({
				recId : id
			}).show();
};

PssProductView.imgsShow = function(pid){
	Ext.Ajax.request({
		url : __ctxPath + '/pss/listPssProductImage.do?Q_pdtId_S_EQ='+pid,
	    success : function(response , options ) {
	    	var jr = Ext.util.JSON.decode(response.responseText);
    		var fids = [];
    		if(jr.result){
    			for(var i=0;i<jr.result.length;i++){
    				fids.push(jr.result[i].pdtImgId);
    			}
    		}
    		FileUtil.imgsShow(fids.join(','));
		}
	});
};
//end of view static method
