/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssSupplierMaterialRelForm');
PssSupplierMaterialRelForm = Ext.extend(Ext.Window, {
	formPanel : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssSupplierMaterialRelForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					id : 'PssSupplierMaterialRelFormWin',
					title : this.recId?'修改供應商原料關係表':'新增供應商原料關係表',
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
			url : __ctxPath + '/act/savePssSupplierMaterialRel.do',
			id : 'PssSupplierMaterialRelForm',
			frame : true,
			items : [{
				xtype : 'fieldset',
				title : '供應商原料關係表',
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
									name : 'pssSupplierMaterialRel.id',
									id : 'id',
									xtype : 'hidden',
									value : recId||''
								},{
									fieldLabel : '供應商編號/供應商代號',
									maxLength:18,
									allowBlank : false,
									name : 'pssSupplierMaterialRel.supplierId',
									id : 'supplierId'
								},{
									fieldLabel : '產品定價(單價)',
									maxLength:18,
									allowBlank : false,
									name : 'pssSupplierMaterialRel.price',
									id : 'price'
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssSupplierMaterialRel.createDate',
									id : 'createDate'
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssSupplierMaterialRel.updateDate',
									id : 'updateDate'
					     }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '原料編號/原料代號',
									maxLength:18,
									allowBlank : false,
									name : 'pssSupplierMaterialRel.materialId',
									id : 'materialId'
								},{
									fieldLabel : '產品建議售價(單價)',
									maxLength:18,
									allowBlank : false,
									name : 'pssSupplierMaterialRel.salePrice',
									id : 'salePrice'
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssSupplierMaterialRel.createBy',
									id : 'createBy'
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssSupplierMaterialRel.updateBy',
									id : 'updateBy'
				         }]
					}]
				}]
			}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/act/getPssSupplierMaterialRel.do?recId='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssSupplierMaterialRelForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssSupplierMaterialRelFormWin').close();
							Ext.getCmp('PssSupplierMaterialRelGrid').getStore().reload();
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
				Ext.getCmp('PssSupplierMaterialRelForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssSupplierMaterialRelFormWin').close();
			}
		}];
	}
});