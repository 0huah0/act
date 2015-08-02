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
					width : 820,
					autoHeight : true,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			url : __ctxPath + '/pss/savePssSupplier.do',
			id : 'PssSupplierForm',
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
									fieldLabel : '供應商編號/供應商代號',
									name : 'pssSupplier.supplierId'
								},{
									fieldLabel : '公司名稱(英文)',
									name : 'pssSupplier.companyNameEn'
								},{
									fieldLabel : '負責人名稱',
									name : 'pssSupplier.personInCharge'
								},{
									fieldLabel : '電話',
									name : 'pssSupplier.tel'
								},{
									fieldLabel : '電子郵箱',
									name : 'pssSupplier.email'
								},{
									fieldLabel : '資本額（單位：TWD）',
									name : 'pssSupplier.capital',xtype:"combo",store:[[1,"小於100萬"],[2,"100萬~1000萬"],[3,"1000萬~5000萬"],[4,"大於5000萬"]]
								},{
									fieldLabel : '有效否',
									name : 'pssSupplier.active',xtype:"combo",store:[[0,"無效"],[1,"有效"]]
								},{
									fieldLabel : '創建人員',
									name : 'pssSupplier.createBy'
								},{
									fieldLabel : '修改人員',
									name : 'pssSupplier.updateBy'
					      }]
					},{
						items : [{
									xtype : 'hidden'
								},{
									fieldLabel : '公司名稱(中文)',
									name : 'pssSupplier.companyNameCn'
								},{
									fieldLabel : '法人代號',
									name : 'pssSupplier.legalPersonCode'
								},{
									fieldLabel : '地址',
									name : 'pssSupplier.addr'
								},{
									fieldLabel : '傳真',
									name : 'pssSupplier.fax'
								},{
									fieldLabel : '資質證明圖片/營業執照影本，保存系統框架中檔案上傳的記錄編號',
									name : 'pssSupplier.licenseImgId'
								},{
									fieldLabel : '員工數（單位：人）',
									name : 'pssSupplier.empAmount',xtype:"combo",store:[[1,"小於10"],[2,"11~50"],[3,"51~100"],[4,"101~500"],[5,"501~1000"],[6,"大於1000"]]
								},{
									fieldLabel : '創建日期',
									name : 'pssSupplier.createDate'
								},{
									fieldLabel : '修改日期',
									name : 'pssSupplier.updateDate'
				        }]
					}]
				}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssSupplier.do?id='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssSupplierForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
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
						}
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