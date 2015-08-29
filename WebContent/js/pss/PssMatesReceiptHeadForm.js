/*
 * Powered By [shi_zenghua@qq.com]
 */
 
Ext.ns('PssMatesReceiptHeadForm');
PssMatesReceiptHeadForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssMatesReceiptHeadForm.superclass.constructor.call(this, {
					items : [this.formPanel,this.gridPanel],
					modal : true,
					id : 'PssMatesReceiptHeadFormWin',
					title : this.recId?'修改收貨單':'新增收貨單',
					iconCls : 'menu-planmanage',
					width : 960,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		var recId = this.recId;
		var readOnly = this.read;
		
		this.formPanel = new Ext.FormPanel({
			id : 'PssMatesReceiptHeadForm',
			frame : true,
			items : [{
					layout : 'column',
					columnWidth : 0.5,
					defaults : {
						layout : 'form',
						padding : '0 0 0 20px',
						labelAlign : 'right',
						labelWidth : 160,
						defaults : {
							xtype : 'textfield',
							allowBlank : false,
							disabled : readOnly,
							maxLength:100,
							width : 200
						}
					},
					items : [{
						items : [{
									fieldLabel : '收貨單編號',
									id:'mrHeadId',
									xtype:'hidden',
									name : recId?"pssMatesReceiptHead.mrHeadId":''
								},{
									xtype:'compositefield',
									fieldLabel:'倉庫編號/倉庫代號',
									items:[ {
											xtype:'textfield',
											name:'pssMatesReceiptHead.warehouseId',
											id:'warehouseId',
											readOnly:true,
											allowBlank:false,
											width:170
										},{
											xtype:'button',
											text:'...',
											disabled : readOnly,
											handler:function(){
												PssWarehouseSelector.getView(true,null,function(rows){
													Ext.getCmp('warehouseId').setValue(rows[0].data.warehouseId);
												}).show();
											}
										} ]
								},{
									fieldLabel : '收貨人電話',
									id:'receiverTel',
									name : "pssMatesReceiptHead.receiverTel"
								},{
									fieldLabel : '送貨人名稱',
									id:'diliverName',
									name : "pssMatesReceiptHead.diliverName"
								},{
									fieldLabel : '備註',
									id:'remark',
									name : "pssMatesReceiptHead.remark"
								},{
									fieldLabel : '創建人員',
									id:'createBy',
									xtype:"hidden",name : "pssMatesReceiptHead.createBy"
								}]
					},{
						items : [{
								xtype:'compositefield',
								fieldLabel:'採購單編號',
								items:[ {
										xtype:'textfield',
										name:'pssMatesReceiptHead.poHeadId',
										id:'poHeadId',
										readOnly:true,
										allowBlank:false,
										width:170
									},{
										xtype:'button',
										text:'...',
										disabled : readOnly,
										handler:function(){
											PssPurchaseOrderHeadSelector.getView(true,null,function(rows){
												Ext.getCmp('poHeadId').setValue(rows[0].data.poHeadId);
											}).show();
										}
									} ]
								},{
									fieldLabel : '收貨人名稱/倉管人員名稱',
									id:'receiverName',
									name : "pssMatesReceiptHead.receiverName"
								},{
									fieldLabel : '收貨發票號碼',
									id:'mrInvoice',
									name : "pssMatesReceiptHead.mrInvoice"
								},{
									fieldLabel : '送貨人電話',
									id:'diliverTel',
									name : "pssMatesReceiptHead.diliverTel"
								},{
									fieldLabel : '創建日期',
									id:'createDate',
									xtype:"hidden",name : "pssMatesReceiptHead.createDate"
								}]
					}]
				}]
		});

		

		var columns = [{
			header : '原料編號',
			editor : null,
			dataIndex : 'materialId'
		},{
			header : '來貨數量',
			dataIndex : 'allNum'
		},{
			header : '接收數量',
			dataIndex : 'receiptNum'
		},{
			header : '退回數量',
			dataIndex : 'rejectNum'
		},{
			header : '管理',
			width : 80,
			align: 'left',
			dataIndex : 'mrDetailId',
			editor:null,	//override
			renderer : function(v,m,r,i,ci,s) {	//value， cellmeta， record， rowIndex， columnIndex， store
				return readOnly?'':('&nbsp;<button title="刪除" value=" " class="btn-del" onclick="listPssMatesReceiptForm.detailRemove(\''
				+ v + '\','+i+')"></button>');
			}
		}];
		
		if(readOnly){
			columns = [new Ext.grid.RowNumberer({
				editor:null
			})].concat(columns);
		}
		
		var gridOpt = {
			id : 'PssMatesReceiptDetailGrid',
			region : 'center',
			height:360,
            //autoExpandColumn :'remark1',
			loadMask : true,
			autuScroll:true,
            listeners :{
            	afteredit:function(opt){
            		
            	}
            },
			store : new Ext.data.JsonStore({
				url : __ctxPath + '/pss/listPssMatesReceiptDetail.do',
				root : 'result',
				totalProperty : 'totalCounts',
				fields : ['mrHeadId','mrDetailId','materialId','allNum','receiptNum','rejectNum','createDate','createBy','updateDate','updateBy'
				]
			}),
			cm : new Ext.grid.ColumnModel({
				columns : columns,
				defaults : {
					align: 'right',
					width : 120,
		            editor: new Ext.form.NumberField({
		                allowBlank: false,
		                allowNegative: false
		            })
				}
			}),
			bbar : new Ext.PagingToolbar({
						pageSize : 25,
						store : this.store,
						displayInfo : true,
						displayMsg : '當前顯示從{0}至{1}，共{2}條記錄',
						emptyMsg : "無記錄"
					})
		};
		var gridPanel = null;
		if(readOnly){//readOnly
			gridPanel = this.gridPanel = new Ext.grid.GridPanel(gridOpt);
		}else{
			if(isGranted('_PssMatesReceiptHeadEdit') ){
				gridOpt.tbar = new Ext.Toolbar({
					bodyStyle : 'text-align:left',
					items : [new Ext.Button({
								iconCls : 'btn-add',
								text : '新增收貨單子項',
								handler : function() {
									PssMaterialSelector.getView(false,[],function(rows){
										if(rows.length>0){
											var T = gridPanel.getStore().recordType;
											var rs = [];
											var row;
											for(var i=0;i<rows.length;i++){
												row = rows[i];
												rs.push(new T({
													materialId: row.data.materialId,
													allNum: '',
													receiptNum: '',
													rejectNum: '',
								                	amount:''
								                }));
											}
											gridPanel.stopEditing();
							                gridPanel.getStore().insert(0, rs);
							                gridPanel.startEditing(0, 0);
										}
									}).show();
								}
							})]
				});
			}
			gridPanel = this.gridPanel = new Ext.grid.EditorGridPanel(gridOpt);
		}
		
		
		
		if (recId) {
				Ext.Ajax.request({
					url : __ctxPath + '/pss/getPssMatesReceiptHead.do?id='+ recId,
						success : function(response , options ) {
							var jr = Ext.util.JSON.decode(response.responseText); 
							jr.data.createDate = new Date(jr.data.createDate).format('Y-m-d H:i');
							if(jr.data.updateDate)jr.data.updateDate = new Date(jr.data.updateDate).format('Y-m-d H:i');
							Ext.getCmp("PssMatesReceiptHeadForm").getForm().loadRecord(jr);
							gridPanel.getStore().load({
								params :{
									'Q_mrHeadId_S_EQ':recId
								}
							});
					},
					failure : function(response , options ) {
						
					}
				});
		}

		this.buttons = [{
			text : '保存',
			disabled : readOnly,
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssMatesReceiptHeadForm");
				if (fp.getForm().isValid()) {
					var records = gridPanel.getStore().getRange(0,gridPanel.getStore().getCount()-1);
					if(records && records.length>0){	//檢測是否有未填數量的行
						for(var i=0; i<records.length;i++){
							if(!records[i].data.allNum || !records[i].data.receiptNum || !records[i].data.rejectNum){
								Ext.MessageBox.show({
									title : '信息',
									msg : '請填寫來貨數量、接收數量、退回數量！',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.WARNING
								});
								return false;
							}
						}
					}
					
					var data = fp.getForm().getValues();
					if(recId){
						data['pssMatesReceiptHead.updateBy'] = curUserInfo.username;
						data['pssMatesReceiptHead.updateDate'] = new Date().format('Y-m-d H:i');
					}else{
						data['pssMatesReceiptHead.createBy'] = curUserInfo.username;
						data['pssMatesReceiptHead.createDate'] = new Date().format('Y-m-d H:i');
					}
					Ext.Ajax.request({
							url : __ctxPath + '/pss/savePssMatesReceiptHead.do',
					    success : function(response , options ) {
					    	var jr = Ext.util.JSON.decode(response.responseText);
							if(jr.success){
								var rec = {
									'pssMatesReceiptDetail.mrHeadId' : jr.data
								};
								for(var i=0;i<records.length;i++){
									for(var a in  records[i].data){
										rec["pssMatesReceiptDetail."+a] = records[i].data[a];
									}
									Ext.Ajax.request({
										url : __ctxPath + '/pss/savePssMatesReceiptDetail.do',
										method : 'post',
										params :rec,
									    success : function(response , options ) {
									    	//var jr = Ext.util.JSON.decode(response.responseText);
										},
										failure : function(fp, action) {
											Ext.MessageBox.show({
														title : '信息',
														msg : '數據保存失敗！',
														buttons : Ext.MessageBox.OK,
														icon : 'ext-mb-error'
													});
										}
									});
								}
							}
							Ext.ux.Toast.msg('信息', '成功保存信息！');
							Ext.getCmp('PssMatesReceiptHeadFormWin').close();
							Ext.getCmp('PssMatesReceiptHeadGrid').getStore().reload();
						},
						failure : function(fp, action) {
							Ext.MessageBox.show({
								title : '信息',
								msg : '數據保存失敗！',
								buttons : Ext.MessageBox.OK,
								icon : 'ext-mb-error'
							});
						},
					    params: data
					});
				}
			
			}
		}, {
			text : '清空',
			iconCls : 'btn-reset',disabled : readOnly,
			handler : function() {
				Ext.getCmp('PssMatesReceiptHeadForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssMatesReceiptHeadFormWin').close();
			}
		}];
	}
});


PssMatesReceiptHeadForm.detailRemove = function(id,i) {
	var grid = Ext.getCmp("PssMatesReceiptHeadGrid");
	if(id && id!='undefined'){
		Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
			if (btn == 'yes') {
				Ext.Ajax.request({
					url : __ctxPath
							+ '/pss/multiDelPssMatesReceiptDetail.do',
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
							Ext.Msg.alert("信息", "該項沒能被刪除！");
						}
					}
				});
			}
		});
	}else{
		grid.getStore().removeAt(i);
	}
	
};