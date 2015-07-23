/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssCustomerView');
PssCustomerView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
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
		this.searchPanel = new Ext.FormPanel({
			//height : 115,
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
					xtype : 'fieldset',
					title : '客戶',
					items : [{
						layout : 'column',
						columnWidth : 0.5,
						defaults : {
							layout : 'form',
							padding : '0 0 0 20px',
							labelAlign : 'right',
							labelWidth : 80,
							defaults : {
								xtype : 'textfield',
								width : 140
							}
						},
						items : [{
							items : [{
										name : 'pssCustomer.id',
										id : 'id',
										xtype : 'hidden',
										value : recId||''
									},{
										fieldLabel : '公司名稱(中文)',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.CompanyNameCnEnum',
										id : 'CompanyNameCnEnum'
									},{
										fieldLabel : '法人代號',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.LegalPersonCodeEnum',
										id : 'LegalPersonCodeEnum'
									},{
										fieldLabel : '地址',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.AddrEnum',
										id : 'AddrEnum'
									},{
										fieldLabel : '傳真',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.FaxEnum',
										id : 'FaxEnum'
									},{
										fieldLabel : '資質證明圖片/營業執照影本，保存系統框架中檔案上傳的記錄編號。',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.LicenseImgIdEnum',
										id : 'LicenseImgIdEnum'
									},{
										fieldLabel : '員工數，1：小於10、2：11~50、3：51~100、4：101~500、5：501~1000、6：大於1000（單位：人）。',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.EmpAmountEnum',
										id : 'EmpAmountEnum'
									},{
										fieldLabel : '創建日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.CreateDateEnum',
										id : 'CreateDateEnum'
									},{
										fieldLabel : '修改日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.UpdateDateEnum',
										id : 'UpdateDateEnum'
						     }]
						},{
							items : [{
										xtype : 'hidden'
									},{
										fieldLabel : '公司名稱(英文)',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.CompanyNameEnEnum',
										id : 'CompanyNameEnEnum'
									},{
										fieldLabel : '負責人名稱',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.PersonInChargeEnum',
										id : 'PersonInChargeEnum'
									},{
										fieldLabel : '電話',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.TelEnum',
										id : 'TelEnum'
									},{
										fieldLabel : '電子郵箱',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.EmailEnum',
										id : 'EmailEnum'
									},{
										fieldLabel : '資本額，1：小於100萬、2：100萬~1000萬、3：1000萬~5000萬、4：大於5000萬（單位：TWD）。',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.CapitalEnum',
										id : 'CapitalEnum'
									},{
										fieldLabel : '有效否，0：無效、1：有效。',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.ActiveEnum',
										id : 'ActiveEnum'
									},{
										fieldLabel : '創建人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.CreateByEnum',
										id : 'CreateByEnum'
									},{
										fieldLabel : '修改人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.UpdateByEnum',
										id : 'UpdateByEnum'
					         }]
						}]
					}]
				}]
			}]
		});
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/act/listPssCustomer.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['id'
								,CompanyNameCnEnum
								,CompanyNameEnEnum
								,LegalPersonCodeEnum
								,PersonInChargeEnum
								,AddrEnum
								,TelEnum
								,FaxEnum
								,EmailEnum
								,LicenseImgIdEnum
								,CapitalEnum
								,EmpAmountEnum
								,ActiveEnum
								,CreateDateEnum
								,CreateByEnum
								,UpdateDateEnum
								,UpdateByEnum
							]
				});
		this.store.setDefaultSort('id', 'asc');
		this.store.load({
					params : {
						start : 0,
						limit : 25
					}
				});
		var cm = new Ext.grid.ColumnModel({
			columns : [new Ext.grid.RowNumberer(),{
							header : '公司名稱(中文)',
							width : 120,
							dataIndex : 'CompanyNameCnEnum'
						},{
							header : '公司名稱(英文)',
							width : 120,
							dataIndex : 'CompanyNameEnEnum'
						},{
							header : '法人代號',
							width : 120,
							dataIndex : 'LegalPersonCodeEnum'
						},{
							header : '負責人名稱',
							width : 120,
							dataIndex : 'PersonInChargeEnum'
						},{
							header : '地址',
							width : 120,
							dataIndex : 'AddrEnum'
						},{
							header : '電話',
							width : 120,
							dataIndex : 'TelEnum'
						},{
							header : '傳真',
							width : 120,
							dataIndex : 'FaxEnum'
						},{
							header : '電子郵箱',
							width : 120,
							dataIndex : 'EmailEnum'
						},{
							header : '資質證明圖片/營業執照影本，保存系統框架中檔案上傳的記錄編號。',
							width : 120,
							dataIndex : 'LicenseImgIdEnum'
						},{
							header : '資本額，1：小於100萬、2：100萬~1000萬、3：1000萬~5000萬、4：大於5000萬（單位：TWD）。',
							width : 120,
							dataIndex : 'CapitalEnum'
						},{
							header : '員工數，1：小於10、2：11~50、3：51~100、4：101~500、5：501~1000、6：大於1000（單位：人）。',
							width : 120,
							dataIndex : 'EmpAmountEnum'
						},{
							header : '有效否，0：無效、1：有效。',
							width : 120,
							dataIndex : 'ActiveEnum'
						},{
							header : '創建日期',
							width : 120,
							dataIndex : 'CreateDateEnum'
						},{
							header : '創建人員',
							width : 120,
							dataIndex : 'CreateByEnum'
						},{
							header : '修改日期',
							width : 120,
							dataIndex : 'UpdateDateEnum'
						},{
							header : '修改人員',
							width : 120,
							dataIndex : 'UpdateByEnum'
						},{
						header : '管理',
						dataIndex : 'id',
						renderer : function(v,m,r) {
							return '&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssCustomerView.edit('
							+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssCustomerView.remove('
							+ v + ')"></button>';
						}
					}],
			defaults : {
				sortable : true,
				menuDisabled : false,
				width : 80
			}
		});

		this.gridPanel = new Ext.grid.GridPanel({
					id : 'PssCustomerGrid',
					region : 'center',
					tbar : (isGranted('_PssCustomerAdd') ? new Ext.Toolbar({
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
	}
});

PssCustomerView.remove = function(id) {
	var grid = Ext.getCmp("PssCustomerGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/act/multiDelPssCustomer.do',
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
						Ext.Msg.alert("信息", "該項已經被使用，不能刪除！");
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
