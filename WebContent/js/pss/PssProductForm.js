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
									xtype : 'hidden',
									name : recId?"pssProduct.productId":'--',
									value : recId,
									id:'productId'
								},{
									fieldLabel : '產品名稱',
									name : "pssProduct.name",
									id:'name'
								},{
									fieldLabel : '產品定價(單價)',
									name : "pssProduct.price",
									id:'price'										
								},{
									fieldLabel : '描述',
									name : "pssProduct.desc",
									id:'desc'
								},{
									fieldLabel : '創建人員',
									name : "pssProduct.createBy",
									id:'createBy'
								},{
									fieldLabel : '修改人員',
									xtype:'hidden',
									name : "pssProduct.updateBy",
									id:'updateBy'
								}]
					},{
						items : [{
									fieldLabel : '單位',
									hiddenName:"pssProduct.unit",mode:"local",triggerAction:"all",xtype:"combo",store:[[1,"個"],[2,"塊"],[3,"條"],[4,"片"],[5,"公斤"],[6,"公噸"],[7,"..."]],
									id:'unit'
								},{
									fieldLabel : '產品建議售價(單價)',
									name : "pssProduct.salePrice",
									id:'salePrice'
								},{
									fieldLabel : '有效否',
									hiddenName:"pssProduct.active",mode:"local",triggerAction:"all",xtype:"combo",store:[[0,"無效"],[1,"有效"]]
								},{
									fieldLabel : '創建日期',
									xtype:'hidden',
									name : "pssProduct.createDate"
								},{
									fieldLabel : '修改日期',
									xtype:'hidden',
									name : "pssProduct.updateDate"
								}]
					}]
				}]
		});

		if (recId) {
			Ext.Ajax.request({
				url : __ctxPath + '/pss/getPssProduct.do?id='+ recId,
			    success : function(response , options ) {
			    	var jsonResult = Ext.util.JSON.decode(response.responseText); 
			    	Ext.getCmp("PssProductForm").getForm().loadRecord(jsonResult);
				},
				failure : function(response , options ) {
					
				}
			});
			/*this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssProduct.do?id='+ recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});*/
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
						data['pssProduct.updateDate'] = new Date().format('Y-m-d');
					}else{
						data['pssProduct.createBy'] = curUserInfo.username;
						data['pssProduct.createDate'] = new Date().format('Y-m-d');
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