Ext.ns('AccountingTitleView');
AccountingTitleForm = Ext.extend(Ext.Window, {
	formPanel : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		AccountingTitleForm.superclass.constructor.call(this, {
					layout : 'fit',
					items : this.formPanel,
					modal : true,
					id : 'AccountingTitleFormWin',
					title : this.recId?'修改會計科目':'新增會計科目',
					iconCls : 'menu-planmanage',
					width : 600,
					height : 240,
					resizable : false,
					buttonAlign : 'center',
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		var recId = this.recId;
		var parSelector = this.recId ? {
			fieldLabel : '父類科目',
			disabled : true,
			id : 'parName'
		} : new TreeSelector('actTreeSelector1', __ctxPath
						+ '/act/treeAccountingTitle.do', '父類科目',
				'actTitle_pid', false , function(node) {
					/*if(node.getDepth()>3){
						Ext.getCmp('actTreeSelector1').setValue('');
						Ext.Msg.alert('警示', '不能在選擇的科目下添加。');
					}*/
					if (recId && node.id == recId) {
						Ext.Msg.alert('警示', '您應該選擇別的科目，而不是它自己。');
					}
				});

		this.formPanel = new Ext.FormPanel({
			url : __ctxPath + '/act/saveAccountingTitle.do',
			id : 'AccountingTitleForm',
			frame : true,
			items : [{
						xtype : 'fieldset',
						title : '會計科目資訊',
						items : [{
									layout : 'column',
									columnWidth : 0.5,
									defaults : {
										layout : 'form',
										padding : '0 0 0 20px',
										labelAlign : 'right',
										labelWidth : 80,
										defaults : {
											xtype : 'textfield',
											width : 140
										}
									},
									items : [{
												items : [{
															name : 'actTitle.id',
															id : 'id',
															xtype : 'hidden',
															value : recId
																	? ''
																	: recId
														}, {
															fieldLabel : '科目代號',
															maxLength:18,
															allowBlank : false,
															name : 'actTitle.code',
															id : 'code'
														}, {
															fieldLabel : '科目名稱',
															maxLength:38,
															allowBlank : false,
															name : 'actTitle.name',
															id : 'name'
														}]
											}, {
												items : [{
															xtype:'hidden',
															id:'actTitle_pid',
															disabled:recId,
															name:'actTitle.parent.id'															
														},parSelector,{
															fieldLabel : '英文名稱',
															maxLength:98,
															name : 'actTitle.nameEn',
															id : 'nameEn'
														}]
											}]
								}, {
									layout : 'form',
									padding : '0 0 0 20px',
									labelAlign : 'right',
									labelWidth : 80,
									items : [{
												fieldLabel : '備　　註',
												width : 380,
												maxLength:498,
												xtype : 'textarea',
												name : 'actTitle.remark',
												id : 'remark'
											}]
								}]
					}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/act/getAccountingTitle.do?recId='
						+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("AccountingTitleForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('AccountingTitleFormWin').close();
							Ext.getCmp('AccountingTitleGrid').getStore()
									.reload();
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
				Ext.getCmp('AccountingTitleForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('AccountingTitleFormWin').close();
			}
		}];
	}
});