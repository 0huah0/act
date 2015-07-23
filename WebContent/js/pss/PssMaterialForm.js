/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssMaterialForm');
PssMaterialForm = Ext.extend(Ext.Window, {
	formPanel : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssMaterialForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					id : 'PssMaterialFormWin',
					title : this.recId?'修改原料':'新增原料',
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
			url : __ctxPath + '/pss/savePssMaterial.do',
			id : 'PssMaterialForm',
			frame : true,
			items : [{
				xtype : 'fieldset',
				title : '原料',
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
									name : 'pssMaterial.id',
									id : 'id',
									xtype : 'hidden',
									value : recId||''
								},{
									fieldLabel : '原料編號/原料代號',
									maxLength:18,
									allowBlank : false,
									name : 'pssMaterial.materialId',
									id : 'materialId'
								},{
									fieldLabel : '單位，1：個、2：塊、3：條、4：片、5：公斤、6：公噸、7：...。',
									maxLength:18,
									allowBlank : false,
									name : 'pssMaterial.unit',
									id : 'unit'
								},{
									fieldLabel : '有效否，0：無效、1：有效。',
									maxLength:18,
									allowBlank : false,
									name : 'pssMaterial.active',
									id : 'active'
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssMaterial.createBy',
									id : 'createBy'
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssMaterial.updateBy',
									id : 'updateBy'
					     }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '原料名稱',
									maxLength:18,
									allowBlank : false,
									name : 'pssMaterial.name',
									id : 'name'
								},{
									fieldLabel : '描述',
									maxLength:18,
									allowBlank : false,
									name : 'pssMaterial.desc',
									id : 'desc'
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssMaterial.createDate',
									id : 'createDate'
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssMaterial.updateDate',
									id : 'updateDate'
				         }]
					}]
				}]
			}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssMaterial.do?recId='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssMaterialForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssMaterialFormWin').close();
							Ext.getCmp('PssMaterialGrid').getStore().reload();
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
				Ext.getCmp('PssMaterialForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssMaterialFormWin').close();
			}
		}];
	}
});