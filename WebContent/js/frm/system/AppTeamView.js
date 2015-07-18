/**
 * @author:
 * @class AppTeamView
 * @extends Ext.Panel
 * @description [AppTeam]管理
 * @company 广州宏天软件有限公司
 * @createtime:
 */
AppTeamView = Ext.extend(Ext.Panel, {
	// 构造函数
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		// 初始化组件
		this.initUIComponents();
		// 调用父类构造
		AppTeamView.superclass.constructor.call(this, {
			id : 'AppTeamView',
			title : '我的群组管理',
			region : 'center',
			layout : 'border',
			items : [ this.searchPanel, this.gridPanel ]
		});
	},// end of constructor
	// 初始化组件
	initUIComponents : function() {
		// 初始化搜索条件Panel
		this.searchPanel = new HT.SearchPanel( {
			height:38,
			region:'north',
			layout:'hbox',
			bodyStyle:'padding:6px 2px 2px 2px',
			layoutConfigs:{
				align:'middle'
			},
			defaultType:'label',
			defaults:{
				margins:'0 4 0 4'
			},
			items : [ 
			    {
			    		text:'群组名称:'
			    },{
				name : 'Q_teamName_S_EQ',
				xtype : 'textfield',
				width:200
			}, {
				text : '查询',
				iconCls : 'btn-search',
				handler : this.search,
				xtype : 'button'
			}]
		});// end of searchPanel

		this.topbar = new Ext.Toolbar( {
			items : [ {
				iconCls : 'btn-add',
				text : '添加群组',
				xtype : 'button',
				scope : this,
				handler : this.createRs
			}, {
				iconCls : 'btn-del',
				text : '删除群组',
				xtype : 'button',
				scope : this,
				handler : this.removeSelRs
			} ]
		});

		this.gridPanel = new HT.GridPanel( {
			region : 'center',
			tbar : this.topbar,
			// 使用RowActions
			rowActions : true,
			id : 'AppTeamGrid',
			url : __ctxPath + "/system/listAppTeam.do",
			fields : [ {
				name : 'teamId',
				type : 'int'
			}, 'teamName', 'teamDesc', 'creatorId', 'createTime' ],
			columns : [ {
				header : 'teamId',
				dataIndex : 'teamId',
				hidden : true
			}, {
				header : '群组名称',
				dataIndex : 'teamName',
				width : 80
			}, {
				header : '群组描述',
				dataIndex : 'teamDesc',
				width : 150
			}, {
				header : 'creatorId',
				dataIndex : 'creatorId',
				hidden : true
			}, {
				header : '创建时间',
				dataIndex : 'createTime',
				width : 100
			}, new Ext.ux.grid.RowActions( {
				header : '管理',
				width : 150,
				actions : [ {
					iconCls : 'btn-del',
					qtip : '删除',
					style : 'margin:0 3px 0 3px'
				}, {
					iconCls : 'btn-edit',
					qtip : '编辑',
					style : 'margin:0 3px 0 3px'
				}, {
					iconCls : 'btn-showDetail',
					qtip : '组员管理',
					style : 'margin:0 3px 0 3px'
				} ],
				listeners : {
					scope : this,
					'action' : this.onRowAction
				}
			}) ]
		// end of columns
				});

		this.gridPanel.addListener('rowdblclick', this.rowClick);

	},// end of the initComponents()
	// 重置查询表单
	reset : function() {
		this.searchPanel.getForm().reset();
	},
	// 按条件搜索
	search : function() {
		$search( {
			searchPanel : this.searchPanel,
			gridPanel : this.gridPanel
		});
	},
	// GridPanel行点击处理事件
	rowClick : function(grid, rowindex, e) {
		grid.getSelectionModel().each(function(rec) {
			new AppTeamForm( {
				teamId : rec.data.teamId
			}).show();
		});
	},
	// 创建记录
	createRs : function() {
		new AppTeamForm().show();
	},
	// 按ID删除记录
	removeRs : function(id) {
		$postDel( {
			url : __ctxPath + '/system/multiDelAppTeam.do',
			ids : id,
			grid : this.gridPanel
		});
	},
	// 把选中ID删除
	removeSelRs : function() {
		$delGridRs( {
			url : __ctxPath + '/system/multiDelAppTeam.do',
			grid : this.gridPanel,
			idName : 'teamId'
		});
	},
	// 编辑Rs
	editRs : function(record) {
		new AppTeamForm( {
			teamId : record.data.teamId
		}).show();
	},
	
	// 成员管理Rs
	manMem : function(record) {
		new TeamMemberForm( {
			teamId : record.data.teamId
		}).show();
	},
	
	// 行的Action
	onRowAction : function(grid, record, action, row, col) {
		switch (action) {
		case 'btn-del':
			this.removeRs.call(this, record.data.teamId);
			break;
		case 'btn-edit':
			this.editRs.call(this, record);
			break;
		case 'btn-showDetail':
			this.manMem.call(this, record);
			break;
		default:
			break;
		}
	}
});
