/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssProductForm');
PssProductForm = Ext.extend(Ext.Window, {
	formPanel : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssProductForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					id : 'PssProductFormWin',
					title : this.recId?'修改產品':'新增產品',
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
			url : __ctxPath + '/act/savePssProduct.do',
			id : 'PssProductForm',
			frame : true,
			items : [{
				xtype : 'fieldset',
				title : '產品',
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
									name : 'pssProduct.id',
									id : 'id',
									xtype : 'hidden',
									value : recId||''
								},{
									fieldLabel : '產品名稱',
									maxLength:18,
									allowBlank : false,
									name : 'pssProduct.NameEnum',
									id : 'NameEnum'
								},{
									fieldLabel : '單位，1：個、2：塊、3：條、4：片、5：公斤、6：公噸、7：...。',
									maxLength:18,
									allowBlank : false,
									name : 'pssProduct.UnitEnum',
									id : 'UnitEnum'
								},{
									fieldLabel : '產品建議售價(單價)',
									maxLength:18,
									allowBlank : false,
									name : 'pssProduct.SalePriceEnum',
									id : 'SalePriceEnum'
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssProduct.CreateDateEnum',
									id : 'CreateDateEnum'
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssProduct.UpdateDateEnum',
									id : 'UpdateDateEnum'
					     }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '描述',
									maxLength:18,
									allowBlank : false,
									name : 'pssProduct.DescEnum',
									id : 'DescEnum'
								},{
									fieldLabel : '產品定價(單價)',
									maxLength:18,
									allowBlank : false,
									name : 'pssProduct.PriceEnum',
									id : 'PriceEnum'
								},{
									fieldLabel : '有效否，0：無效、1：有效。',
									maxLength:18,
									allowBlank : false,
									name : 'pssProduct.ActiveEnum',
									id : 'ActiveEnum'
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssProduct.CreateByEnum',
									id : 'CreateByEnum'
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssProduct.UpdateByEnum',
									id : 'UpdateByEnum'
				         }]
					}]
				}]
			}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/act/getPssProduct.do?recId='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssProductForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssProductFormWin').close();
							Ext.getCmp('PssProductGrid').getStore().reload();
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
				Ext.getCmp('PssProductForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssProductFormWin').close();
			}
		}];
	}
});