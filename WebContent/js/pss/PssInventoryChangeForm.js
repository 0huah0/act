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
					width : 960,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		var recId = this.recId;
		var readOnly = this.read;
		
		this.formPanel = new Ext.FormPanel({
			id : 'PssInventoryChangeForm',
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
									fieldLabel : '記錄編號',
									id:'changeId',
									name : "pssInventoryChange.changeId"
								},{
									fieldLabel : '原料編號/原料代號',
									id:'materialId',
									name : "pssInventoryChange.materialId"
								},{
									fieldLabel : '變更數量',
									id:'num',
									name : "pssInventoryChange.num"
								},{
									fieldLabel : '原因記錄編號（當REASON為1、2時，分別保存出貨單編號、收貨單編號；為4、5時不保存）。',
									id:'recordId',
									name : "pssInventoryChange.recordId"
								},{
									fieldLabel : '創建日期',
									id:'createDate',
									xtype:"hidden",name : "pssInventoryChange.createDate"
								},{
									fieldLabel : '修改日期',
									id:'updateDate',
									xtype:"hidden",name : "pssInventoryChange.updateDate"
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '倉庫編號/倉庫代號',
									id:'warehouseId',
									name : "pssInventoryChange.warehouseId"
								},{
									fieldLabel : '變更類型',
									id:'type',
									hiddenName:"pssInventoryChange.type",mode:"local",triggerAction:"all",xtype:"combo",store:[[1,"增加"],[2,"減少"]]
								},{
									fieldLabel : '變更原因',
									id:'reason',
									hiddenName:"pssInventoryChange.reason",mode:"local",triggerAction:"all",xtype:"combo",store:[[1,"出貨"],[2,"收貨"],[3,"生產取出"],[4,"生產存入"],[5,"..."]]
								},{
									fieldLabel : '備註',
									id:'remark',
									name : "pssInventoryChange.remark"
								},{
									fieldLabel : '創建人員',
									id:'createBy',
									xtype:"hidden",name : "pssInventoryChange.createBy"
								},{
									fieldLabel : '修改人員',
									id:'updateBy',
									xtype:"hidden",name : "pssInventoryChange.updateBy"
				        }]
					}]
				}]
		});

		if (recId) {
				Ext.Ajax.request({
					url : __ctxPath + '/pss/getPssInventoryChange.do?id='+ recId,
						success : function(response , options ) {
							var jr = Ext.util.JSON.decode(response.responseText); 
							jr.data.createDate = new Date(jr.data.createDate).format('Y-m-d H:i');
							if(jr.data.updateDate)jr.data.updateDate = new Date(jr.data.updateDate).format('Y-m-d H:i');
							Ext.getCmp("PssInventoryChangeForm").getForm().loadRecord(jr);
					},
					failure : function(response , options ) {
						
					}
				});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssInventoryChangeForm");
				if (fp.getForm().isValid()) {
					var data = fp.getForm().getValues();
					if(recId){
						data['pssInventoryChange.updateBy'] = curUserInfo.username;
						data['pssInventoryChange.updateDate'] = new Date().format('Y-m-d H:i');
					}else{
						data['pssInventoryChange.createBy'] = curUserInfo.username;
						data['pssInventoryChange.createDate'] = new Date().format('Y-m-d H:i');
					}
					Ext.Ajax.request({
							url : __ctxPath + '/pss/savePssInventoryChange.do',
					    success : function(response , options ) {
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
						},
					    params: data
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