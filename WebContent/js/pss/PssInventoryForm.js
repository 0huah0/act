/*
 * Powered By [shi_zenghua@qq.com]
 */
 
Ext.ns('PssInventoryForm');
PssInventoryForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssInventoryForm.superclass.constructor.call(this, {
					items : this.formPanel,
					modal : true,
					id : 'PssInventoryFormWin',
					title : this.recId?'修改庫存':'新增庫存',
					iconCls : 'menu-planmanage',
					width : 820,
					autoHeight : true,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		var recId = this.recId;
		this.formPanel = new Ext.FormPanel({
			id : 'PssInventoryForm',
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
									fieldLabel : '倉庫編號/倉庫代號',
									id:'warehouseId',
									name : "pssInventory.warehouseId"
								},{
									fieldLabel : '報警水位數量 (According to 良品)',
									id:'alertNum',
									name : "pssInventory.alertNum"
								},{
									fieldLabel : '庫存良品數量',
									id:'goodPdtNum',
									name : "pssInventory.goodPdtNum"
								},{
									fieldLabel : '創建日期',
									id:'createDate',
									xtype:"hidden",name : "pssInventory.createDate"
								},{
									fieldLabel : '修改日期',
									id:'updateDate',
									xtype:"hidden",name : "pssInventory.updateDate"
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '原料編號/原料代號',
									id:'materialId',
									name : "pssInventory.materialId"
								},{
									fieldLabel : '庫存總數量',
									id:'allNum',
									name : "pssInventory.allNum"
								},{
									fieldLabel : '庫存不良品數量',
									id:'rejectsNum',
									name : "pssInventory.rejectsNum"
								},{
									fieldLabel : '創建人員',
									id:'createBy',
									xtype:"hidden",name : "pssInventory.createBy"
								},{
									fieldLabel : '修改人員',
									id:'updateBy',
									xtype:"hidden",name : "pssInventory.updateBy"
				        }]
					}]
				}]
		});

		if (recId) {
				Ext.Ajax.request({
					url : __ctxPath + '/pss/getPssInventory.do?id='+ recId,
						success : function(response , options ) {
							var jr = Ext.util.JSON.decode(response.responseText); 
							jr.data.createDate = new Date(jr.data.createDate).format('Y-m-d H:i');
							if(jr.data.updateDate)jr.data.updateDate = new Date(jr.data.updateDate).format('Y-m-d H:i');
							Ext.getCmp("PssInventoryForm").getForm().loadRecord(jr);
					},
					failure : function(response , options ) {
						
					}
				});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssInventoryForm");
				if (fp.getForm().isValid()) {
					var data = fp.getForm().getValues();
					if(recId){
						data['pssInventory.updateBy'] = curUserInfo.username;
						data['pssInventory.updateDate'] = new Date().format('Y-m-d H:i');
					}else{
						data['pssInventory.createBy'] = curUserInfo.username;
						data['pssInventory.createDate'] = new Date().format('Y-m-d H:i');
					}
					Ext.Ajax.request({
							url : __ctxPath + '/pss/savePssInventory.do',
					    success : function(response , options ) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssInventoryFormWin').close();
							Ext.getCmp('PssInventoryGrid').getStore().reload();
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
				Ext.getCmp('PssInventoryForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssInventoryFormWin').close();
			}
		}];
	}
});