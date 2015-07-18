Ext.ns('AppUserView');
/**
 * 用户管理
 * @class AppUserView
 * @extends Ext.Panel
 */
AppUserView=Ext.extend(Ext.Panel,{
	constructor:function(config){
		Ext.applyIf(this,config);
		this.initUIComponents();
		AppUserView.superclass.constructor.call(this,{
			id : 'AppUserView',
			title : '帳號信息',
			iconCls:'menu-appuser',
			autoScroll : true
		});
	},
	initUIComponents:function(){
		this.initSearchPanel();
		this.initGridPanel();

		var addUser = new AppUserForm('添加帳號');
		this.items=[this.searchPanel,this.gridPanel, addUser];
	},
	onSearch:function(obj){
							var searchPanel = Ext.getCmp('AppUserSearchForm');
		
							var gridPanel = Ext.getCmp('AppUserGrid');
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
AppUserView.prototype.initSearchPanel=function(){
	this.searchPanel=new Ext.FormPanel({
			height : 45,
			frame : true,
			border:false,
			id : 'AppUserSearchForm',
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
						text : '用戶帳號：',
						style:'margin-left:10px',
						width:60
					}, {
						xtype : 'textfield',
						name : 'Q_username_S_LK',
						width:90
					}, {
						text : '用戶姓名：',
						style:'margin-left:30px',
						width:80
					}, {
						xtype : 'textfield',
						name : 'Q_fullname_S_LK',
						width:90
					},	{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						style:'margin-left:30px',
						scope:this,
						handler : this.onSearch.createCallback(this)
					}
					]
		});//end of search panel
};

AppUserView.prototype.initGridPanel=function(){
		
	this.toolbar = new Ext.Toolbar({
			height : 30,
			items : []
		});
	if (isGranted('_AppUserAdd')) {
		this.toolbar.add(new Ext.Button({
					text : '添加帳號',
					iconCls : 'add-user',
					handler : function() {
						Ext.getCmp('AppUserForm').getForm().reset();
						Ext.getCmp('chooseRoles').getStore().load();    
						Ext.getCmp('appUser.username').getEl().dom.readOnly = false;
						Ext.getCmp('employee.empCode').getEl().dom.readOnly = false;
						Ext.getCmp('employee.sex').setValue("1");
						Ext.getCmp('appUserStatus').setValue("1");
						Ext.getCmp('resetPassword').hide();
						Ext.getCmp('appUser.password').show();
					}
				}));
	}
	if (isGranted('_AppUserDel')) {
			this.toolbar.add(new Ext.Button({
					iconCls : 'btn-del',
					text : '刪除帳號',
					handler : function() {
						var grid = Ext.getCmp("AppUserGrid");

						var selectRecords = grid.getSelectionModel()
								.getSelections();

						if (selectRecords.length == 0) {
							Ext.ux.Toast.msg("刪除確認", "你確定要刪除該用戶嗎？");
							return;
						}
						var ids = Array();
						var idsN = '';
						for (var i = 0; i < selectRecords.length; i++) {
							if (selectRecords[i].data.userId != 1) {
								ids.push(selectRecords[i].data.userId);
							} else {
								idsN += selectRecords[i].data.fullname + ',';
							}
						}
						if (idsN == '') {
							AppUserView.remove(ids);
						} else {
							Ext.ux.Toast.msg("信息", idsN + "不能被刪除");
						}
					}
				}));
	}
		
		var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : __ctxPath + '/system/listAppUser.do'
						}),
				reader : new Ext.data.JsonReader({
							root : 'result',
							totalProperty : 'totalCounts',
							fields : [{
										name : 'userId',
										type : 'int'
									}, 'username', 'password', 'fullname','address',
									'email', 'department', 'title',// 性别
									'position', {
										name : 'accessionTime'
									}, {
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
						limit : 10
					}
		});
		var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel({
			columns : [sm, new Ext.grid.RowNumberer(), {
						header : "userId",
						dataIndex : 'userId',
						hidden : true
					},{
						header : "狀態",
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
						header : "用戶帳號",
						dataIndex : 'username',
						width : 60
					}, {
						header : "用戶姓名",
						dataIndex : 'fullname',
						width : 60
					}, {
						header : '管理',
						dataIndex : 'userId',
						sortable:false,
						width : 60,
						renderer : function(value, metadata, record, rowIndex,
								colIndex) {
							var editId = record.data.userId;
							var editName = record.data.username;
							var editPassword = record.data.password;
							var str='';
							if(editId!=curUserInfo.userId){
								if (isGranted('_AppUserDel')) {
									str += '<button title="刪除" value=" " class="btn-del" onclick="AppUserView.remove('
											+ editId + ')"></button>';
								}
								if(isGranted('_AppUserReset')){
									str += '&nbsp;<button title="重置密碼" value=" " class="btn-password" onclick="AppUserView.reset('
											+ editId + ',\''+editName+'\')"></button>';
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
					id : 'AppUserGrid',
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
								pageSize : 10,
								store : store,
								displayInfo : true,
								displayMsg : '當前顯示從{0}至{1}， 共{2}條記錄',
								emptyMsg : "當前沒有記錄"
							})
				});
		// 为Grid增加双击事件,双击行可编辑
		this.gridPanel.addListener('rowclick', rowclickFn);
		var gridPanel=this.gridPanel;
		function rowclickFn(gridPanel, rowindex, e) {
			gridPanel.getSelectionModel().each(function(rec) {
				var userId=rec.data.userId;
		        if(isGranted('_AppUserEdit')&&userId!=1){
					AppUserView.edit(userId, rec.data.username);
//		        	AppUserView.edit(userId);
		        }
			});
		}
};//end of the init GridPanel


/**
 * 用户刪除
 * 
 * @param {}
 *            userId
 */
AppUserView.remove = function(_ids) {
	Ext.Msg.confirm('刪除確認', '你確定要刪除該用戶嗎？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : __ctxPath + '/system/multiDelAppUser.do',
								method : 'post',
								params : {
									ids : _ids
								},
								success : function(response) {
									var result = Ext.util.JSON.decode(response.responseText);
									if(result.msg == ''){
										Ext.ux.Toast.msg("操作信息", "用户刪除成功");
									}else{
										Ext.ux.Toast.msg("操作信息", result.msg);
									}
									Ext.getCmp('AppUserGrid').getStore().reload();
								},
								failure : function() {
									Ext.ux.Toast.msg("操作信息", "用户刪除失敗");
								}
							});
				}
			});

};

