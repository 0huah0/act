/*
 * Powered By [shi_zenghua@qq.com]
 */
Ext.ns('PssInventoryChangeForm');
PssInventoryChangeForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssInventoryChangeForm.superclass.constructor.call(this, {
					items : this.formPanel,
					modal : true,
					id : 'PssInventoryChangeFormWin',
					title : this.recId?'修改庫存變動記錄':'新增庫存變動記錄',
					iconCls : 'menu-planmanage',
					width : 820,
					autoHeight : true,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			url : __ctxPath + '/pss/savePssInventoryChange.do',
			id : 'PssInventoryChangeForm',
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
									fieldLabel : '記錄編號',
									name : 'pssInventoryChange.changeId'
								},{
									fieldLabel : '原料編號/原料代號',
									name : 'pssInventoryChange.materialId'
								},{
									fieldLabel : '變更數量',
									name : 'pssInventoryChange.num'
								},{
									fieldLabel : '原因記錄編號（當REASON為1、2時，分別保存出貨單編號、收貨單編號；為4、5時不保存）。',
									name : 'pssInventoryChange.recordId'
								},{
									fieldLabel : '創建日期',
									name : 'pssInventoryChange.createDate'
								},{
									fieldLabel : '修改日期',
									name : 'pssInventoryChange.updateDate'
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '倉庫編號/倉庫代號',
									name : 'pssInventoryChange.warehouseId'
								},{
									fieldLabel : '變更類型',
									name : 'pssInventoryChange.type',xtype:"combo",store:[[1,"增加"],[2,"減少"]]
								},{
									fieldLabel : '變更原因',
									name : 'pssInventoryChange.reason',xtype:"combo",store:[[1,"出貨"],[2,"收貨"],[3,"生產取出"],[4,"生產存入"],[5,"..."]]
								},{
									fieldLabel : '備註',
									name : 'pssInventoryChange.remark'
								},{
									fieldLabel : '創建人員',
									name : 'pssInventoryChange.createBy'
								},{
									fieldLabel : '修改人員',
									name : 'pssInventoryChange.updateBy'
				        }]
					}]
				}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssInventoryChange.do?id='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssInventoryChangeForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssInventoryChangeFormWin').close();
							Ext.getCmp('PssInventoryChangeGrid').getStore().reload();
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
				Ext.getCmp('PssInventoryChangeForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssInventoryChangeFormWin').close();
			}
		}];
	}
});