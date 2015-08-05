/*
 * Powered By [shi_zenghua@qq.com]
 */
 
Ext.ns('PssProductForm');
PssProductForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssProductForm.superclass.constructor.call(this, {
					items : this.formPanel,
					modal : true,
					id : 'PssProductFormWin',
					title : this.recId?'修改產品':'新增產品',
					iconCls : 'menu-planmanage',
					width : 820,
					autoHeight : true,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		var recId = this.recId;
		this.formPanel = new Ext.FormPanel({
			id : 'PssProductForm',
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
									fieldLabel : '產品編號/產品代號',
									id:'productId',
									name : recId?"pssProduct.productId":''
								},{
									fieldLabel : '描述',
									id:'desc',
									name : "pssProduct.desc"
								},{
									fieldLabel : '產品定價(單價)',
									id:'price',
									name : "pssProduct.price"
								},{
									fieldLabel : '有效否',
									id:'active',
									hiddenName:"pssProduct.active",mode:"local",triggerAction:"all",xtype:"combo",store:[[0,"無效"],[1,"有效"]]
								},{
									fieldLabel : '創建人員',
									id:'createBy',
									xtype:"hidden",name : "pssProduct.createBy"
								},{
									fieldLabel : '修改人員',
									id:'updateBy',
									xtype:"hidden",name : "pssProduct.updateBy"
					      }]
					},{
						items : [{
									fieldLabel : '產品名稱',
									id:'name',
									name : "pssProduct.name"
								},{
									fieldLabel : '單位',
									id:'unit',
									hiddenName:"pssProduct.unit",mode:"local",triggerAction:"all",xtype:"combo",store:[[1,"個"],[2,"塊"],[3,"條"],[4,"片"],[5,"公斤"],[6,"公噸"],[7,"..."]]
								},{
									fieldLabel : '產品建議售價(單價)',
									id:'salePrice',
									name : "pssProduct.salePrice"
								},{
									fieldLabel : '創建日期',
									id:'createDate',
									xtype:"hidden",name : "pssProduct.createDate"
								},{
									fieldLabel : '修改日期',
									id:'updateDate',
									xtype:"hidden",name : "pssProduct.updateDate"
				        }]
					}]
				}]
		});

		if (recId) {
				Ext.Ajax.request({
					url : __ctxPath + '/pss/getPssProduct.do?id='+ recId,
						success : function(response , options ) {
							var jr = Ext.util.JSON.decode(response.responseText); 
							jr.data.createDate = new Date(jr.data.createDate).format('Y-m-d H:i');
							if(jr.data.updateDate)jr.data.updateDate = new Date(jr.data.updateDate).format('Y-m-d H:i');
							Ext.getCmp("PssProductForm").getForm().loadRecord(jr);
					},
					failure : function(response , options ) {
						
					}
				});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssProductForm");
				if (fp.getForm().isValid()) {
					var data = fp.getForm().getValues();
					if(recId){
						data['pssProduct.updateBy'] = curUserInfo.username;
						data['pssProduct.updateDate'] = new Date().format('Y-m-d H:i');
					}else{
						data['pssProduct.createBy'] = curUserInfo.username;
						data['pssProduct.createDate'] = new Date().format('Y-m-d H:i');
					}
					Ext.Ajax.request({
						url : __ctxPath + '/pss/savePssProduct.do',
					    success : function(response , options ) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssProductFormWin').close();
							Ext.getCmp('PssProductGrid').getStore().reload();
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
				Ext.getCmp('PssProductForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssProductFormWin').close();
			}
		}];
	}
});