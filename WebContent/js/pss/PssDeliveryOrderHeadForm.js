/*
 * Powered By [shi_zenghua@qq.com]
 */
 
Ext.ns('PssDeliveryOrderHeadForm');
PssDeliveryOrderHeadForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssDeliveryOrderHeadForm.superclass.constructor.call(this, {
					items : [this.formPanel,this.gridPanel],
					modal : true,
					id : 'PssDeliveryOrderHeadFormWin',
					title : this.recId?'修改出貨單':'新增出貨單',
					iconCls : 'menu-planmanage',
					width : 880,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		var recId = this.recId;
		var readOnly = this.read;
		
		this.formPanel = new Ext.FormPanel({
			id : 'PssDeliveryOrderHeadForm',
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
									fieldLabel : '出貨單編號',
									id:'doHeadId',
									xtype:'hidden',
									name : recId?"pssDeliveryOrderHead.doHeadId":''
								},{
									fieldLabel : '出貨倉庫編號/倉庫代號',
									id:'warehouseId',
									name : "pssDeliveryOrderHead.warehouseId"
								},{
									fieldLabel : '送貨人名稱',
									id:'diliverName',
									name : "pssDeliveryOrderHead.diliverName"
								},{
									fieldLabel : '收貨人電話',
									id:'receiverTel',
									name : "pssDeliveryOrderHead.receiverTel"
								},{
									fieldLabel : '備註',
									id:'remark',
									name : "pssDeliveryOrderHead.remark"
								},{
									fieldLabel : '創建人員',
									id:'createBy',
									xtype:"hidden",name : "pssDeliveryOrderHead.createBy"
								},{
									fieldLabel : '修改人員',
									id:'updateBy',
									xtype:"hidden",name : "pssDeliveryOrderHead.updateBy"
					      }]
					},{
						items : [{
									fieldLabel : '銷貨單編號',
									id:'soHeadId',
									name : "pssDeliveryOrderHead.soHeadId"
								},{
									fieldLabel : '送貨人電話',
									id:'diliverTel',
									name : "pssDeliveryOrderHead.diliverTel"
								},{
									fieldLabel : '收貨人名稱',
									id:'receiverName',
									name : "pssDeliveryOrderHead.receiverName"
								},{
									fieldLabel : '出貨發票號碼',
									id:'doInvoice',
									name : "pssDeliveryOrderHead.doInvoice"
								}]
					}]
				}]
		});

		
		var columns = [{
			header : '產品編號',
			dataIndex : 'pdtId',
			editor: null
		},{
			header : '出貨數量',
			dataIndex : 'allNum'
		},{
			header : '接收數量',
			dataIndex : 'receiptNum'
		},{
			header : '退回數量',
			dataIndex : 'rejectNum'
		},{
			header : '管理',
			dataIndex : 'doDetailId',//
			renderer : function(v,m,r,i) {
				return isGranted('_PssDeliveryOrderDetailEdit') ?('<button title="刪除" value=" " class="btn-del" onclick="PssDeliveryOrderHeadForm.detailRemove(\''
				+ v + '\','+i+')"></button>'):'';
			}
		}];
		
		if(readOnly){
			columns = [new Ext.grid.RowNumberer({editor: null})].concat(columns);
		}
		
		var gridOpt = {
				id : 'PssDeliveryOrderDetailGrid',
				height : 300,
				store : new Ext.data.JsonStore({
					url : __ctxPath + '/pss/listPssDeliveryOrderDetail.do',
					root : 'result',
					totalProperty : 'totalCounts',
					params : {
						start : 0,
						limit : 25
					},
					autoLoad:true,
					fields : ['doHeadId','doDetailId','pdtId','allNum','receiptNum','rejectNum','createDate','createBy','updateDate','updateBy']
				}),
				//autoExpandColumn :'remark1',
				loadMask : true,
				cm : new Ext.grid.ColumnModel({
					columns : columns,
					defaults : {
						sortable : true,
						menuDisabled : false,
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
			gridOpt.tbar = isGranted('_PssDeliveryOrderDetailEdit') ? new Ext.Toolbar({
				id : 'PssDeliveryOrderDetailFootBar',
				bodyStyle : 'text-align:left',
				items : [new Ext.Button({
							iconCls : 'btn-add',
							text : '新增出貨單子項',
							handler : function() {
								PssProductSelector.getView(false,[],function(rows){
									if(rows.length>0){
										var T = gridPanel.getStore().recordType;
										var rs = [];
										var row;
										for(var i=0;i<rows.length;i++){
											row = rows[i];
											rs.push(new T({
												pdtId: row.data.productId,
												allNum: '',
												receiptNum: 0,
												rejectNum: 0
							                }));
										}
										gridPanel.stopEditing();
						                gridPanel.getStore().insert(0, rs);
						                gridPanel.startEditing(0, 0);
									}
								}).show();
							}
						})]
			}) : null;
			
			gridPanel = this.gridPanel = new Ext.grid.EditorGridPanel(gridOpt);
		}
		//end of store
		
		if (recId) {
				Ext.Ajax.request({
					url : __ctxPath + '/pss/getPssDeliveryOrderHead.do?id='+ recId,
						success : function(response , options ) {
							var jr = Ext.util.JSON.decode(response.responseText); 
							jr.data.createDate = new Date(jr.data.createDate).format('Y-m-d H:i');
							if(jr.data.updateDate)jr.data.updateDate = new Date(jr.data.updateDate).format('Y-m-d H:i');
							Ext.getCmp("PssDeliveryOrderHeadForm").getForm().loadRecord(jr);
							gridPanel.getStore().load({
								params :{
									'Q_doHeadId_S_EQ':recId
								}
							});
					},
					failure : function(response , options ) {
						
					}
				});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssDeliveryOrderHeadForm");
				if (fp.getForm().isValid()) {
					var records = gridPanel.getStore().getRange(0,gridPanel.getStore().getCount()-1);
					if(records && records.length>0){	//檢測是否有未填數量的行
						for(var i=0; i<records.length;i++){
							if(!records[i].data.allNum || records[i].data.allNum == 0){
								Ext.MessageBox.show({
									title : '信息',
									msg : '請填寫出貨數量！',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.WARNING
								});
								return false;
							} 
						}
					}
					
					
					var data = fp.getForm().getValues();
					if(recId){
						data['pssDeliveryOrderHead.updateBy'] = curUserInfo.username;
						data['pssDeliveryOrderHead.updateDate'] = new Date().format('Y-m-d H:i');
					}else{
						data['pssDeliveryOrderHead.createBy'] = curUserInfo.username;
						data['pssDeliveryOrderHead.createDate'] = new Date().format('Y-m-d H:i');
					}
					Ext.Ajax.request({
							url : __ctxPath + '/pss/savePssDeliveryOrderHead.do',
					    success : function(response , options ) {
					    	var jr = Ext.util.JSON.decode(response.responseText);
							if(jr.success){
								var rec = {
									'pssDeliveryOrderDetail.doHeadId' : jr.data
								};
								for(var i=0;i<records.length;i++){
									for(var a in  records[i].data){
										rec["pssDeliveryOrderDetail."+a] = records[i].data[a];
									}
									Ext.Ajax.request({
										url : __ctxPath + '/pss/savePssDeliveryOrderDetail.do',
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
							Ext.getCmp('PssDeliveryOrderHeadFormWin').close();
							Ext.getCmp('PssDeliveryOrderHeadGrid').getStore().reload();
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
			iconCls : 'btn-reset',
			handler : function() {
				Ext.getCmp('PssDeliveryOrderHeadForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssDeliveryOrderHeadFormWin').close();
			}
		}];
	}
});



PssDeliveryOrderHeadForm.detailRemove = function(id,i) {
	var grid = Ext.getCmp("PssDeliveryOrderDetailGrid");
	if(id && id!='undefined'){
		Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
			if (btn == 'yes') {
				Ext.Ajax.request({
					url : __ctxPath + '/pss/multiDelPssDeliveryOrderDetail.do',
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