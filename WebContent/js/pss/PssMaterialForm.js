/*
 * Powered By [shi_zenghua@qq.com]
 */
Ext.ns('PssMaterialForm');
PssMaterialForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssMaterialForm.superclass.constructor.call(this, {
					items : this.formPanel,
					modal : true,
					id : 'PssMaterialFormWin',
					title : this.recId?'修改原料':'新增原料',
					iconCls : 'menu-planmanage',
					width : 820,
					autoHeight : true,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			url : __ctxPath + '/pss/savePssMaterial.do',
			id : 'PssMaterialForm',
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
									fieldLabel : '原料編號/原料代號',
									name : 'pssMaterial.materialId'
								},{
									fieldLabel : '單位',
									name : 'pssMaterial.unit',xtype:"combo",store:[[1,"個"],[2,"塊"],[3,"條"],[4,"片"],[5,"公斤"],[6,"公噸"],[7,"..."]]
								},{
									fieldLabel : '有效否',
									name : 'pssMaterial.active',xtype:"combo",store:[[0,"無效"],[1,"有效"]]
								},{
									fieldLabel : '創建人員',
									name : 'pssMaterial.createBy'
								},{
									fieldLabel : '修改人員',
									name : 'pssMaterial.updateBy'
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '原料名稱',
									name : 'pssMaterial.name'
								},{
									fieldLabel : '描述',
									name : 'pssMaterial.desc'
								},{
									fieldLabel : '創建日期',
									name : 'pssMaterial.createDate'
								},{
									fieldLabel : '修改日期',
									name : 'pssMaterial.updateDate'
				        }]
					}]
				}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssMaterial.do?id='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssMaterialForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssMaterialFormWin').close();
							Ext.getCmp('PssMaterialGrid').getStore().reload();
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
				Ext.getCmp('PssMaterialForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssMaterialFormWin').close();
			}
		}];
	}
});