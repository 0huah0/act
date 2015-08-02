/*
 * Powered By [shi_zenghua@qq.com]
 */
 
/**
 * 供應商原料關係表选择器
 */
 PssSupplierMaterialRelSelector = {
	/**
	 * @param {} isSingle 是否单选
	 * @param {} callbackOrConf 回调函数或配置选项，若为map类型，则表示为配置选项
	 * @param {} reset data
	 * @return {}
	 */
	getView : function(isSingle,data,callback) {
		var window = new Ext.Window({
			title : '请选择供應商原料關係表',
			iconCls:'menu-appuser',
			width : 640,
			autoHeight : true,
			autuScroll:true,
			modal : true,
			closeAction: 'hide',
			items : [this.initPanel(isSingle,data)],
			buttons : [{
						text : '确认',
						iconCls:'btn-ok',
						handler : function(){
							var rows = Ext.getCmp('PssSupplierMaterialRelSelectGrid').getSelectionModel().getSelections();
							callback && callback(rows);
							window.close();
						}
					}, {
						text : '关闭',
						iconCls:'btn-cancel',
						handler : function() {
							window.close();
						}
					}]
		});
		return window;
	},

	initPanel : function(isSingle,data) {
		var sm = null;
		if(isSingle){
			sm = new Ext.grid.CheckboxSelectionModel({singleSelect: true});
		}else{
			sm = new Ext.grid.CheckboxSelectionModel();
		}
		var winGrid = new Ext.grid.EditorGridPanel({
			id : 'PssSupplierMaterialRelSelectGrid',
			autoHeight : true,//height:360,
			cm : new Ext.grid.ColumnModel({
				columns : [sm,
						new Ext.grid.RowNumberer()
						,{
							header : '供應商編號/供應商代號',
							width : 120,
							dataIndex : 'supplierId'
						}
												,{
							header : '原料編號/原料代號',
							width : 120,
							dataIndex : 'materialId'
						}
												,{
							header : '產品定價(單價)',
							width : 120,
							dataIndex : 'price'
						}
												,{
							header : '產品建議售價(單價)',
							width : 120,
							dataIndex : 'salePrice'
						}
												,{
							header : '創建日期',
							width : 120,
							dataIndex : 'createDate',renderer:function(v){if(v){return new Date(v).format("Y-m-d H:i");}else{return "";}}
						}
												,{
							header : '創建人員',
							width : 120,
							dataIndex : 'createBy'
						}
												,{
							header : '修改日期',
							width : 120,
							dataIndex : 'updateDate',renderer:function(v){if(v){return new Date(v).format("Y-m-d H:i");}else{return "";}}
						}
												,{
							header : '修改人員',
							width : 120,
							dataIndex : 'updateBy'
						}
						]
			}),
			sm : sm,
			store : new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : __ctxPath + '/system/listPssSupplierMaterialRel.do'
				}),
				params : {
					start : 0,
					limit : 12
				},
				reader : new Ext.data.JsonReader({
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['supplierId','materialId','price','salePrice','createDate','createBy','updateDate','updateBy']
				}),
				remoteSort : true
			}),
			viewConfig : {
				forceFit : true,
				enableRowBody : false,
				showPreview : false
			}
		});
		
		//searchPanel
		var searchPanel = new Ext.FormPanel({
			autoHeight : true,
			frame : true,
			id : 'PssSupplierMaterialRelSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
								searchPanel.getForm().submit({
									url:__ctxPath+'/system/listPssSupplierMaterialRel.do',
									method:'post',
									success : function(formPanel, action) {
										winGrid.getStore().proxy.conn.url=__ctxPath+'/system/listAppUser.do';
										var result = Ext.util.JSON.decode(action.response.responseText);
										if(data && data.length>0){
											sm.selectRecords(data);
										}
										winGrid.getStore().loadData(result);
									}
								});
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssSupplierMaterialRelSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '供應商原料關係表查詢',
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
									name : "pssSupplierMaterialRel.materialId"
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									xtype:"hidden",name : "pssSupplierMaterialRel.createDate"
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									xtype:"hidden",name : "pssSupplierMaterialRel.updateBy"
								},{
									xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '產品定價(單價)',
									maxLength:18,
									name : "pssSupplierMaterialRel.price"
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									xtype:"hidden",name : "pssSupplierMaterialRel.createBy"
								},{
								xtype:'hidden'
								}]//
					},{
						items : [{
									xtype:'hidden',
									fieldLabel : '供應商編號/供應商代號',
									maxLength:18,
									name : "pssSupplierMaterialRel.supplierId"
								},{
									fieldLabel : '產品建議售價(單價)',
									maxLength:18,
									name : "pssSupplierMaterialRel.salePrice"
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									xtype:"hidden",name : "pssSupplierMaterialRel.updateDate"
								},{
									xtype:'hidden'
								}]//
					}]
				}]
			}]
		});
		//end of searchPanel
		
		
		return new Ext.Panel({
			items : [searchPanel, winGrid]
		});
	}
	
};
