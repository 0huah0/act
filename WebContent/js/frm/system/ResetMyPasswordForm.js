/**
 * 修改密码
 */
var ResetMyPasswordForm = function(){
	var formPanel = new Ext.FormPanel({
				url : __ctxPath+ '/system/resetMyPasswordAppUser.do',
				layout : 'form',
				id:'setMyPasswordForm',
				bodyStyle:'padding:5px',
				border:false,
				defaults : {
					widht : 400,
					anchor : '100%,100%'
				},
	        	defaultType : 'textfield',
				items : [/*{
							name : 'appUserUserId',
							id : 'appUserUserId',
							xtype:'hidden',
							value : userId
						},*/
						{
							fieldLabel : '舊密碼',
							name : 'oldPassword',
							id : 'oldPassword',
							inputType : 'password'
						}, {
							fieldLabel : '新密碼',
							name : 'newPassword',
							id : 'newPassword',
							inputType : 'password'
						}, {
							fieldLabel : '再輸入',
							name : 'againPassword',
							id : 'againPassword',
							inputType : 'password'
						}]
			});
			
	var setMyPassword = new Ext.Window({
		title:'修改密碼',
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
						var fp=Ext.getCmp('setMyPasswordForm');
								if (fp.getForm().isValid()) {
								fp.getForm().submit({
											method: 'post',
											waitMsg : '正在提交数据...',
											success : function(fp,action) {
												Ext.ux.Toast.msg('操作信息', '密码修改成功！');
												setMyPassword.close();
											},
											failure : function(fp,action) {
												Ext.ux.Toast.msg('错误提示',action.result.msg);
												Ext.getCmp('setMyPasswordForm').getForm().reset();
											}
								});
							}
					}
				}, {
					text : '取消',
					iconCls:'btn-cancel',
					handler : function() {
						setMyPassword.close();
					}
				}]
			});
	setMyPassword.show();

}
