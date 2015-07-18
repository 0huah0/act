var AppUserForm = function(_title, _userId) {
	return this.setup(_title, _userId);
};

AppUserForm.prototype.setup = function(_title, userId) {
	//var _url = __ctxPath + '/system/list1Department.do';
	var _url = __ctxPath + '/system/treeAllByLevelDepartment.do';
	var depSelector = new TreeSelector('depTreeSelector', _url, '所屬部門',
			'appUser.depId', true);
	
	var userform = new Ext.form.FormPanel(
			{
				id : 'AppUserForm',
				//title : _title,
				closable : true,			
				iconCls : 'menu-customer',
				border : false, // 不要边框
				autoScroll : true,
				bodyStyle : "margin-top:5px;margin-left:5px; background-color: transparent;",
				labelAlign : "right",
				layout : 'table',
				autoScroll : true,
				buttonAlign: 'center',
				defaultType : "textfield",
				layoutConfig : {
					columns : 3
				},
				url : __ctxPath + '/system/saveAppUser.do',
				reader : new Ext.data.JsonReader( {
					root : 'data'
				}, [ {
					name : 'appUser.userId',
					mapping : 'userId'
				}, {
					name : 'appUser.username',
					mapping : 'username'
				}, {
					name : 'appUser.password',
					mapping : 'password'
				}, {
					name : 'employee.fullname',
					mapping : 'employee.fullname'
				}, {
					name : 'employee.email',
					mapping : 'employee.email'
				},  {
					name : 'employee.accessionTime',
					mapping : 'employee.accessionTime'
				}, {           
					name : 'employee.attendWorkDate',
					mapping : 'employee.attendWorkDate'
				}, {
					name : 'appUser.employee.department.depId',
					mapping : 'employee.department.depId'
				}, {
					name : 'appUser.employee.department.depName',
					mapping : 'employee.department.depName'
				},{
					name : 'employee.birthday',
					mapping : 'employee.birthday'
				},{
					name : 'appUserStatus',
					mapping : 'status'
				},{
					name : 'employee.sex',
					mapping : 'employee.sex'
				}, {
					name : 'employee.position',
					mapping : 'employee.position'
				}, {
					name : 'employee.officePhone',
					mapping : 'employee.officePhone'
				}, {
					name : 'employee.mobilePhone',
					mapping : 'employee.mobilePhone'
				}, {
					name : 'employee.fax',
					mapping : 'employee.fax'
				}, {
					name : 'employee.address',
					mapping : 'employee.address'
				}, {
					name : 'employee.zip',
					mapping : 'employee.zip'
				}, {
					name : 'employee.photo',
					mapping : 'employee.photo'
				}, {
					name : 'appUser.sectionCategory',
					mapping : 'sectionCategory'
				}, {
					name : 'employee.id',
					mapping : 'employee.id'					
				}, {
					name : 'employee.accessionDate',
					mapping : 'employee.accessionDate'					
				}, {
					name : 'employee.empCode',
					mapping : 'employee.empCode'					
				}
				]),
				items : [{
							xtype : "panel",
							id : 'AppUserMustInfo',
							width : 230,
							height : 270,
							title : "基本信息(必填)",
							layout : 'form',
							defaultType : "textfield",
							defaults : {
								width : 150
							},
							labelWidth : 60,
							labelAlign : "right",
							hideLabels : false,
							bodyStyle : "padding-top:5px;",
							items : [
									{
										xtype : 'hidden',
										fieldLabel : '员工ID',
										name : 'appUser.userId',
										id : 'appUser.userId'
									},
									{
										fieldLabel : '登入帳號',
										name : 'appUser.username',
										id : 'appUser.username',
										allowBlank : false,
										blankText : '登入帳號不能为空!',
										listeners : {
											'blur' : function(obj){
							                	Ext.Ajax.request({
							                		url : __ctxPath + '/system/validateAppUser.do',
							                		params : {
							                			userName : Ext.getCmp('appUser.username').getValue()
							                		},
							                		success : function(response){
							                			var obj = eval("("+response.responseText+")");
							                			result = obj.result;
							                			if(result){
							                				Ext.Msg.alert('提示','该账号已存在');
															Ext.getCmp('appUser.username').setValue('');
							                			}
							                		}
							                	});
											}
										}
									},
									{
										fieldLabel : '登入密碼',
										name : 'appUser.password',
										id : 'appUser.password',
										inputType : 'password',
										allowBlank : false,
										blankText : '登入密碼不能为空!'
									},{
										fieldLabel : '員工編號',
										name : 'appUser.employee.empCode',
										id : 'employee.empCode',
										allowBlank : false,
										blankText : '員工編號不能为空!',
										 listeners : {							                	
							                'blur' : function(obj){
							                	Ext.Ajax.request({
							                		url : __ctxPath + '/system/isExitAppUser.do',
							                		params : {
							                			empCode : Ext.getCmp('employee.empCode').getValue()
							                		},
							                		success : function(response){
							                			var obj = eval("("+response.responseText+")")
							                			result = obj.result;
							                			if(result){
							                				Ext.Msg.alert('提示','该員工編號已存在');
															Ext.getCmp('employee.empCode').setValue('');
							                			}
							                		}
							                	});
							                }
										 }

									},
									{
										fieldLabel : '員工姓名',
										name : 'appUser.employee.fullname',
										id : 'employee.fullname',
										allowBlank : false,
										blankText : '員工姓名不能为空!'
									},
									{
										fieldLabel : '入職日期',
										xtype : 'datefield',
										format : 'Y-m-d',
										name : 'appUser.employee.accessionDate',
										id : 'employee.accessionDate',
										allowBlank : false,
										blankText : '入職日期不能为空!'
									},
									{
										fieldLabel : '出生日期',
										xtype : 'datefield',
										format : 'Y-m-d',
										name : 'appUser.employee.birthday',
										id : 'employee.birthday',
										allowBlank : false,
										blankText : '出生日期不能为空!'
									},{
										fieldLabel : '性别',
										xtype : 'combo',
										hiddenName : 'appUser.employee.sex',
										id : 'employee.sex',
										mode : 'local',
										editable : false,
										triggerAction : 'all',
										allowBlank : false,
										blankText : '性别不能为空!',
										store : [ [ '1', '先生' ], [ '0', '女士' ] ],
										value : '1'
									},
									{
										fieldLabel : '狀態',
										id : 'appUserStatus',
										hiddenName : 'appUser.status',
										xtype : 'combo',
										mode : 'local',
										editable : false,
										triggerAction : 'all',
										allowBlank : false,
										blankText : '狀態不能为空!',
										store : [ [ '1', '激活' ], [ '0', '禁用' ] ],
										value : 1
									}
									,{
										fieldLabel : '标志',
										id : 'mark',
										name : 'mark',
										xtype : 'hidden',
										value : 2
									},{
										xtype : 'hidden',
										name : 'appUser.employee.id',
										id : 'employee.id'
									}
									]
						},
						{
							xtype : "panel",
							width : 230,
							height : 270,
							title : "擴展信息(選填)",
							layout : 'form',
							defaultType : 'textfield',
							labelWidth : 60,
							defaults : {
								width : 150
							},
							hideLabel : false,
							bodyStyle : "padding-top:5px;",
							items : [
									depSelector,// 所属部门	
									{
										xtype : 'hidden',
										name : 'appUser.employee.department.depId',
										id : 'appUser.depId'
									},																		
									{
										fieldLabel : '職位',
										name : 'appUser.employee.position',
										id: 'employee.position'
									},
									{
										fieldLabel : '辦公電話',
										name : 'appUser.employee.officePhone',
										id : 'employee.officePhone'
									}, {
										fieldLabel : '手機號碼',
										xtype : 'numberfield',
										name : 'appUser.employee.mobilePhone',
										id : 'employee.mobilePhone'
									}, {
										fieldLabel : '傳真',
										name : 'appUser.employee.fax',
										id : 'employee.fax'
									}, {
										fieldLabel : '地址',
										name : 'appUser.employee.address',
										id : 'employee.address'
									}, {
										fieldLabel : '郵遞區號',
										xtype : 'numberfield',
										name : 'appUser.employee.zip',
										id : 'employee.zip'
									} ]
						},
						{
							xtype : 'panel',
							title : '用戶角色',
							width : 355,
							height : 270,
							colspan : 2,
							items : [ {
								xtype : 'itemselector',
								id : 'AppUserRoles',
								name : 'AppUserRoles',
								bodyStyle : "padding-left:5px;",
								fromLegend : '',
								width : 345,
								imagePath : __ctxPath + '/ext3/ux/images/',
								multiselects : [
										{
											id : 'chooseRoles',
											title : '可選擇',
											width : 160,
											height : 260,
											// SimpleStore 有可能 在Ext 3.0 以后的版本 换成
											// ArrayStore,更新版本时请注意
											store : new Ext.data.SimpleStore({
														autoLoad : true,
														baseParams : {
															'userId' : userId
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
											title : '已選擇',
											width : 160,
											height : 260,
											store : new Ext.data.SimpleStore(
													{
														autoLoad : true,
														baseParams : {
															'userId' : userId
														},
														url : __ctxPath + '/system/selectedRolesAppUser.do',
														fields : [ 'roleId',
																'roleName' ]
														//,data:[-2,'abc']		
													}),
											tbar : [ {
												text : '清除所選',
												handler : function() {
													Ext
															.getCmp(
																	'AppUserForm')
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

						} ],
						buttons: [{
							text : '保存',
							iconCls : 'btn-save',
							handler : function() {
								if(Ext.getCmp('depTreeSelector').getValue()==""){
									Ext.Msg.alert('提示','请填写所属部门');
								}else{
									var userform = Ext.getCmp('AppUserForm');
													
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
												Ext.getCmp('AppUserForm').getForm().reset();
												Ext.getCmp('chooseRoles').getStore().reload();    
												Ext.getCmp('appUser.username').getEl().dom.readOnly = false;							
												Ext.getCmp('resetPassword').hide();
												Ext.getCmp('appUser.password').show();
										},
										failure : function(userform, o) {
											Ext.ux.Toast.msg('错误信息', o.result.msg);
										}
										});
									}
								}
							}		
						},{
							text : '修改密碼',
							id : 'resetPassword',
							hidden : true,
							iconCls : 'btn-password',
							handler : function() {
								new ResetPasswordForm(Ext.getCmp('appUser.userId').getValue());
							}
						}]

			});
			
	 if(isGranted('addCompanyMan')){
	 	Ext.getCmp('AppUserRoles').ReadOnly=true;
	 }
	  if(isGranted('addOfficeMan')){
	 	Ext.getCmp('AppUserRoles').ReadOnly=true;
	 }
	
	return userform;
};