AppUserView.agent=function(userId,username){
	new UserAgentWindow({userId:userId,username:username}).show();
};

AppUserView.reset=function(userId){
	new changePasswordForm(userId);
};

AppUserView.add = function(userId,username){
	new UserSubWindow({userId:userId,username:username}).show();
};
/**
 * 用户编辑
 * 
 * @param {}
 *            userId
 */
AppUserView.edit = function(userId) {
	// 只允许有一个编辑窗口
	var edit = Ext.getCmp('AppUserForm');

	// 不可显示密码,不能修改账号
	var appUserMustInfo = Ext.getCmp('AppUserMustInfo');
	//appUserMustInfo.remove('appUser.password');
	Ext.getCmp('appUser.password').hide();
	Ext.getCmp('appUser.username').getEl().dom.readOnly = true;
	Ext.getCmp('employee.empCode').getEl().dom.readOnly = true;
	appUserMustInfo.doLayout(true);
	
	Ext.getCmp('resetPassword').show();
	Ext.getCmp('chooseRoles').getStore().load({params:{userId:userId}});
	//显示所选角色
	Ext.getCmp('selectedRoles').getStore().load({params:{userId:userId}});    
	
	// 往编辑窗口中填充新闻数据
	edit.form.load({
				url : __ctxPath + '/system/getAppUser.do',
				params : {
					userId : userId
				},
				method : 'post',
				//waitMsg : '正在载入数据...',
				success : function(edit, o) {
					var appUser = Ext.util.JSON.decode(o.response.responseText).data;
					// 载入部门信息
					Ext.getCmp('depTreeSelector').setValue(appUser.employee.department.depName);
				},
				failure : function() {
					Ext.ux.Toast.msg('編輯', '載入失败');
				}
				});
}
