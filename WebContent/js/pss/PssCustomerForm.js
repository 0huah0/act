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
					width : 820,
					autoHeight : true,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			url : __ctxPath + '/pss/savePssCustomer.do',
			id : 'PssCustomerForm',
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
									fieldLabel : '客戶編號/客戶代號',
									name : 'pssCustomer.customerId'
								},{
									fieldLabel : '公司名稱(英文)',
									name : 'pssCustomer.companyNameEn'
								},{
									fieldLabel : '負責人名稱',
									name : 'pssCustomer.personInCharge'
								},{
									fieldLabel : '電話',
									name : 'pssCustomer.tel'
								},{
									fieldLabel : '電子郵箱',
									name : 'pssCustomer.email'
								},{
									fieldLabel : '資本額（單位：TWD）',
									name : 'pssCustomer.capital',xtype:"combo",store:[[1,"小於100萬"],[2,"100萬~1000萬"],[3,"1000萬~5000萬"],[4,"大於5000萬"]]
								},{
									fieldLabel : '有效否',
									name : 'pssCustomer.active',xtype:"combo",store:[[0,"無效"],[1,"有效"]]
								},{
									fieldLabel : '創建人員',
									name : 'pssCustomer.createBy'
								},{
									fieldLabel : '修改人員',
									name : 'pssCustomer.updateBy'
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '公司名稱(中文)',
									name : 'pssCustomer.companyNameCn'
								},{
									fieldLabel : '法人代號',
									name : 'pssCustomer.legalPersonCode'
								},{
									fieldLabel : '地址',
									name : 'pssCustomer.addr'
								},{
									fieldLabel : '傳真',
									name : 'pssCustomer.fax'
								},{
									fieldLabel : '資質證明圖片/營業執照影本（保存系統框架中檔案上傳的記錄編號）',
									name : 'pssCustomer.licenseImgId'
								},{
									fieldLabel : '員工數（單位：人）',
									name : 'pssCustomer.empAmount',xtype:"combo",store:[[1,"小於10"],[2,"11~50"],[3,"51~100"],[4,"101~500"],[5,"501~1000"],[6,"大於1000"]]
								},{
									fieldLabel : '創建日期',
									name : 'pssCustomer.createDate'
								},{
									fieldLabel : '修改日期',
									name : 'pssCustomer.updateDate'
				        }]
					}]
				}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssCustomer.do?id='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssCustomerForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
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
						}
					});
				}
			}
		}, {
			text : '清空',
			iconCls : 'btn-reset',
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