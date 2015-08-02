/*
 * Powered By [shi_zenghua@qq.com]
 */
Ext.ns('PssPurchaseOrderDetailForm');
PssPurchaseOrderDetailForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssPurchaseOrderDetailForm.superclass.constructor.call(this, {
					items : this.formPanel,
					modal : true,
					id : 'PssPurchaseOrderDetailFormWin',
					title : this.recId?'修改採購單子項':'新增採購單子項',
					iconCls : 'menu-planmanage',
					width : 820,
					autoHeight : true,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			url : __ctxPath + '/pss/savePssPurchaseOrderDetail.do',
			id : 'PssPurchaseOrderDetailForm',
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
									fieldLabel : '採購單編號',
									name : 'pssPurchaseOrderDetail.poHeadId'
								},{
									fieldLabel : '原料編號',
									name : 'pssPurchaseOrderDetail.materialId'
								},{
									fieldLabel : '原料定價(單價)',
									name : 'pssPurchaseOrderDetail.materialPrice'
								},{
									fieldLabel : '小計',
									name : 'pssPurchaseOrderDetail.amount'
								},{
									fieldLabel : '創建人員',
									name : 'pssPurchaseOrderDetail.createBy'
								},{
									fieldLabel : '修改人員',
									name : 'pssPurchaseOrderDetail.updateBy'
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '採購單明細編號',
									name : 'pssPurchaseOrderDetail.poDetailId'
								},{
									fieldLabel : '原料數量',
									name : 'pssPurchaseOrderDetail.materialNum'
								},{
									fieldLabel : '原料建議售價(單價)',
									name : 'pssPurchaseOrderDetail.materialSalePrice'
								},{
									fieldLabel : '創建日期',
									name : 'pssPurchaseOrderDetail.createDate'
								},{
									fieldLabel : '修改日期',
									name : 'pssPurchaseOrderDetail.updateDate'
				        }]
					}]
				}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssPurchaseOrderDetail.do?id='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssPurchaseOrderDetailForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssPurchaseOrderDetailFormWin').close();
							Ext.getCmp('PssPurchaseOrderDetailGrid').getStore().reload();
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
				Ext.getCmp('PssPurchaseOrderDetailForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssPurchaseOrderDetailFormWin').close();
			}
		}];
	}
});