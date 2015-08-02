/*
 * Powered By [shi_zenghua@qq.com]
 */
Ext.ns('PssSalesOrderDetailForm');
PssSalesOrderDetailForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssSalesOrderDetailForm.superclass.constructor.call(this, {
					items : this.formPanel,
					modal : true,
					id : 'PssSalesOrderDetailFormWin',
					title : this.recId?'修改銷貨單子項':'新增銷貨單子項',
					iconCls : 'menu-planmanage',
					width : 820,
					autoHeight : true,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			url : __ctxPath + '/pss/savePssSalesOrderDetail.do',
			id : 'PssSalesOrderDetailForm',
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
									fieldLabel : '銷貨單編號',
									name : 'pssSalesOrderDetail.soHeadId'
								},{
									fieldLabel : '產品編號',
									name : 'pssSalesOrderDetail.pdtId'
								},{
									fieldLabel : '產品定價',
									name : 'pssSalesOrderDetail.pdtPrice'
								},{
									fieldLabel : '產品實際售價',
									name : 'pssSalesOrderDetail.pdtRealPrice'
								},{
									fieldLabel : '創建日期',
									name : 'pssSalesOrderDetail.createDate'
								},{
									fieldLabel : '修改日期',
									name : 'pssSalesOrderDetail.updateDate'
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '銷貨單明細編號',
									name : 'pssSalesOrderDetail.soDetailId'
								},{
									fieldLabel : '產品數量',
									name : 'pssSalesOrderDetail.pdtNum'
								},{
									fieldLabel : '產品建議售價',
									name : 'pssSalesOrderDetail.pdtSalePrice'
								},{
									fieldLabel : '小計',
									name : 'pssSalesOrderDetail.amount'
								},{
									fieldLabel : '創建人員',
									name : 'pssSalesOrderDetail.createBy'
								},{
									fieldLabel : '修改人員',
									name : 'pssSalesOrderDetail.updateBy'
				        }]
					}]
				}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssSalesOrderDetail.do?id='+ this.recId,
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