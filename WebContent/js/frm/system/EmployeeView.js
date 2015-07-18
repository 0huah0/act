/**
 * 员工管理
 * @class EmployeeView
 * @extends Ext.Panel
 */
EmployeeView=Ext.extend(Ext.Panel,{
	constructor:function(config){
		Ext.applyIf(this,config);
		this.initUIComponents();
		EmployeeView.superclass.constructor.call(this,{
			id : 'EmployeeView',
			title : '员工信息',
			iconCls:'menu-appuser',
			autoScroll : true
		});
	},
	initUIComponents:function(){
		this.initSearchPanel();
		this.initGridPanel();

		this.items=[this.searchPanel,this.gridPanel];
	},
	onSearch:function(obj){
							var searchPanel = Ext.getCmp('EmployeeSearchForm');
		
							var gridPanel = Ext.getCmp('EmployeeGrid');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel :searchPanel,
									gridPanel : gridPanel
								});
							}
	}
});

/**
 * 初始化SearchPanel
 */
EmployeeView.prototype.initSearchPanel=function(){
	this.searchPanel=new Ext.FormPanel({
			height : 45,
			frame : true,
			border:false,
			id : 'EmployeeSearchForm',
			layout : 'hbox',
			layoutConfig: {
                    padding:'5',
                    align:'middle'
            },
			defaults : {
				xtype : 'label',
				border:false,
				margins:{top:0, right:4, bottom:4, left:4}
			},
			
			items : [ {
						text : '员工编号：',
						style:'margin-left:10px',
						width:60
					}, {
						xtype : 'textfield',
						name : 'Q_empCode_S_LK',
						width:90
					}, {
						text : '用户姓名：',
						style:'margin-left:30px',
						width:80
					}, {
						xtype : 'textfield',
						name : 'Q_fullname_S_LK',
						width:90
					},
					{
						text : '入职时间：从',
						style:'margin-left:30px',
						width:100
					}, {
						xtype : 'datefield',
						format: 'Y-m-d',
						name : 'Q_accessionDate_D_GE'
					}, {
						text : '至'
					},{
						xtype : 'datefield',
						format: 'Y-m-d',
						name : 'Q_accessionDate_D_LE'
					},
					{
						xtype : 'button',
						text : '查询',
						iconCls : 'search',
						style:'margin-left:30px',
						scope:this,
						handler : this.onSearch.createCallback(this)
					}
					]
		});//end of search panel
};

