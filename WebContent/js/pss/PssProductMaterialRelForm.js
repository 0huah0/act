/*
 * Powered By [shi_zenghua@qq.com]
 */
Ext.ns('PssProductMaterialRelForm');
PssProductMaterialRelForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssProductMaterialRelForm.superclass.constructor.call(this, {
					items : this.formPanel,
					modal : true,
					id : 'PssProductMaterialRelFormWin',
					title : this.recId?'修改產品原料關係表':'新增產品原料關係表',
					iconCls : 'menu-planmanage',
					width : 820,
					autoHeight : true,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			url : __ctxPath + '/pss/savePssProductMaterialRel.do',
			id : 'PssProductMaterialRelForm',
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
									fieldLabel : '產品編號',
									name : 'pssProductMaterialRel.pdtId'
								},{
									fieldLabel : '原料類型（一個產品只會對應一個成品原料）',
									name : 'pssProductMaterialRel.type',xtype:"combo",store:[[1,"原物料"],[2,"半成品"],[3,"成品"]]
								},{
									fieldLabel : '創建人員',
									name : 'pssProductMaterialRel.createBy'
								},{
									fieldLabel : '修改人員',
									name : 'pssProductMaterialRel.updateBy'
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '原料編號/原料代號',
									name : 'pssProductMaterialRel.materialId'
								},{
									fieldLabel : '創建日期',
									name : 'pssProductMaterialRel.createDate'
								},{
									fieldLabel : '修改日期',
									name : 'pssProductMaterialRel.updateDate'
				        }]
					}]
				}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssProductMaterialRel.do?id='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssProductMaterialRelForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssProductMaterialRelFormWin').close();
							Ext.getCmp('PssProductMaterialRelGrid').getStore().reload();
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
				Ext.getCmp('PssProductMaterialRelForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssProductMaterialRelFormWin').close();
			}
		}];
	}
});