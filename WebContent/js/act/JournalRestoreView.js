Ext.ns('JournalRestoreView');
JournalRestoreView = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		JournalRestoreView.superclass.constructor.call(this, {
					id : 'JournalRestoreView',
					title : '資料恢復',
					frame:true,
					border:true,
					iconCls : 'menu-system',
					region : 'center',
					defaults : {
						layout : 'form',
						xtype:'fieldset'
					},
					items : [{
						title : '恢復日期',
						items:[{
						xtype:'form',
						id:'restoreParamsForm',
						url : __ctxPath + '/act/restoreJHandle.do',
						height:50,
						items:[{							
							layout : 'hbox',
							padding:'10px',
							items:[{
									xtype:'label',
									style:'padding-top:3px',
									text:'輸入欲恢復日期：自'
								},{
									xtype:'datefield',
									editable:false,
									allowBlank:false,
									id:'s_startDate',
									name:'journal.createDate',	//用createDate暫存
									format:'Y-m-d',
									listeners : {
										'change' : function() {
											Ext.getCmp('s_endDate').setMinValue(this.getValue());
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
									id:'s_endDate',
									name:'journal.updateDate',
									format:'Y-m-d',
									listeners : {
										'change' : function() {
											Ext.getCmp('s_startDate').setMaxValue(this.getValue());
										}
									}
								},{
									xtype : 'button',
									text : '恢復',
									style:'padding-left:20px',
									iconCls : 'btn-setting',
									handler : function() {
										var fp = Ext.getCmp("restoreParamsForm");
										if (fp.getForm().isValid()) {
											fp.getForm().submit({
												method : 'post',
												waitMsg : '正在處理...',
												success : function(fp, action) {
													if(action.success){
														if(action.result.restore ==0){
															Ext.getCmp('restoreResult').update('很抱歉！<br/>您選擇的恢復日期區間，目前沒有符合恢復條件的傳票資料，請重新選擇。');
														}else{
															Ext.ux.Toast.msg('信息', '恢復成功！');
															Ext.getCmp('restoreResult').update('恭喜您，本次作業成功恢復'+action.result.restore+'筆傳票資料。');
														}
													}else{
														Ext.Msg.alert('信息','處理失敗！');
														Ext.getCmp('restoreResult').update('很抱歉，恢復失敗了!<br/>原因：系統繁忙。');
													}
												},
												failure : function(fp, action) {
													Ext.getCmp('restoreResult').update('很抱歉，恢復失敗了!<br/>原因：網絡異常。');
												}
											});
										}
									}
								}]
							}]
						}]
					},{
						title : '資料恢復說明',
						html:'1.上述的日期就是指欲恢復的日記帳 &quot;傳票日期&quot; 。<br/>2.恢復資料範圍：日記帳資料。<br/>3.恢復成功或失敗，請看以下「恢復結果」提示，若失敗會說明原因。<br/>4.若恢復資料內容較多時，恢復時間會較久，請耐心等候。'
					},{
						title : '資料恢復結果',
						id:'restoreResult',
						style:'color:#f00;',
						html:''
					}]
				});
	}
});
