Ext.ns('ReportJournal');
ReportJournal = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		ReportJournal.superclass.constructor.call(this, {
					id : 'ReportJournal',
					title : '日記帳報表列印',
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
									id:'refDate_D_GE',
									format:'Y-m-d',
									value:new Date().add(Date.MONTH,-1),
									listeners : {
										'change' : function() {
											Ext.getCmp('refDate_D_LE').setMinValue(this.getValue());
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
									id:'refDate_D_LE',
									format:'Y-m-d',
									value:new Date(),
									listeners : {
										'change' : function() {
											Ext.getCmp('refDate_D_GE').setMaxValue(this.getValue());
										}
									}
								},{
									xtype : 'button',
									text : '查詢/預覽',
									style:'padding-left:20px',
									iconCls : 'btn-search',
									handler : function() {
										var sd = Ext.getCmp('refDate_D_GE').getValue();
										var ed = Ext.getCmp('refDate_D_LE').getValue();
										Ext.getCmp('JReportPanel').load({
										    url:__ctxPath + '/pages/act/JournalReportTable.jsp',
										    params: {
										    	'Q_refDate_D_GE': ((sd=='')?'':sd.format('Y-m-d')),
										    	'Q_refDate_D_LE': ((ed=='')?'':ed.format('Y-m-d'))
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
										var sd = Ext.getCmp('refDate_D_GE').getValue();
										var ed = Ext.getCmp('refDate_D_LE').getValue();
										var url =  __ctxPath + '/act/jhExport.do?Q_refDate_D_GE='
		                            		+ ((sd=='')?'':sd.format('Y-m-d'))+ '&Q_refDate_D_LE='+((ed=='')?'':ed.format('Y-m-d'));
		                                window.location.href=url;
									}
								}]
							}]
						}]
					},{
						title : '日記帳列印說明',
						html:'1.上述的日期就是指欲列印的日記帳 &quot;傳票日期&quot; 。' +
								'<br/>2.列印前別忘了先執行過帳，未過帳的日記帳資料不會出現在報表中。' +
								'<br/>3.若列印期間資料內容較多時，查詢時間會較久，請耐心等候。'
					},  new Ext.Panel({
						id:'JReportPanel',
			            autoHeight : true,
			            autoScroll : true,
			            autoLoad : {
			                url:__ctxPath + '/pages/act/JournalReportTable.jsp',
						    params: {
						    	'Q_refDate_D_GE':new Date().add(Date.MONTH,-1).format('Y-m-d'),
						    	'Q_refDate_D_LE': new Date().format('Y-m-d')
					    	},
			                nocache : true
			            }
			        })]
				});
	}
});
