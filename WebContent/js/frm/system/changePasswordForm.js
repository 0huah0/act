/**
 * 重置密码
 */
var changePasswordForm = function(userId){
	var formPanel = new Ext.FormPanel({
				url : __ctxPath+ '/system/createPasswordAppUser.do',
				layout : 'form',
				id:'setPasswordForm',
				bodyStyle:'padding:5px',                                     
				border:false,
				defaults : {
					widht : 400,
					anchor : '100%,100%'
				},
	        	defaultType : 'textfield',
				items : [{
							name : 'appUserUserId',
							id : 'appUserUserId',
							xtype:'hidden',
							value : userId
						}, 
						{
							fieldLabel : '重設密碼',
							name:'newpassword',
							id:'newpassword',
							inputType : 'password',
							maxLength:18,
							maxLengthText:'密碼不能超過0—18位',
							allowBlank : false,
							blankText : '密碼不能為空!'
						},
						{
							fieldLabel : '確認密碼',
							name:'password',
							id:'password',
							inputType : 'password',
							maxLength:18,
							maxLengthText:'密碼不能超過0—18位',
							allowBlank : false,
							blankText : '密碼不能為空!'
						}
						]
			});
			
	var setPassword = new Ext.Window({
		title:'重置密碼',
		iconCls:'btn-password',
		width : 350,
		height : 175,
		modal: true,
		layout : 'fit',
		buttonAlign : 'center',
		items:[formPanel],
		buttons : [{
					text : '保存',
					iconCls:'btn-save',
					handler : function() {
						var fp=Ext.getCmp('setPasswordForm');
								if (fp.getForm().isValid()) {
								fp.getForm().submit({
											method: 'post',
											waitMsg : '正在提交...',
											success : function(fp,action) {
												Ext.ux.Toast.msg('信息', '重置成功！');
												setPassword.close();
											},
											failure : function(fp,action) {
												Ext.ux.Toast.msg('錯誤',action.result.msg);
												Ext.getCmp('setPasswordForm').getForm().reset();
											}
								});
							}
					}
				}, {
					text : '取消',
					iconCls:'btn-cancel',
					handler : function() {
						setPassword.close();
					}
				}]
			});
	setPassword.show();
};
