/*
 * Powered By [shi_zenghua@qq.com]
 */
 
Ext.ns('PssSalesOrderDetailForm');
PssSalesOrderDetailForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssSalesOrderDetailForm.superclass.constructor.call(this, {
					items : this.formPanel,
					modal : true,
					id : 'PssSalesOrderDetailFormWin',
					title : this.recId?'修改銷貨單子項':'新增銷貨單子項',
					iconCls : 'menu-planmanage',
					width : 820,
					autoHeight : true,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		var recId = this.recId;
		this.formPanel = new Ext.FormPanel({
			id : 'PssSalesOrderDetailForm',
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
									fieldLabel : '銷貨單編號',
									id:'soHeadId',
									name : "pssSalesOrderDetail.soHeadId"
								},{
									fieldLabel : '產品編號',
									id:'pdtId',
									name : "pssSalesOrderDetail.pdtId"
								},{
									fieldLabel : '產品定價',
									id:'pdtPrice',
									name : "pssSalesOrderDetail.pdtPrice"
								},{
									fieldLabel : '產品實際售價',
									id:'pdtRealPrice',
									name : "pssSalesOrderDetail.pdtRealPrice"
								},{
									fieldLabel : '創建日期',
									id:'createDate',
									xtype:"hidden",name : "pssSalesOrderDetail.createDate"
								},{
									fieldLabel : '修改日期',
									id:'updateDate',
									xtype:"hidden",name : "pssSalesOrderDetail.updateDate"
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '銷貨單明細編號',
									id:'soDetailId',
									name : "pssSalesOrderDetail.soDetailId"
								},{
									fieldLabel : '產品數量',
									id:'pdtNum',
									name : "pssSalesOrderDetail.pdtNum"
								},{
									fieldLabel : '產品建議售價',
									id:'pdtSalePrice',
									name : "pssSalesOrderDetail.pdtSalePrice"
								},{
									fieldLabel : '小計',
									id:'amount',
									name : "pssSalesOrderDetail.amount"
								},{
									fieldLabel : '創建人員',
									id:'createBy',
									xtype:"hidden",name : "pssSalesOrderDetail.createBy"
								},{
									fieldLabel : '修改人員',
									id:'updateBy',
									xtype:"hidden",name : "pssSalesOrderDetail.updateBy"
				        }]
					}]
				}]
		});

		if (recId) {
				Ext.Ajax.request({
					url : __ctxPath + '/pss/getPssSalesOrderDetail.do?id='+ recId,
						success : function(response , options ) {
							var jr = Ext.util.JSON.decode(response.responseText); 
							jr.data.createDate = new Date(jr.data.createDate).format('Y-m-d H:i');
							if(jr.data.updateDate)jr.data.updateDate = new Date(jr.data.updateDate).format('Y-m-d H:i');
							Ext.getCmp("PssSalesOrderDetailForm").getForm().loadRecord(jr);
					},
					failure : function(response , options ) {
						
					}
				});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssSalesOrderDetailForm");
				if (fp.getForm().isValid()) {
					var data = fp.getForm().getValues();
					if(recId){
						data['pssSalesOrderDetail.updateBy'] = curUserInfo.username;
						data['pssSalesOrderDetail.updateDate'] = new Date().format('Y-m-d H:i');
					}else{
						data['pssSalesOrderDetail.createBy'] = curUserInfo.username;
						data['pssSalesOrderDetail.createDate'] = new Date().format('Y-m-d H:i');
					}
					Ext.Ajax.request({
							url : __ctxPath + '/pss/savePssSalesOrderDetail.do',
					    success : function(response , options ) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssSalesOrderDetailFormWin').close();
							Ext.getCmp('PssSalesOrderDetailGrid').getStore().reload();
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
				Ext.getCmp('PssSalesOrderDetailForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssSalesOrderDetailFormWin').close();
			}
		}];
	}
});