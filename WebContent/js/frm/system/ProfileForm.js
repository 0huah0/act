var ProfileForm = function(_userId) {
	return this.setup(_userId);
};

ProfileForm.prototype.setup = function(userId) {
	var footToolbar = this.initFooterToolbar(userId);
	
	var profileform = new Ext.form.FormPanel({
				id : 'ProfileForm',
				title : '個人資料',
				closable : true,
				iconCls : 'menu-customer',
				border : false, // 不要边框
				autoScroll : true,
				labelAlign : "right",
				layout : 'fit',
				tbar : footToolbar,
				defaultType : "textfield",
				url : __ctxPath + '/system/selfAlterAppUser.do',
				reader : new Ext.data.JsonReader({
					root : 'data'
				}, [ {
					name : 'appUser.userId',
					mapping : 'userId'
				}, {
					name : 'appUser.username',
					mapping : 'username'
				}, {
					name : 'appUser.fullname',
					mapping : 'fullname'
				}, {
					name : 'appUser.employee.id',
					mapping : 'employee.id'
				}, {
					name : 'appUser.employee.email',
					mapping : 'employee.email'
				}, {
					name : 'appUser.employee.officePhone',
					mapping : 'employee.officePhone'
				}, {
					name : 'appUser.employee.sex',
					mapping : 'employee.sex'
				}, {
					name : 'appUser.employee.position',
					mapping : 'employee.position'
				}, {
					name : 'appUser.employee.mobile',
					mapping : 'employee.mobile'
				}, {
					name : 'appUser.employee.fax',
					mapping : 'employee.fax'
				}, {
					name : 'appUser.employee.address',
					mapping : 'employee.address'
				}, {
					name : 'appUser.employee.zip',
					mapping : 'employee.zip'
				}, {
					name : 'appUser.photo',
					mapping : 'photo'
				} ]),
				items : [ {
					xtype : 'panel',
					frame : false,
					autoWidth : true,
					autoHeight : true,
					border : false,
					layout : 'table',
					bodyStyle : "margin-top:5px;margin-left: 17%; background-color: transparent;",
					layoutConfig : {
						columns : 2
					},
					items : [ {
								id : 'displayProfilePhoto',
								xtype : "panel",
								width : 230,
								rowspan : 2,
								style : 'padding:3px 4px 25px 0px;',
								height : 435,
								title : "個人照片",
								html : '<img src="' + __ctxPath
										+ '/images/default_image_male.jpg"/>',
								tbar : new Ext.Toolbar( {
											height : 30,
											items : [ {
														text : '上傳',
														iconCls : 'btn-upload',
														handler : function() {
															ProfileForm
																	.uploadPhotoBtn(userId);
														}
													}, {
														text : '刪除',
														iconCls : 'btn-delete',
														handler : function() {
															ProfileForm
																	.deleteUserPhoto(userId);
														}
													} ]
										})
							}, {
								xtype : "panel",
								id : 'ProfileMustInfo',
								width : 305,
								height : 435,
								title : "個人資料",
								layout : 'form',
								style : 'padding:3px 4px 25px 0px;',
								defaultType : "textfield",
								defaults : {
									width : 203
								},
								labelWidth : 55,
								labelAlign : "right",
								hideLabels : false,
								items : [{
											xtype : 'hidden',
											fieldLabel : '员工ID',
											name : 'appUser.userId',
											id : 'profile.userId'
										}, {
											xtype : 'hidden',
											name : 'appUser.employee.id'
										}, {
											fieldLabel : '登入帳號',
											name : 'appUser.username',
											id : 'profile.username',
											disabled : true
										}, {
											fieldLabel : '員工姓名',
											name : 'appUser.fullname',
											id : 'profile.fullname',
											allowBlank : false,
											maxLength : 120,
											blankText : '员工姓名不能为空!'
										}, {
											fieldLabel : 'E-mail',
											name : 'appUser.employee.email',
											id : 'profile.email',
											vtype : 'email',
											allowBlank : false,
											blankText : '邮箱不能为空!',
											vtypeText : '邮箱格式不正确!'
										}, {
											fieldLabel : '性别',
											xtype : 'combo',
											hiddenName : 'appUser.employee.sex',
											id : 'profileTitle',
											mode : 'local',
											editable : false,
											triggerAction : 'all',
											store : [ [ '1', '先生' ],
													[ '0', '女士' ] ],
											value : '1',
											listeners : {
												select : function(combo,
														record, index) {
													var photo = Ext
															.getCmp('profile.photo');
													if (photo.value == ''
															|| photo.value == 'undefined'
															|| photo.value == null) {
														var display = Ext
																.getCmp('displayProfilePhoto');
														if (combo.value == '0') {
															display.body
																	.update('<img src="'
																			+ __ctxPath
																			+ '/images/default_image_female.jpg" />');
														} else {
															display.body
																	.update('<img src="'
																			+ __ctxPath
																			+ '/images/default_image_male.jpg" />');
														}
													}
												}
											}
										}, {
											fieldLabel : '手機號碼',
											xtype : 'numberfield',
											maxLength : 20,
											name : 'appUser.employee.mobilePhone'
										}, {
											fieldLabel : '辦公電話',
											maxLength : 20,
											name : 'appUser.employee.officePhone'
										}, {
											fieldLabel : '傳真',
											maxLength : 20,
											name : 'appUser.employee.fax'
										}, {
											fieldLabel : '地址',
											name : 'appUser.employee.address'
										}, {
											fieldLabel : '郵遞區號',
											maxLength : 20,
											name : 'appUser.employee.zip'
										}, {
											filedLabel : '照片',
											xtype : 'hidden',
											id : 'profile.photo',
											name : 'appUser.employee.imagePath'
										} ]
							} ]
				} ]
			});

	profileform.loadData({
		url : __ctxPath + '/system/getMyAppUser.do',
		root : 'data',
		preName : 'appUser',
		success : function() {
			// init the photo
			var photo = Ext.getCmp('profile.photo');
			var display = Ext.getCmp('displayProfilePhoto');
			var appUserTitle = Ext.getCmp('profileTitle');
			if (photo.value != '' && photo.value != null
					&& photo.value != 'undefined') {
				display.body.update('<img src="' + __ctxPath + '/attachFiles/'
						+ photo.value + '" width="100%" height="100%"/>');
			} else if (appUserTitle.value == '0') {
				display.body.update('<img src="' + __ctxPath
						+ '/images/default_image_female.jpg" />');
			}
		}
	});

	return profileform;
};
// 初始化操作菜单
ProfileForm.prototype.initFooterToolbar = function(userId) {

	var toolbar = new Ext.Toolbar({
		id : 'ProfileFormToolbar',
		height : 30,
		items : [ {
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var userform = Ext.getCmp('ProfileForm');
				userform.getForm().submit({
					waitMsg : '正在提交用户信息',
					success : function(userform, o) {
						Ext.ux.Toast.msg('操作信息', '保存成功！')
						var userview = Ext.getCmp('AppUserGrid');
						if (userview != null) {// 假如员工列表不为空,则重载数据
							userview.getStore().reload({
								start : 0,
								limit : 25
							});
						}
					}
				});
			}

		}, {
			text : '取消',
			iconCls : 'reset',
			handler : function() {
				var tabs = Ext.getCmp('centerTabPanel');
				tabs.remove('ProfileForm');
			}
		}, {
			text : '修改密碼',
			iconCls : 'btn-edit',
			handler : function() {
				new ResetPasswordForm(userId);
			}
		} ]
	});
	return toolbar;
};

