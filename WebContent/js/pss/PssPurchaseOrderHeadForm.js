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
		var recId = this.recId;
		this.formPanel = new Ext.FormPanel({
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
									value : recId||''
								},{
									fieldLabel : '採購單編號（採購單代碼2位(PO)+當前日期8位(yyyyMMdd)+流水號6位）',
									id:'poHeadId',
									name : "pssPurchaseOrderHead.poHeadId"
								},{
									fieldLabel : '定價總金額',
									id:'priceAmount',
									name : "pssPurchaseOrderHead.priceAmount"
								},{
									fieldLabel : '成交價總金額',
									id:'payAmount',
									name : "pssPurchaseOrderHead.payAmount"
								},{
									fieldLabel : '創建日期',
									id:'createDate',
									xtype:"hidden",name : "pssPurchaseOrderHead.createDate"
								},{
									fieldLabel : '修改日期',
									id:'updateDate',
									xtype:"hidden",name : "pssPurchaseOrderHead.updateDate"
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '供應商編號/供應商代號',
									id:'supplierId',
									name : "pssPurchaseOrderHead.supplierId"
								},{
									fieldLabel : '建議售價總金額',
									id:'salePriceAmount',
									name : "pssPurchaseOrderHead.salePriceAmount"
								},{
									fieldLabel : '備註',
									id:'remark',
									name : "pssPurchaseOrderHead.remark"
								},{
									fieldLabel : '創建人員',
									id:'createBy',
									xtype:"hidden",name : "pssPurchaseOrderHead.createBy"
								},{
									fieldLabel : '修改人員',
									id:'updateBy',
									xtype:"hidden",name : "pssPurchaseOrderHead.updateBy"
				        }]
					}]
				}]
		});

		if (recId) {
				Ext.Ajax.request({
					url : __ctxPath + '/pss/getPssPurchaseOrderHead.do?id='+ recId,
						success : function(response , options ) {
							var jr = Ext.util.JSON.decode(response.responseText); 
							jr.data.createDate = new Date(jr.data.createDate).format('Y-m-d H:i');
							if(jr.data.updateDate)jr.data.updateDate = new Date(jr.data.updateDate).format('Y-m-d H:i');
							Ext.getCmp("PssPurchaseOrderHeadForm").getForm().loadRecord(jr);
					},
					failure : function(response , options ) {
						
					}
				});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssPurchaseOrderHeadForm");
				if (fp.getForm().isValid()) {
					var data = fp.getForm().getValues();
					if(recId){
						data['pssPurchaseOrderHead.updateBy'] = curUserInfo.username;
						data['pssPurchaseOrderHead.updateDate'] = new Date().format('Y-m-d H:i');
					}else{
						data['pssPurchaseOrderHead.createBy'] = curUserInfo.username;
						data['pssPurchaseOrderHead.createDate'] = new Date().format('Y-m-d H:i');
					}
					Ext.Ajax.request({
							url : __ctxPath + '/pss/savePssPurchaseOrderHead.do',
					    success : function(response , options ) {
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
						},
					    params: data
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