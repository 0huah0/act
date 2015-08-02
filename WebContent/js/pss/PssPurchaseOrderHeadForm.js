/*
 * Powered By [shi_zenghua@qq.com]
 */
Ext.ns('PssPurchaseOrderHeadForm');
PssPurchaseOrderHeadForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssPurchaseOrderHeadForm.superclass.constructor.call(this, {
					items : this.formPanel,
					modal : true,
					id : 'PssPurchaseOrderHeadFormWin',
					title : this.recId?'修改採購單':'新增採購單',
					iconCls : 'menu-planmanage',
					width : 820,
					autoHeight : true,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			url : __ctxPath + '/pss/savePssPurchaseOrderHead.do',
			id : 'PssPurchaseOrderHeadForm',
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
									fieldLabel : '採購單編號（採購單代碼2位(PO)+當前日期8位(yyyyMMdd)+流水號6位）',
									name : 'pssPurchaseOrderHead.poHeadId'
								},{
									fieldLabel : '定價總金額',
									name : 'pssPurchaseOrderHead.priceAmount'
								},{
									fieldLabel : '成交價總金額',
									name : 'pssPurchaseOrderHead.payAmount'
								},{
									fieldLabel : '創建日期',
									name : 'pssPurchaseOrderHead.createDate'
								},{
									fieldLabel : '修改日期',
									name : 'pssPurchaseOrderHead.updateDate'
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '供應商編號/供應商代號',
									name : 'pssPurchaseOrderHead.supplierId'
								},{
									fieldLabel : '建議售價總金額',
									name : 'pssPurchaseOrderHead.salePriceAmount'
								},{
									fieldLabel : '備註',
									name : 'pssPurchaseOrderHead.remark'
								},{
									fieldLabel : '創建人員',
									name : 'pssPurchaseOrderHead.createBy'
								},{
									fieldLabel : '修改人員',
									name : 'pssPurchaseOrderHead.updateBy'
				        }]
					}]
				}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssPurchaseOrderHead.do?id='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssPurchaseOrderHeadForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssPurchaseOrderHeadFormWin').close();
							Ext.getCmp('PssPurchaseOrderHeadGrid').getStore().reload();
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
				Ext.getCmp('PssPurchaseOrderHeadForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssPurchaseOrderHeadFormWin').close();
			}
		}];
	}
});