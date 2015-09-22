var EmployeeForm = function(_title, _userId) {
	return this.setup(_title, _userId);
};

EmployeeForm.prototype.setup = function(_title, userId) {
	var _url = __ctxPath + '/system/listDepartment.do?opt=appUser';
	var depSelector = new TreeSelector('depTreeSelector_employee', _url, '所属部门',
			'employee.department.depId', true);
	var footToolbar = this.initFooterToolbar(userId);
	var userform = new Ext.form.FormPanel(
			{
				id : 'EmployeeForm',
				title : _title,
				closable : true,			
				iconCls : 'menu-customer',
				border : false, // 不要边框
				autoScroll : true,
				bodyStyle : "margin-top:5px;margin-left:5px; background-color: transparent;",
				labelAlign : "right",
				layout : 'table',
				autoScroll : true,
				tbar : footToolbar,
				defaultType : "textfield",
				layoutConfig : {
					columns : 3
				},
				url : __ctxPath + '/system/saveEmployee.do',
				reader : new Ext.data.JsonReader( {
					root : 'data'
				}, [ {
					name : 'newEmployee.fullname',
					mapping : 'fullname'
				}, {
					name : 'newEmployee.email',
					mapping : 'email'
				},  {
					name : 'newEmployee.accessionTime',
					mapping : 'accessionTime'
				}, {
					name : 'employee.department.depId',
					mapping : 'department.depId'
				}, {
					name : 'newEmployee.birthday',
					mapping : 'birthday'
				},{
					name : 'newEmployee.sex',
					mapping : 'sex'
				}, {
					name : 'newEmployee.position',
					mapping : 'position'
				}, {
					name : 'newEmployee.officePhone',
					mapping : 'officePhone'
				}, {
					name : 'newEmployee.mobilePhone',
					mapping : 'mobilePhone'
				}, {
					name : 'newEmployee.fax',
					mapping : 'fax'
				}, {
					name : 'newEmployee.address',
					mapping : 'address'
				}, {
					name : 'newEmployee.zip',
					mapping : 'zip'
				}, {
					name : 'newEmployee.imagePath',
					mapping : 'imagePath'
				}, {
					name : 'sectionCategory',
					mapping : 'sectionCategory'
				}, {
					name : 'newEmployee.id',
					mapping : 'id'					
				}, {
					name : 'newEmployee.accessionDate',
					mapping : 'accessionDate'					
				}, {
					name : 'newEmployee.leaveDate',
					mapping : 'leaveDate'					
				},{
					name : 'newEmployee.empCode',
					mapping : 'empCode'					
				}
				]),
				items : [
						{
							id : 'displayUserPhoto',
							xtype : "panel",
							width : 160,
							rowspan : 2,
							//height : 450,
							height : 310,
							title : "个人照片",
							html : '<img src="' + __ctxPath + '/images/default_image_male.jpg" height="245px" style="padding:5px;" />',
							tbar : new Ext.Toolbar( {
								height : 30,
								items : [ {
									text : '上传',
									iconCls : 'btn-upload',
									handler : function() {
										EmployeeForm.uploadPhotoBtn(userId);
									}
								}, {
									text : '删除',
									iconCls : 'btn-delete',
									handler : function() {
										EmployeeForm.deletePhotoBtn(userId);
									}
								} ]
							})
						},
						{
							xtype : "panel",
							id : 'AppUserMustInfo1',
							width : 265,
							//height : 230,
							height : 310,
							title : "基本信息(必填)",
							layout : 'form',
							defaultType : "textfield",
							defaults : {
								width : 163
							},
							labelWidth : 80,
							labelAlign : "right",
							hideLabels : false,
							items : [
									{
										xtype : 'hidden',
										fieldLabel : '员工ID',
										name : 'employee.id',
										id : 'newEmployee.id'
									},
									{										
										fieldLabel : '员工编号',
										name : 'employee.empCode',
										id : 'newEmployee.empCode',
										allowBlank : false,
										blankText : '员工编号不能为空!',
										 listeners : {	
							                'change' : function(obj){
							                
							                }
										 }																	
									},
									{
										fieldLabel : '员工姓名',
										name : 'employee.fullname',
										id : 'newEmployee.fullname',
										allowBlank : false,
										blankText : '员工姓名不能为空!'
									},									
									{
										fieldLabel : '入职时间',
										xtype : 'datefield',
										format : 'Y-m-d',
										name : 'employee.accessionDate',
										id : 'newEmployee.accessionDate',
										allowBlank : false,
										blankText : '入职时间不能为空!',
										length : 50
									},
									{
										fieldLabel : '出生日期',
										xtype : 'datefield',
										format : 'Y-m-d',
										name : 'employee.birthday',
										id : 'newEmployee.birthday',
										allowBlank : false,
										blankText : '出生日期不能为空!'
									},
									{
										fieldLabel : '性别',
										xtype : 'combo',
										hiddenName : 'employee.sex',
										id : 'newEmployee.sex',
										mode : 'local',
										editable : false,
										triggerAction : 'all',
										store : [ [ '1', '先生' ], [ '0', '女士' ] ],
										value : '1',
										listeners : {
											select : function(combo, record,
													index) {
												var photo = Ext
														.getCmp('newEmployee.imagePath');
												if (photo.value == ''
														|| photo.value == 'undefined'
														|| photo.value == null) {
													var display = Ext
															.getCmp('displayUserPhoto');
													if (combo.value == '0') {
														display.body
																.update('<img src="' + __ctxPath + '/images/default_image_female.jpg" height="245px" style="padding:5px;" />');
													} else {
														display.body
																.update('<img src="' + __ctxPath + '/images/default_image_male.jpg" height="245px" style="padding:5px;" />');
													}
												}
											}
										}
									}
									]
						},
						{
							xtype : "panel",
							width : 265,
							//height : 230,
							height : 310,
							title : "扩展信息(选填)",
							layout : 'form',
							defaultType : 'textfield',
							labelWidth : 55,
							defaults : {
								width : 163
							},
							hideLabel : false,
							items : [depSelector,// 所属部门
									{
										xtype : 'hidden',
										name : 'employee.department.depId',
										id : 'employee.department.depId'
									},
									{
										fieldLabel : '职位',
										name : 'employee.position',
										id: 'newEmployee.position'
									},
									{
										fieldLabel : '办公电话',
										name : 'employee.officePhone',
										id : 'newEmployee.officePhone'
									}, {
										fieldLabel : '移动电话',
										xtype : 'numberfield',
										name : 'employee.mobilePhone',
										id : 'newEmployee.mobilePhone'
									}, {
										fieldLabel : '传真',
										name : 'employee.fax',
										id : 'newEmployee.fax'
									},{
										fieldLabel : 'E-mail',
										name : 'employee.email',
										id : 'newEmployee.email',
										allowBlank : true,
										vtype : 'email',
										vtypeText : '邮箱格式不正确!'
									}, {
										fieldLabel : '住址',
										name : 'employee.address',
										id : 'newEmployee.address'
									}, {
										fieldLabel : '邮编',
										xtype : 'numberfield',
										name : 'employee.zip',
										id : 'newEmployee.zip'
									},{
										fieldLabel : '离职日期',
										xtype : 'datefield',
										format : 'Y-m-d',
										name : 'employee.leaveDate',
										id : 'newEmployee.leaveDate'
									}, {
										filedLabel : '照片',
										xtype : 'hidden',
										id : 'newEmployee.imagePath',
										name : 'employee.imagePath'
									} ]
						}
						/*,
						{
							xtype : 'panel',
							title : '用户角色',
							width : 530,
							//height : 220,
							height : 200,
							colspan : 2,
							items : [ {
								xtype : 'itemselector',
								id : 'AppUserRoles',
								name : 'AppUserRoles',

								fromLegend : '',
								imagePath : __ctxPath + '/ext3/ux/images/',
								multiselects : [
										{
											id : 'chooseRoles',
											title : '可选角色',
											width : 247,
											height : 190,
											// SimpleStore 有可能 在Ext 3.0 以后的版本 换成
											// ArrayStore,更新版本时请注意
											store : new Ext.data.SimpleStore(
													{
														autoLoad : true,
														baseParams : {
															userId : userId
														},
														url : __ctxPath + '/system/chooseRolesAppUser.do',
														fields : [ 'roleId',
																'roleName' ]
													}),
											displayField : 'roleName',
											valueField : 'roleId'
										},
										{
											id : 'selectedRoles',
											name : 'selectedRoles',
											title : '已有角色',
											width : 247,
											height : 190,
											store : new Ext.data.SimpleStore(
													{
														autoLoad : true,
														baseParams : {
															userId : userId
														},
														url : __ctxPath + '/system/selectedRolesAppUser.do',
														fields : [ 'roleId',
																'roleName' ]
														//,data:[-2,'abc']		
													}),
											tbar : [ {
												text : '清除所选',
												handler : function() {
													Ext
															.getCmp(
																	'EmployeeForm')
															.getForm()
															.findField(
																	'AppUserRoles')
															.reset();
												}
											} ],
											displayField : 'roleName',
											valueField : 'roleId'
										} ]

							} ]

						}*/
						]
			});
	return userform;
};
// 初始化操作菜单
EmployeeForm.prototype.initFooterToolbar = function(userId) {

	var toolbar = new Ext.Toolbar( {
		id : 'EmployeeFormToolbar',
		height : 30,
		items : [ {
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var userform = Ext.getCmp('EmployeeForm');
				
				if (userform.getForm().isValid()) {
					userform.getForm().submit( {
						waitMsg : '正在提交用户信息',
						success : function(userform, o) {
							Ext.ux.Toast.msg('操作信息', '保存成功！');
							var userview = Ext.getCmp('AppUserGrid');
							if (userview != null) {// 假如员工列表不为空,则重载数据
							userview.getStore().reload( {
								start : 0,
								limit : 25
							});
						}
						AppUtil.removeTab('EmployeeForm');
					},
					failure : function(userform, o) {
						Ext.ux.Toast.msg('错误信息', o.result.msg);
					}
					});
				}
			}

		}, {
			text : '取消',
			iconCls : 'reset',
			handler : function() {
				var tabs = Ext.getCmp('centerTabPanel');
				tabs.remove('EmployeeForm');
			}
		}, {
			text : '修改密码',
			id : 'resetPassword',
			hidden : true,
			iconCls : 'btn-password',
			handler : function() {
				new ResetPasswordForm(userId);
			}
		} ]
	});

	return toolbar;
};
/**
 * 上传员工图片按钮动作
 * 
 * @param {}
 *            userId
 */
