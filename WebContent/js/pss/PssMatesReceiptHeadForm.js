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
		var recId = this.recId;
		this.formPanel = new Ext.FormPanel({
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
									value : recId||''
								},{
									fieldLabel : '收貨單編號（收貨單代碼2位(MR)+當前日期8位(yyyyMMdd)+流水號6位）。',
									id:'mrHeadId',
									name : "pssMatesReceiptHead.mrHeadId"
								},{
									fieldLabel : '收貨倉庫編號/倉庫代號',
									id:'warehouseId',
									name : "pssMatesReceiptHead.warehouseId"
								},{
									fieldLabel : '收貨人電話',
									id:'receiverTel',
									name : "pssMatesReceiptHead.receiverTel"
								},{
									fieldLabel : '送貨人名稱',
									id:'diliverName',
									name : "pssMatesReceiptHead.diliverName"
								},{
									fieldLabel : '備註',
									id:'remark',
									name : "pssMatesReceiptHead.remark"
								},{
									fieldLabel : '創建人員',
									id:'createBy',
									xtype:"hidden",name : "pssMatesReceiptHead.createBy"
								},{
									fieldLabel : '修改人員',
									id:'updateBy',
									xtype:"hidden",name : "pssMatesReceiptHead.updateBy"
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '採購單編號',
									id:'poHeadId',
									name : "pssMatesReceiptHead.poHeadId"
								},{
									fieldLabel : '收貨人名稱/倉管人員名稱',
									id:'receiverName',
									name : "pssMatesReceiptHead.receiverName"
								},{
									fieldLabel : '收貨發票號碼(應付帳款)',
									id:'mrInvoice',
									name : "pssMatesReceiptHead.mrInvoice"
								},{
									fieldLabel : '送貨人電話',
									id:'diliverTel',
									name : "pssMatesReceiptHead.diliverTel"
								},{
									fieldLabel : '創建日期',
									id:'createDate',
									xtype:"hidden",name : "pssMatesReceiptHead.createDate"
								},{
									fieldLabel : '修改日期',
									id:'updateDate',
									xtype:"hidden",name : "pssMatesReceiptHead.updateDate"
				        }]
					}]
				}]
		});

		if (recId) {
				Ext.Ajax.request({
					url : __ctxPath + '/pss/getPssMatesReceiptHead.do?id='+ recId,
						success : function(response , options ) {
							var jr = Ext.util.JSON.decode(response.responseText); 
							jr.data.createDate = new Date(jr.data.createDate).format('Y-m-d H:i');
							if(jr.data.updateDate)jr.data.updateDate = new Date(jr.data.updateDate).format('Y-m-d H:i');
							Ext.getCmp("PssMatesReceiptHeadForm").getForm().loadRecord(jr);
					},
					failure : function(response , options ) {
						
					}
				});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssMatesReceiptHeadForm");
				if (fp.getForm().isValid()) {
					var data = fp.getForm().getValues();
					if(recId){
						data['pssMatesReceiptHead.updateBy'] = curUserInfo.username;
						data['pssMatesReceiptHead.updateDate'] = new Date().format('Y-m-d H:i');
					}else{
						data['pssMatesReceiptHead.createBy'] = curUserInfo.username;
						data['pssMatesReceiptHead.createDate'] = new Date().format('Y-m-d H:i');
					}
					Ext.Ajax.request({
							url : __ctxPath + '/pss/savePssMatesReceiptHead.do',
					    success : function(response , options ) {
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
						},
					    params: data
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