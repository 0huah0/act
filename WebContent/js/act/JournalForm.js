Ext.ns('JournalView');
JournalView.removeDetail = function(id){
	var st = Ext.getCmp('JournalDetailGrid');
	st.newRec = null;
	st.getStore().removeAt(id);
	st.getView().refresh();
}
JournalForm = Ext.extend(Ext.Window, {
	formPanel : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		var title = '';
		this.initUIComponents();
		JournalForm.superclass.constructor.call(this, {
			layout : 'fit',
			items : this.formPanel,
			modal : true,
			width:800,
			height:460,
			id : 'JournalFormWin',
			title : this.isWatch?'查看日記帳':this.recId?'修改日記帳':'新增日記帳',
			iconCls : 'menu-holidayRecord',
			buttonAlign : 'center',
			buttons : this.buttons
		});
	},
	initUIComponents : function() {
		this.isWatch = !!this.isWatch;
		var dgConfig = {
					id : 'JournalDetailGrid',
					region : 'center',
					lastCode:null,
					width:750,
					height:200,
					newRec:null,
					clicksToEdit:1,
					tbar : [{
			            text: '新增明細',
			            iconCls : 'btn-add',
			            disabled:this.isWatch,
			            handler : function(){
			            	var newRec = detailsGrid.newRec;
			            	var not_i = 0;
			            	if(newRec){
			            		if(!newRec.get('code')){
			            			not_i = 1;
			            		}else if(newRec.get('debitAmount') == 0 && newRec.get('creditAmount') == 0){
			            			not_i = 3;
			            		}
			            	}
			            	var c = detailsGrid.store.getCount();
			            	detailsGrid.stopEditing();
			            	if(!newRec||not_i==0){
			        			var Record = detailsGrid.getStore().recordType;
				                detailsGrid.newRec = newRec = new Record({
				                    code: '',
				                    name: '',
				                    debitAmount : 0,
				                    creditAmount:0,
				                    brief: ''
				                });
				                detailsGrid.store.insert(c, newRec);
				                detailsGrid.startEditing(c, 1);	
			            	}else{
			        		   	detailsGrid.startEditing(c-1, not_i);
			            	}
			            }
			        }],
					store : new Ext.data.JsonStore({
						fields: ['id','code','name','debitAmount','creditAmount','brief']
					}),
					cm : new Ext.grid.ColumnModel({
							columns : [new Ext.grid.RowNumberer(), {
								header : '會計科目',
								dataIndex : 'name',
								editor: new TreeSelector('actTreeSelector2',
									__ctxPath+ '/act/treeAccountingTitle.do',
									'父類科目', 'actTitle.parName', false
									,function(node){
										detailsGrid.lastCode = node.attributes.code;
										detailsGrid.lastName = node.attributes.name;
								})
							}, {
								header : '科目代碼',
								dataIndex : 'code'
							}, {
								header : "借方金額",
								dataIndex : 'debitAmount',
					            editor: new Ext.form.NumberField({
					                allowBlank: false,
					                allowNegative: false
					            })
							}, {
								header : '貸方金額',
								dataIndex : 'creditAmount',
					            editor: new Ext.form.NumberField({
					                allowBlank: false,
					                allowNegative: false
					            })
							}, {
								header : "摘要",
								dataIndex : 'brief',
								width : 100,
					            editor: new Ext.form.TextField({
					            	maxLength: 150
					            })
							}, {
								header : '管理',
								dataIndex : 'id',
								width : 60,
								renderer : function(v,m,r,i) {
									return '<button title="刪除" class="btn-del" onclick="JournalView.removeDetail('+i+');"></button>';
								}
							}],
							defaults : {
								sortable : true,
								menuDisabled : false
							}
						}),
						listeners : {
							afteredit:function(e){
								if(e.field=='name'){
									e.record.set('code',detailsGrid.lastCode);
									e.record.set('name',detailsGrid.lastName);
								}else if(e.field=='debitAmount'){
									e.record.set('creditAmount',0);
								}else if(e.field=='creditAmount'){
									e.record.set('debitAmount',0);
								}
							}
						}
				};
		
		
		var saveBut = {
				text : '保存',
				iconCls : 'btn-save',
				disabled:this.isWatch,
				handler : function() {
					var st = detailsGrid.getStore();
					if(st.getCount() == 0){
						Ext.Msg.alert('提示','請添加明細記錄！');
						return;
					}
					var newRec = detailsGrid.newRec;
					if(newRec){
						var not_i=0;
	            		if(!newRec.get('code')){
	            			not_i = 1;
	            		}else if(newRec.get('debitAmount') == 0 && newRec.get('creditAmount') == 0){
	            			not_i = 3;
	            		}
	            		if(not_i!=0){
            				detailsGrid.startEditing(st.getCount()-1, not_i);
	            			return;
	            		}
	            	}	            	
					var details = [];
					st.each(function(rec){
						details.push({
							id:rec.get('id'),
							code:rec.get('code'),
							name:rec.get('name'),
							debitAmount:rec.get('debitAmount'),
							creditAmount:rec.get('creditAmount'),
							brief:rec.get('brief')
						});
					});
					var detailStr=Ext.util.JSON.encode(details);
					var fp = Ext.getCmp("JournalForm");
					if (fp.getForm().isValid()) {
						fp.getForm().submit({
							method : 'post',
							waitMsg : '正在提交數據...',
							params:{
								detailStr:detailStr
							},
							success : function(fp, action) {
								Ext.ux.Toast.msg('信息', '成功保存信息!');
								Ext.getCmp('JournalFormWin').close();
								Ext.getCmp('JournalGrid').getStore().reload();							
							},
							failure : function(fp, action) {
								//alert(action.result.msg);
								if(!action.result.msg){
									Ext.Msg.alert('信息','數據保存失敗!');
								}else{
									Ext.Msg.alert('提示','傳票編號重複，請仔細核對！');
								}	
							}
						});
					}
				}
			};
		var cancelBut = {
				text : '取消',
				iconCls : 'btn-cancel',
				handler : function() {
					Ext.getCmp('JournalFormWin').close();
				}
			};
			
		if(!this.recId){//add
			this.buttons = [ saveBut,{
				text : '清空',
				iconCls : 'btn-reset',
				handler : function() {
					detailsGrid.getStore().removeAll(); 
					Ext.getCmp('JournalForm').getForm().reset();
				}
			},cancelBut];
			
		}else if(!this.isWatch){//alter
			this.buttons = [saveBut,cancelBut];
		}else{//watch
			this.buttons = [cancelBut];
			dgConfig.tbar = null;
			dgConfig.cm = new Ext.grid.ColumnModel({
						columns : [new Ext.grid.RowNumberer(), {
							header : '會計科目',
							dataIndex : 'name'
						}, {
							header : '科目代碼',
							dataIndex : 'code'
						}, {
							header : "借方金額",
							dataIndex : 'debitAmount'
						}, {
							header : '貸方金額',
							dataIndex : 'creditAmount'
						}, {
							header : "摘要",
							dataIndex : 'brief'
						}],
						defaults : {
							sortable : true,
							menuDisabled : false
						}
					});
		}
		
		var detailsGrid = new Ext.grid.EditorGridPanel (dgConfig);
		
		
		this.formPanel = new Ext.FormPanel({
			url : __ctxPath + '/act/saveJournal.do',
			id : 'JournalForm',
			frame : true,
			items : [{
				xtype : 'fieldset',
				title : '日記帳資訊：主體',
				labelAlign:'right',
				labelWidth:60,
				items : [{
					layout : 'column',
					columnWidth : .33,
					defaults : {
						layout : 'form',
						padding : '0 0 0 10px',
						labelAlign:'right',
						labelWidth:60,
						defaults : {
							disabled:this.isWatch,
							xtype : 'textfield',
							allowBlank:false,
							width : 100
						}
					},
					items : [{
								items : [ {
									disabled:this.recId,
									fieldLabel : '傳票編號',
									maxLength:18,
									name : 'journal.refNo',
									id : 'refNo'
								}, {
									disabled:true,
									xtype:this.isWatch?'combo':'hidden',
									fieldLabel : '是否過帳',
									mode : 'local',
									store:[[0,'未過帳'],[1,'已過帳']],
									id : 'isPost'
								}]
							},{
								items:[{
									fieldLabel : '記帳類型',
									xtype:'combo',
									mode : 'local',
									triggerAction : 'all',
									editable : false,
									store : JournalView_TypeData,
									hiddenName : 'journal.type',
									id : 'type'
								},{
									disabled:true,
									xtype:this.isWatch?'combo':'hidden',
									fieldLabel : '資料來源',
									mode : 'local',
									store:[['act','會計系統'],['','其他']],
									id : 'dataFrom'
								}]
							}, {
								items : [ {
									fieldLabel : '傳票日期',
									xtype:'datefield',
									editable : false,
									format:'Y-m-d',
									name : 'journal.refDate',
									id : 'refDate'
								}]
							}]
				},{
					layout : 'form',
					padding : '0 0 0 10px',
					labelAlign:'right',
					labelWidth:60,
					items:[{
						disabled:this.isWatch,
						fieldLabel : '摘　　要',
						xtype : 'textarea',
						width : 450,
						name : 'journal.brief',
						maxLength:150,
						id : 'brief'
					},{
						xtype : 'hidden',
						name : 'journal.id',
						value:this.recId||''
					}]	
					
				}]
			},{
				xtype : 'fieldset',
				title : '日記帳資訊：明细',
				items : [detailsGrid]
			}]
		});

		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath
						+ '/act/getJournal.do?recId='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {
					detailsGrid.store.loadData(action.result.data.details);
				}
			});
		}
	}
});