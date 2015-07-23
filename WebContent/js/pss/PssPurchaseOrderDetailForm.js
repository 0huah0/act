/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssPurchaseOrderDetailForm');
PssPurchaseOrderDetailForm = Ext.extend(Ext.Window, {
	formPanel : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssPurchaseOrderDetailForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					id : 'PssPurchaseOrderDetailFormWin',
					title : this.recId?'修改採購單子項':'新增採購單子項',
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
			url : __ctxPath + '/act/savePssPurchaseOrderDetail.do',
			id : 'PssPurchaseOrderDetailForm',
			frame : true,
			items : [{
				xtype : 'fieldset',
				title : '採購單子項',
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
									name : 'pssPurchaseOrderDetail.id',
									id : 'id',
									xtype : 'hidden',
									value : recId||''
								},{
									fieldLabel : '採購單編號',
									maxLength:18,
									allowBlank : false,
									name : 'pssPurchaseOrderDetail.PoHeadIdEnum',
									id : 'PoHeadIdEnum'
								},{
									fieldLabel : '原料數量',
									maxLength:18,
									allowBlank : false,
									name : 'pssPurchaseOrderDetail.MaterialNumEnum',
									id : 'MaterialNumEnum'
								},{
									fieldLabel : '原料建議售價(單價)',
									maxLength:18,
									allowBlank : false,
									name : 'pssPurchaseOrderDetail.MaterialSalePriceEnum',
									id : 'MaterialSalePriceEnum'
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssPurchaseOrderDetail.CreateDateEnum',
									id : 'CreateDateEnum'
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssPurchaseOrderDetail.UpdateDateEnum',
									id : 'UpdateDateEnum'
					     }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '原料編號',
									maxLength:18,
									allowBlank : false,
									name : 'pssPurchaseOrderDetail.MaterialIdEnum',
									id : 'MaterialIdEnum'
								},{
									fieldLabel : '原料定價(單價)',
									maxLength:18,
									allowBlank : false,
									name : 'pssPurchaseOrderDetail.MaterialPriceEnum',
									id : 'MaterialPriceEnum'
								},{
									fieldLabel : '小計',
									maxLength:18,
									allowBlank : false,
									name : 'pssPurchaseOrderDetail.AmountEnum',
									id : 'AmountEnum'
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssPurchaseOrderDetail.CreateByEnum',
									id : 'CreateByEnum'
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssPurchaseOrderDetail.UpdateByEnum',
									id : 'UpdateByEnum'
				         }]
					}]
				}]
			}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/act/getPssPurchaseOrderDetail.do?recId='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssPurchaseOrderDetailForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssPurchaseOrderDetailFormWin').close();
							Ext.getCmp('PssPurchaseOrderDetailGrid').getStore().reload();
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
				Ext.getCmp('PssPurchaseOrderDetailForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssPurchaseOrderDetailFormWin').close();
			}
		}];
	}
});