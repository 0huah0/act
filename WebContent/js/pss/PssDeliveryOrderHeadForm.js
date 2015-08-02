/*
 * Powered By [shi_zenghua@qq.com]
 */
 
Ext.ns('PssDeliveryOrderHeadForm');
PssDeliveryOrderHeadForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssDeliveryOrderHeadForm.superclass.constructor.call(this, {
					items : this.formPanel,
					modal : true,
					id : 'PssDeliveryOrderHeadFormWin',
					title : this.recId?'修改出貨單':'新增出貨單',
					iconCls : 'menu-planmanage',
					width : 820,
					autoHeight : true,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		var recId = this.recId;
		this.formPanel = new Ext.FormPanel({
			id : 'PssDeliveryOrderHeadForm',
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
									fieldLabel : '出貨單編號（出貨單代碼2位(DO)+當前日期8位(yyyyMMdd)+流水號6位）',
									id:'doHeadId',
									name : "pssDeliveryOrderHead.doHeadId"
								},{
									fieldLabel : '出貨倉庫編號/倉庫代號',
									id:'warehouseId',
									name : "pssDeliveryOrderHead.warehouseId"
								},{
									fieldLabel : '送貨人名稱',
									id:'diliverName',
									name : "pssDeliveryOrderHead.diliverName"
								},{
									fieldLabel : '收貨人電話',
									id:'receiverTel',
									name : "pssDeliveryOrderHead.receiverTel"
								},{
									fieldLabel : '備註',
									id:'remark',
									name : "pssDeliveryOrderHead.remark"
								},{
									fieldLabel : '創建人員',
									id:'createBy',
									xtype:"hidden",name : "pssDeliveryOrderHead.createBy"
								},{
									fieldLabel : '修改人員',
									id:'updateBy',
									xtype:"hidden",name : "pssDeliveryOrderHead.updateBy"
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '銷貨單編號',
									id:'soHeadId',
									name : "pssDeliveryOrderHead.soHeadId"
								},{
									fieldLabel : '送貨人電話',
									id:'diliverTel',
									name : "pssDeliveryOrderHead.diliverTel"
								},{
									fieldLabel : '收貨人名稱',
									id:'receiverName',
									name : "pssDeliveryOrderHead.receiverName"
								},{
									fieldLabel : '出貨發票號碼 (應收帳款)',
									id:'doInvoice',
									name : "pssDeliveryOrderHead.doInvoice"
								},{
									fieldLabel : '創建日期',
									id:'createDate',
									xtype:"hidden",name : "pssDeliveryOrderHead.createDate"
								},{
									fieldLabel : '修改日期',
									id:'updateDate',
									xtype:"hidden",name : "pssDeliveryOrderHead.updateDate"
				        }]
					}]
				}]
		});

		if (recId) {
				Ext.Ajax.request({
					url : __ctxPath + '/pss/getPssDeliveryOrderHead.do?id='+ recId,
						success : function(response , options ) {
							var jr = Ext.util.JSON.decode(response.responseText); 
							jr.data.createDate = new Date(jr.data.createDate).format('Y-m-d H:i');
							if(jr.data.updateDate)jr.data.updateDate = new Date(jr.data.updateDate).format('Y-m-d H:i');
							Ext.getCmp("PssDeliveryOrderHeadForm").getForm().loadRecord(jr);
					},
					failure : function(response , options ) {
						
					}
				});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssDeliveryOrderHeadForm");
				if (fp.getForm().isValid()) {
					var data = fp.getForm().getValues();
					if(recId){
						data['pssDeliveryOrderHead.updateBy'] = curUserInfo.username;
						data['pssDeliveryOrderHead.updateDate'] = new Date().format('Y-m-d H:i');
					}else{
						data['pssDeliveryOrderHead.createBy'] = curUserInfo.username;
						data['pssDeliveryOrderHead.createDate'] = new Date().format('Y-m-d H:i');
					}
					Ext.Ajax.request({
							url : __ctxPath + '/pss/savePssDeliveryOrderHead.do',
					    success : function(response , options ) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssDeliveryOrderHeadFormWin').close();
							Ext.getCmp('PssDeliveryOrderHeadGrid').getStore().reload();
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
				Ext.getCmp('PssDeliveryOrderHeadForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssDeliveryOrderHeadFormWin').close();
			}
		}];
	}
});