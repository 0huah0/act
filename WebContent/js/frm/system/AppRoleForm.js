AppRoleForm = Ext
		.extend(
				Ext.Window,
				{
					// 内嵌FormPanel
					formPanel : null,
					// 构造函数
					constructor : function(_cfg) {
						Ext.applyIf(this, _cfg);
						// 必须先初始化组件
						this.initUIComponents();
						AppRoleForm.superclass.constructor.call(this, {
							layout : 'fit',
							items : this.formPanel,
							border : false,
							modal : true,
							plain : true,
							id : 'AppRoleFormWin',
							title : '詳細信息',
							iconCls : 'menu-role',
							width : 370,
							height : 240,
							minWidth : 300,
							minHeight : 200,
							bodyStyle : 'padding:5px;',
							buttonAlign : 'center',
							buttons : this.buttons
						});
					},// end of the constructor
					// 初始化组件
					initUIComponents : function() {

						this.formPanel = new Ext.FormPanel( {
							url : __ctxPath + '/system/saveAppRole.do',
							layout : 'form',
							id : 'AppRoleForm',
							frame : true,
							defaults : {
								widht : 400,
								anchor : '100%,100%'
							},
							formId : 'AppRoleFormId',
							defaultType : 'textfield',
							items : [ {
								name : 'appRole.roleId',
								id : 'roleId',
								xtype : 'hidden',
								value : this.roleId == null ? '' : this.roleId
							}, {
								fieldLabel : '角色名称',
								allowBlank:false,
								name : 'appRole.roleName',
								id : 'roleName'
							}, {
								fieldLabel : '角色代碼',
								allowBlank:false,
								name : 'appRole.roleCode',
								id : 'roleCode'
							}, {
								fieldLabel : '角色描述',
								xtype : 'textarea',
								name : 'appRole.roleDesc',
								id : 'roleDesc'
							}, {
								fieldLabel : '狀態',
								hiddenName : 'appRole.status',
								id : 'status',
								xtype : 'combo',
								mode : 'local',
								editable : true,
								triggerAction : 'all',
								store : [ [ '0', '禁用' ], [ '1', '可用' ] ],
								value : 0
							} ]
						});

						if (this.roleId != null && this.roleId != 'undefined') {
							this.formPanel
									.getForm()
									.load(
											{
												deferredRender : false,
												url : __ctxPath
														+ '/system/getAppRole.do?roleId='
														+ this.roleId,
												waitMsg : '正在載入數據...',
												success : function(form, action) {
												},
												failure : function(form, action) {
												}
											});
						}

						this.buttons = [{
									text : '保存',
									iconCls : 'btn-save',
									handler : function() {
										var fp = Ext.getCmp('AppRoleForm');

										if (fp.getForm().isValid()) {
											fp.getForm().submit({
																method : 'post',
																waitMsg : '正在提交...',
																success : function(
																		fp,
																		action) {
																	Ext.ux.Toast
																			.msg('信息',
																					'保存成功！');
																	Ext
																			.getCmp(
																					'AppRoleGrid')
																			.getStore()
																			.reload();
																	Ext
																			.getCmp(
																					'AppRoleFormWin')
																			.close();
																},
																failure : function(
																		fp,
																		action) {
																	Ext.MessageBox
																			.show( {
																				title : '信息',
																				msg : '保存出錯！',
																				buttons : Ext.MessageBox.OK,
																				icon : 'ext-mb-error'
																			});
																	Ext
																			.getCmp(
																					'AppRoleFormWin')
																			.close();
																}
															});
										}
									}
								}, {
									text : '取消',
									iconCls : 'btn-cancel',
									handler : function() {
										Ext.getCmp('AppRoleFormWin').close();
									}
								} ]
					}
				});