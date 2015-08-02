/*
 * Powered By [shi_zenghua@qq.com]
 */
Ext.ns('PssSupplierMaterialRelForm');
PssSupplierMaterialRelForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssSupplierMaterialRelForm.superclass.constructor.call(this, {
					items : this.formPanel,
					modal : true,
					id : 'PssSupplierMaterialRelFormWin',
					title : this.recId?'修改供應商原料關係表':'新增供應商原料關係表',
					iconCls : 'menu-planmanage',
					width : 820,
					autoHeight : true,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			url : __ctxPath + '/pss/savePssSupplierMaterialRel.do',
			id : 'PssSupplierMaterialRelForm',
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
							allowBlank : false,
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
									fieldLabel : '供應商編號/供應商代號',
									name : 'pssSupplierMaterialRel.supplierId'
								},{
									fieldLabel : '產品定價(單價)',
									name : 'pssSupplierMaterialRel.price'
								},{
									fieldLabel : '創建日期',
									name : 'pssSupplierMaterialRel.createDate'
								},{
									fieldLabel : '修改日期',
									name : 'pssSupplierMaterialRel.updateDate'
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '原料編號/原料代號',
									name : 'pssSupplierMaterialRel.materialId'
								},{
									fieldLabel : '產品建議售價(單價)',
									name : 'pssSupplierMaterialRel.salePrice'
								},{
									fieldLabel : '創建人員',
									name : 'pssSupplierMaterialRel.createBy'
								},{
									fieldLabel : '修改人員',
									name : 'pssSupplierMaterialRel.updateBy'
				        }]
					}]
				}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssSupplierMaterialRel.do?id='+ this.recId,
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