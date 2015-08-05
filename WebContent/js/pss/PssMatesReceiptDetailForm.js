/*
 * Powered By [shi_zenghua@qq.com]
 */
 
Ext.ns('PssMatesReceiptDetailForm');
PssMatesReceiptDetailForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssMatesReceiptDetailForm.superclass.constructor.call(this, {
					items : this.formPanel,
					modal : true,
					id : 'PssMatesReceiptDetailFormWin',
					title : this.recId?'修改收貨單子項':'新增收貨單子項',
					iconCls : 'menu-planmanage',
					width : 960,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		var recId = this.recId;
		var readOnly = this.read;
		
		this.formPanel = new Ext.FormPanel({
			id : 'PssMatesReceiptDetailForm',
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
									fieldLabel : '收貨單編號',
									id:'mrHeadId',
									name : "pssMatesReceiptDetail.mrHeadId"
								},{
									fieldLabel : '原料編號',
									id:'materialId',
									name : "pssMatesReceiptDetail.materialId"
								},{
									fieldLabel : '接收數量',
									id:'receiptNum',
									name : "pssMatesReceiptDetail.receiptNum"
								},{
									fieldLabel : '創建日期',
									id:'createDate',
									xtype:"hidden",name : "pssMatesReceiptDetail.createDate"
								},{
									fieldLabel : '修改日期',
									id:'updateDate',
									xtype:"hidden",name : "pssMatesReceiptDetail.updateDate"
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '收貨單明細編號',
									id:'mrDetailId',
									name : "pssMatesReceiptDetail.mrDetailId"
								},{
									fieldLabel : '來貨數量',
									id:'allNum',
									name : "pssMatesReceiptDetail.allNum"
								},{
									fieldLabel : '退回數量',
									id:'rejectNum',
									name : "pssMatesReceiptDetail.rejectNum"
								},{
									fieldLabel : '創建人員',
									id:'createBy',
									xtype:"hidden",name : "pssMatesReceiptDetail.createBy"
								},{
									fieldLabel : '修改人員',
									id:'updateBy',
									xtype:"hidden",name : "pssMatesReceiptDetail.updateBy"
				        }]
					}]
				}]
		});

		if (recId) {
				Ext.Ajax.request({
					url : __ctxPath + '/pss/getPssMatesReceiptDetail.do?id='+ recId,
						success : function(response , options ) {
							var jr = Ext.util.JSON.decode(response.responseText); 
							jr.data.createDate = new Date(jr.data.createDate).format('Y-m-d H:i');
							if(jr.data.updateDate)jr.data.updateDate = new Date(jr.data.updateDate).format('Y-m-d H:i');
							Ext.getCmp("PssMatesReceiptDetailForm").getForm().loadRecord(jr);
					},
					failure : function(response , options ) {
						
					}
				});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssMatesReceiptDetailForm");
				if (fp.getForm().isValid()) {
					var data = fp.getForm().getValues();
					if(recId){
						data['pssMatesReceiptDetail.updateBy'] = curUserInfo.username;
						data['pssMatesReceiptDetail.updateDate'] = new Date().format('Y-m-d H:i');
					}else{
						data['pssMatesReceiptDetail.createBy'] = curUserInfo.username;
						data['pssMatesReceiptDetail.createDate'] = new Date().format('Y-m-d H:i');
					}
					Ext.Ajax.request({
							url : __ctxPath + '/pss/savePssMatesReceiptDetail.do',
					    success : function(response , options ) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssMatesReceiptDetailFormWin').close();
							Ext.getCmp('PssMatesReceiptDetailGrid').getStore().reload();
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
				Ext.getCmp('PssMatesReceiptDetailForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssMatesReceiptDetailFormWin').close();
			}
		}];
	}
});