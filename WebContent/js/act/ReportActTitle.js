Ext.ns('ReportActTitle');
ReportActTitle = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		var TableJspUrl = __ctxPath + '/pages/act/ActTitleReportTable.jsp';
		var selectorUrl =  __ctxPath+ '/act/treeAccountingTitle.do';
		ReportActTitle.superclass.constructor.call(this, {
					id : 'ReportActTitle',
					title : '總分類帳報表',
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
						url : __ctxPath + '/act/reportJournal.do',
						height:80,
						items:[{
								layout : 'hbox',
								padding:'10px',
								items:[{
									xtype:'label',
									style:'padding:3px 5px 0px 5px',
									text:'選擇欲列印科目代號：'
								},new TreeSelector('actTRepCode1',selectorUrl,'_','actTReportSelector1',true,function(node){
									Ext.getCmp('actTReportSelector1').setValue(node.attributes.code);
								}),{
									xtype:'hidden',
									id:'actTReportSelector1'
								}]
							},{
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
									format:'Y-m-d',
									id:'refDateGE',
									value:new Date().add(Date.MONTH,-1),
									listeners : {
										'change' : function() {
											Ext.getCmp('refDateLE').setMinValue(this.getValue());
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
									format:'Y-m-d',
									id:'refDateLE',
									value:new Date(),
									listeners : {
										'change' : function() {
											Ext.getCmp('refDateGE').setMaxValue(this.getValue());
										}
									}
								},{
										xtype : 'button',
										text : '查詢/預覽',
										style:'padding-left:20px',
										iconCls : 'btn-search',
										handler : function() {
											var sdt = Ext.getCmp('refDateGE').getValue();
											sdt = (sdt!=''?sdt.format('Y-m-d'):sdt);
											
											var edt = Ext.getCmp('refDateLE').getValue();
											edt = (edt!=''?edt.format('Y-m-d'):edt);
										
											Ext.getCmp('ActTitleReportPanel').load({
											    url:TableJspUrl,
											    params: {
											    	'code': Ext.getCmp('actTReportSelector1').getValue(),
											    	'refDateGE': sdt,
											    	'refDateLE': edt
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
											var sd = Ext.getCmp('refDateGE').getValue();
											var ed = Ext.getCmp('refDateLE').getValue();
											var url =  __ctxPath + '/act/ajExport.do?code='
			                            		+Ext.getCmp('actTReportSelector1').getValue()
			                            		+'&refDateGE='+((sd==='')?'':sd.format('Y-m-d'))
			                            		+'&refDateLE='+((ed==='')?'':ed.format('Y-m-d'));
			                                window.location.href=url;
										}
									}]
							}]
						}]
					},{
						title : '總分類帳列印說明',
						html:'1.上述科目代號若選擇 &quot;所有科目&quot; ，則列印總分類帳；若選擇某一科目，則列印該科目分類帳。' +
								'<br/>2.上述的日期就是指欲列印的日記帳 &quot;傳票日期&quot; 。' +
								'<br/>3.列印前別忘了先執行過帳，未過帳的日記帳資料不會出現在報表中。' +
								'<br/>4.若列印期間資料內容較多時，查詢時間會較久，請耐心等候。'
					},  new Ext.Panel({
						id:'ActTitleReportPanel',
			            autoHeight : true,
			            columnWidth : 1,
			            autoScroll : true,
			            autoLoad : {
			                url:TableJspUrl,
			                params: {
						    	'refDateGE':new Date().add(Date.MONTH,-1).format('Y-m-d'),
						    	'refDateLE': new Date().format('Y-m-d')
					    	},
			                nocache : true
			            }
			        })]
				});
	}
});
