Ext.ns('JournalPostView');
JournalPostView = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		JournalPostView.superclass.constructor.call(this, {
					id : 'JournalPostView',
					title : '過帳處理',
					frame:true,
					border:true,
					iconCls : 'menu-system',
					region : 'center',
					defaults : {
						layout : 'form',
						xtype:'fieldset'
					},
					items : [{
						title : '過帳日期',
						items:[{
						xtype:'form',
						id:'PostParamsForm',
						url : __ctxPath + '/act/postJournal.do',
						height:50,
						items:[{							
							layout : 'hbox',
							padding:'10px',
							items:[{
									xtype:'label',
									style:'padding-top:3px',
									text:'輸入欲過帳日期：自'
								},{
									xtype:'datefield',
									editable:false,
									allowBlank:false,
									id:'p_startDate',
									name:'journal.createDate',	//用createDate暫存
									format:'Y-m-d',
									listeners : {
										'change' : function() {
											Ext.getCmp('p_endDate').setMinValue(this.getValue());
										}
									}
								},{
									xtype:'label',
									style:'padding-top:3px',
									text:'至'
								},{
									xtype:'datefield',
									editable:false,
									allowBlank:false,
									id:'p_endDate',
									name:'journal.updateDate',
									format:'Y-m-d',
									listeners : {
										'change' : function() {
											Ext.getCmp('p_startDate').setMaxValue(this.getValue());
										}
									}
								},{
									xtype : 'button',
									text : '過帳',
									style:'padding-left:20px',
									iconCls : 'btn-setting',
									handler : function() {
										var fp = Ext.getCmp("PostParamsForm");
										if (fp.getForm().isValid()) {
											fp.getForm().submit({
												method : 'post',
												waitMsg : '正在處理...',
												success : function(fp, action) {
													if(action.success){
														if(action.result.post ==0){
															Ext.getCmp('postResult').update('很抱歉！<br/>您選擇的過帳日期區間，目前沒有符合過帳條件的傳票資料，請重新選擇。');
														}else{
															Ext.ux.Toast.msg('信息', '過帳成功！');
															Ext.getCmp('postResult').update('恭喜您，本次作業成功過帳'+action.result.post+'筆傳票資料。');
														}
													}else{
														Ext.Msg.alert('信息','處理失敗！');
														Ext.getCmp('postResult').update('很抱歉，過帳失敗了!<br/>原因：系統繁忙。');
													}
												},
												failure : function(fp, action) {
													Ext.getCmp('postResult').update('很抱歉，過帳失敗了!<br/>原因：網絡異常。');
												}
											});
										}
									}
								}]
							}]
						}]
					},{
						title : '過帳說明',
						html:'1.上述的日期就是指欲過帳的日記帳 &quot;傳票日期&quot; 。<br/>' +
							 '2.過帳成功或失敗，請看以下「過帳結果」提示，若失敗會說明原因。<br/>' +
							 '3.若過帳資料內容較多時，過帳時間會較久，請耐心等候。'
					},{
						title : '過帳結果',
						id:'postResult',
						style:'color:#f00;',
						html:''
					}]
				});
	}
});
