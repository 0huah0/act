Ext.ns('AppRoleView');
AppRoleView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		AppRoleView.superclass.constructor.call(this, {
					id : 'AppRoleView',
					title : '角色列表',
					iconCls : 'menu-role',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},// end of constructor

	initUIComponents : function() {
		this.searchPanel = new Ext.FormPanel({
			height : 45,
			region : 'north',
			frame : true,
			layoutConfig : {
				padding : '5',
				align : 'middle'
			},
			id : 'AppRoleSearchForm',
			layout : 'hbox',
			defaults : {
				xtype : 'label',
				border : false,
				margins : {
					top : 2,
					right : 4,
					bottom : 2,
					left : 4
				}
			},
			items : [{
						text : '角色名稱:'
					}, {
						xtype : 'textfield',
						name : 'Q_roleName_S_LK'
					}, {
						text : '角色描述:'
					}, {
						xtype : 'textfield',
						name : 'Q_roleDesc_S_LK'
					}, {
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('AppRoleSearchForm');
							var grid = Ext.getCmp('AppRoleGrid');
							if (searchPanel.getForm().isValid()) {
								searchPanel.getForm().submit({
									waitMsg : '正在提交查詢',
									url : __ctxPath + '/system/listAppRole.do',
									success : function(formPanel, action) {
										var result = Ext.util.JSON
												.decode(action.response.responseText);
										grid.getStore().loadData(result);
									}
								});
							}

						}
					}]
		});// end of the searchPanel
		this.store = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : __ctxPath + '/system/listAppRole.do'
							}),
					reader : new Ext.data.JsonReader({
								root : 'result',
								totalProperty : 'totalCounts',
								id : 'id',
								fields : [{
											name : 'roleId',
											type : 'int'
										}, 'roleName', 'roleDesc', 'roleCode',
										{
											name : 'status',
											type : 'int'
										}, 'isDefaultIn']
							}),
					remoteSort : true
				});// end of store
		this.store.setDefaultSort('roleId', 'desc');
		this.store.load({
					params : {
						start : 0,
						limit : 25
					}
				});
		var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel({
			columns : [sm, new Ext.grid.RowNumberer(), {
						header : 'roleId',
						dataIndex : 'roleId',
						hidden : true
					}, {
						header : "狀態",
						dataIndex : 'status',
						width : 40,
						renderer : function(value) {
							var str = '';
							if (value == '1') {// 激活用户
								str += '<img title="激活" src="'
										+ __ctxPath
										+ '/images/flag/customer/effective.png"/>'
							} else {// 禁用用户
								str += '<img title="禁用" src="'
										+ __ctxPath
										+ '/images/flag/customer/invalid.png"/>'
							}
							return str;
						}
					}, {
						header : "角色名稱",
						dataIndex : 'roleName',
						width : 200
					}, {
						header : "角色代碼",
						dataIndex : 'roleCode',
						width : 200
					}, {
						header : "角色描述",
						dataIndex : 'roleDesc',
						width : 400
					}, {
						header : '管理',
						dataIndex : 'roleId',
						width : 80,
						renderer : function(value, metadata, record, rowIndex,
								colIndex) {
							var editId = record.data.roleId;
							var roleName = record.data.roleName;
							var isDefaultIn = record.data.isDefaultIn;
							var str = '';
							if (editId != -1) {
								// if (isDefaultIn ==
								// '0') {

								if (isGranted('_AppRoleDel'))
									str = '<button title="刪除" value=" " class="btn-del" onclick="AppRoleView.remove('
											+ editId + ')"></button>';
								if (isGranted('_AppRoleEdit'))
									str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="AppRoleView.edit('
											+ editId + ')"></button>';
								if (isGranted('_AppRoleGrant'))
									str += '&nbsp;<button title="授权" value=" " class="btn-grant" onclick="AppRoleView.grant('
											+ editId
											+ ',\''
											+ roleName
											+ '\')">&nbsp;</button>';

							}
							return str;
						}
					}],
			defaults : {
				sortable : true,
				menuDisabled : false,
				width : 100
			}
		});// end of cm

		this.gridPanel = new Ext.grid.GridPanel({
					id : 'AppRoleGrid',
					region : 'center',
					tbar : this.topbar(),
					store : this.store,
					trackMouseOver : true,
					disableSelection : false,
					loadMask : true,
					autoHeight : true,
					cm : cm,
					sm : sm,
					viewConfig : {
						forceFit : true,
						enableRowBody : false,
						showPreview : false
					},
					bbar : new Ext.PagingToolbar({
								pageSize : 25,
								store : this.store,
								displayInfo : true,
								displayMsg : '當前顯示從{0}至{1}，共{2}條記錄',
								emptyMsg : "當前沒有記錄"
							})
				});

		this.gridPanel.addListener('rowdblclick', function(grid, rowindex, e) {
					grid.getSelectionModel().each(function(rec) {
						if (rec.data.isDefaultIn == '0'
								&& rec.data.roleId != -1) {
							AppRoleView.edit(rec.data.roleId);
						}
					});
				});

	}// end of the initUIComponents

});

