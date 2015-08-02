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
		this.formPanel = new Ext.FormPanel({
			url : __ctxPath + '/pss/savePssWarehouse.do',
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
									value : this.recId||''
								},{
									fieldLabel : '倉庫編號/倉庫代號',
									name : 'pssWarehouse.warehouseId'
								},{
									fieldLabel : '描述',
									name : 'pssWarehouse.desc'
								},{
									fieldLabel : '創建人員',
									name : 'pssWarehouse.createBy'
								},{
									fieldLabel : '修改人員',
									name : 'pssWarehouse.updateBy'
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '名稱',
									name : 'pssWarehouse.name'
								},{
									fieldLabel : '創建日期',
									name : 'pssWarehouse.createDate'
								},{
									fieldLabel : '修改日期',
									name : 'pssWarehouse.updateDate'
				        }]
					}]
				}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssWarehouse.do?id='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssWarehouseForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
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
						}
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