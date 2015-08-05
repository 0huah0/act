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
					width : 960,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		var recId = this.recId;
		var readOnly = this.read;
		
		this.formPanel = new Ext.FormPanel({
			id : 'PssDeliveryOrderDetailForm',
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
							disabled : readOnly,
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
									fieldLabel : '出貨單編號',
									id:'doHeadId',
									name : "pssDeliveryOrderDetail.doHeadId"
								},{
									fieldLabel : '產品編號',
									id:'pdtId',
									name : "pssDeliveryOrderDetail.pdtId"
								},{
									fieldLabel : '接收數量',
									id:'receiptNum',
									name : "pssDeliveryOrderDetail.receiptNum"
								},{
									fieldLabel : '創建日期',
									id:'createDate',
									xtype:"hidden",name : "pssDeliveryOrderDetail.createDate"
								},{
									fieldLabel : '修改日期',
									id:'updateDate',
									xtype:"hidden",name : "pssDeliveryOrderDetail.updateDate"
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '出貨單明細編號',
									id:'doDetailId',
									name : "pssDeliveryOrderDetail.doDetailId"
								},{
									fieldLabel : '出貨數量',
									id:'allNum',
									name : "pssDeliveryOrderDetail.allNum"
								},{
									fieldLabel : '退回數量',
									id:'rejectNum',
									name : "pssDeliveryOrderDetail.rejectNum"
								},{
									fieldLabel : '創建人員',
									id:'createBy',
									xtype:"hidden",name : "pssDeliveryOrderDetail.createBy"
								},{
									fieldLabel : '修改人員',
									id:'updateBy',
									xtype:"hidden",name : "pssDeliveryOrderDetail.updateBy"
				        }]
					}]
				}]
		});

		if (recId) {
				Ext.Ajax.request({
					url : __ctxPath + '/pss/getPssDeliveryOrderDetail.do?id='+ recId,
						success : function(response , options ) {
							var jr = Ext.util.JSON.decode(response.responseText); 
							jr.data.createDate = new Date(jr.data.createDate).format('Y-m-d H:i');
							if(jr.data.updateDate)jr.data.updateDate = new Date(jr.data.updateDate).format('Y-m-d H:i');
							Ext.getCmp("PssDeliveryOrderDetailForm").getForm().loadRecord(jr);
					},
					failure : function(response , options ) {
						
					}
				});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssDeliveryOrderDetailForm");
				if (fp.getForm().isValid()) {
					var data = fp.getForm().getValues();
					if(recId){
						data['pssDeliveryOrderDetail.updateBy'] = curUserInfo.username;
						data['pssDeliveryOrderDetail.updateDate'] = new Date().format('Y-m-d H:i');
					}else{
						data['pssDeliveryOrderDetail.createBy'] = curUserInfo.username;
						data['pssDeliveryOrderDetail.createDate'] = new Date().format('Y-m-d H:i');
					}
					Ext.Ajax.request({
							url : __ctxPath + '/pss/savePssDeliveryOrderDetail.do',
					    success : function(response , options ) {
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
						},
					    params: data
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