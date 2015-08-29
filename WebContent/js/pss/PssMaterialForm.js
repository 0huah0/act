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
					width : 960,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		var recId = this.recId;
		var readOnly = this.read;
		
		this.formPanel = new Ext.FormPanel({
			id : 'PssMaterialForm',
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
									fieldLabel : '原料名稱',
									id:'name',
									name : "pssMaterial.name"
								},{
									fieldLabel : '描述',
									id:'desc',
									name : "pssMaterial.desc"
								},{
									fieldLabel : '創建人員',
									id:'createBy',
									xtype:"hidden",name : "pssMaterial.createBy"
								}]
					},{
						items : [{
									fieldLabel : '原料編號/原料代號',
									id:'materialId',
									xtype:'hidden',
									name : recId?"pssMaterial.materialId":''
								},{
									fieldLabel : '單位',
									id:'unit',
									hiddenName:"pssMaterial.unit",mode:"local",triggerAction:"all",xtype:"combo",store:[[1,"個"],[2,"塊"],[3,"條"],[4,"片"],[5,"公斤"],[6,"公噸"],[7,"..."]]
								},{
									fieldLabel : '有效否',
									id:'active',
									hiddenName:"pssMaterial.active",mode:"local",triggerAction:"all",xtype:"combo",store:[[0,"無效"],[1,"有效"]]
								},{
									fieldLabel : '創建日期',
									id:'createDate',
									xtype:"hidden",name : "pssMaterial.createDate"
								}]
					}]
				}]
		});

		if (recId) {
				Ext.Ajax.request({
					url : __ctxPath + '/pss/getPssMaterial.do?id='+ recId,
						success : function(response , options ) {
							var jr = Ext.util.JSON.decode(response.responseText); 
							jr.data.createDate = new Date(jr.data.createDate).format('Y-m-d H:i');
							if(jr.data.updateDate)jr.data.updateDate = new Date(jr.data.updateDate).format('Y-m-d H:i');
							Ext.getCmp("PssMaterialForm").getForm().loadRecord(jr);
					},
					failure : function(response , options ) {
						
					}
				});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',disabled : readOnly,
			handler : function() {
				var fp = Ext.getCmp("PssMaterialForm");
				if (fp.getForm().isValid()) {
					var data = fp.getForm().getValues();
					if(recId){
						data['pssMaterial.updateBy'] = curUserInfo.username;
						data['pssMaterial.updateDate'] = new Date().format('Y-m-d H:i');
					}else{
						data['pssMaterial.createBy'] = curUserInfo.username;
						data['pssMaterial.createDate'] = new Date().format('Y-m-d H:i');
					}
					Ext.Ajax.request({
							url : __ctxPath + '/pss/savePssMaterial.do',
					    success : function(response , options ) {
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
						},
					    params: data
					});
				}
			
			}
		}, {
			text : '清空',
			iconCls : 'btn-reset',disabled : readOnly,
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