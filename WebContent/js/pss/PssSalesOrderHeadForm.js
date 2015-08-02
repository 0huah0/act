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
					width : 1000,
//					resizable : true,
					buttons : this.buttons
				});
	},
	initUIComponents : function() {
		this.formPanel = new Ext.FormPanel({
			url : __ctxPath + '/pss/savePssSalesOrderHead.do',
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
							width : 140
						}
					},
					items : [{
						items : [{
									fieldLabel : '銷貨單編號',
									maxLength:18,
									name : 'pssSalesOrderHead.soHeadId'
								},{
									fieldLabel : '客戶採購單編號',
									maxLength:18,
									name : 'pssSalesOrderHead.custPoNo'
								}]
					},{
						items : [{
									fieldLabel : '優惠金額',
									maxLength:18,
									name : 'pssSalesOrderHead.discountAmount'
								},{
									fieldLabel : '建議售價總金額',
									maxLength:18,
									name : 'pssSalesOrderHead.salePriceAmount'
								}]
					},{
						items : [{
									fieldLabel : '定價總金額',
									maxLength:18,
									name : 'pssSalesOrderHead.priceAmount'
								},{
									fieldLabel : '實際售價總金額',
									maxLength:18,
									name : 'pssSalesOrderHead.payAmount'
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
								xtype : 'textarea',
								name : 'pssSalesOrderHead.remark'
							}]
				}]
			}]
		});

		var columns = [{
			header : '銷貨單明細編號',
			dataIndex : 'soDetailId',
			editor: new Ext.form.TextField()
		},{
			header : '產品編號',
			dataIndex : 'pdtId',
			editor: new Ext.form.TextField()
		},{
			header : '產品定價',
			dataIndex : 'pdtPrice',
			align: 'right',
            renderer: 'usMoney'
		},{
			header : '產品建議售價',
			dataIndex : 'pdtSalePrice',
			align: 'right',
            renderer: 'usMoney'
		},{
			header : '產品實際售價',
			dataIndex : 'pdtRealPrice',
			align: 'right',
            renderer: 'usMoney'
		},{
			header : '產品數量',
			dataIndex : 'pdtNum',
            editor: new Ext.form.NumberField({
                allowBlank: false,
                allowNegative: false
            })
		},{
			header : '小計',
			dataIndex : 'amount',
			align: 'right',
            renderer: 'usMoney',
            editor: new Ext.form.NumberField({
                allowBlank: false,
                allowNegative: false
            })
		},{
			header : '管理',
			dataIndex : 'id',
			editor:null,	//override
			renderer : function(v,m,r) {
				return '&nbsp;<button title="修改" value=" " class="btn-edit" onclick="PssSalesOrderDetailView.edit('
				+ v + ')"></button><button title="刪除" value=" " class="btn-del" onclick="PssSalesOrderDetailView.remove('
				+ v + ')"></button>';
			}
		}];
		
		if(this.recId){
			columns = [new Ext.grid.RowNumberer()].concat(columns);
		}
		
		var gridPanel = this.gridPanel = new Ext.grid.EditorGridPanel({
			id : 'PssSalesOrderDetailGrid',
			region : 'center',
			height:360,
            //autoExpandColumn :'remark1',
			loadMask : true,
			autuScroll:true,
			tbar : new Ext.Toolbar({
				id : 'PssSalesOrderDetailFootBar',
				bodyStyle : 'text-align:left',
				items : [new Ext.Button({
							iconCls : 'btn-add',
							text : '新增銷貨單子項',
							handler : function() {
								ProductSelector.getView(true,[],function(rows){
									if(rows.length>0){
										var T = gridPanel.getStore().recordType;
										var rs = [];
										var row;
										for(var i=0;i<rows.length;i++){
											row = rows[i];
											rs.push(new T({
							                	pdtId: row.data.username,
							                	pdtPrice: '',
							                	pdtSalePrice: '',
							                	pdtRealPrice: '',
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
			}),
			store : new Ext.data.JsonStore({
				url : __ctxPath + '/pss/listPssSalesOrderDetail.do',
				root : 'result',
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
					width : 120
				}
			}),
			bbar : new Ext.PagingToolbar({
						pageSize : 25,
						store : this.store,
						displayInfo : true,
						displayMsg : '當前顯示從{0}至{1}，共{2}條記錄',
						emptyMsg : "無記錄"
					})
		});
		
		if (this.recId) {
			this.formPanel.getForm().load({
				deferredRender : false,
				url : __ctxPath + '/pss/getPssSalesOrderHead.do?recId='+ this.recId,
				waitMsg : '正在載入數據...',
				success : function(form, action) {

				}
			});
		}

		this.buttons = [{
			text : '保存',
			iconCls : 'btn-save',
			handler : function() {
				var fp = Ext.getCmp("PssSalesOrderHeadForm");
				if (fp.getForm().isValid()) {
					fp.getForm().submit({
						method : 'post',
						waitMsg : '正在提交數據...',
						success : function(fp, action) {
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