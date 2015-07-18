Ext.ns('DepartmentView');

var DepartmentView = function() {
	return this.setup();
};

DepartmentView.prototype.setup = function() {
	var selected;
	var store = this.initData();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [sm, new Ext.grid.RowNumberer(), {
					header : "userId",
					dataIndex : 'userId',
					hidden : true
				}, {
					header : "帳號",
					dataIndex : 'username',
					width : 60
				}, {
					header : "用戶名",
					dataIndex : 'fullname',
					width : 60
				}, {
					header : "郵箱",
					dataIndex : 'email',
					width : 120
				}, {
					header : "所屬部門",
					dataIndex : 'department',
					renderer : function(value) {
						if(value==null){
						   return '';
						}else{
						   return value.depName;
						}
					},
					width : 60
				}, {
					header : "所在職位",
					dataIndex : 'position',
					width : 60
				}, {
					header : "入職時間",
					dataIndex : 'accessionTime',
					width : 100
				}],
		defaults : {
			sortable : true,
			menuDisabled : true,
			width : 100
		},
		listeners : {
			hiddenchange : function(cm, colIndex, hidden) {
				saveConfig(colIndex, hidden);
			}
		}
	});

	var grid = new Ext.grid.GridPanel({
				region:'center',
				id : 'UserView',
				height:800,
				title : '帳號基本信息',
				store : store,
				shim : true,
				trackMouseOver : true,
				disableSelection : false,
				loadMask : true,
				cm : cm,
				sm : sm,
				viewConfig : {
					forceFit : true,
					enableRowBody : false,
					showPreview : false
				},
				// paging bar on the bottom
				bbar : new Ext.PagingToolbar({
							pageSize : 25,
							store : store,
							displayInfo : true,
							displayMsg : '當前顯示從{0}至{1}，共{2}條記錄',
							emptyMsg : "當前沒有記錄"
						})
			});
	grid.addListener('rowdblclick', rowdblclickFn);
	function rowdblclickFn(grid, rowindex, e) {
        var rec = grid.getStore().getAt(rowindex);
        new UserSubWindow({
                userId : rec.get('userId'), 
                fullname: rec.get('fullname')
        }).show();
	}
	store.load({
				params : {
					start : 0,
					limit : 25
				}
			});

	var treePanel = new Ext.tree.TreePanel({
				region : 'west',
				id : 'treePanel',
				title : '部門信息',
				collapsible : true,
				autoScroll:true,
				split : true,
				height : 800,
				width : 180,
				tbar : new Ext.Toolbar({
							items : [{
										xtype : 'button',
										iconCls : 'btn-refresh',
										text : '刷新',
										handler : function() {
											treePanel.root.reload();
										}
									}, {
										xtype : 'button',
										text : '展開',
										iconCls : 'btn-expand',
										handler : function() {
											treePanel.expandAll();
										}
									}, {
										xtype : 'button',
										text : '收起',
										iconCls : 'btn-collapse',
										handler : function() {
											treePanel.collapseAll();
										}
									}]
						}),
				loader : new Ext.tree.TreeLoader({
							url : __ctxPath + '/system/listDepartment.do'
						}),
				root : new Ext.tree.AsyncTreeNode({
							expanded : true
						}),
				rootVisible : false,
				listeners : {
					'click' : DepartmentView.clickNode
				}
			});

	if (isGranted('_DepartmentAdd') || isGranted('_DepartmentEdit')
			|| isGranted('_DepartmentDel')) {
		// 树的右键菜单的
		treePanel.on('contextmenu', contextmenu, treePanel);
	}
	// 创建右键菜单
	var treeMenu = new Ext.menu.Menu({
				id : 'DepartmentTreeMenu',
				items : [{
					text : '新建',
					iconCls:'btn-add',
					scope : this,
					handler : createNode
				},{
					text : '修改',
					iconCls:'btn-edit',
					scope : this,
					handler : editNode
				},{
					text : '刪除',
					iconCls:'btn-delete',
					scope : this,
					handler : deteleNode
				}]
			});

	function contextmenu(node, e) {
		selected = new Ext.tree.TreeNode({
					id : node.id,
					text : node.text
				});
		// if(selected.id>0){
		treeMenu.showAt(e.getXY());
		// }
	}

	function createNode() {
		var nodeId = selected.id;
		var departmentForm = Ext.getCmp('departmentForm');
		if (departmentForm == null) {
			if (nodeId > 0) {
				new DepartmentForm({nodeId : nodeId}).show();
			} else {
				new DepartmentForm({nodeId : 0}).show();
			}
		}

	}
	function deteleNode() {
		var depId = selected.id;
		var type = Ext.getCmp('treePanel');
		if (depId > 0) {
			Ext.Msg.confirm('刪除確認', '你確定要刪除?', function(btn) {
						if (btn == 'yes') {
							Ext.Ajax.request({
										url : __ctxPath
												+ '/system/removeDepartment.do?depId='
												+ depId,
										success : function(result,request) {
											var res = Ext.util.JSON.decode(result.responseText);
											if(res.success==false){
											  Ext.ux.Toast.msg('操作信息',res.message);
											}else{
											  Ext.ux.Toast.msg('操作信息','刪除成功!');
											}
											type.root.reload();
										},
										failure : function(result,request){
										}
									});
						}
					});
		} else {
			Ext.ux.Toast.msg('警告', "不能被刪除");
		}
	}
	function editNode() {
		var depId = selected.id;
		if (depId > 0) {
			var departmentForm = Ext.getCmp('departmentForm');
			if (departmentForm == null) {
				new DepartmentForm({
					isEdit:true
				}).show();
				departmentForm = Ext.getCmp('departmentForm');
			}
			departmentForm.form.load({
						url : __ctxPath + '/system/detailDepartment.do',
						params : {
							depId : depId
						},
						method : 'post',
						deferredRender : true,
						layoutOnTabChange : true,
						success : function() {
							var fm = Ext.getCmp('departmentForm');
							var value = fm.getCmpByName('department.appUser.userId').getValue();
							var cmp2 = Ext.getCmp('viceUserId');
							cmp2.setValue(value);
						},
						failure : function() {
							Ext.ux.Toast.msg('編輯', '載入失敗');
						}
					});
		} else {
			Ext.ux.Toast.msg('警告', "不能修改！");
		}

	}

	var panel = new Ext.Panel({
				id : 'DepartmentView',
				title : '組織信息',
				closable : true,
				iconCls : 'menu-department',
				layout : 'border',
				items : [treePanel, grid]
			});

	return panel;

};

