/*
 * Powered By [shi_zenghua@qq.com]
 */

Ext.ns('PssSalesOrderHeadForm');
PssSalesOrderHeadForm = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		PssSalesOrderHeadForm.superclass.constructor.call(this, {
					items : [this.formPanel,this.gridPanel],
					modal : true,
					autoScroll :true,
					id : 'PssSalesOrderHeadFormWin',
					title : this.recId?'修改銷貨單':'新增銷貨單',
					iconCls : 'menu-planmanage',
					width : 960,
//					resizable : true,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		var recId = this.recId;
		var readOnly = this.read;
		
		var formPanel = this.formPanel = new Ext.FormPanel({
			id : 'PssSalesOrderHeadForm',
			frame : true,
			items : [{
				xtype : 'fieldset',
				title : '銷貨單',
				items : [{
					layout : 'column',
					columnWidth : 0.33,
					defaults : {
						layout : 'form',
						padding : '0 0 0 20px',
						labelAlign : 'right',
						labelWidth : 100,
						defaults : {
							xtype : 'textfield',
							allowBlank : false,
							disabled : readOnly,
							maxLength : 100,
							width : 140
						}
					},
					items : [{
						items : [{
									fieldLabel : '銷貨單編號',
									id:'soHeadId',
									xtype:'hidden',
									name : recId?'pssSalesOrderHead.soHeadId':''
								},{
									fieldLabel : '創建人員',
									id:'createBy',
									xtype:"hidden",name : "pssSalesOrderHead.createBy"
								},{
									fieldLabel : '創建日期',
									id:'createDate',
									xtype:"hidden",name : "pssSalesOrderHead.createDate"
								}]
					},{
						items : [{
							xtype:'compositefield',
							fieldLabel:'客戶編號',
							items:[ {
									xtype:'textfield',
									name:'pssSalesOrderHead.customerId',
									id:'customerId',
									readOnly:true,
									allowBlank:false,
									width:110
								},{
									xtype:'button',
									text:'...',disabled : readOnly,
									handler:function(){
										PssCustomerSelector.getView(true,null,function(rows){
											Ext.getCmp('customerId').setValue(rows[0].data.customerId);
										}).show();
									}
								}
							]
						}]
					},{
						items : [{
							xtype:'compositefield',
							fieldLabel:'客戶採購單編號',
							items:[ {
									xtype:'textfield',
									name:'pssSalesOrderHead.custPoNo',
									id:'custPoNo',
									readOnly:true,
									allowBlank:false,
									width:110
								},{
									xtype:'button',
									text:'...',disabled : readOnly,
									handler:function(){
										PssCustomerSelector.getView(true,null,function(rows){
											Ext.getCmp('custPoNo').setValue(rows[0].data.customerId);
										}).show();
									}
								}
							]
						}]
					}]
				}, {
					layout : 'form',
					padding : '0 0 0 20px',
					labelAlign : 'right',
					labelWidth : 100,
					items : [{
								fieldLabel : '備　　註',
								width : '662px',
								maxLength:498,
								disabled : readOnly,
								xtype : 'textarea',
								id:'remark',
								name : 'pssSalesOrderHead.remark'
							}]
				}]
			}]
		});

		
		
		var columns = [{
			header : '產品編號',
			dataIndex : 'pdtId'
		},{
			header : '產品定價',
			dataIndex : 'pdtPrice',
            renderer: 'usMoney'
		},{
			header : '產品建議售價',
			dataIndex : 'pdtSalePrice',
            renderer: 'usMoney'
		},{
			header : '產品實際售價',
			dataIndex : 'pdtRealPrice',
            renderer: 'usMoney',
            css :'background-color: #afa;'
		},{
			header : '產品數量',
			dataIndex : 'pdtNum',
			css :'background-color: #afa;'
		},{
			header : '小計',
			dataIndex : 'amount',
            renderer: 'usMoney'
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
			columns = [new Ext.grid.RowNumberer({
				editor:null
			})].concat(columns);
		}
		
		var gridOpt = {
			id : 'PssSalesOrderDetailGrid',
			region : 'center',
			height:360,
            //autoExpandColumn :'remark1',
			loadMask : true,
			autuScroll:true,
            listeners :{
            	afteredit:function(opt){
            		var f = opt.field;
            		var r = opt.record.data;
            		if('pdtNum'==f || 'pdtRealPrice'==f){
            			opt.record.beginEdit();
            			r.amount = r.pdtNum * r.pdtRealPrice;
            			opt.record.endEdit();
            		}
            	}
            },
			store : new Ext.data.JsonStore({
				url : __ctxPath + '/pss/listPssSalesOrderDetail.do',
				root : 'result',
				idProperty:'pdtId',
				totalProperty : 'totalCounts',
				fields : ['soHeadId'
							,'soDetailId'
							,'pdtId'
							,'pdtNum'
							,'pdtPrice'
							,'pdtSalePrice'
							,'pdtRealPrice'
							,'amount'
							,'createDate'
							,'createBy'
							,'updateDate'
							,'updateBy'
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
			if(isGranted('_PssSalesOrderHeadEdit') ){
				gridOpt.tbar = new Ext.Toolbar({
					id : 'PssSalesOrderDetailFootBar',
					bodyStyle : 'text-align:left',
					items : [new Ext.Button({
								iconCls : 'btn-add',
								text : '新增銷貨單子項',
								handler : function() {
									PssProductSelector.getView(true,[],function(rows){
										if(rows.length>0){
											var T = gridPanel.getStore().recordType;
											var rs = [];
											var row;
											for(var i=0;i<rows.length;i++){
												row = rows[i];
												rs.push(new T({
								                	pdtId: row.data.productId,
								                	pdtPrice: row.data.price,
								                	pdtSalePrice: row.data.salePrice,
								                	pdtRealPrice: row.data.salePrice,
								                	pdtNum :'',
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
//			gridPanel.getTopToolbar().addButton();
		}
		
		if (recId) {
			Ext.Ajax.request({
				url : __ctxPath + '/pss/getPssSalesOrderHead.do?id='+ recId,
				success : function(response , options ) {
						var jr = Ext.util.JSON.decode(response.responseText); 
						jr.data.createDate = new Date(jr.data.createDate).format('Y-m-d H:i');
						if(jr.data.updateDate)jr.data.updateDate = new Date(jr.data.updateDate).format('Y-m-d H:i');
						formPanel.getForm().loadRecord(jr);
						gridPanel.getStore().load({
							params :{
								'Q_soHeadId_S_EQ':recId
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
				var fp = Ext.getCmp("PssSalesOrderHeadForm");
				if (fp.getForm().isValid()) {
					var records = gridPanel.getStore().getRange(0,gridPanel.getStore().getCount()-1);
					var priceAmount = 0;
					var salePriceAmount = 0;
					var payAmount = 0;
					if(records && records.length>0){	//檢測是否有未填數量的行
						for(var i=0; i<records.length;i++){
							if(!records[i].data.pdtNum || records[i].data.pdtNum == 0){
								Ext.MessageBox.show({
									title : '信息',
									msg : '請填寫產品數量！',
									buttons : Ext.MessageBox.OK,
									icon : 'ext-mb-warn'
								});
								return false;
							} 
							priceAmount += records[i].data.pdtPrice * records[i].data.pdtNum;
							salePriceAmount += records[i].data.pdtSalePrice * records[i].data.pdtNum;;
							payAmount += records[i].data.pdtRealPrice * records[i].data.pdtNum;;
						}
					}
					
					
					var formData = fp.getForm().getValues();
					formData['pssSalesOrderHead.priceAmount'] = priceAmount;
					formData['pssSalesOrderHead.salePriceAmount'] = salePriceAmount;
					formData['pssSalesOrderHead.payAmount'] = payAmount;
					formData['pssSalesOrderHead.discountAmount'] = salePriceAmount - payAmount;
					
					if(recId){
						formData['pssSalesOrderHead.updateBy'] = curUserInfo.username;
						formData['pssSalesOrderHead.updateDate'] = new Date().format('Y-m-d H:i');
					}else{
						formData['pssSalesOrderHead.createBy'] = curUserInfo.username;
						formData['pssSalesOrderHead.createDate'] = new Date().format('Y-m-d H:i');
					}
					Ext.Ajax.request({
						url : __ctxPath + '/pss/savePssSalesOrderHead.do',
						method : 'post',
					    params: formData,
					    success : function(response , options ) {
					    	var jr = Ext.util.JSON.decode(response.responseText);
							if(jr.success){
								var rec = {
									'pssSalesOrderDetail.soHeadId' : jr.data
								};
								for(var i=0;i<records.length;i++){
									for(var a in  records[i].data){
										rec["pssSalesOrderDetail."+a] = records[i].data[a];
									}
									Ext.Ajax.request({
										url : __ctxPath + '/pss/savePssSalesOrderDetail.do',
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
							Ext.getCmp('PssSalesOrderHeadFormWin').close();
							Ext.getCmp('PssSalesOrderHeadGrid').getStore().reload();
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
		}, {
			text : '清空',
			iconCls : 'btn-reset',
			handler : function() {
				Ext.getCmp('PssSalesOrderHeadForm').getForm().reset();
			}
		}, {
			text : '取消',
			iconCls : 'btn-cancel',
			handler : function() {
				Ext.getCmp('PssSalesOrderHeadFormWin').close();
			}
		}];
	}
});

PssSalesOrderHeadForm.detailRemove = function(id,i) {
	var grid = Ext.getCmp("PssSalesOrderDetailGrid");
	if(id && id!='undefined'){
		Ext.Msg.confirm('刪除確認', '確定要刪除此筆數據？', function(btn) {
			if (btn == 'yes') {
				Ext.Ajax.request({
					url : __ctxPath
							+ '/pss/multiDelPssSalesOrderDetail.do',
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