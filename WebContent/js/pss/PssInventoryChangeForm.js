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
			url : __ctxPath + '/pss/savePssInventoryChange.do',
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
									fieldLabel : '記錄編號',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.changeId',
									id : 'changeId'
								},{
									fieldLabel : '原料編號/原料代號',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.materialId',
									id : 'materialId'
								},{
									fieldLabel : '變更數量',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.num',
									id : 'num'
								},{
									fieldLabel : '原因記錄編號，當REASON為1、2時，分別保存出貨單編號、收貨單編號；為4、5時不保存。',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.recordId',
									id : 'recordId'
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.createDate',
									id : 'createDate'
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.updateDate',
									id : 'updateDate'
					     }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '倉庫編號/倉庫代號',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.warehouseId',
									id : 'warehouseId'
								},{
									fieldLabel : '變更類型，1：增加、2：減少。',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.type',
									id : 'type'
								},{
									fieldLabel : '變更原因，1：出貨、2：收貨、3：生產取出、4：生產存入、5：...。',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.reason',
									id : 'reason'
								},{
									fieldLabel : '備註',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.remark',
									id : 'remark'
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.createBy',
									id : 'createBy'
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssInventoryChange.updateBy',
									id : 'updateBy'
				         }]
					}]
				}]
			}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssInventoryChange.do?recId='+ this.recId,
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