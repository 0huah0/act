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
					width : 960,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		var recId = this.recId;
		var readOnly = this.read;
		
		this.formPanel = new Ext.FormPanel({
			id : 'PssInvoiceHeadForm',
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
									fieldLabel : '發票編號',
									id:'invoiceHeadId',
									name : recId?"pssInvoiceHead.invoiceHeadId":''
								},{
									fieldLabel : '發票金額',
									id:'invAmount',
									name : "pssInvoiceHead.invAmount"
								},{
									fieldLabel : '創建日期',
									id:'createDate',
									xtype:"hidden",name : "pssInvoiceHead.createDate"
								},{
									fieldLabel : '修改日期',
									id:'updateDate',
									xtype:"hidden",name : "pssInvoiceHead.updateDate"
					      }]
					},{
						items : [{
									fieldLabel : '類型',
									id:'type',
									hiddenName:"pssInvoiceHead.type",mode:"local",triggerAction:"all",xtype:"combo",store:[[1,"出貨發票"],[2,"收貨發票"]],
									listeners:{
										change:function(){
											Ext.getCmp('cusOrSupId').setValue('');
										}
									}
								},{
									xtype:'compositefield',
									fieldLabel:'客戶編號/供應商編號',
									items:[ {
											xtype:'textfield',
											name:'pssInvoiceHead.cusOrSupId',
											id:'cusOrSupId',
											readOnly:true,
											allowBlank:false,
											width:175
										},{
											xtype:'button',
											text:'...',disabled : readOnly,
											handler:function(){
												if(1==Ext.getCmp('type').getValue()){
													PssCustomerSelector.getView(true,null,function(rows){
														Ext.getCmp('cusOrSupId').setValue(rows[0].data.customerId);
													}).show();
												}else{
													PssSupplierSelector.getView(true,null,function(rows){
														Ext.getCmp('cusOrSupId').setValue(rows[0].data.supplierId);
													}).show();
												}
											}
										}
									]
								}]
					}]
				}]
		});

		if (recId) {
				Ext.Ajax.request({
					url : __ctxPath + '/pss/getPssInvoiceHead.do?id='+ recId,
						success : function(response , options ) {
							var jr = Ext.util.JSON.decode(response.responseText); 
							jr.data.createDate = new Date(jr.data.createDate).format('Y-m-d H:i');
							if(jr.data.updateDate)jr.data.updateDate = new Date(jr.data.updateDate).format('Y-m-d H:i');
							Ext.getCmp("PssInvoiceHeadForm").getForm().loadRecord(jr);
					},
					failure : function(response , options ) {
						
					}
				});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',disabled : readOnly,
			handler : function() {
				var fp = Ext.getCmp("PssInvoiceHeadForm");
				if (fp.getForm().isValid()) {
					var data = fp.getForm().getValues();
					if(recId){
						data['pssInvoiceHead.updateBy'] = curUserInfo.username;
						data['pssInvoiceHead.updateDate'] = new Date().format('Y-m-d H:i');
					}else{
						data['pssInvoiceHead.createBy'] = curUserInfo.username;
						data['pssInvoiceHead.createDate'] = new Date().format('Y-m-d H:i');
					}
					Ext.Ajax.request({
							url : __ctxPath + '/pss/savePssInvoiceHead.do',
					    success : function(response , options ) {
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
						},
					    params: data
					});
				}
			
			}
		}, {
			text : '清空',
			iconCls : 'btn-reset',disabled : readOnly,
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