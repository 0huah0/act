/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssDeliveryOrderHeadForm');
PssDeliveryOrderHeadForm = Ext.extend(Ext.Window, {
	formPanel : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssDeliveryOrderHeadForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					id : 'PssDeliveryOrderHeadFormWin',
					title : this.recId?'修改出貨單':'新增出貨單',
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
			url : __ctxPath + '/pss/savePssDeliveryOrderHead.do',
			id : 'PssDeliveryOrderHeadForm',
			frame : true,
			items : [{
				xtype : 'fieldset',
				title : '出貨單',
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
									name : 'pssDeliveryOrderHead.id',
									id : 'id',
									xtype : 'hidden',
									value : recId||''
								},{
									fieldLabel : '出貨單編號，出貨單代碼2位(DO)+當前日期8位(yyyyMMdd)+流水號6位。',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderHead.doHeadId',
									id : 'doHeadId'
								},{
									fieldLabel : '出貨倉庫編號/倉庫代號',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderHead.warehouseId',
									id : 'warehouseId'
								},{
									fieldLabel : '送貨人名稱',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderHead.diliverName',
									id : 'diliverName'
								},{
									fieldLabel : '收貨人電話',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderHead.receiverTel',
									id : 'receiverTel'
								},{
									fieldLabel : '備註',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderHead.remark',
									id : 'remark'
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderHead.createBy',
									id : 'createBy'
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderHead.updateBy',
									id : 'updateBy'
					     }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '銷貨單編號',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderHead.soHeadId',
									id : 'soHeadId'
								},{
									fieldLabel : '送貨人電話',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderHead.diliverTel',
									id : 'diliverTel'
								},{
									fieldLabel : '收貨人名稱',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderHead.receiverName',
									id : 'receiverName'
								},{
									fieldLabel : '出貨發票號碼 (應收帳款)',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderHead.doInvoice',
									id : 'doInvoice'
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderHead.createDate',
									id : 'createDate'
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderHead.updateDate',
									id : 'updateDate'
				         }]
					}]
				}]
			}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssDeliveryOrderHead.do?recId='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssDeliveryOrderHeadForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssDeliveryOrderHeadFormWin').close();
							Ext.getCmp('PssDeliveryOrderHeadGrid').getStore().reload();
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
				Ext.getCmp('PssDeliveryOrderHeadForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssDeliveryOrderHeadFormWin').close();
			}
		}];
	}
});