/**
 * 建立操作的Toolbar
 */
AppRoleView.prototype.topbar = function() {
	var toolbar = new Ext.Toolbar({
				id : 'AppRoleFootBar',
				height : 30,
				bodyStyle : 'text-align:left',
				items : []
			});
	if (isGranted('_AppRoleAdd')) {
		toolbar.add(new Ext.Button({
					iconCls : 'btn-add',
					text : '添加角色',
					handler : function() {
						new AppRoleForm().show();
					}
				}));
	}
	if (isGranted('_AppRoleDel')) {
		toolbar.add(new Ext.Button({
			iconCls : 'btn-del',
			text : '刪除角色',
			handler : function() {
				var grid = Ext.getCmp("AppRoleGrid");
				var selectRecords = grid.getSelectionModel().getSelections();

				if (selectRecords.length == 0) {
					Ext.ux.Toast.msg("刪除確認", "你確定要刪除該角色嗎?");
					return;
				}
				var ids = Array();
				var idsN = '';
				for (var i = 0; i < selectRecords.length; i++) {
					if (selectRecords[i].data.roleId != AppRoleView.COMMON_ROLEID
							&& selectRecords[i].data.roleId != AppRoleView.SUPER_ROLEID) {
						ids.push(selectRecords[i].data.roleId);
					} else {
						idsN += selectRecords[i].data.roleName + ',';
					}
				}
				if (idsN == '') {
					AppRoleView.remove(ids);
				} else {
					Ext.ux.Toast.msg("信息", idsN + "不能被刪除！");
				}
			}
		}));
	}

	return toolbar;
};

/**
 * 刪除单个记录
 */
AppRoleView.remove = function(id) {
	var grid = Ext.getCmp("AppRoleGrid");
	Ext.Msg.confirm('刪除確認', '你確定要刪除該角色嗎？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath + '/system/multiDelAppRole.do',
								params : {
									ids : id
								},
								method : 'post',
								success : function() {
									Ext.ux.Toast.msg("信息", "成功刪除！");
									grid.getStore().reload({
												params : {
													start : 0,
													limit : 25
												}
											});
								}
							});
				}
			});
};

/**
 * 
 */
AppRoleView.edit = function(id) {
	new AppRoleForm({
				roleId : id,
				isCopy : 0
			}).show();// 0代表不是复制
};

AppRoleView.grant = function(id, roleName) {
	new RoleGrantRightView(id, roleName);
};

AppRoleView.copy = function(id) {
	new AppRoleForm({
				roleId : id,
				isCopy : 1
			}).show();// 1代表是复制
};

// 超级管理员的角色ID
AppRoleView.prototype.SUPER_ROLEID = -1;
// 通用角色ID
AppRoleView.prototype.COMMON_ROLEID = -2;
