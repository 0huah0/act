UserAgentWindow=Ext.extend(Ext.Window,{
	constructor:function(conf){
		Ext.apply(this,conf);
		this.initUICmps();
		UserAgentWindow.superclass.constructor.call(this,{
			title:'用户'+conf.username+'代办账号设置',
			modal:true,
			iconCls:'btn-super',
			maximizable : true,
			buttonAlign:'center',
			width:600,
			height:400,
			layout:'border',
			items:[
				this.searchPanel,
				this.centerPanel,
				this.southPanel
			],
			buttons:[
			{
				xtype:'button',
				iconCls:'btn-ok',
				scope:this,
				text:'保存',
				handler:function(){
					var win=this;
					var selGrid=Ext.getCmp('selectedUserGrid');
					var userId=this.userId;
					var store=selGrid.getStore();
					var rows = store.getCount();
					var grantUIds='';
					for(var i=0;i<rows;i++){
						if(i>0){
							grantUIds+=',';
						}
						grantUIds+=store.getAt(i).data.grantUId;
					}
					$request({
						url:__ctxPath+'/system/saveAgentAppUser.do',
						params:{
							grantUIds:grantUIds,
							userId:userId
						},
						success:function(response,options){
							Ext.ux.Toast.msg('操作信息','成功保存代办账号~~');
							win.close();
						}
					});
				}
			},{
				xtype:'button',
				iconCls:'btn-cancel',
				text:'取消',
				scope:this,
				handler:function(){
					this.close();
				}
			}
			]
		});
	},
	initUICmps:function(){
		this.searchPanel=new Ext.FormPanel(
			{
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
				items:[
						{
							text:'用户姓名'
						},
						{
							xtype:'textfield',
							name:'fullname',
							width:260
						},
						{
							xtype:'button',
							text:'查询',
							iconCls:'btn-search',
							scope:this,
							handler:function(){
								var searchPanel=this.searchPanel;
								var gridPanel=Ext.getCmp('contactGrid');
								var store=gridPanel.getStore();
								var baseParam=Ext.Ajax.serializeForm(searchPanel.getForm().getEl());
								var deParams=Ext.urlDecode(baseParam);
								deParams.start=0;
								deParams.limit=store.baseParams.limit;
								deParams.userId=this.userId;
								store.baseParams=deParams;
								gridPanel.getBottomToolbar().moveFirst();
							}
						}
					]
			}
		);//end search panel
		var store=new Ext.data.JsonStore({
							url : __ctxPath + "/system/unAgentAppUser.do",
							root : 'result',
							totalProperty : 'totalCounts',
							baseParams:{
								userId:this.userId,
								start : 0,
								limit : 25
							},
							remoteSort : true,
							fields : [{
											name : 'userId',
											type : 'int'
									   }, 
										'fullname',
										'title']
		});
		store.load();
		
		var sm= new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel({
					columns : [sm, new Ext.grid.RowNumberer(), {
								header : "用户名",
								dataIndex : 'fullname',
								renderer:function(value,meta,record){
									var title=record.data.title;
									if(title==1){
										return '<img src="'+__ctxPath+'/images/flag/man.png"/>&nbsp;'+value;
									}else{
										return '<img src="'+__ctxPath+'/images/flag/women.png"/>&nbsp;'+value;
									}
								},
								width : 60
							}],
					defaults : {
						sortable : true,
						menuDisabled : true,
						width : 120
					}
		});
		
		this.centerPanel= new Ext.grid.EditorGridPanel({
					title:'用户列表',
					autoScroll:true,
					id : 'contactGrid',
					region : 'center',
					height : 370,
					width:240,
					autoWidth:false,
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
					bbar : new Ext.PagingToolbar({
								pageSize : 25,
								store : store,
								displayInfo : true,
								displayMsg : '当前显示从{0}至{1}， 共{2}条记录',
								emptyMsg : "当前没有记录"
							})
				});
		var store2=new Ext.data.JsonStore({
							url : __ctxPath + "/system/agentAppUser.do",
							root : 'result',
							totalProperty : 'totalCounts',
							baseParams:{
								userId:this.userId
							},
							remoteSort : true,
							fields : ['grantUId','grantFullname','grantTitle']
		});
		store2.load();
		var csm = new Ext.grid.CheckboxSelectionModel();		
		var selectedUserGrid = new Ext.grid.EditorGridPanel({
			id : 'selectedUserGrid',
			region:'center',
			title:'代理账号',
			height : 400,
			width:200,
			autoScroll:true,
			store :store2,
			trackMouseOver : true,
			sm:csm,
			columns:[
					csm,
					new Ext.grid.RowNumberer(),
					{
						header : "用户名",
						dataIndex : 'grantFullname',
						renderer:function(value,meta,record){
									var title=record.data.grantTitle;
									if(title=='1'){
										return '<img src="'+__ctxPath+'/images/flag/man.png"/>&nbsp;'+value;
									}else{
										return '<img src="'+__ctxPath+'/images/flag/women.png"/>&nbsp;'+value;
									}
						}
					}
			]
		});
		
		this.southPanel=new Ext.Panel({
			width:200,
			region:'east',
			layout:'border',
			border:false,
			items:[
				new Ext.Panel({
					width:35,
					height:430,
					region:'west',
					layout: {
                                type:'vbox',
                                pack:'center',
                                align:'stretch'
                            },
                    defaults:{margins:'0 0 5 0'},
					items:[
						{
							xtype:'button',
							iconCls:'add-all',
							text:'',
							handler:function(){
								var contactGrid = Ext.getCmp('contactGrid');
								var selGrid=Ext.getCmp('selectedUserGrid');
								var selStore=selGrid.getStore();
								var rows = contactGrid.getSelectionModel().getSelections();
								for(var i=0;i<rows.length;i++){
									
									var userId=rows[i].data.userId;
									var fullname=rows[i].data.fullname;
									var title=rows[i].data.title;
									var isExist=false;
									//查找是否存在该记录
									for(var j=0;j<selStore.getCount();j++){
										if(selStore.getAt(j).data.grantUId==userId){
											isExist=true;
											break;
										}
									}
									if(!isExist){
										var newData={grantUId:userId,grantFullname:fullname,grantTitle:title};
										var newRecord=new selStore.recordType(newData);
										selGrid.stopEditing();
										selStore.add(newRecord);
									}
									for(var j=rows.length-1;j>=0;j--){
										contactGrid.stopEditing();
										contactGrid.getStore().remove(rows[j]);
									}
								}
							}
						},
						{
							xtype:'button',
							text:'',
							iconCls:'rem-all',
							handler:function(){
								
								var contactGrid = Ext.getCmp('contactGrid');
								var contactStore=contactGrid.getStore();
								var selGrid=Ext.getCmp('selectedUserGrid');
								var selStore=selGrid.getStore();
								var rows = selGrid.getSelectionModel().getSelections();
								
								for(var i=0;i<rows.length;i++){
									var userId=rows[i].data.grantUId;
									var fullname=rows[i].data.grantFullname;
									
									var title=rows[i].data.grantTitle;
									var isExist=false;
									//查找是否存在该记录
									for(var j=0;j<contactStore.getCount();j++){
										if(contactStore.getAt(j).data.userId==userId){
											isExist=true;
											break;
										}
									}
									if(!isExist){
										var newData={userId:userId,fullname:fullname,title:title};
										var newRecord=new contactStore.recordType(newData);
										contactGrid.stopEditing();
										contactStore.add(newRecord);
									}
								}
								
								for(var j=rows.length-1;j>=0;j--){
									selGrid.stopEditing();
									selStore.remove(rows[j]);
								}
								
							}//end of handler
						}
					]
				}),selectedUserGrid
			]
		});
		
	}
});