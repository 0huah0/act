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
		this.formPanel = new Ext.FormPanel({
			url : __ctxPath + '/pss/savePssInventory.do',
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
									value : this.recId||''
								},{
									fieldLabel : '倉庫編號/倉庫代號',
									name : 'pssInventory.warehouseId'
								},{
									fieldLabel : '報警水位數量 (According to 良品)',
									name : 'pssInventory.alertNum'
								},{
									fieldLabel : '庫存良品數量',
									name : 'pssInventory.goodPdtNum'
								},{
									fieldLabel : '創建日期',
									name : 'pssInventory.createDate'
								},{
									fieldLabel : '修改日期',
									name : 'pssInventory.updateDate'
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '原料編號/原料代號',
									name : 'pssInventory.materialId'
								},{
									fieldLabel : '庫存總數量',
									name : 'pssInventory.allNum'
								},{
									fieldLabel : '庫存不良品數量',
									name : 'pssInventory.rejectsNum'
								},{
									fieldLabel : '創建人員',
									name : 'pssInventory.createBy'
								},{
									fieldLabel : '修改人員',
									name : 'pssInventory.updateBy'
				        }]
					}]
				}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssInventory.do?id='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssInventoryForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
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
						}
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