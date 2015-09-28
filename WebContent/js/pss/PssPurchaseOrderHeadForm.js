/*
 * Powered By [shi_zenghua@qq.com]
 */
 
Ext.ns('PssPurchaseOrderHeadForm');
PssPurchaseOrderHeadForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssPurchaseOrderHeadForm.superclass.constructor.call(this, {
					items : [this.formPanel,this.gridPanel],
					modal : true,
					id : 'PssPurchaseOrderHeadFormWin',
					title : (this.read?'查看':this.recId?'修改':'新增')+'採購單',
					iconCls : 'menu-planmanage',
					width : 960,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		var recId = this.recId;
		var readOnly = this.read;
		
		this.formPanel = new Ext.FormPanel({
			id : 'PssPurchaseOrderHeadForm',
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
									fieldLabel : '採購單編號',
									id:'poHeadId',
									xtype:'hidden',
									name : recId?"pssPurchaseOrderHead.poHeadId":''
								},{
									fieldLabel : '供應商編號/供應商代號',
									id:'supplierId',
									name : "pssPurchaseOrderHead.supplierId"
								},{
									fieldLabel : '創建日期',
									id:'createDate',
									xtype:"hidden",name : "pssPurchaseOrderHead.createDate"
								}]
					},{
						items : [{
									fieldLabel : '備註',
									id:'remark',
									name : "pssPurchaseOrderHead.remark"
								},{
									fieldLabel : '創建人員',
									id:'createBy',
									xtype:"hidden",name : "pssPurchaseOrderHead.createBy"
								}]
					}]
				}]
		});


		var columns = [{
			header : '原料編號',
			editor: null,
			dataIndex : 'materialId'
		},{
			header : '原料數量',
			dataIndex : 'materialNum'
		},{
			header : '原料定價(單價)',
			dataIndex : 'materialPrice'
		},{
			header : '原料建議售價(單價)',
			dataIndex : 'materialSalePrice'
		},{
			header : '小計',
			dataIndex : 'amount'
		},{
			header : '樣圖',
			dataIndex : 'amount'
		},{
			header : '管理',
			width : 80,
			align: 'left',
			dataIndex : 'soDetailId',
			editor:null,	//override
			renderer : function(v,m,r,i,ci,s) {	//value， cellmeta， record， rowIndex， columnIndex， store
				return readOnly?'':('&nbsp;<button title="刪除" value=" " class="btn-del" onclick="PssSalesOrderHeadForm.detailRemove(\''
				+ v + '\','+i+')"></button>');
			}
		}];
		
		if(readOnly){
			columns = [new Ext.grid.RowNumberer({editor: null})].concat(columns);
		}
		
		var gridOpt = {
				id : 'PssPurchaseOrderDetailGrid',
				height : 380,
				store : new Ext.data.JsonStore({
					url : __ctxPath + '/pss/listPssPurchaseOrderDetail.do',
					root : 'result',
					totalProperty : 'totalCounts',
					fields : ['poHeadId','poDetailId','materialId','materialNum','materialPrice','materialSalePrice','amount','createDate','createBy','updateDate','updateBy'
					]
				}),
				//autoExpandColumn :'remark1',
				loadMask : true,
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
			if(isGranted('_PssPurchaseOrderHeadEdit') ){
				gridOpt.tbar = new Ext.Toolbar({
					bodyStyle : 'text-align:left',
					items : [new Ext.Button({
								iconCls : 'btn-add',
								text : '新增採購單子項',
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
													materialNum: 0,
													materialPrice: 0,
													materialSalePrice: 0,
								                	amount:0
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
					url : __ctxPath + '/pss/getPssPurchaseOrderHead.do?id='+ recId,
						success : function(response , options ) {
							var jr = Ext.util.JSON.decode(response.responseText); 
							jr.data.createDate = new Date(jr.data.createDate).format('Y-m-d H:i');
							if(jr.data.updateDate)jr.data.updateDate = new Date(jr.data.updateDate).format('Y-m-d H:i');
							Ext.getCmp("PssPurchaseOrderHeadForm").getForm().loadRecord(jr);
							gridPanel.getStore().load({
								params :{
									'Q_poHeadId_S_EQ':recId
								}
							});
					},
					failure : function(response , options ) {
						
					}
				});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',disabled : readOnly,
			handler : function() {
				var fp = Ext.getCmp("PssPurchaseOrderHeadForm");
				if (fp.getForm().isValid()) {
					var records = gridPanel.getStore().getRange(0,gridPanel.getStore().getCount()-1);
					if(records && records.length>0){	//檢測是否有未填數量的行
						var priceAmount = 0;
						var salePriceAmount = 0;
						var payAmount = 0;
						for(var i=0; i<records.length;i++){
							if(!records[i].data.materialSalePrice || !records[i].data.materialNum || !records[i].data.materialPrice){
								Ext.MessageBox.show({
									title : '信息',
									msg : '請填寫原料數量、原料定價、原料建議售價！',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.WARNING
								});
								return false;
							}
							priceAmount += records[i].data.materialPrice * records[i].data.materialNum;
							salePriceAmount += records[i].data.materialSalePrice * records[i].data.materialNum;
							payAmount += records[i].data.pdtRealPrice * records[i].data.materialNum;
						}
					}
					
					var data = fp.getForm().getValues();
					var formData = fp.getForm().getValues();
					formData['pssPurchaseOrderHead.priceAmount'] = priceAmount;
					formData['pssPurchaseOrderHead.salePriceAmount'] = salePriceAmount;
					formData['pssPurchaseOrderHead.payAmount'] = payAmount;
					
					if(recId){
						data['pssPurchaseOrderHead.updateBy'] = curUserInfo.username;
						data['pssPurchaseOrderHead.updateDate'] = new Date().format('Y-m-d H:i');
					}else{
						data['pssPurchaseOrderHead.createBy'] = curUserInfo.username;
						data['pssPurchaseOrderHead.createDate'] = new Date().format('Y-m-d H:i');
					}
					Ext.Ajax.request({
						url : __ctxPath + '/pss/savePssPurchaseOrderHead.do',
					    success : function(response , options ) {
					    	var jr = Ext.util.JSON.decode(response.responseText);
							if(jr.success){
								var rec = {
									'pssPurchaseOrderDetail.poHeadId' : jr.data
								};
								for(var i=0;i<records.length;i++){
									for(var a in  records[i].data){
										rec["pssPurchaseOrderDetail."+a] = records[i].data[a];
									}
									Ext.Ajax.request({
										url : __ctxPath + '/pss/savePssPurchaseOrderDetail.do',
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
							Ext.getCmp('PssPurchaseOrderHeadFormWin').close();
							Ext.getCmp('PssPurchaseOrderHeadGrid').getStore().reload();
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
				Ext.getCmp('PssPurchaseOrderHeadForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssPurchaseOrderHeadFormWin').close();
			}
		}];
	}
});