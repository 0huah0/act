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
			height : 320,
			autoHeight:true,
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
						columnWidth : 0.33,
						defaults : {
							layout : 'form',
							padding : '0 0 0 20px',
							labelAlign : 'right',
							labelWidth : 100,
							defaults : {
								xtype : 'textfield',
								width : 140
							}
						},
						items : [{
							items : [{
										fieldLabel : '公司名稱(中文)',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.companyNameCn',
										id : 'companyNameCn'
									},{
										fieldLabel : '負責人名稱',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.personInCharge',
										id : 'personInCharge'
									},{
										fieldLabel : '傳真',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.fax',
										id : 'fax'
									},{
										fieldLabel : '資本額，1：小於100萬、2：100萬~1000萬、3：1000萬~5000萬、4：大於5000萬（單位：TWD）。',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.capital',
										id : 'capital'
									},{
										fieldLabel : '創建日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.createDate',
										id : 'createDate'
									},{
										fieldLabel : '修改人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.updateBy',
										id : 'updateBy'
									}]
						},{
							items : [{
										fieldLabel : '公司名稱(英文)',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.companyNameEn',
										id : 'companyNameEn'
									},{
										fieldLabel : '地址',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.addr',
										id : 'addr'
									},{
										fieldLabel : '電子郵箱',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.email',
										id : 'email'
									},{
										fieldLabel : '員工數，1：小於10、2：11~50、3：51~100、4：101~500、5：501~1000、6：大於1000（單位：人）。',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.empAmount',
										id : 'empAmount'
									},{
										fieldLabel : '創建人員',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.createBy',
										id : 'createBy'
									}]
						},{
							items : [{
										fieldLabel : '客戶編號/客戶代號',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.customerId',
										id : 'customerId'
									},{
										fieldLabel : '法人代號',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.legalPersonCode',
										id : 'legalPersonCode'
									},{
										fieldLabel : '電話',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.tel',
										id : 'tel'
									},{
										fieldLabel : '資質證明圖片/營業執照影本，保存系統框架中檔案上傳的記錄編號。',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.licenseImgId',
										id : 'licenseImgId'
									},{
										fieldLabel : '有效否，0：無效、1：有效。',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.active',
										id : 'active'
									},{
										fieldLabel : '修改日期',
										maxLength:18,
										allowBlank : false,
										name : 'pssCustomer.updateDate',
										id : 'updateDate'
									}]
						}]
					}]
				}]
			}]
		});
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/pss/listPssCustomer.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['customerId'
								,'companyNameCn'
								,'companyNameEn'
								,'legalPersonCode'
								,'personInCharge'
								,'addr'
								,'tel'
								,'fax'
								,'email'
								,'licenseImgId'
								,'capital'
								,'empAmount'
								,'active'
								,'createDate'
								,'createBy'
								,'updateDate'
								,'updateBy'
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
							header : '客戶編號/客戶代號',
							width : 120,
							dataIndex : 'customerId'
						},{
							header : '公司名稱(中文)',
							width : 120,
							dataIndex : 'companyNameCn'
						},{
							header : '公司名稱(英文)',
							width : 120,
							dataIndex : 'companyNameEn'
						},{
							header : '法人代號',
							width : 120,
							dataIndex : 'legalPersonCode'
						},{
							header : '負責人名稱',
							width : 120,
							dataIndex : 'personInCharge'
						},{
							header : '地址',
							width : 120,
							dataIndex : 'addr'
						},{
							header : '電話',
							width : 120,
							dataIndex : 'tel'
						},{
							header : '傳真',
							width : 120,
							dataIndex : 'fax'
						},{
							header : '電子郵箱',
							width : 120,
							dataIndex : 'email'
						},{
							header : '資質證明圖片/營業執照影本，保存系統框架中檔案上傳的記錄編號。',
							width : 120,
							dataIndex : 'licenseImgId'
						},{
							header : '資本額，1：小於100萬、2：100萬~1000萬、3：1000萬~5000萬、4：大於5000萬（單位：TWD）。',
							width : 120,
							dataIndex : 'capital'
						},{
							header : '員工數，1：小於10、2：11~50、3：51~100、4：101~500、5：501~1000、6：大於1000（單位：人）。',
							width : 120,
							dataIndex : 'empAmount'
						},{
							header : '有效否，0：無效、1：有效。',
							width : 120,
							dataIndex : 'active'
						},{
							header : '創建日期',
							width : 120,
							dataIndex : 'createDate'
						},{
							header : '創建人員',
							width : 120,
							dataIndex : 'createBy'
						},{
							header : '修改日期',
							width : 120,
							dataIndex : 'updateDate'
						},{
							header : '修改人員',
							width : 120,
							dataIndex : 'updateBy'
						},{
						header : '管理',
						dataIndex : 'customerId',
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