ProfileForm.uploadPhotoBtn = function(userId) {
	var photo = Ext.getCmp('profile.photo');
	var dialog = App.createUploadDialog({
		file_cat : 'system/appUser',
		callback : uploadUserPhoto,
		file_single : true,
		permitted_extensions : [ 'jpeg', 'JPEG', 'jpg', 'JPG', 'jpe', 'JPE', 'png', 'PNG', 'gif', 'GIF', 'bmp', 'BMP', 'tif', 'TIF' ]
	});
	if (photo.value != '' && photo.value != null && photo.value != 'undefined') {
		var msg = '再次上传需要先删除原有图片,';
		Ext.Msg
				.confirm(
						'信息确认',
						msg + '是否删除？',
						function(btn) {
							if (btn == 'yes') {
								// 删除图片
								Ext.Ajax
										.request({
											url : __ctxPath
													+ '/system/deleteFileAttach.do',
											method : 'post',
											params : {
												filePath : photo.value
											},
											success : function() {
												if (userId != ''
														&& userId != null
														&& userId != 'undefined') {
													Ext.Ajax
															.request({
																url : __ctxPath
																		+ '/system/photoAppUser.do',
																method : 'post',
																params : {
																	userId : userId
																},
																success : function() {
																	photo
																			.setValue('');
																	var appUserTitle = Ext
																			.getCmp('profileTitle');
																	var display = Ext
																			.getCmp('displayProfilePhoto');
																	if (appUserTitle.value == 1) {
																		display.body
																				.update('<img src="'
																						+ __ctxPath
																						+ '/images/default_image_male.jpg" />');
																	} else {
																		display.body
																				.update('<img src="'
																						+ __ctxPath
																						+ '/images/default_image_female.jpg" />');
																	}
																	dialog
																			.show('queryBtn');
																}
															});
												} else {
													photo.setValue('');
													var profileTitle = Ext
															.getCmp('profileTitle');
													var display = Ext
															.getCmp('displayProfilePhoto');
													if (profileTitle.value == 1) {
														display.body
																.update('<img src="'
																		+ __ctxPath
																		+ '/images/default_image_male.jpg" />');
													} else {
														display.body
																.update('<img src="'
																		+ __ctxPath
																		+ '/images/default_image_female.jpg" />');
													}
													dialog.show('queryBtn');
												}
											}
										});
							}
						})
	} else {
		dialog.show('queryBtn');
	}
}

