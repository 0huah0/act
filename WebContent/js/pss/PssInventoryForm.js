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
					width : 960,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		var recId = this.recId;
		var readOnly = this.read;
		
		this.formPanel = new Ext.FormPanel({
			id : 'PssInventoryForm',
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
								xtype:'compositefield',
								fieldLabel:'倉庫編號/倉庫代號',
								items:[ {
										xtype:'textfield',
										name:'pssInventory.warehouseId',
										id:'warehouseId',
										readOnly:true,
										allowBlank:false,
										width:170
									},{
										xtype:'button',
										text:'...',
										handler:function(){
											PssWarehouseSelector.getView(true,null,function(rows){
												Ext.getCmp('warehouseId').setValue(rows[0].data.warehouseId);
											}).show();
										}
									} ]
								} ,{
									fieldLabel : '報警水位數量',// (According to 良品)
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
								}]
					},{
						items : [ {
								xtype:'compositefield',
								fieldLabel:'原料編號/原料代號',
								items:[ {
										xtype:'textfield',
										name:'pssInventory.materialId',
										id:'materialId',
										readOnly:true,
										allowBlank:false,
										width:170
									},{
										xtype:'button',
										text:'...',
										handler:function(){
											PssMaterialSelector.getView(true,null,function(rows){
												Ext.getCmp('materialId').setValue(rows[0].data.materialId);
											}).show();
										}
									} ]
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
								} ]
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