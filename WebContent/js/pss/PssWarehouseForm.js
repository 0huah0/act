/*
 * Powered By [shi_zenghua@qq.com]
 */
 
Ext.ns('PssWarehouseForm');
PssWarehouseForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssWarehouseForm.superclass.constructor.call(this, {
					items : this.formPanel,
					modal : true,
					id : 'PssWarehouseFormWin',
					title : this.recId?'修改倉庫':'新增倉庫',
					iconCls : 'menu-planmanage',
					width : 820,
					autoHeight : true,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		var recId = this.recId;
		this.formPanel = new Ext.FormPanel({
			id : 'PssWarehouseForm',
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
									name : "pssWarehouse.warehouseId"
								},{
									fieldLabel : '描述',
									id:'desc',
									name : "pssWarehouse.desc"
								},{
									fieldLabel : '創建人員',
									id:'createBy',
									xtype:"hidden",name : "pssWarehouse.createBy"
								},{
									fieldLabel : '修改人員',
									id:'updateBy',
									xtype:"hidden",name : "pssWarehouse.updateBy"
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '名稱',
									id:'name',
									name : "pssWarehouse.name"
								},{
									fieldLabel : '創建日期',
									id:'createDate',
									xtype:"hidden",name : "pssWarehouse.createDate"
								},{
									fieldLabel : '修改日期',
									id:'updateDate',
									xtype:"hidden",name : "pssWarehouse.updateDate"
				        }]
					}]
				}]
		});

		if (recId) {
				Ext.Ajax.request({
					url : __ctxPath + '/pss/getPssWarehouse.do?id='+ recId,
						success : function(response , options ) {
							var jr = Ext.util.JSON.decode(response.responseText); 
							jr.data.createDate = new Date(jr.data.createDate).format('Y-m-d H:i');
							if(jr.data.updateDate)jr.data.updateDate = new Date(jr.data.updateDate).format('Y-m-d H:i');
							Ext.getCmp("PssWarehouseForm").getForm().loadRecord(jr);
					},
					failure : function(response , options ) {
						
					}
				});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssWarehouseForm");
				if (fp.getForm().isValid()) {
					var data = fp.getForm().getValues();
					if(recId){
						data['pssWarehouse.updateBy'] = curUserInfo.username;
						data['pssWarehouse.updateDate'] = new Date().format('Y-m-d H:i');
					}else{
						data['pssWarehouse.createBy'] = curUserInfo.username;
						data['pssWarehouse.createDate'] = new Date().format('Y-m-d H:i');
					}
					Ext.Ajax.request({
							url : __ctxPath + '/pss/savePssWarehouse.do',
					    success : function(response , options ) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssWarehouseFormWin').close();
							Ext.getCmp('PssWarehouseGrid').getStore().reload();
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
				Ext.getCmp('PssWarehouseForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssWarehouseFormWin').close();
			}
		}];
	}
});