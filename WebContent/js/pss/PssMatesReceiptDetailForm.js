/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssMatesReceiptDetailForm');
PssMatesReceiptDetailForm = Ext.extend(Ext.Window, {
	formPanel : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssMatesReceiptDetailForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					id : 'PssMatesReceiptDetailFormWin',
					title : this.recId?'修改收貨單子項':'新增收貨單子項',
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
			url : __ctxPath + '/pss/savePssMatesReceiptDetail.do',
			id : 'PssMatesReceiptDetailForm',
			frame : true,
			items : [{
				xtype : 'fieldset',
				title : '收貨單子項',
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
									name : 'pssMatesReceiptDetail.id',
									id : 'id',
									xtype : 'hidden',
									value : recId||''
								},{
									fieldLabel : '收貨單編號',
									maxLength:18,
									allowBlank : false,
									name : 'pssMatesReceiptDetail.mrHeadId',
									id : 'mrHeadId'
								},{
									fieldLabel : '原料編號',
									maxLength:18,
									allowBlank : false,
									name : 'pssMatesReceiptDetail.materialId',
									id : 'materialId'
								},{
									fieldLabel : '接收數量',
									maxLength:18,
									allowBlank : false,
									name : 'pssMatesReceiptDetail.receiptNum',
									id : 'receiptNum'
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssMatesReceiptDetail.createDate',
									id : 'createDate'
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssMatesReceiptDetail.updateDate',
									id : 'updateDate'
					     }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '收貨單明細編號',
									maxLength:18,
									allowBlank : false,
									name : 'pssMatesReceiptDetail.mrDetailId',
									id : 'mrDetailId'
								},{
									fieldLabel : '來貨數量',
									maxLength:18,
									allowBlank : false,
									name : 'pssMatesReceiptDetail.allNum',
									id : 'allNum'
								},{
									fieldLabel : '退回數量',
									maxLength:18,
									allowBlank : false,
									name : 'pssMatesReceiptDetail.rejectNum',
									id : 'rejectNum'
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssMatesReceiptDetail.createBy',
									id : 'createBy'
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssMatesReceiptDetail.updateBy',
									id : 'updateBy'
				         }]
					}]
				}]
			}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssMatesReceiptDetail.do?recId='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssMatesReceiptDetailForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssMatesReceiptDetailFormWin').close();
							Ext.getCmp('PssMatesReceiptDetailGrid').getStore().reload();
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
				Ext.getCmp('PssMatesReceiptDetailForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssMatesReceiptDetailFormWin').close();
			}
		}];
	}
});