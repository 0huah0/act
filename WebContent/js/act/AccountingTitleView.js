Ext.ns('AccountingTitleView');
AccountingTitleView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		AccountingTitleView.superclass.constructor.call(this, {
					id : 'AccountingTitleView',
					title : '會計科目管理',
					iconCls : 'menu-planmanage',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},
	initUIComponents : function() {
		this.searchPanel = new Ext.FormPanel({
			height : 115,
			frame : true,
			region : 'north',
			id : 'AccountingTitleSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('AccountingTitleSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('AccountingTitleGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('AccountingTitleSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '會計科目查詢',
				layout : 'form',
				items : [{
					layout : 'column',
					columnWidth : 0.3,
					defaults : {
						layout : 'form',
						padding : '0 0 0 40px',
						labelAlign:'right',
						labelWidth:80,
						defaults : {
							xtype : 'textfield',
							width : 140
						}
					},
					items : [{
								items : [{
											fieldLabel : '科目代號',
											name : 'Q_code_S_LK'
										}]
							}, {
								items : [{
											fieldLabel : '科目名稱',
											name : 'Q_name_S_LK'
										}]
							}, {
								items : [{
									xtype:'hidden',
									id:'parent_parentId',
									name:'Q_parent.id_L_EQ'
								},new TreeSelector(
										'actTreeSelector',
										__ctxPath + '/act/treeAccountingTitle.do?Q_=',
										'父類科目', 'parent_parentId', true)]
							}]
				}]
			}]
		});
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/act/listAccountingTitle.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['id', 'code', 'name', 'nameEn','parName', 'remark',
							'createDate', 'updateDate','isBasic']
				});
		this.store.setDefaultSort('code', 'asc');
		this.store.load({
					params : {
						start : 0,
						limit : 25
					}
				});
		var cm = new Ext.grid.ColumnModel({
			columns : [new Ext.grid.RowNumberer(), {
						header : '科目代號',
						dataIndex : 'code'
					}, {
						header : '科目名稱',
						width : 120,
						dataIndex : 'name'
					}, {
						header : "英文名稱",
						width : 120,
						dataIndex : 'nameEn'
					}, {
						header : '父類科目',
						width : 120,
						dataIndex : 'parName'
					}, {
						header : "新增日期",
						dataIndex : 'createDate'
					}, {
						header : "修改日期",
						dataIndex : 'updateDate'
					}, {
						header : "備註",
						id:'remark1',
						dataIndex : 'remark'
					}, {
						header : '管理',
						dataIndex : 'id',
						renderer : function(v,m,r) {
							var str = '';
							if (isGranted('_AccountingTitleEdit'))
								str = '&nbsp;<button title="修改" value=" " class="btn-edit" onclick="AccountingTitleView.edit('
										+ v + ')"></button>';
							if (isGranted('_AccountingTitleDel') && r.get('isBasic')!=1)
								str += '<button title="刪除" value=" " class="btn-del" onclick="AccountingTitleView.remove('
										+ v + ')"></button>';
							return str;
						}
					}],
			defaults : {
				sortable : true,
				menuDisabled : false,
				width : 80
			}
		});

		this.gridPanel = new Ext.grid.GridPanel({
					id : 'AccountingTitleGrid',
					region : 'center',
					tbar : (isGranted('_AccountingTitleAdd') ? new Ext.Toolbar({
								id : 'AccountingTitleFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增會計科目',
											handler : function() {
												new AccountingTitleForm()
														.show();
											}
										})]
							}) : null),
					store : this.store,
					autoExpandColumn :'remark1',
					loadMask : true,
					autoHeight : true,
					cm : cm,
					bbar : new Ext.PagingToolbar({
								pageSize : 25,
								store : this.store,
								displayInfo : true,
								displayMsg : '當前顯示從{0}至{1}，共{2}條記錄',
								emptyMsg : "無記錄"
							})
				});
	}
});

AccountingTitleView.remove = function(id) {
	var grid = Ext.getCmp("AccountingTitleGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆會計科目？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath
						+ '/act/multiDelAccountingTitle.do',
				params : {
					ids : id
				},
				method : 'post',
				success : function(response, options) {
					var dbJson = eval("(" + response.responseText + ")");
	                if(dbJson.success){
						Ext.ux.Toast.msg("信息", "成功刪除！");
						grid.getStore().reload({
							params : {
								start : 0,
								limit : 25
							}
						});
					}else{
						Ext.Msg.alert("信息", "該項已經被使用，不能刪除！");
					}
				}
			});
		}
	});
};

AccountingTitleView.edit = function(id) {
	new AccountingTitleForm({
				recId : id
			}).show();
};
