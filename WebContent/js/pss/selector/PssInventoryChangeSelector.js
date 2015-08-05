/*
 * Powered By [shi_zenghua@qq.com]
 */
 
/**
 * 庫存變動記錄选择器
 */
 PssInventoryChangeSelector = {
	/**
	 * @param {} isSingle 是否单选
	 * @param {} callbackOrConf 回调函数或配置选项，若为map类型，则表示为配置选项
	 * @param {} reset data
	 * @return {}
	 */
	getView : function(isSingle,data,callback) {
		var window = new Ext.Window({
			title : '请选择庫存變動記錄',
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
							var rows = Ext.getCmp('PssInventoryChangeSelectGrid').getSelectionModel().getSelections();
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
			id : 'PssInventoryChangeSelectGrid',
			autoHeight : true,//height:360,
			cm : new Ext.grid.ColumnModel({
				columns : [sm,
						new Ext.grid.RowNumberer()
						 ,{
							header : '記錄編號',
							width : 120,
							dataIndex : 'changeId'
						}
						,{
							header : '倉庫編號/倉庫代號',
							width : 120,
							dataIndex : 'warehouseId'
						}
						,{
							header : '原料編號/原料代號',
							width : 120,
							dataIndex : 'materialId'
						}
						,{
							header : '變更類型',
							width : 120,
							dataIndex : 'type',renderer:function(v){if(1 == v){return "增加";}else if(2 == v){return "減少";}}
						}
						,{
							header : '變更數量',
							width : 120,
							dataIndex : 'num'
						}
						,{
							header : '變更原因',
							width : 120,
							dataIndex : 'reason',renderer:function(v){if(1 == v){return "出貨";}else if(2 == v){return "收貨";}else if(3 == v){return "生產取出";}else if(4 == v){return "生產存入";}else if(5 == v){return "...";}}
						}
						,{
							header : '原因記錄編號（當REASON為1、2時，分別保存出貨單編號、收貨單編號；為4、5時不保存）。',
							width : 120,
							dataIndex : 'recordId'
						}
						,{
							header : '備註',
							width : 120,
							dataIndex : 'remark'
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
					url : __ctxPath + '/pss/listPssInventoryChange.do'
				}),
				params : {
					start : 0,
					limit : 12
				},
				reader : new Ext.data.JsonReader({
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['changeId','warehouseId','materialId','type','num','reason','recordId','remark','createDate','createBy','updateDate','updateBy']
				}),
				remoteSort : true,
				autoLoad : true
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
			id : 'PssInventoryChangeSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
								searchPanel.getForm().submit({
									url:__ctxPath+'/pss/listPssInventoryChange.do',
									method:'post',
									success : function(formPanel, action) {
										winGrid.getStore().proxy.conn.url=__ctxPath+'/pss/listPssInventoryChange.do';
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
							Ext.getCmp('PssInventoryChangeSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '庫存變動記錄查詢',
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
									fieldLabel : '倉庫編號/倉庫代號',
									maxLength:18,
									name : "Q_warehouseId_S_LK"
								},{
									fieldLabel : '變更數量',
									maxLength:18,
									name : "Q_num_L_EQ"
								},{
									fieldLabel : '備註',
									maxLength:18,
									name : "Q_remark_S_LK"
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									xtype:"hidden",name : "pssInventoryChange.updateDate"
								},{
									xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '原料編號/原料代號',
									maxLength:18,
									name : "Q_materialId_S_LK"
								},{
									fieldLabel : '變更原因',
									maxLength:18,
									hiddenName:"Q_reason_N_EQ",mode:"local",triggerAction:"all",xtype:"combo",store:[[1,"出貨"],[2,"收貨"],[3,"生產取出"],[4,"生產存入"],[5,"..."]]
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									xtype:"hidden",name : "pssInventoryChange.createDate"
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									xtype:"hidden",name : "pssInventoryChange.updateBy"
								},{
								xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '記錄編號',
									maxLength:18,
									name : "Q_changeId_L_EQ"
								},{
									fieldLabel : '變更類型',
									maxLength:18,
									hiddenName:"Q_type_N_EQ",mode:"local",triggerAction:"all",xtype:"combo",store:[[1,"增加"],[2,"減少"]]
								},{
									fieldLabel : '原因記錄編號（當REASON為1、2時，分別保存出貨單編號、收貨單編號；為4、5時不保存）。',
									maxLength:18,
									name : "Q_recordId_S_LK"
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									xtype:"hidden",name : "pssInventoryChange.createBy"
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
