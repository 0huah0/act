Ext.ns('ReportActTitleSum');
ReportActTitleSum = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		ReportActTitleSum.superclass.constructor.call(this, {
					id : 'ReportActTitleSum',
					title : '試算表',
					iconCls : 'menu-planmanage',
					frame:true,
					border:true,
					region : 'center',
					defaults : {
						layout : 'form',
						xtype:'fieldset'
					},
					items : [{
						title : '列印科目、日期',
						items:[{
						xtype:'form',
						id:'PostParamsForm',
						url : __ctxPath + '/act/reportJournal.do',
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
									id:'rsum_sd',
									format:'Y-m-d',
									value:new Date().add(Date.MONTH,-1),
									listeners : {
										'change' : function() {
											Ext.getCmp('rsum_ed').setMinValue(this.getValue());
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
									id:'rsum_ed',
									format:'Y-m-d',
									value:new Date(),
									listeners : {
										'change' : function() {
											Ext.getCmp('rsum_sd').setMaxValue(this.getValue());
										}
									}
								},{
									xtype : 'button',
									text : '查詢/預覽',
									style:'padding-left:20px',
									iconCls : 'btn-search',
									handler : function() {
										var sdt = Ext.getCmp('rsum_sd').getValue();
										var edt = Ext.getCmp('rsum_ed').getValue();
										Ext.getCmp('ActTitleSumReportPanel').load({
											url:__ctxPath + '/pages/act/ActTitleSumReportTable.jsp',
										    params: {
										    	'sdt': sdt!=''?sdt.format('Y-m-d'):sdt,
										    	'edt': edt!=''?edt.format('Y-m-d'):edt
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
										var sdt = Ext.getCmp('rsum_sd').getValue();
										sdt = (sdt!=''?sdt.format('Y-m-d'):sdt);
										var edt = Ext.getCmp('rsum_ed').getValue();
										edt = (edt!=''?edt.format('Y-m-d'):edt);
										
										var url =  __ctxPath + '/act/atSumExport.do?sdt='+sdt+'&edt='+edt;
		                                window.location.href=url;
									}
								}]
							}]
						}]
					},{
						title : '試算表列印說明',
						html:'1.上述的日期就是指欲列印的日記帳 &quot;傳票日期&quot; 。。<br/>2.列印前別忘了先執行過帳，未過帳的日記帳資料不會統計到報表中。<br/>3.若列印期間資料內容較多時，查詢時間會較久，請耐心等候。'
					},  new Ext.Panel({
						id:'ActTitleSumReportPanel',
			            autoHeight : true,
			            columnWidth : 1,
			            autoScroll : true,
			            autoLoad : {
			                url:__ctxPath + '/pages/act/ActTitleSumReportTable.jsp',
			                params: {
						    	'sdt':new Date().add(Date.MONTH,-1).format('Y-m-d'),
						    	'edt': new Date().format('Y-m-d')
					    	},
			                nocache : true
			            }
			        })]
				});
	}
});
