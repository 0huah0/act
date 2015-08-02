/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssCustomerView');
PssCustomerView = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssCustomerView.superclass.constructor.call(this, {
					id : 'PssCustomerView',
					title : '客戶',
					iconCls : 'menu-planmanage',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},
	initUIComponents : function() {
		//searchPanel
		this.searchPanel = new Ext.FormPanel({
			height : 140,
			frame : true,
			region : 'north',
			id : 'PssCustomerSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('PssCustomerSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('PssCustomerGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('PssCustomerSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '客戶查詢',
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
									fieldLabel : '',
									maxLength:18,
									name : 'S_companyNameCn_S_LK'
								},{
									fieldLabel : '',
									maxLength:18,
									name : 'S_personInCharge_S_LK'
								},{
									fieldLabel : '',
									maxLength:18,
									name : 'S_fax_S_LK'
								},{
									fieldLabel : '資本額（單位：TWD）',
									maxLength:18,
									name : 'S_capital_N_EQ',xtype:"combo",store:[[1,"小於100萬"],[2,"100萬~1000萬"],[3,"1000萬~5000萬"],[4,"大於5000萬"]]
								},{
									fieldLabel : '',
									maxLength:18,
									name : 'S_createDate_D_DL'
								},{
									fieldLabel : '',
									maxLength:18,
									name : 'S_updateBy_S_LK'
								},{
									a:1
								}]//
					},{
						items : [{
									fieldLabel : '',
									maxLength:18,
									name : 'S_companyNameEn_S_LK'
								},{
									fieldLabel : '',
									maxLength:18,
									name : 'S_addr_S_LK'
								},{
									fieldLabel : '',
									maxLength:18,
									name : 'S_email_S_LK'
								},{
									fieldLabel : '員工數（單位：人）',
									maxLength:18,
									name : 'S_empAmount_N_EQ',xtype:"combo",store:[[1,"小於10"],[2,"11~50"],[3,"51~100"],[4,"101~500"],[5,"501~1000"],[6,"大於1000"]]
								},{
									fieldLabel : '',
									maxLength:18,
									name : 'S_createBy_S_LK'
								},{
									a:1
								}]//
					},{
						items : [{
									xtype:'hidden',
									fieldLabel : '',
									maxLength:18,
									name : 'S_customerId_S_LK'
								},{
									fieldLabel : '',
									maxLength:18,
									name : 'S_legalPersonCode_S_LK'
								},{
									fieldLabel : '',
									maxLength:18,
									name : 'S_tel_S_LK'
								},{
									fieldLabel : '',
									maxLength:18,
									name : 'S_licenseImgId_S_LK'
								},{
									fieldLabel : '有效否',
									maxLength:18,
									name : 'S_active_N_EQ',xtype:"combo",store:[[0,"無效"],[1,"有效"]]
								},{
									fieldLabel : '',
									maxLength:18,
									name : 'S_updateDate_D_DL'
								},{
									a:1
								}]//
					}]
				}]
			}]
		});
		//end of searchPanel
		
		
		//store
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/pss/listPssCustomer.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['customerId','companyNameCn','companyNameEn','legalPersonCode','personInCharge','addr','tel','fax','email','licenseImgId','capital','empAmount','active','createDate','createBy','updateDate','updateBy'
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
							fieldLabel : '',
							dataIndex : 'customerId'
						},{
							fieldLabel : '',
							dataIndex : 'companyNameCn'
						},{
							fieldLabel : '',
							dataIndex : 'companyNameEn'
						},{
							fieldLabel : '',
							dataIndex : 'legalPersonCode'
						},{
							fieldLabel : '',
							dataIndex : 'personInCharge'
						},{
							fieldLabel : '',
							dataIndex : 'addr'
						},{
							fieldLabel : '',
							dataIndex : 'tel'
						},{
							fieldLabel : '',
							dataIndex : 'fax'
						},{
							fieldLabel : '',
							dataIndex : 'email'
						},{
							fieldLabel : '',
							dataIndex : 'licenseImgId'
						},{
							fieldLabel : '資本額（單位：TWD）',
							dataIndex : 'capital',renderer:function(v){if(1 == v){return "小於100萬";}else if(2 == v){return "100萬~1000萬";}else if(3 == v){return "1000萬~5000萬";}else if(4 == v){return "大於5000萬";}}
						},{
							fieldLabel : '員工數（單位：人）',
							dataIndex : 'empAmount',renderer:function(v){if(1 == v){return "小於10";}else if(2 == v){return "11~50";}else if(3 == v){return "51~100";}else if(4 == v){return "101~500";}else if(5 == v){return "501~1000";}else if(6 == v){return "大於1000";}}
						},{
							fieldLabel : '有效否',
							dataIndex : 'active',renderer:function(v){if(0 == v){return "無效";}else if(1 == v){return "有效";}}
						},{
							fieldLabel : '',
							dataIndex : 'createDate'
						},{
							fieldLabel : '',
							dataIndex : 'createBy'
						},{
							fieldLabel : '',
							dataIndex : 'updateDate'
						},{
							fieldLabel : '',
							dataIndex : 'updateBy'
						},{
						header : '管理',
						dataIndex : 'customerId',//
						renderer : function(v,m,r) {
							return isGranted('_PssCustomerEdit') ?('&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssCustomerView.edit('
							+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssCustomerView.remove('
							+ v + ')"></button>'):'';
						}
					}],
			defaults : {
				sortable : true,
				menuDisabled : false,
				width : 120
			}
		});

		this.gridPanel = new Ext.grid.GridPanel({
					id : 'PssCustomerGrid',
					region : 'center',
					tbar : (isGranted('_PssCustomerEdit') ? new Ext.Toolbar({
								id : 'PssCustomerFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增客戶',
											handler : function() {
												new PssCustomerForm().show();
											}
										})]
							}) : null),
					store : this.store,
					//autoExpandColumn :'remark1',
					loadMask : true,
					autoHeight : true,
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
PssCustomerView.remove = function(id) {
	var grid = Ext.getCmp("PssCustomerGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/pss/multiDelPssCustomer.do',
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

PssCustomerView.edit = function(id) {
	new PssCustomerForm({
				recId : id
			}).show();
};

//end of view static method
