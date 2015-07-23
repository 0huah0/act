/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssInventoryForm');
PssInventoryForm = Ext.extend(Ext.Window, {
	formPanel : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssInventoryForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					id : 'PssInventoryFormWin',
					title : this.recId?'修改庫存':'新增庫存',
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
			url : __ctxPath + '/pss/savePssInventory.do',
			id : 'PssInventoryForm',
			frame : true,
			items : [{
				xtype : 'fieldset',
				title : '庫存',
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
									name : 'pssInventory.id',
									id : 'id',
									xtype : 'hidden',
									value : recId||''
								},{
									fieldLabel : '倉庫編號/倉庫代號',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventory.warehouseId',
									id : 'warehouseId'
								},{
									fieldLabel : '報警水位數量 (According to 良品)',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventory.alertNum',
									id : 'alertNum'
								},{
									fieldLabel : '庫存良品數量',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventory.goodPdtNum',
									id : 'goodPdtNum'
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventory.createDate',
									id : 'createDate'
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventory.updateDate',
									id : 'updateDate'
					     }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '原料編號/原料代號',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventory.materialId',
									id : 'materialId'
								},{
									fieldLabel : '庫存總數量',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventory.allNum',
									id : 'allNum'
								},{
									fieldLabel : '庫存不良品數量',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventory.rejectsNum',
									id : 'rejectsNum'
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventory.createBy',
									id : 'createBy'
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventory.updateBy',
									id : 'updateBy'
				         }]
					}]
				}]
			}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssInventory.do?recId='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssInventoryForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssInventoryFormWin').close();
							Ext.getCmp('PssInventoryGrid').getStore().reload();
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
				Ext.getCmp('PssInventoryForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssInventoryFormWin').close();
			}
		}];
	}
});