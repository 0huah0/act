/*
 * Powered By [shi_zenghua@qq.com]
 */
Ext.ns('PssInvoiceHeadForm');
PssInvoiceHeadForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssInvoiceHeadForm.superclass.constructor.call(this, {
					items : this.formPanel,
					modal : true,
					id : 'PssInvoiceHeadFormWin',
					title : this.recId?'修改發票':'新增發票',
					iconCls : 'menu-planmanage',
					width : 820,
					autoHeight : true,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			url : __ctxPath + '/pss/savePssInvoiceHead.do',
			id : 'PssInvoiceHeadForm',
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
									fieldLabel : '發票編號',
									name : 'pssInvoiceHead.invoiceHeadId'
								},{
									fieldLabel : '發票金額',
									name : 'pssInvoiceHead.invAmount'
								},{
									fieldLabel : '創建日期',
									name : 'pssInvoiceHead.createDate'
								},{
									fieldLabel : '修改日期',
									name : 'pssInvoiceHead.updateDate'
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '客戶編號/供應商編號（TYPE=1時，該欄位存客戶編號，TYPE=2時，該欄位存供應商編號）',
									name : 'pssInvoiceHead.cusOrSupId'
								},{
									fieldLabel : '類型',
									name : 'pssInvoiceHead.type',xtype:"combo",store:[[1,"出貨發票"],[2,"收貨發票"]]
								},{
									fieldLabel : '創建人員',
									name : 'pssInvoiceHead.createBy'
								},{
									fieldLabel : '修改人員',
									name : 'pssInvoiceHead.updateBy'
				        }]
					}]
				}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssInvoiceHead.do?id='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssInvoiceHeadForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssInvoiceHeadFormWin').close();
							Ext.getCmp('PssInvoiceHeadGrid').getStore().reload();
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
				Ext.getCmp('PssInvoiceHeadForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssInvoiceHeadFormWin').close();
			}
		}];
	}
});