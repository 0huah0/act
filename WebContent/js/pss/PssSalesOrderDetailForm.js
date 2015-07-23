/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssSalesOrderDetailForm');
PssSalesOrderDetailForm = Ext.extend(Ext.Window, {
	formPanel : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssSalesOrderDetailForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					id : 'PssSalesOrderDetailFormWin',
					title : this.recId?'修改銷貨單子項':'新增銷貨單子項',
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
			url : __ctxPath + '/pss/savePssSalesOrderDetail.do',
			id : 'PssSalesOrderDetailForm',
			frame : true,
			items : [{
				xtype : 'fieldset',
				title : '銷貨單子項',
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
									name : 'pssSalesOrderDetail.id',
									id : 'id',
									xtype : 'hidden',
									value : recId||''
								},{
									fieldLabel : '銷貨單編號',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderDetail.soHeadId',
									id : 'soHeadId'
								},{
									fieldLabel : '產品編號',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderDetail.pdtId',
									id : 'pdtId'
								},{
									fieldLabel : '產品定價',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderDetail.pdtPrice',
									id : 'pdtPrice'
								},{
									fieldLabel : '產品實際售價',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderDetail.pdtRealPrice',
									id : 'pdtRealPrice'
								},{
									fieldLabel : '創建日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderDetail.createDate',
									id : 'createDate'
								},{
									fieldLabel : '修改日期',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderDetail.updateDate',
									id : 'updateDate'
					     }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '銷貨單明細編號',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderDetail.soDetailId',
									id : 'soDetailId'
								},{
									fieldLabel : '產品數量',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderDetail.pdtNum',
									id : 'pdtNum'
								},{
									fieldLabel : '產品建議售價',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderDetail.pdtSalePrice',
									id : 'pdtSalePrice'
								},{
									fieldLabel : '小計',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderDetail.amount',
									id : 'amount'
								},{
									fieldLabel : '創建人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderDetail.createBy',
									id : 'createBy'
								},{
									fieldLabel : '修改人員',
									maxLength:18,
									allowBlank : false,
									name : 'pssSalesOrderDetail.updateBy',
									id : 'updateBy'
				         }]
					}]
				}]
			}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssSalesOrderDetail.do?recId='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssSalesOrderDetailForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssSalesOrderDetailFormWin').close();
							Ext.getCmp('PssSalesOrderDetailGrid').getStore().reload();
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
				Ext.getCmp('PssSalesOrderDetailForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssSalesOrderDetailFormWin').close();
			}
		}];
	}
});