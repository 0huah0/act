Ext.ns('AccountingTitleExport');
AccountingTitleExport = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		var selectorUrl =  __ctxPath+ '/act/treeAccountingTitle.do?Q_=';
		AccountingTitleExport.superclass.constructor.call(this, {
					id : 'AccountingTitleExport',
					title : '會計科目報表',
					iconCls : 'menu-planmanage',
					frame:true,
					border:true,
					region : 'center',
					defaults : {
						layout : 'form',
						xtype:'fieldset'
					},
					items : [{
						title : '列印科目',
						items:[{
						xtype:'form',
						id:'PostParamsForm',
						height:50,
						items:[{							
							layout : 'hbox',
							padding:'10px',
							items:[{
									xtype:'label',
									style:'padding:3px 5px 0px 5px',
									text:'選擇欲列印科目代號：自'
								},new TreeSelector('actTitleSelector1',selectorUrl,'','actTitleSelector1V',true,function(node){
									Ext.getCmp('actTitleSelector1V').setValue(node.attributes.code);
									/*var v2c = Ext.getCmp('actTitleSelector2V');
									var code = node.attributes.code;
									if(!!v2c.getValue()){
										alert(132);
										if(parseInt(v2c.getValue())<parseInt(code)){
											Ext.getCmp('actTitleSelector1V').setValue(code);
										}else{
											Ext.Msg.alert('提示','後者代號編碼不可小於前者');
										}
									}else{
										Ext.getCmp('actTitleSelector1V').setValue(code);
									}*/
								}),{
									xtype:'label',
									style:'padding:3px 5px 0px 5px',
									text:'至'
								},new TreeSelector('actTitleSelector2', selectorUrl,'','actTitleSelector2V',true,function(node){
									Ext.getCmp('actTitleSelector2V').setValue(node.attributes.code);
									/*var v1c = Ext.getCmp('actTitleSelector1V');
									var code = node.attributes.code;
									if(!!v1c.getValue()){
										alert(132);
										if(parseInt(v1c.getValue())>parseInt(code)){
											Ext.getCmp('actTitleSelector2V').setValue(code);
										}else{
											Ext.Msg.alert('提示','後者代號編碼不可小於前者');
										}
									}else{
										Ext.getCmp('actTitleSelector2V').setValue(code);
									}*/
									
								}),{
									xtype : 'button',
									text : '查詢/預覽',
									style:'padding-left:20px',
									iconCls : 'btn-search',
									handler : function() {
										Ext.getCmp('ActTitlePanel').load({
										    url:__ctxPath + '/pages/act/ActTitleTable.jsp',
										    params: {
										    	'Q_code_S_GE': Ext.getCmp('actTitleSelector1V').getValue(),
										    	'Q_code_S_LE': Ext.getCmp('actTitleSelector2V').getValue()
									    	},
										    //callback: yourFunction,
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
										var url =  __ctxPath + '/act/atExport.do?Q_code_S_GE='
		                            		+Ext.getCmp('actTitleSelector1V').getValue()
		                            		+'&Q_code_S_LE='+Ext.getCmp('actTitleSelector2V').getValue();
		                                window.location.href=url;
									}
								},{
									xtype:'hidden',
									id:'actTitleSelector1V'
								},{
									xtype:'hidden',
									id:'actTitleSelector2V'
								}]
							}]
						}]
					},  new Ext.Panel({
						id:'ActTitlePanel',
			            autoHeight : true,
			            autoScroll : true,
			            autoLoad : {
			                url:__ctxPath + '/pages/act/ActTitleTable.jsp',
			                nocache : true
			            }
			        })]
				});
	}
});
