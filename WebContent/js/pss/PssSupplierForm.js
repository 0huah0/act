/*
 * Powered By [shi_zenghua@qq.com]
 */
 
Ext.ns('PssSupplierForm');
PssSupplierForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssSupplierForm.superclass.constructor.call(this, {
					items : this.formPanel,
					modal : true,
					id : 'PssSupplierFormWin',
					title : this.recId?'修改供應商':'新增供應商',
					iconCls : 'menu-planmanage',
					width : 960,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		var recId = this.recId;
		var readOnly = this.read;
		
		this.formPanel = new Ext.FormPanel({
			id : 'PssSupplierForm',
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
									fieldLabel : '供應商編號/供應商代號',
									id:'supplierId',
									name : "pssSupplier.supplierId"
								},{
									fieldLabel : '公司名稱(英文)',
									id:'companyNameEn',
									name : "pssSupplier.companyNameEn"
								},{
									fieldLabel : '負責人名稱',
									id:'personInCharge',
									name : "pssSupplier.personInCharge"
								},{
									fieldLabel : '電話',
									id:'tel',
									name : "pssSupplier.tel"
								},{
									fieldLabel : '電子郵箱',
									id:'email',
									name : "pssSupplier.email"
								},{
									fieldLabel : '資本額（單位：TWD）',
									id:'capital',
									hiddenName:"pssSupplier.capital",mode:"local",triggerAction:"all",xtype:"combo",store:[[1,"小於100萬"],[2,"100萬~1000萬"],[3,"1000萬~5000萬"],[4,"大於5000萬"]]
								},{
									fieldLabel : '有效否',
									id:'active',
									hiddenName:"pssSupplier.active",mode:"local",triggerAction:"all",xtype:"combo",store:[[0,"無效"],[1,"有效"]]
								},{
									fieldLabel : '創建人員',
									id:'createBy',
									xtype:"hidden",name : "pssSupplier.createBy"
								},{
									fieldLabel : '修改人員',
									id:'updateBy',
									xtype:"hidden",name : "pssSupplier.updateBy"
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '公司名稱(中文)',
									id:'companyNameCn',
									name : "pssSupplier.companyNameCn"
								},{
									fieldLabel : '法人代號',
									id:'legalPersonCode',
									name : "pssSupplier.legalPersonCode"
								},{
									fieldLabel : '地址',
									id:'addr',
									name : "pssSupplier.addr"
								},{
									fieldLabel : '傳真',
									id:'fax',
									name : "pssSupplier.fax"
								},{
									fieldLabel : '資質證明圖片/營業執照影本，保存系統框架中檔案上傳的記錄編號',
									id:'licenseImgId',
									name : "pssSupplier.licenseImgId"
								},{
									fieldLabel : '員工數（單位：人）',
									id:'empAmount',
									hiddenName:"pssSupplier.empAmount",mode:"local",triggerAction:"all",xtype:"combo",store:[[1,"小於10"],[2,"11~50"],[3,"51~100"],[4,"101~500"],[5,"501~1000"],[6,"大於1000"]]
								},{
									fieldLabel : '創建日期',
									id:'createDate',
									xtype:"hidden",name : "pssSupplier.createDate"
								},{
									fieldLabel : '修改日期',
									id:'updateDate',
									xtype:"hidden",name : "pssSupplier.updateDate"
				        }]
					}]
				}]
		});

		if (recId) {
				Ext.Ajax.request({
					url : __ctxPath + '/pss/getPssSupplier.do?id='+ recId,
						success : function(response , options ) {
							var jr = Ext.util.JSON.decode(response.responseText); 
							jr.data.createDate = new Date(jr.data.createDate).format('Y-m-d H:i');
							if(jr.data.updateDate)jr.data.updateDate = new Date(jr.data.updateDate).format('Y-m-d H:i');
							Ext.getCmp("PssSupplierForm").getForm().loadRecord(jr);
					},
					failure : function(response , options ) {
						
					}
				});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssSupplierForm");
				if (fp.getForm().isValid()) {
					var data = fp.getForm().getValues();
					if(recId){
						data['pssSupplier.updateBy'] = curUserInfo.username;
						data['pssSupplier.updateDate'] = new Date().format('Y-m-d H:i');
					}else{
						data['pssSupplier.createBy'] = curUserInfo.username;
						data['pssSupplier.createDate'] = new Date().format('Y-m-d H:i');
					}
					Ext.Ajax.request({
							url : __ctxPath + '/pss/savePssSupplier.do',
					    success : function(response , options ) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssSupplierFormWin').close();
							Ext.getCmp('PssSupplierGrid').getStore().reload();
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
				Ext.getCmp('PssSupplierForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssSupplierFormWin').close();
			}
		}];
	}
});