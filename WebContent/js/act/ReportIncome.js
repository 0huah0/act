Ext.ns('ReportIncome');
ReportIncome = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		ReportIncome.superclass.constructor.call(this, {
					id : 'ReportIncome',
					title : '損益表列印',
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
									id:'income_sdt',
									format:'Y-m-d',
									value:new Date().add(Date.MONTH,-1),
									listeners : {
										'change' : function() {
											Ext.getCmp('income_edt').setMinValue(this.getValue());
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
									id:'income_edt',
									format:'Y-m-d',
									value:new Date(),
									listeners : {
										'change' : function() {
											Ext.getCmp('income_sdt').setMaxValue(this.getValue());
										}
									}
								},{
									xtype : 'button',
									text : '查詢/預覽',
									style:'padding-left:20px',
									iconCls : 'btn-search',
									handler : function() {
										var sd = Ext.getCmp('income_sdt').getValue();
										var ed = Ext.getCmp('income_edt').getValue();
										Ext.getCmp('JReportPanel').load({
										    url:__ctxPath + '/pages/act/ReportIncome.jsp',
										    params: {
										    	'income_sdt': ((sd=='')?'':sd.format('Y-m-d')),
										    	'income_edt': ((ed=='')?'':ed.format('Y-m-d'))
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
										var sd = Ext.getCmp('income_sdt').getValue();
										var ed = Ext.getCmp('refDate_D_LE').getValue();
										var url =  __ctxPath + '/act/isExport.do?income_sdt='
		                            		+ ((sd=='')?'':sd.format('Y-m-d'))+ '&income_edt='+((ed=='')?'':ed.format('Y-m-d'));
		                                window.location.href=url;
									}
								}]
							}]
						}]
					},
					{
						title : '損益表列印說明',
						html:'1.上述的日期就是指欲列印的日記帳 &quot;傳票日期&quot; 。' +
								'<br/>2.列印前別忘了先執行過帳，未過帳的日記帳資料不會出現在報表中。' +
								'<br/>3.若列印期間資料內容較多時，查詢時間會較久，請耐心等候。'
					},
					new Ext.Panel({
						id:'JReportPanel',
			            autoHeight : true,
			            autoScroll : true,
			            autoLoad : {
			                url:__ctxPath + '/pages/act/ReportIncome.jsp',
						    params: {
						    	'income_sdt':new Date().add(Date.MONTH,-1).format('Y-m-d'),
						    	'income_edt': new Date().format('Y-m-d')
					    	},
			                nocache : true
			            }
			        })]
				});
	}
});
