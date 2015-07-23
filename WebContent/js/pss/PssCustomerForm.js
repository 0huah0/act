/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssCustomerForm');
PssCustomerForm = Ext.extend(Ext.Window, {
	formPanel : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssCustomerForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					id : 'PssCustomerFormWin',
					title : this.recId?'修改客戶':'新增客戶',
					iconCls : 'menu-planmanage',
					width : 600,
					height : 240,
					resizable : false,
					buttonAlign : 'center',
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			url : __ctxPath + '/act/savePssCustomer.do',
			id : 'PssCustomerForm',
			frame : true,
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
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/act/getPssCustomer.do?recId='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssCustomerForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssCustomerFormWin').close();
							Ext.getCmp('PssCustomerGrid').getStore().reload();
						},
						failure : function(fp, action) {
							Ext.MessageBox.show({
										title : '信息',
										msg : '數據保存失敗！',
										buttons : Ext.MessageBox.OK,
										icon : 'ext-mb-error'
									});
						}
					});
				}
			}
		}, {
			text : '清空',
			iconCls : 'btn-reset',
			handler : function() {
				Ext.getCmp('PssCustomerForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssCustomerFormWin').close();
			}
		}];
	}
});