/*
 * Powered By [shi_zenghua@qq.com]
 */
Ext.ns('PssMatesReceiptHeadForm');
PssMatesReceiptHeadForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssMatesReceiptHeadForm.superclass.constructor.call(this, {
					items : this.formPanel,
					modal : true,
					id : 'PssMatesReceiptHeadFormWin',
					title : this.recId?'修改收貨單':'新增收貨單',
					iconCls : 'menu-planmanage',
					width : 820,
					autoHeight : true,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			url : __ctxPath + '/pss/savePssMatesReceiptHead.do',
			id : 'PssMatesReceiptHeadForm',
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
									fieldLabel : '收貨單編號（收貨單代碼2位(MR)+當前日期8位(yyyyMMdd)+流水號6位）。',
									name : 'pssMatesReceiptHead.mrHeadId'
								},{
									fieldLabel : '收貨倉庫編號/倉庫代號',
									name : 'pssMatesReceiptHead.warehouseId'
								},{
									fieldLabel : '收貨人電話',
									name : 'pssMatesReceiptHead.receiverTel'
								},{
									fieldLabel : '送貨人名稱',
									name : 'pssMatesReceiptHead.diliverName'
								},{
									fieldLabel : '備註',
									name : 'pssMatesReceiptHead.remark'
								},{
									fieldLabel : '創建人員',
									name : 'pssMatesReceiptHead.createBy'
								},{
									fieldLabel : '修改人員',
									name : 'pssMatesReceiptHead.updateBy'
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '採購單編號',
									name : 'pssMatesReceiptHead.poHeadId'
								},{
									fieldLabel : '收貨人名稱/倉管人員名稱',
									name : 'pssMatesReceiptHead.receiverName'
								},{
									fieldLabel : '收貨發票號碼(應付帳款)',
									name : 'pssMatesReceiptHead.mrInvoice'
								},{
									fieldLabel : '送貨人電話',
									name : 'pssMatesReceiptHead.diliverTel'
								},{
									fieldLabel : '創建日期',
									name : 'pssMatesReceiptHead.createDate'
								},{
									fieldLabel : '修改日期',
									name : 'pssMatesReceiptHead.updateDate'
				        }]
					}]
				}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssMatesReceiptHead.do?id='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssMatesReceiptHeadForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssMatesReceiptHeadFormWin').close();
							Ext.getCmp('PssMatesReceiptHeadGrid').getStore().reload();
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
				Ext.getCmp('PssMatesReceiptHeadForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssMatesReceiptHeadFormWin').close();
			}
		}];
	}
});