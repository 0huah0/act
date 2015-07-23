/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssDeliveryOrderDetailForm');
PssDeliveryOrderDetailForm = Ext.extend(Ext.Window, {
	formPanel : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssDeliveryOrderDetailForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					id : 'PssDeliveryOrderDetailFormWin',
					title : this.recId?'修改出貨單子項':'新增出貨單子項',
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
			url : __ctxPath + '/act/savePssDeliveryOrderDetail.do',
			id : 'PssDeliveryOrderDetailForm',
			frame : true,
			items : [{
				xtype : 'fieldset',
				title : '出貨單子項',
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
									name : 'pssDeliveryOrderDetail.id',
									id : 'id',
									xtype : 'hidden',
									value : recId||''
								},{
									fieldLabel : '出貨單編號',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderDetail.doHeadId',
									id : 'doHeadId'
								},{
									fieldLabel : '產品編號',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderDetail.pdtId',
									id : 'pdtId'
								},{
									fieldLabel : '接收數量',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderDetail.receiptNum',
									id : 'receiptNum'
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderDetail.createDate',
									id : 'createDate'
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderDetail.updateDate',
									id : 'updateDate'
					     }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '出貨單明細編號',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderDetail.doDetailId',
									id : 'doDetailId'
								},{
									fieldLabel : '出貨數量',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderDetail.allNum',
									id : 'allNum'
								},{
									fieldLabel : '退回數量',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderDetail.rejectNum',
									id : 'rejectNum'
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderDetail.createBy',
									id : 'createBy'
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssDeliveryOrderDetail.updateBy',
									id : 'updateBy'
				         }]
					}]
				}]
			}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/act/getPssDeliveryOrderDetail.do?recId='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssDeliveryOrderDetailForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssDeliveryOrderDetailFormWin').close();
							Ext.getCmp('PssDeliveryOrderDetailGrid').getStore().reload();
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
				Ext.getCmp('PssDeliveryOrderDetailForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssDeliveryOrderDetailFormWin').close();
			}
		}];
	}
});