ProfileForm.deleteUserPhoto = function(userId) {
	var photo = Ext.getCmp('profile.photo');
	if (photo.value != null && photo.value != '' && photo.value != 'undefined') {
		var msg = '照片一旦删除将不可恢復,';
		Ext.Msg
				.confirm(
						'確認信息',
						msg + '是否删除?',
						function(btn) {
							if (btn == 'yes') {
								Ext.Ajax
										.request({
											url : __ctxPath
													+ '/system/deleteFileAttach.do',
											method : 'post',
											params : {
												filePath : photo.value
											},
											success : function() {
												if (userId != ''
														&& userId != null
														&& userId != 'undefined') {
													Ext.Ajax
															.request({
																url : __ctxPath
																		+ '/system/photoAppUser.do',
																method : 'post',
																params : {
																	userId : userId
																},
																success : function() {
																	photo
																			.setValue('');
																	var profileTitle = Ext
																			.getCmp('profileTitle');
																	var display = Ext
																			.getCmp('displayProfilePhoto');
																	if (profileTitle.value == 1) {
																		display.body
																				.update('<img src="'
																						+ __ctxPath
																						+ '/images/default_image_male.jpg" />');
																	} else {
																		display.body
																				.update('<img src="'
																						+ __ctxPath
																						+ '/images/default_image_female.jpg" />');
																	}
																}
															});
												} else {
													photo.setValue('');
													var profileTitle = Ext
															.getCmp('profileTitle');
													var display = Ext
															.getCmp('displayProfilePhoto');
													if (profileTitle.value == 1) {
														display.body
																.update('<img src="'
																		+ __ctxPath
																		+ '/images/default_image_male.jpg" />');
													} else {
														display.body
																.update('<img src="'
																		+ __ctxPath
																		+ '/images/default_image_female.jpg" />');
													}
												}
											}
										});
							}
						});
	}// end if
	else {
		Ext.ux.Toast.msg('提示信息', '您還未添加照片。');
	}

}
/**
 * 上传照片
 * 
 * @param {}
 *            data
 */
function uploadUserPhoto(data) {

	Ext.getCmp('profile.photo').setValue(data[0].filepath);
	Ext.getCmp('displayProfilePhoto').body.update('<img src="' + __ctxPath
			+ '/attachFiles/' + data[0].filepath
			+ '"  width="100%" height="100%"/>');
};
