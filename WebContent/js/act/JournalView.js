Ext.ns('JournalView');
//var JournalView_TypeData=[['1', '日常分錄'], ['2', '調整分錄'],['3','更新分錄'],['4','結帳分錄(結清)'],['5','結帳分錄(結轉)'],['6','開帳分錄']];
var JournalView_TypeData=[['1', '日常分錄'], ['2', '調整分錄'],['3','更新分錄']];
JournalView = Ext.extend(Ext.Panel, {
	searchPanel : null,
	gridPanel : null,
	store : null,
	topbar : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		JournalView.superclass.constructor.call(this, {
					id : 'JournalView',
					title : '日記帳管理',
					iconCls : 'menu-holidayRecord',
					region : 'center',
					layout : 'border',
					items : [this.searchPanel, this.gridPanel]
				});
	},
	initUIComponents : function() {
		this.searchPanel = new Ext.FormPanel({
			height : 145,
			frame : true,
			region : 'north',
			id : 'JournalSearchForm',
			buttonAlign : 'center',
			buttons : [{
						xtype : 'button',
						text : '查詢',
						iconCls : 'search',
						handler : function() {
							var searchPanel = Ext.getCmp('JournalSearchForm');
							if (searchPanel.getForm().isValid()) {
								$search({
									searchPanel : searchPanel,
									gridPanel : Ext.getCmp('JournalGrid')
								});
							}
						}
					}, {
						xtype : 'button',
						text : '清除',
						iconCls : 'reset',
						handler : function() {
							Ext.getCmp('JournalSearchForm').getForm().reset();
						}
					}],
			items : [{
				xtype : 'fieldset',
				title : '日記帳查詢',
				items : [{
					layout : 'column',
					columnWidth : .25,
					defaults : {
						padding : '0 0 0 10px',
						labelAlign:'right',
						labelWidth:70,
						layout : 'form'
					},
					items : [{
								items : [{
											fieldLabel : '傳票編號',
											xtype : 'textfield',
											name : 'Q_refNo_S_LK'
										},{
											fieldLabel : '摘　　要',
											xtype : 'textfield',
											name : 'Q_brief_S_LK'
										}]
							}, {
								defaults : {
									xtype:'combo',
									mode : 'local',
									triggerAction : 'all',
									width:120,
									editable : false
								},
								items : [{
											fieldLabel : '日記帳類型',
											hiddenName : 'Q_type_N_EQ',
											store: [['','所有分錄']].concat(JournalView_TypeData)
										},{
											fieldLabel : '是否過帳',
											hiddenName : 'Q_isPost_N_EQ',
											store:[['','所有'],['0','否'],['1','是']]
										}]
							}, {
								items : [{
											fieldLabel : '傳票日期',
											xtype:'datefield',
											format:'Y-m-d',
											editable : false,
											id:'startDate',
											name : 'Q_refDate_D_GE',
											listeners : {
												'change' : function() {
													Ext.getCmp('endDate').setMinValue(this.getValue());
												}
											}
										}]
							},{
								labelAlign:'center',
								labelWidth:20,
								items : [{
											fieldLabel : '到',
											labelSeparator:'', 
											xtype:'datefield',
											format:'Y-m-d',
											editable : false,
											id:'endDate',
											name : 'Q_refDate_D_LE',
											listeners : {
												'change' : function() {
													Ext.getCmp('startDate').setMaxValue(this.getValue());
												}
											}
										}]
							}]
				}]
			}]
		});
		this.store = new Ext.data.JsonStore({
					url : __ctxPath + '/act/listJournal.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['id', 'refNo', 'refDate', 'brief','type', 'isPost']
				});
		this.store.setDefaultSort('refNo', 'asc');
		this.store.load({
					params : {
						start : 0,
						limit : 25
					}
				});
		var cm = new Ext.grid.ColumnModel({
			columns : [new Ext.grid.RowNumberer(), {
						header : '傳票日期',
						dataIndex : 'refDate'
					}, {
						header : '傳票編號',
						dataIndex : 'refNo'
					}, {
						header : "摘　　要",
						id:'brief',
						dataIndex : 'brief'
					}, {
						header : '日記帳類型',
						dataIndex : 'type',
						renderer:function(v){
							for (var i = 0,t = JournalView_TypeData; i < t.length; i++)if(v==t[i][0])return t[i][1];
						}
					}, {
						header : "是否過帳",
						dataIndex : 'isPost',
						renderer : function(v) {																		
							return v==1?'已過帳':'未過帳';
						}
					}, {
						header : '管理',
						dataIndex : 'id',
						renderer : function(v,m,r) {
							var str = '<button title="查看" value=" " class="btn-detail" onclick="new JournalForm({isWatch:true,recId:'+v+'}).show();"></button>';
							if (isGranted('_JournalEdit') && r.get('isPost')!=1)
								str += '&nbsp;<button title="修改" value=" " class="btn-edit" onclick="new JournalForm({recId : '+v+'}).show();"></button>';
							if (isGranted('_JournalDel') && r.get('isPost')!=1)
								str += '&nbsp;<button title="刪除" value=" " class="btn-del" onclick="JournalView.remove('+ v + ')"></button>';																
							return str;
						}
					}],
			defaults : {
				sortable : true,
				menuDisabled : false,
				width : 100
			}
		});

		this.gridPanel = new Ext.grid.GridPanel({
					id : 'JournalGrid',
					region : 'center',
					tbar : (isGranted('_JournalAdd') ? new Ext.Toolbar({
								id : 'JournalFootBar',
								bodyStyle : 'text-align:left',
								items : [new Ext.Button({
											iconCls : 'btn-add',
											text : '新增日記帳',
											handler : function() {
												new JournalForm()
														.show();
											}
										})]
							}) : null),
					store : this.store,
					autoExpandColumn :'brief',
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

JournalView.remove = function(id) {
	var grid = Ext.getCmp("JournalGrid");
	Ext.Msg.confirm('刪除確認', '確定要刪除此筆日記帳？', function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : __ctxPath+ '/act/hardDelJournal.do',
				params : {
					//單筆刪除
					'journal.id' : id
					//多筆刪除
					//ids : id
				},
				method : 'post',
				success : function(response, options) {
					var dbJson = eval("(" + response.responseText + ")");
	                if(dbJson.success){
						Ext.ux.Toast.msg("信息", "成功刪除！");
						grid.getStore().reload();
					}else{
						Ext.Msg.alert("信息", "該項已經被使用，不能刪除！");
					}
				}
			});
		}
	});
};

