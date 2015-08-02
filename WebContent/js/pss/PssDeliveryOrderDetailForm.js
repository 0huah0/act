/*
 * Powered By [shi_zenghua@qq.com]
 */
Ext.ns('PssDeliveryOrderDetailForm');
PssDeliveryOrderDetailForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssDeliveryOrderDetailForm.superclass.constructor.call(this, {
					items : this.formPanel,
					modal : true,
					id : 'PssDeliveryOrderDetailFormWin',
					title : this.recId?'修改出貨單子項':'新增出貨單子項',
					iconCls : 'menu-planmanage',
					width : 820,
					autoHeight : true,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			url : __ctxPath + '/pss/savePssDeliveryOrderDetail.do',
			id : 'PssDeliveryOrderDetailForm',
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
									fieldLabel : '出貨單編號',
									name : 'pssDeliveryOrderDetail.doHeadId'
								},{
									fieldLabel : '產品編號',
									name : 'pssDeliveryOrderDetail.pdtId'
								},{
									fieldLabel : '接收數量',
									name : 'pssDeliveryOrderDetail.receiptNum'
								},{
									fieldLabel : '創建日期',
									name : 'pssDeliveryOrderDetail.createDate'
								},{
									fieldLabel : '修改日期',
									name : 'pssDeliveryOrderDetail.updateDate'
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '出貨單明細編號',
									name : 'pssDeliveryOrderDetail.doDetailId'
								},{
									fieldLabel : '出貨數量',
									name : 'pssDeliveryOrderDetail.allNum'
								},{
									fieldLabel : '退回數量',
									name : 'pssDeliveryOrderDetail.rejectNum'
								},{
									fieldLabel : '創建人員',
									name : 'pssDeliveryOrderDetail.createBy'
								},{
									fieldLabel : '修改人員',
									name : 'pssDeliveryOrderDetail.updateBy'
				        }]
					}]
				}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssDeliveryOrderDetail.do?id='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssDeliveryOrderDetailForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssDeliveryOrderDetailFormWin').close();
							Ext.getCmp('PssDeliveryOrderDetailGrid').getStore().reload();
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
				Ext.getCmp('PssDeliveryOrderDetailForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssDeliveryOrderDetailFormWin').close();
			}
		}];
	}
});