/*
 * Powered By [shi_zenghua@qq.com]
 */
/**
 * 供應商选择器
 */
 PssSupplierSelector = {
	/**
	 * @param {} isSingle 是否单选
	 * @param {} callbackOrConf 回调函数或配置选项，若为map类型，则表示为配置选项
	 * @param {} reset data
	 * @return {}
	 */
	getView : function(isSingle,data,callback) {
		var window = new Ext.Window({
			title : '请选择供應商',
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
							var rows = Ext.getCmp('PssSupplierSelectGrid').getSelectionModel().getSelections();
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
			id : 'PssSupplierSelectGrid',
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
							header : '公司名稱(中文)',
							width : 120,
							dataIndex : 'companyNameCn'
						}
												,{
							header : '公司名稱(英文)',
							width : 120,
							dataIndex : 'companyNameEn'
						}
												,{
							header : '法人代號',
							width : 120,
							dataIndex : 'legalPersonCode'
						}
												,{
							header : '負責人名稱',
							width : 120,
							dataIndex : 'personInCharge'
						}
												,{
							header : '地址',
							width : 120,
							dataIndex : 'addr'
						}
												,{
							header : '電話',
							width : 120,
							dataIndex : 'tel'
						}
												,{
							header : '傳真',
							width : 120,
							dataIndex : 'fax'
						}
												,{
							header : '電子郵箱',
							width : 120,
							dataIndex : 'email'
						}
												,{
							header : '資質證明圖片/營業執照影本，保存系統框架中檔案上傳的記錄編號',
							width : 120,
							dataIndex : 'licenseImgId'
						}
												,{
							header : '資本額（單位：TWD）',
							width : 120,
							dataIndex : 'capital',renderer:function(v){if(1 == v){return "小於100萬";}else if(2 == v){return "100萬~1000萬";}else if(3 == v){return "1000萬~5000萬";}else if(4 == v){return "大於5000萬";}}
						}
												,{
							header : '員工數（單位：人）',
							width : 120,
							dataIndex : 'empAmount',renderer:function(v){if(1 == v){return "小於10";}else if(2 == v){return "11~50";}else if(3 == v){return "51~100";}else if(4 == v){return "101~500";}else if(5 == v){return "501~1000";}else if(6 == v){return "大於1000";}}
						}
												,{
							header : '有效否',
							width : 120,
							dataIndex : 'active',renderer:function(v){if(0 == v){return "無效";}else if(1 == v){return "有效";}}
						}
												,{
							header : '創建日期',
							width : 120,
							dataIndex : 'createDate'
						}
												,{
							header : '創建人員',
							width : 120,
							dataIndex : 'createBy'
						}
												,{
							header : '修改日期',
							width : 120,
							dataIndex : 'updateDate'
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
					url : __ctxPath + '/system/listPssSupplier.do'
				}),
				params : {
					start : 0,
					limit : 12
				},
				reader : new Ext.data.JsonReader({
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['supplierId','companyNameCn','companyNameEn','legalPersonCode','personInCharge','addr','tel','fax','email','licenseImgId','capital','empAmount','active','createDate','createBy','updateDate','updateBy']
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
			id : 'PssSupplierSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
								searchPanel.getForm().submit({
									url:__ctxPath+'/system/listPssSupplier.do',
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
							Ext.getCmp('PssSupplierSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '供應商查詢',
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
									fieldLabel : '公司名稱(中文)',
									maxLength:18,
									name : 'S_companyNameCn_S_LK'
								},{
									fieldLabel : '負責人名稱',
									maxLength:18,
									name : 'S_personInCharge_S_LK'
								},{
									fieldLabel : '傳真',
									maxLength:18,
									name : 'S_fax_S_LK'
								},{
									fieldLabel : '資本額（單位：TWD）',
									maxLength:18,
									name : 'S_capital_N_EQ',xtype:"combo",store:[[1,"小於100萬"],[2,"100萬~1000萬"],[3,"1000萬~5000萬"],[4,"大於5000萬"]]
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									name : 'S_createDate_D_DL'
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									name : 'S_updateBy_S_LK'
								},{
									xtype:'hidden'
								}]//
					},{
						items : [{
									fieldLabel : '公司名稱(英文)',
									maxLength:18,
									name : 'S_companyNameEn_S_LK'
								},{
									fieldLabel : '地址',
									maxLength:18,
									name : 'S_addr_S_LK'
								},{
									fieldLabel : '電子郵箱',
									maxLength:18,
									name : 'S_email_S_LK'
								},{
									fieldLabel : '員工數（單位：人）',
									maxLength:18,
									name : 'S_empAmount_N_EQ',xtype:"combo",store:[[1,"小於10"],[2,"11~50"],[3,"51~100"],[4,"101~500"],[5,"501~1000"],[6,"大於1000"]]
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									name : 'S_createBy_S_LK'
								},{
								xtype:'hidden'
								}]//
					},{
						items : [{
									xtype:'hidden',
									fieldLabel : '供應商編號/供應商代號',
									maxLength:18,
									name : 'S_supplierId_S_LK'
								},{
									fieldLabel : '法人代號',
									maxLength:18,
									name : 'S_legalPersonCode_S_LK'
								},{
									fieldLabel : '電話',
									maxLength:18,
									name : 'S_tel_S_LK'
								},{
									fieldLabel : '資質證明圖片/營業執照影本，保存系統框架中檔案上傳的記錄編號',
									maxLength:18,
									name : 'S_licenseImgId_S_LK'
								},{
									fieldLabel : '有效否',
									maxLength:18,
									name : 'S_active_N_EQ',xtype:"combo",store:[[0,"無效"],[1,"有效"]]
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									name : 'S_updateDate_D_DL'
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