/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssInventoryChangeForm');
PssInventoryChangeForm = Ext.extend(Ext.Window, {
	formPanel : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssInventoryChangeForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					id : 'PssInventoryChangeFormWin',
					title : this.recId?'修改庫存變動記錄':'新增庫存變動記錄',
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
			url : __ctxPath + '/act/savePssInventoryChange.do',
			id : 'PssInventoryChangeForm',
			frame : true,
			items : [{
				xtype : 'fieldset',
				title : '庫存變動記錄',
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
									name : 'pssInventoryChange.id',
									id : 'id',
									xtype : 'hidden',
									value : recId||''
								},{
									fieldLabel : '倉庫編號/倉庫代號',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.WarehouseIdEnum',
									id : 'WarehouseIdEnum'
								},{
									fieldLabel : '變更類型，1：增加、2：減少。',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.TypeEnum',
									id : 'TypeEnum'
								},{
									fieldLabel : '變更原因，1：出貨、2：收貨、3：生產取出、4：生產存入、5：...。',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.ReasonEnum',
									id : 'ReasonEnum'
								},{
									fieldLabel : '備註',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.RemarkEnum',
									id : 'RemarkEnum'
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.CreateByEnum',
									id : 'CreateByEnum'
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.UpdateByEnum',
									id : 'UpdateByEnum'
					     }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '原料編號/原料代號',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.MaterialIdEnum',
									id : 'MaterialIdEnum'
								},{
									fieldLabel : '變更數量',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.NumEnum',
									id : 'NumEnum'
								},{
									fieldLabel : '原因記錄編號，當REASON為1、2時，分別保存出貨單編號、收貨單編號；為4、5時不保存。',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.RecordIdEnum',
									id : 'RecordIdEnum'
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.CreateDateEnum',
									id : 'CreateDateEnum'
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.UpdateDateEnum',
									id : 'UpdateDateEnum'
				         }]
					}]
				}]
			}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/act/getPssInventoryChange.do?recId='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssInventoryChangeForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssInventoryChangeFormWin').close();
							Ext.getCmp('PssInventoryChangeGrid').getStore().reload();
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
				Ext.getCmp('PssInventoryChangeForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssInventoryChangeFormWin').close();
			}
		}];
	}
});