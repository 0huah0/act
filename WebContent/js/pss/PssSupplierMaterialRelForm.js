/*
 * Powered By [shi_zenghua@qq.com]
 */
 
Ext.ns('PssSupplierMaterialRelForm');
PssSupplierMaterialRelForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssSupplierMaterialRelForm.superclass.constructor.call(this, {
					items : this.formPanel,
					modal : true,
					id : 'PssSupplierMaterialRelFormWin',
					title : this.recId?'修改供應商原料關係表':'新增供應商原料關係表',
					iconCls : 'menu-planmanage',
					width : 960,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		var recId = this.recId;
		var readOnly = this.read;
		
		this.formPanel = new Ext.FormPanel({
			id : 'PssSupplierMaterialRelForm',
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
									fieldLabel : '供應商編號/供應商代號',
									id:'supplierId',
									name : "pssSupplierMaterialRel.supplierId"
								},{
									fieldLabel : '產品定價(單價)',
									id:'price',
									name : "pssSupplierMaterialRel.price"
								},{
									fieldLabel : '創建日期',
									id:'createDate',
									xtype:"hidden",name : "pssSupplierMaterialRel.createDate"
								},{
									fieldLabel : '修改日期',
									id:'updateDate',
									xtype:"hidden",name : "pssSupplierMaterialRel.updateDate"
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '原料編號/原料代號',
									id:'materialId',
									name : "pssSupplierMaterialRel.materialId"
								},{
									fieldLabel : '產品建議售價(單價)',
									id:'salePrice',
									name : "pssSupplierMaterialRel.salePrice"
								},{
									fieldLabel : '創建人員',
									id:'createBy',
									xtype:"hidden",name : "pssSupplierMaterialRel.createBy"
								},{
									fieldLabel : '修改人員',
									id:'updateBy',
									xtype:"hidden",name : "pssSupplierMaterialRel.updateBy"
				        }]
					}]
				}]
		});

		if (recId) {
				Ext.Ajax.request({
					url : __ctxPath + '/pss/getPssSupplierMaterialRel.do?id='+ recId,
						success : function(response , options ) {
							var jr = Ext.util.JSON.decode(response.responseText); 
							jr.data.createDate = new Date(jr.data.createDate).format('Y-m-d H:i');
							if(jr.data.updateDate)jr.data.updateDate = new Date(jr.data.updateDate).format('Y-m-d H:i');
							Ext.getCmp("PssSupplierMaterialRelForm").getForm().loadRecord(jr);
					},
					failure : function(response , options ) {
						
					}
				});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',disabled : readOnly,
			handler : function() {
				var fp = Ext.getCmp("PssSupplierMaterialRelForm");
				if (fp.getForm().isValid()) {
					var data = fp.getForm().getValues();
					if(recId){
						data['pssSupplierMaterialRel.updateBy'] = curUserInfo.username;
						data['pssSupplierMaterialRel.updateDate'] = new Date().format('Y-m-d H:i');
					}else{
						data['pssSupplierMaterialRel.createBy'] = curUserInfo.username;
						data['pssSupplierMaterialRel.createDate'] = new Date().format('Y-m-d H:i');
					}
					Ext.Ajax.request({
							url : __ctxPath + '/pss/savePssSupplierMaterialRel.do',
					    success : function(response , options ) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssSupplierMaterialRelFormWin').close();
							Ext.getCmp('PssSupplierMaterialRelGrid').getStore().reload();
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
				Ext.getCmp('PssSupplierMaterialRelForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssSupplierMaterialRelFormWin').close();
			}
		}];
	}
});