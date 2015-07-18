Ext.ns('JournalBackupView');
JournalBackupView = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		JournalBackupView.superclass.constructor.call(this, {
					id : 'JournalBackupView',
					title : '資料備份',
					frame:true,
					border:true,
					iconCls : 'menu-system',
					region : 'center',
					defaults : {
						layout : 'form',
						xtype:'fieldset'
					},
					items : [{
						title : '備份日期',
						items:[{
						xtype:'form',
						id:'BackupParamsForm',
						url : __ctxPath + '/act/backupJHandle.do',
						height:50,
						items:[{							
							layout : 'hbox',
							padding:'10px',
							items:[{
									xtype:'label',
									style:'padding-top:3px',
									text:'輸入欲備份日期：自'
								},{
									xtype:'datefield',
									editable:false,
									allowBlank:false,
									id:'b_startDate',
									name:'journal.createDate',	//用createDate暫存
									format:'Y-m-d',
									listeners : {
										'change' : function() {
											Ext.getCmp('b_endDate').setMinValue(this.getValue());
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
									id:'b_endDate',
									name:'journal.updateDate',
									format:'Y-m-d',
									listeners : {
										'change' : function() {
											Ext.getCmp('b_startDate').setMaxValue(this.getValue());
										}
									}
								},{
									xtype : 'button',
									text : '備份',
									style:'padding-left:20px',
									iconCls : 'btn-setting',
									handler : function() {
										var fp = Ext.getCmp("BackupParamsForm");
										if (fp.getForm().isValid()) {
											fp.getForm().submit({
												method : 'post',
												waitMsg : '正在處理...',
												success : function(fp, action) {
													if(action.success){
														if(action.result.backup ==0){
															Ext.getCmp('backupResult').update('很抱歉！<br/>您選擇的備份日期區間，目前沒有符合備份條件的傳票資料，請重新選擇。');
														}else{
															Ext.ux.Toast.msg('信息', '備份成功！');
															Ext.getCmp('backupResult').update('恭喜您，本次作業成功備份'+action.result.backup+'筆傳票資料。');
														}
													}else{
														Ext.Msg.alert('信息','處理失敗！');
														Ext.getCmp('backupResult').update('很抱歉，備份失敗了!<br/>原因：系統繁忙。');
													}
												},
												failure : function(fp, action) {
													Ext.getCmp('backupResult').update('很抱歉，備份失敗了!<br/>原因：網絡異常。');
												}
											});
										}
									}
								}]
							}]
						}]
					},{
						title : '資料備份說明',
						html:'1.上述的日期就是指欲備份的日記帳 &quot;傳票日期&quot; 。<br/>2.備份資料範圍：日記帳資料。<br/>3.備份成功或失敗，請看以下「備份結果」提示，若失敗會說明原因。<br/>4.若備份資料內容較多時，備份時間會較久，請耐心等候。'
					},{
						title : '資料備份結果',
						id:'backupResult',
						style:'color:#f00;',
						html:''
					}]
				});
	}
});
