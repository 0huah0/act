/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssPurchaseOrderHeadForm');
PssPurchaseOrderHeadForm = Ext.extend(Ext.Window, {
	formPanel : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssPurchaseOrderHeadForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					id : 'PssPurchaseOrderHeadFormWin',
					title : this.recId?'修改採購單':'新增採購單',
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
			url : __ctxPath + '/pss/savePssPurchaseOrderHead.do',
			id : 'PssPurchaseOrderHeadForm',
			frame : true,
			items : [{
				xtype : 'fieldset',
				title : '採購單',
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
									name : 'pssPurchaseOrderHead.id',
									id : 'id',
									xtype : 'hidden',
									value : recId||''
								},{
									fieldLabel : '採購單編號，採購單代碼2位(PO)+當前日期8位(yyyyMMdd)+流水號6位。',
									maxLength:18,
									allowBlank : false,
									name : 'pssPurchaseOrderHead.poHeadId',
									id : 'poHeadId'
								},{
									fieldLabel : '定價總金額',
									maxLength:18,
									allowBlank : false,
									name : 'pssPurchaseOrderHead.priceAmount',
									id : 'priceAmount'
								},{
									fieldLabel : '成交價總金額',
									maxLength:18,
									allowBlank : false,
									name : 'pssPurchaseOrderHead.payAmount',
									id : 'payAmount'
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssPurchaseOrderHead.createDate',
									id : 'createDate'
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssPurchaseOrderHead.updateDate',
									id : 'updateDate'
					     }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '供應商編號/供應商代號',
									maxLength:18,
									allowBlank : false,
									name : 'pssPurchaseOrderHead.supplierId',
									id : 'supplierId'
								},{
									fieldLabel : '建議售價總金額',
									maxLength:18,
									allowBlank : false,
									name : 'pssPurchaseOrderHead.salePriceAmount',
									id : 'salePriceAmount'
								},{
									fieldLabel : '備註',
									maxLength:18,
									allowBlank : false,
									name : 'pssPurchaseOrderHead.remark',
									id : 'remark'
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssPurchaseOrderHead.createBy',
									id : 'createBy'
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssPurchaseOrderHead.updateBy',
									id : 'updateBy'
				         }]
					}]
				}]
			}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssPurchaseOrderHead.do?recId='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssPurchaseOrderHeadForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssPurchaseOrderHeadFormWin').close();
							Ext.getCmp('PssPurchaseOrderHeadGrid').getStore().reload();
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
				Ext.getCmp('PssPurchaseOrderHeadForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssPurchaseOrderHeadFormWin').close();
			}
		}];
	}
});