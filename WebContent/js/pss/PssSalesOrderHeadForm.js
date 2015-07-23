/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssSalesOrderHeadForm');
PssSalesOrderHeadForm = Ext.extend(Ext.Window, {
	formPanel : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssSalesOrderHeadForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					id : 'PssSalesOrderHeadFormWin',
					title : this.recId?'修改銷貨單':'新增銷貨單',
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
			url : __ctxPath + '/act/savePssSalesOrderHead.do',
			id : 'PssSalesOrderHeadForm',
			frame : true,
			items : [{
				xtype : 'fieldset',
				title : '銷貨單',
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
									name : 'pssSalesOrderHead.id',
									id : 'id',
									xtype : 'hidden',
									value : recId||''
								},{
									fieldLabel : '客戶編號',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderHead.CustomerIdEnum',
									id : 'CustomerIdEnum'
								},{
									fieldLabel : '定價總金額',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderHead.PriceAmountEnum',
									id : 'PriceAmountEnum'
								},{
									fieldLabel : '實際售價總金額',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderHead.PayAmountEnum',
									id : 'PayAmountEnum'
								},{
									fieldLabel : '備註',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderHead.RemarkEnum',
									id : 'RemarkEnum'
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderHead.CreateByEnum',
									id : 'CreateByEnum'
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderHead.UpdateByEnum',
									id : 'UpdateByEnum'
					     }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '客戶採購單編號',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderHead.CustPoNoEnum',
									id : 'CustPoNoEnum'
								},{
									fieldLabel : '建議售價總金額',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderHead.SalePriceAmountEnum',
									id : 'SalePriceAmountEnum'
								},{
									fieldLabel : '優惠金額',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderHead.DiscountAmountEnum',
									id : 'DiscountAmountEnum'
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderHead.CreateDateEnum',
									id : 'CreateDateEnum'
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderHead.UpdateDateEnum',
									id : 'UpdateDateEnum'
				         }]
					}]
				}]
			}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/act/getPssSalesOrderHead.do?recId='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssSalesOrderHeadForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssSalesOrderHeadFormWin').close();
							Ext.getCmp('PssSalesOrderHeadGrid').getStore().reload();
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
				Ext.getCmp('PssSalesOrderHeadForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssSalesOrderHeadFormWin').close();
			}
		}];
	}
});