EmployeeView.prototype.initGridPanel=function(){
		
	this.employeeSexRenderer =  function(val, p, record){
		if(val == 0){
			return '女士';
		}else{
			return '先生';
		}
	}
	
	this.toolbar = new Ext.Toolbar({
			height : 30,
			items : []
		});
	if (isGranted('_EmployeeAdd')) {
		this.toolbar.add(new Ext.Button({
					text : '添加用户',
					iconCls : 'add-user',
					handler : function() {
						var tabs = Ext.getCmp('centerTabPanel');
						var addUser = Ext.getCmp('EmployeeForm');
						if (addUser == null) {
							addUser = new EmployeeForm('增加用户');
							tabs.add(addUser);
						} else {
							tabs.remove(addUser)
							addUser = new EmployeeForm('增加用户');
							tabs.add(addUser);
						}
						tabs.activate(addUser);
					}
				}));
	}
	if (isGranted('_EmployeeDel')) {
			this.toolbar.add(new Ext.Button({
					iconCls : 'btn-del',
					text : '删除用户',
					handler : function() {
						var grid = Ext.getCmp("EmployeeGrid");

						var selectRecords = grid.getSelectionModel()
								.getSelections();

						if (selectRecords.length == 0) {
							Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
							return;
						}
						var ids = Array();
						var idsN = '';
						for (var i = 0; i < selectRecords.length; i++) {
							if (selectRecords[i].data.id != 1) {
								ids.push(selectRecords[i].data.id);
							} else {
								idsN += selectRecords[i].data.fullname + ',';
							}
						}
						if (idsN == '') {
							EmployeeView.remove(ids);
						} else {
							Ext.ux.Toast.msg("信息", idsN + "不能被删除！");
						}
					}
				}));
	}

		
		var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/system/listEmployee.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							fields : [{
										name : 'id',
										type : 'int'
									} ,  'fullname','empCode',
									'birthday', 'department', 'sex',// 性别
									{
										name : 'accessionDate'
									}]
						}),
				remoteSort : true
			});
		store.setDefaultSort('id', 'desc');
		
		store.load({
					params : {
						start : 0,
						limit : 25
					}
		});
		var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel({
			columns : [sm, new Ext.grid.RowNumberer(), {
						header : "id",
						dataIndex : 'id',
						hidden : true
					},{
						header : "员工编号",
						dataIndex : 'empCode',
						width : 60
					},{
						header : "用户名",
						dataIndex : 'fullname',
						width : 60
					},{
						header : "性别",
						dataIndex : 'sex',
						renderer : this.employeeSexRenderer,
						width : 60
					}, {
						header : "所属部门",
						dataIndex : 'department',
						renderer : function(value) {
							if(value==null){
							  return '';
							}else{
							  return value.depName;
							}
						},
						width : 60
					},{
						header : "入职时间",
						dataIndex : 'accessionDate',
						width : 60
					},{
						header : "出生日期",
						dataIndex : 'birthday',
						width : 60
					},
					   {
						header : '管理',
						dataIndex : 'userId',
						sortable:false,
						width : 60,
						renderer : function(value, metadata, record, rowIndex,
								colIndex) {
							var editId = record.data.id;
							var editName = record.data.fullname;
							var str='';
							if(editId!=1){
								if (isGranted('_EmployeeDel')) {
									str += '<button title="删除" value=" " class="btn-del" onclick="EmployeeView.remove('
											+ editId + ')"></button>';
								}
								if(isGranted('_EmployeeEdit')){
									str += '&nbsp;<button title="编辑" value=" " class="btn-edit" onclick="EmployeeView.edit('
											+ editId + ',\'' + editName + '\')"></button>';
								}
								if (isGranted('_AppUserShow')) {
									str += '<button title="查看账号" value=" " id="seeBut_'+ editId +'"  class="menu-appuser" onclick="EmployeeView.see('
											+ editId + ',\'seeBut_'+ editId +'\',\''+editName+'\')"></button>';
								}
							}
							return str;
						}
					}],
			defaults : {
				sortable : true,
				menuDisabled : true,
				width : 100
			}
		});
	
		this.gridPanel = new Ext.grid.GridPanel({
					id : 'EmployeeGrid',
					// title:'账号基本信息',
					tbar : this.toolbar,
					store : store,
					autoHeight:true,
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
					bbar : new Ext.PagingToolbar({
								pageSize : 25,
								store : store,
								displayInfo : true,
								displayMsg : '当前显示从{0}至{1}， 共{2}条记录',
								emptyMsg : "当前没有记录"
							})
				});
		// 为Grid增加双击事件,双击行可编辑
		this.gridPanel.addListener('rowdblclick', rowdblclickFn);
		var gridPanel=this.gridPanel;
		function rowdblclickFn(gridPanel, rowindex, e) {
			gridPanel.getSelectionModel().each(function(rec) {
			   var employeeId=rec.data.id;
			        if(isGranted('_EmployeeEdit')&&employeeId!=1){
					EmployeeView.edit(employeeId, rec.data.fullname);
			        }
				});
		}
		
};//end of the init GridPanel


/**
 * 用户删除
 * 
 * @param {}
 *            userId
 */
EmployeeView.remove = function(_ids) {
	Ext.Msg.confirm('删除操作', '你确定要删除该用户吗?', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath + '/system/multiDelEmployee.do',
								method : 'post',
								params : {
									ids : _ids
								},
								success : function(response) {
									var result = Ext.util.JSON.decode(response.responseText);
									if(result.msg == ''){
										Ext.ux.Toast.msg("操作信息", "用户删除成功");
									}else{
										Ext.ux.Toast.msg("操作信息", result.msg);
									}
									Ext.getCmp('EmployeeGrid').getStore().reload();
								},
								failure : function() {
									Ext.ux.Toast.msg("操作信息", "用户删除失败");
								}
							});
				}
			});

};
/**
 * 查看用户账号
 */
EmployeeView.see = function(_ids, butId,editName) {
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : __ctxPath + '/system/getAppUserListByIdEmployee.do?employee.id='+_ids
				}),
		reader : new Ext.data.JsonReader({
					root : 'result',
					totalProperty : 'totalCounts',
					fields : [{
								name : 'userId',
								type : 'int'
							}, 'username', 
							  {
								name : 'status',
								type : 'int'
							}]
				}),
		remoteSort : true
	});
	store.setDefaultSort('userId', 'desc');
	
	store.load({
				params : {
					start : 0,
					limit : 25
				}
	});
