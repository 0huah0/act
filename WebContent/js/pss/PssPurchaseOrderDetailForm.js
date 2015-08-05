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
					width : 960,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		var recId = this.recId;
		var readOnly = this.read;
		
		this.formPanel = new Ext.FormPanel({
			id : 'PssPurchaseOrderDetailForm',
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
									fieldLabel : '採購單編號',
									id:'poHeadId',
									name : "pssPurchaseOrderDetail.poHeadId"
								},{
									fieldLabel : '原料編號',
									id:'materialId',
									name : "pssPurchaseOrderDetail.materialId"
								},{
									fieldLabel : '原料定價(單價)',
									id:'materialPrice',
									name : "pssPurchaseOrderDetail.materialPrice"
								},{
									fieldLabel : '小計',
									id:'amount',
									name : "pssPurchaseOrderDetail.amount"
								},{
									fieldLabel : '創建人員',
									id:'createBy',
									xtype:"hidden",name : "pssPurchaseOrderDetail.createBy"
								},{
									fieldLabel : '修改人員',
									id:'updateBy',
									xtype:"hidden",name : "pssPurchaseOrderDetail.updateBy"
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '採購單明細編號',
									id:'poDetailId',
									name : "pssPurchaseOrderDetail.poDetailId"
								},{
									fieldLabel : '原料數量',
									id:'materialNum',
									name : "pssPurchaseOrderDetail.materialNum"
								},{
									fieldLabel : '原料建議售價(單價)',
									id:'materialSalePrice',
									name : "pssPurchaseOrderDetail.materialSalePrice"
								},{
									fieldLabel : '創建日期',
									id:'createDate',
									xtype:"hidden",name : "pssPurchaseOrderDetail.createDate"
								},{
									fieldLabel : '修改日期',
									id:'updateDate',
									xtype:"hidden",name : "pssPurchaseOrderDetail.updateDate"
				        }]
					}]
				}]
		});

		if (recId) {
				Ext.Ajax.request({
					url : __ctxPath + '/pss/getPssPurchaseOrderDetail.do?id='+ recId,
						success : function(response , options ) {
							var jr = Ext.util.JSON.decode(response.responseText); 
							jr.data.createDate = new Date(jr.data.createDate).format('Y-m-d H:i');
							if(jr.data.updateDate)jr.data.updateDate = new Date(jr.data.updateDate).format('Y-m-d H:i');
							Ext.getCmp("PssPurchaseOrderDetailForm").getForm().loadRecord(jr);
					},
					failure : function(response , options ) {
						
					}
				});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssPurchaseOrderDetailForm");
				if (fp.getForm().isValid()) {
					var data = fp.getForm().getValues();
					if(recId){
						data['pssPurchaseOrderDetail.updateBy'] = curUserInfo.username;
						data['pssPurchaseOrderDetail.updateDate'] = new Date().format('Y-m-d H:i');
					}else{
						data['pssPurchaseOrderDetail.createBy'] = curUserInfo.username;
						data['pssPurchaseOrderDetail.createDate'] = new Date().format('Y-m-d H:i');
					}
					Ext.Ajax.request({
							url : __ctxPath + '/pss/savePssPurchaseOrderDetail.do',
					    success : function(response , options ) {
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
						},
					    params: data
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