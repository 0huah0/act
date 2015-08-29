/*
 * Powered By [shi_zenghua@qq.com]
 */
 
Ext.ns('PssCustomerForm');
PssCustomerForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssCustomerForm.superclass.constructor.call(this, {
					items : this.formPanel,
					modal : true,
					id : 'PssCustomerFormWin',
					title : this.recId?'修改客戶':'新增客戶',
					iconCls : 'menu-planmanage',
					width : 960,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		var recId = this.recId;
		var readOnly = this.read;
		
		this.formPanel = new Ext.FormPanel({
			id : 'PssCustomerForm',
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
						items : [ {
									fieldLabel : '客戶編號/客戶代號',
									id:'customerId',
									name : "pssCustomer.customerId"
								},{
									fieldLabel : '公司名稱(英文)',
									id:'companyNameEn',
									name : "pssCustomer.companyNameEn"
								},{
									fieldLabel : '負責人名稱',
									id:'personInCharge',
									name : "pssCustomer.personInCharge"
								},{
									fieldLabel : '電話',
									id:'tel',
									name : "pssCustomer.tel"
								},{
									fieldLabel : '電子郵箱',
									id:'email',
									name : "pssCustomer.email"
								},{
									fieldLabel : '資本額（單位：TWD）',
									id:'capital',
									hiddenName:"pssCustomer.capital",mode:"local",triggerAction:"all",xtype:"combo",store:[[1,"小於100萬"],[2,"100萬~1000萬"],[3,"1000萬~5000萬"],[4,"大於5000萬"]]
								},{
									fieldLabel : '有效否',
									id:'active',
									hiddenName:"pssCustomer.active",mode:"local",triggerAction:"all",xtype:"combo",store:[[0,"無效"],[1,"有效"]]
								},{
									fieldLabel : '創建人員',
									id:'createBy',
									xtype:"hidden",name : "pssCustomer.createBy"
								},{
									fieldLabel : '修改人員',
									id:'updateBy',
									xtype:"hidden",name : "pssCustomer.updateBy"
								}]
					},{
						items : [ {
									fieldLabel : '公司名稱(中文)',
									id:'companyNameCn',
									name : "pssCustomer.companyNameCn"
								},{
									fieldLabel : '法人代號',
									id:'legalPersonCode',
									name : "pssCustomer.legalPersonCode"
								},{
									fieldLabel : '地址',
									id:'addr',
									name : "pssCustomer.addr"
								},{
									fieldLabel : '傳真',
									id:'fax',
									name : "pssCustomer.fax"
								},{
									fieldLabel : '員工數（單位：人）',
									id:'empAmount',
									hiddenName:"pssCustomer.empAmount",mode:"local",triggerAction:"all",xtype:"combo",store:[[1,"小於10"],[2,"11~50"],[3,"51~100"],[4,"101~500"],[5,"501~1000"],[6,"大於1000"]]
								},{
									fieldLabel : '創建日期',
									id:'createDate',
									xtype:"hidden",name : "pssCustomer.createDate"
								},{
									fieldLabel : '修改日期',
									id:'updateDate',
									xtype:"hidden",name : "pssCustomer.updateDate"
								}]
					}]
				},{
					id:'licenseImgId',
					xtype:'hidden',
					name : "pssCustomer.licenseImgId",
				},{
					fieldLabel : '資質證明圖片/營業執照影本',
					id:'licenseImgIdDisplay',
					xtype : "panel",
					rowspan : 2,
					height : 310,
					tbar : new Ext.Toolbar( {
						height : 30,
						items : [ {
							text : '上传',
							iconCls : 'btn-upload',
							handler : function() {
								App.createUploadDialog( {
									file_cat : 'pss/customer',
									upload_autostart:true,
									callback : function(data){
										if(data){
											Ext.getCmp('licenseImgIdDisplay').body.update('<a path="' + __ctxPath + '/attachFiles/'+ data[0].filepath 
													+ '" title="'+data[0].filename+'" onClick="App.showImg(this);">'
													+data[0].filename+'</a>');
											
											var fileCmp = Ext.getCmp('licenseImgId');
											fileCmp.setValue(fileCmp.getValue()?fileCmp.getValue()+','+data[0].fileId:data[0].fileId);
										}
									},
									permitted_extensions : [ 'jpg','png','gif' ]
								}).show();
							}
						}, {
							text : '删除',
							iconCls : 'btn-delete',
							handler : function() {
								
							}
						} ]
					})
				
				}]
		});

		if (recId) {
				Ext.Ajax.request({
					url : __ctxPath + '/pss/getPssCustomer.do?id='+ recId,
						success : function(response , options ) {
							var jr = Ext.util.JSON.decode(response.responseText); 
							jr.data.createDate = new Date(jr.data.createDate).format('Y-m-d H:i');
							if(jr.data.updateDate)jr.data.updateDate = new Date(jr.data.updateDate).format('Y-m-d H:i');
							Ext.getCmp("PssCustomerForm").getForm().loadRecord(jr);
							
							//TODO 加載圖片
							
					},
					failure : function(response , options ) {
						
					}
				});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',disabled : readOnly,
			handler : function() {
				var fp = Ext.getCmp("PssCustomerForm");
				if (fp.getForm().isValid()) {
					var data = fp.getForm().getValues();
					if(recId){
						data['pssCustomer.updateBy'] = curUserInfo.username;
						data['pssCustomer.updateDate'] = new Date().format('Y-m-d H:i');
					}else{
						data['pssCustomer.createBy'] = curUserInfo.username;
						data['pssCustomer.createDate'] = new Date().format('Y-m-d H:i');
					}
					Ext.Ajax.request({
							url : __ctxPath + '/pss/savePssCustomer.do',
					    success : function(response , options ) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssCustomerFormWin').close();
							Ext.getCmp('PssCustomerGrid').getStore().reload();
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
				Ext.getCmp('PssCustomerForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssCustomerFormWin').close();
			}
		}];
	}
});