//	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		columns : [ new Ext.grid.RowNumberer(), {
					header : "userId",
					dataIndex : 'userId',
					hidden : true
				},{
					header : "状态",
					dataIndex : 'status',
					width : 30,
					renderer : function(value) {
						var str = '';
						if(value == '1'){//激活用户
							str += '<img title="激活" src="'+ __ctxPath +'/images/flag/customer/effective.png"/>'
						}else{//禁用用户
							str += '<img title="禁用" src="'+ __ctxPath +'/images/flag/customer/invalid.png"/>'
						}
						return str;
					}
				}, {
					header : "用戶账号",
					dataIndex : 'username',
					width : 60
				}],
		defaults : {
			sortable : true,
			menuDisabled : true,
			width : 100
		}
	});
	
	var gridPanel = new Ext.grid.GridPanel({
			id : 'EmployeeGrid',
			// title:'账号基本信息',
			tbar : this.toolbar,
			store : store,
		//	autoHeight:true,
			 height:270,
			shim : true,
			trackMouseOver : true,
			disableSelection : false,
			loadMask : true,
			cm : cm,
			//sm : sm,
			viewConfig : {
				forceFit : true,
				enableRowBody : false,
				showPreview : false
			}
		});
	
	//弹出窗口
	 var win;	   
    if(!win){
        win = new Ext.Window({
            //applyTo:'hello-win',
        	title:'员工['+editName+']拥有账号',
            layout:'fit',
            width:500,
            height:300,
            closeAction:'hide',
            plain: true,
            resizable:false,
            modal: true,

            items: [gridPanel],

            buttons: [{
                text:'添加账号',
            	handler: function(){            		
                    win.hide();
                    App.clickTopTab('AppUserView');
                }
            },{
                text: '关闭',
                handler: function(){
                    win.hide();
                }
            }]
        });
    }
    win.show(document.getElementById(butId));	  

};

EmployeeView.agent=function(userId,username){
	new UserAgentWindow({userId:userId,username:username}).show();
};

EmployeeView.reset=function(userId){
	new changePasswordForm(userId);
};

EmployeeView.add = function(userId,username){
	new UserSubWindow({userId:userId,username:username}).show();
};
/**
 * 用户编辑
 * 
 * @param {}
 *            userId
 */
EmployeeView.edit = function(employeeId, fullName) {
	// 只允许有一个编辑窗口
	var tabs = Ext.getCmp('centerTabPanel');
	var edit = Ext.getCmp('EmployeeForm');
	if (edit == null) {
		edit = new EmployeeForm(fullName + '-详细信息', employeeId);
		tabs.add(edit);
	} else {
		tabs.remove('EmployeeForm');
		edit = new EmployeeForm(fullName + '-详细信息', employeeId);
		tabs.add(edit);
	}
	tabs.activate(edit);
	// 不可显示密码,不能修改账号
	var appUserMustInfo = Ext.getCmp('AppUserMustInfo1');
	//appUserMustInfo.remove('password');
	//Ext.getCmp('username').getEl().dom.readOnly = true;
	appUserMustInfo.doLayout(true);
	// 显示修改密码按钮
	var employeeFormToolbar = Ext.getCmp('EmployeeFormToolbar');
	Ext.getCmp('resetPassword').show();
	employeeFormToolbar.doLayout(true);
	// 往编辑窗口中填充数据
	edit.form.load({
				url : __ctxPath + '/system/getEmployee.do',
				params : {
					'employee.id' : employeeId
				},
				method : 'post',
				waitMsg : '正在载入数据...',
				success : function(edit, o) {
					// 载入照片
					var photo = Ext.getCmp('newEmployee.imagePath');
					var display = Ext.getCmp('displayUserPhoto');
					var employeeSex = Ext.getCmp('newEmployee.sex');
					if (photo.value != '' && photo.value !=null && photo.value !='undefined') {
						display.body.update('<img src="' + __ctxPath
								+ '/attachFiles/' + photo.value + '" width="100%" height="100%"/>');
					}else if(employeeSex.value == '0'){
						display.body.update('<img src="' + __ctxPath
								+ '/images/default_image_female.jpg" height="245px" style="padding:5px;" />');
					}
					var employee = Ext.util.JSON.decode(o.response.responseText).data[0];

					// 载入部门信息
					Ext.getCmp('depTreeSelector_employee').setValue(employee.department.depName);
					
				},
				failure : function() {
					Ext.ux.Toast.msg('编辑', '载入失败');
				}
				});
}
EmployeeView.capacityUpdate = function(id) {
	new CapacityUpdateForm({
		userId : id
	}).show();
}
