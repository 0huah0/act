Ext.ns('ReportIncomeStatement');
ReportIncomeStatement = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		ReportIncomeStatement.superclass.constructor.call(this, {
					id : 'ReportIncomeStatement',
					title : '損益表',
					iconCls : 'menu-planmanage',
					frame:true,
					border:true,
					region : 'center',
					defaults : {
						layout : 'form',
						xtype:'fieldset'
					},
					items : [{
						title : '列印日期',
						items:[{
						xtype:'form',
						height:50,
						items:[{					
							layout : 'hbox',
							padding:'10px',
							items:[{
									xtype:'label',
									style:'padding:3px 5px 0px 5px',
									text:'輸入欲列印日期：自'
								},{
									xtype:'datefield',
									editable:false,
									allowBlank:false,
									id:'ris_sd',
									format:'Y-m-d',
									value:new Date().add(Date.DAY,-30),
									listeners : {
										'change' : function() {
											Ext.getCmp('ris_ed').setMinValue(this.getValue());
										}
									}
								},{
									xtype:'label',
									style:'padding:3px 5px 0px 5px',
									text:'至'
								},{
									xtype:'datefield',
									editable:false,
									allowBlank:false,
									id:'ris_ed',
									format:'Y-m-d',
									value:new Date(),
									listeners : {
										'change' : function() {
											Ext.getCmp('ris_sd').setMaxValue(this.getValue());
										}
									}
								},{
									xtype : 'button',
									text : '查詢/預覽',
									style:'padding-left:20px',
									iconCls : 'btn-search',
									handler : function() {
										var ris_sdt = Ext.getCmp('ris_sd').getValue();
										var ris_edt = Ext.getCmp('ris_ed').getValue();
										Ext.getCmp('ReportIncomestatementPanel').load({
											url:__ctxPath + '/pages/act/IncomeStatementReportTable.jsp',
										    params: {
										    	'ris_sdt': ris_sdt!=''?ris_sdt.format('Y-m-d'):ris_sdt,
										    	'ris_edt': ris_edt!=''?ris_edt.format('Y-m-d'):ris_edt
									    	},
										    scope: this, 
										    nocache: true,
										    text: "加載中...",
										    timeout: 30
										});
									}
								},{
									xtype : 'button',
									text : '導出Excel',
									style:'padding-left:20px',
									iconCls : 'btn-xls',
									handler : function() {
										var ris_sdt = Ext.getCmp('ris_sd').getValue();
										ris_sdt = (ris_sdt!=''?ris_sdt.format('Y-m-d'):ris_sdt);
										var ris_edt = Ext.getCmp('ris_ed').getValue();
										ris_edt = (ris_edt!=''?ris_edt.format('Y-m-d'):ris_edt);
										
										var url =  __ctxPath + '/act/incomeStatementExport.do?sdt='+ris_sdt+'&edt='+ris_edt;
		                                window.location.href=url;
									}
								}]
							}]
						}]
					},{
						title : '損益表列印說明',
						html:'1.上述的日期就是指欲列印的日記帳 &quot;傳票日期&quot;。<br/>' +
							 '2.列印前別忘了先執行過帳，未過帳的日記帳資料不會統計到報表中。<br/>' +
							 '3.若列印期間資料內容較多時，查詢時間會較久，請耐心等候。'
					},  new Ext.Panel({
						id:'ReportIncomestatementPanel',
			            autoHeight : true,
			            columnWidth : 1,
			            autoScroll : true,
			            autoLoad : {
			                url:__ctxPath + '/pages/act/IncomeStatementReportTable.jsp',
			                params: {
						    	'ris_sdt':new Date().add(Date.DAY,-30).format('Y-m-d'),
						    	'ris_edt': new Date().format('Y-m-d')
					    	},
			                nocache : true
			            }
			        })]
				});
	}
});
