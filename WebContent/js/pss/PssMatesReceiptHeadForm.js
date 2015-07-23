/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssMatesReceiptHeadForm');
PssMatesReceiptHeadForm = Ext.extend(Ext.Window, {
	formPanel : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssMatesReceiptHeadForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					id : 'PssMatesReceiptHeadFormWin',
					title : this.recId?'修改收貨單':'新增收貨單',
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
			url : __ctxPath + '/act/savePssMatesReceiptHead.do',
			id : 'PssMatesReceiptHeadForm',
			frame : true,
			items : [{
				xtype : 'fieldset',
				title : '收貨單',
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
									name : 'pssMatesReceiptHead.id',
									id : 'id',
									xtype : 'hidden',
									value : recId||''
								},{
									fieldLabel : '採購單編號',
									maxLength:18,
									allowBlank : false,
									name : 'pssMatesReceiptHead.PoHeadIdEnum',
									id : 'PoHeadIdEnum'
								},{
									fieldLabel : '收貨人名稱/倉管人員名稱',
									maxLength:18,
									allowBlank : false,
									name : 'pssMatesReceiptHead.ReceiverNameEnum',
									id : 'ReceiverNameEnum'
								},{
									fieldLabel : '收貨發票號碼(應付帳款)',
									maxLength:18,
									allowBlank : false,
									name : 'pssMatesReceiptHead.MrInvoiceEnum',
									id : 'MrInvoiceEnum'
								},{
									fieldLabel : '送貨人電話',
									maxLength:18,
									allowBlank : false,
									name : 'pssMatesReceiptHead.DiliverTelEnum',
									id : 'DiliverTelEnum'
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssMatesReceiptHead.CreateDateEnum',
									id : 'CreateDateEnum'
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssMatesReceiptHead.UpdateDateEnum',
									id : 'UpdateDateEnum'
					     }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '收貨倉庫編號/倉庫代號',
									maxLength:18,
									allowBlank : false,
									name : 'pssMatesReceiptHead.WarehouseIdEnum',
									id : 'WarehouseIdEnum'
								},{
									fieldLabel : '收貨人電話',
									maxLength:18,
									allowBlank : false,
									name : 'pssMatesReceiptHead.ReceiverTelEnum',
									id : 'ReceiverTelEnum'
								},{
									fieldLabel : '送貨人名稱',
									maxLength:18,
									allowBlank : false,
									name : 'pssMatesReceiptHead.DiliverNameEnum',
									id : 'DiliverNameEnum'
								},{
									fieldLabel : '備註',
									maxLength:18,
									allowBlank : false,
									name : 'pssMatesReceiptHead.RemarkEnum',
									id : 'RemarkEnum'
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssMatesReceiptHead.CreateByEnum',
									id : 'CreateByEnum'
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssMatesReceiptHead.UpdateByEnum',
									id : 'UpdateByEnum'
				         }]
					}]
				}]
			}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/act/getPssMatesReceiptHead.do?recId='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssMatesReceiptHeadForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssMatesReceiptHeadFormWin').close();
							Ext.getCmp('PssMatesReceiptHeadGrid').getStore().reload();
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
				Ext.getCmp('PssMatesReceiptHeadForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssMatesReceiptHeadFormWin').close();
			}
		}];
	}
});