DepartmentView.prototype.initData = function() {
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/system/listAppUser.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							id : 'id',
							fields : [{
										name : 'userId',
										type : 'int'
									}, 'username', 'fullname', 'email',
									'department', 'title',// 性别
									'position', {
										name : 'accessionTime'
									}, {
										name : 'status',
										type : 'int'
									}]
						}),
				remoteSort : true
			});
	store.setDefaultSort('id', 'desc');
	return store;
};

/**
 * 初始化
 * 
 * @return {}
 */

/**
 * 用户刪除
 * 
 * @param {}
 *            userId
 */
DepartmentView.remove = function(userId) {
	Ext.Msg.confirm('刪除確認', '你確定要刪除該部門嗎?', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath + '/system/multiDelAppUser.do',
								method : 'post',
								params : {
									ids : userId
								},
								success : function(response) {
									var result = Ext.util.JSON.decode(response.responseText);
									if(result.msg == ''){
										Ext.ux.Toast.msg("操作信息", "用户刪除成功");
									}else{
										Ext.ux.Toast.msg("操作信息", result.msg);
									}
									Ext.getCmp('UserView').getStore().reload();
								},
								failure : function() {
									Ext.ux.Toast.msg("操作信息", "用户刪除失敗");
								}
							});
				}
			});

};

DepartmentView.clickNode = function(node) {
	if (node != null) {
		var users = Ext.getCmp('UserView');
		var store = users.getStore();
		store.url = __ctxPath + '/system/listAppUser.do';
		store.baseParams = {
			'Q_employee.department.depId_L_EQ' : node.id
		};
		store.params = {
			start : 0,
			limit : 25
		};
		store.reload({
					params : {
						start : 0,
						limit : 25
					}
				});
	}

};