EmployeeForm.uploadPhotoBtn = function(userId) {
	var photo = Ext.getCmp('newEmployee.imagePath');
	var dialog = App.createUploadDialog( {
		file_cat : 'system/appUser',
		callback : uploadUserPhoto,
		permitted_extensions : [ 'jpg' ]
	});
	if (photo.value != '' && photo.value != null && photo.value != 'undefined') {
		var msg = '再次上传需要先删除原有图片,';
		Ext.Msg
				.confirm('信息确认',
						msg + '是否删除？',
						function(btn) {
							if (btn == 'yes') {
								// 删除图片
						Ext.Ajax
								.request( {
									url : __ctxPath + '/system/deleteFileAttach.do',
									method : 'post',
									params : {
										filePath : photo.value
									},
									success : function() {
										if (userId != '' && userId != null
												&& userId != 'undefined') {
											Ext.Ajax
													.request( {
														url : __ctxPath + '/system/photoAppUser.do',
														method : 'post',
														params : {
															userId : userId
														},
														success : function() {
															photo.setValue('');
															var appUserTitle = Ext
																	.getCmp('appUserTitle');
															var display = Ext
																	.getCmp('displayUserPhoto');
															if (appUserTitle.value == 1) {
																display.body
																		.update('<img src="' + __ctxPath + '/images/default_image_male.jpg" height="245px" style="padding:5px;" />');
															} else {
																display.body
																		.update('<img src="' + __ctxPath + '/images/default_image_female.jpg" height="245px" style="padding:5px;" />');
															}
															dialog
																	.show('queryBtn');
														}
													});
										} else {
											photo.setValue('');
											var appUserTitle = Ext
													.getCmp('appUserTitle');
											var display = Ext
													.getCmp('displayUserPhoto');
											if (appUserTitle.value == 1) {
												display.body
														.update('<img src="' + __ctxPath + '/images/default_image_male.jpg" height="245px" style="padding:5px;" />');
											} else {
												display.body
														.update('<img src="' + __ctxPath + '/images/default_image_female.jpg" height="245px" style="padding:5px;" />');
											}
											dialog.show('queryBtn');
										}
									}
								});
					}
				});
	} else {
		dialog.show('queryBtn');
	}
};

