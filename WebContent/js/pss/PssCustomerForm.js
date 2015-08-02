/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssCustomerForm');
PssCustomerForm = Ext.extend(Ext.Window, {
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
					width : 800,
					buttonAlign : 'center',
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			url : __ctxPath + '/pss/savePssCustomer.do',
			id : 'PssCustomerForm',
			autoHeight:true,
			frame : true,
			items : [{
					layout : 'column',
					columnWidth : 0.5,
					defaults : {
						layout : 'form',
						padding : '0 0 0 20px',
						labelAlign : 'right',
						labelWidth : 160,
						defaults : {
							xtype : 'textfield',
							maxLength:100,
							width : 200
						}
					},
					items : [{
						items : [{
									id:'hiddenId',
									xtype : 'hidden',
									value : this.recId||''
								},{
									fieldLabel : '',
									name : 'S_customerId_S_LK'
								},{
									fieldLabel : '',
									name : 'S_companyNameEn_S_LK'
								},{
									fieldLabel : '',
									name : 'S_personInCharge_S_LK'
								},{
									fieldLabel : '',
									name : 'S_tel_S_LK'
								},{
									fieldLabel : '',
									name : 'S_email_S_LK'
								},{
									fieldLabel : '資本額（單位：TWD）',
									name : 'S_capital_N_EQ',xtype:"combo",store:[[1,"小於100萬"],[2,"100萬~1000萬"],[3,"1000萬~5000萬"],[4,"大於5000萬"]]
								},{
									fieldLabel : '有效否',
									name : 'S_active_N_EQ',xtype:"combo",store:[[0,"無效"],[1,"有效"]]
								},{
									fieldLabel : '',
									name : 'S_createBy_S_LK'
								},{
									fieldLabel : '',
									name : 'S_updateBy_S_LK'
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '',
									name : 'S_companyNameCn_S_LK'
								},{
									fieldLabel : '',
									name : 'S_legalPersonCode_S_LK'
								},{
									fieldLabel : '',
									name : 'S_addr_S_LK'
								},{
									fieldLabel : '',
									name : 'S_fax_S_LK'
								},{
									fieldLabel : '',
									name : 'S_licenseImgId_S_LK'
								},{
									fieldLabel : '員工數（單位：人）',
									name : 'S_empAmount_N_EQ',xtype:"combo",store:[[1,"小於10"],[2,"11~50"],[3,"51~100"],[4,"101~500"],[5,"501~1000"],[6,"大於1000"]]
								},{
									fieldLabel : '',
									name : 'S_createDate_D_DL'
								},{
									fieldLabel : '',
									name : 'S_updateDate_D_DL'
				        }]
					}]
				}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssCustomer.do?id='+ this.recId,
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