/**
 * 删除员工照片按钮动作
 * 
 * @param {}
 *            userId
 */
EmployeeForm.deletePhotoBtn = function(userId) {
	var photo = Ext.getCmp('newEmployee.imagePath');
	if (photo.value != null && photo.value != '' && photo.value != 'undefined') {
		Ext.Msg.confirm('确认信息','照片一旦删除将不可恢复, 是否删除?',
						function(btn) {
							if (btn == 'yes') {
								Ext.Ajax.request( {
											url : __ctxPath + '/system/deleteFileAttach.do',
											method : 'post',
											params : {
												filePath : photo.value
											},
											success : function() {
												if (userId != ''
														&& userId != null
														&& userId != 'undefined') {
													Ext.Ajax
															.request( {
																url : __ctxPath + '/system/photoAppUser.do',
																method : 'post',
																params : {
																	userId : userId
																},
																success : function() {
																	photo
																			.setValue('');
																	var appUserTitle = Ext
																			.getCmp('appUserTitle');
																	var display = Ext
																			.getCmp('displayUserPhoto');
																	if (appUserTitle.value == 1) {
																		display.body
																				.update('<img src="' + __ctxPath + '/images/default_image_male.jpg" height="245px" style="padding:5px;" />');
																	} else {
																		display.body
																				.update('<img src="' + __ctxPath + '/images/default_image_female.jpg" height="245px" style="padding:5px;" />');
																	}
																}
															});
												} else {
													photo.setValue('');
													var appUserTitle = Ext
															.getCmp('appUserTitle');
													var display = Ext
															.getCmp('displayUserPhoto');
													if (appUserTitle.value == 1) {
														display.body
																.update('<img src="' + __ctxPath + '/images/default_image_male.jpg" height="245px" style="padding:5px;" />');
													} else {
														display.body
																.update('<img src="' + __ctxPath + '/images/default_image_female.jpg" height="245px" style="padding:5px;" />');
													}
												}
											}
										});
							}
						});
	}// end if
	else {
		Ext.ux.Toast.msg('提示信息', '您还未增加照片.');
	}
};
/**
 * 上传照片
 * 
 * @param {}
 *            data
 */
function uploadUserPhoto(data) {
	var photo = Ext.getCmp('newEmployee.imagePath');
	var display = Ext.getCmp('displayUserPhoto');
	photo.setValue(data[0].filepath);
	display.body.update('<img src="' + __ctxPath + '/attachFiles/'
			+ data[0].filepath + '"  width="100%" height="100%"/>');
};
