Ext.ns('JournalClearView');
JournalClearView = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		JournalClearView.superclass.constructor.call(this, {
					id : 'JournalClearView',
					title : '資料清除',
					frame:true,
					border:true,
					iconCls : 'menu-system',
					region : 'center',
					defaults : {
						layout : 'form',
						xtype:'fieldset'
					},
					items : [{
						title : '清除日期',
						items:[{
						xtype:'form',
						id:'ClearParamsForm',
						url : __ctxPath + '/act/clearJHandle.do',
						height:50,
						items:[{							
							layout : 'hbox',
							padding:'10px',
							items:[{
									xtype:'label',
									style:'padding-top:3px',
									text:'輸入欲清除日期：自'
								},{
									xtype:'datefield',
									editable:false,
									allowBlank:false,
									id:'c_startDate',
									name:'journal.createDate',	//用createDate暫存
									format:'Y-m-d',
									listeners : {
										'change' : function() {
											Ext.getCmp('c_endDate').setMinValue(this.getValue());
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
									id:'c_endDate',
									name:'journal.updateDate',
									format:'Y-m-d',
									listeners : {
										'change' : function() {
											Ext.getCmp('c_startDate').setMaxValue(this.getValue());
										}
									}
								},{
									xtype : 'button',
									text : '清除',
									style:'padding-left:20px',
									iconCls : 'btn-setting',
									handler : function() {
										var fp = Ext.getCmp("ClearParamsForm");
										if (fp.getForm().isValid()) {
											fp.getForm().submit({
												method : 'post',
												waitMsg : '正在處理...',
												success : function(fp, action) {
													if(action.success){
														if(action.result.clear ==0){
															Ext.getCmp('ClearResult').update('很抱歉！<br/>您選擇的清除日期區間，目前沒有符合清除條件的傳票資料，請重新選擇。');
														}else{
															Ext.ux.Toast.msg('信息', '清除成功！');
															Ext.getCmp('ClearResult').update('恭喜您，本次作業成功清除'+action.result.clear+'筆傳票資料。');
														}
													}else{
														Ext.Msg.alert('信息','處理失敗！');
														Ext.getCmp('ClearResult').update('很抱歉，清除失敗了!<br/>原因：系統繁忙。');
													}
												},
												failure : function(fp, action) {
													Ext.getCmp('ClearResult').update('很抱歉，清除失敗了!<br/>原因：網絡異常。');
												}
											});
										}
									}
								}]
							}]
						}]
					},{
						title : '資料清除說明',
						html:'1.上述的日期就是指欲清除的日記帳 &quot;傳票日期&quot; 。<br/><b style="color:#f00;">2.清除資料前請先執行資料備份。</b><br/>3.清除資料範圍：日記帳資料。<br/>4.清除成功或失敗，請看以下「清除結果」提示，若失敗會說明原因。<br/>5.若清除資料內容較多時，清除時間會較久，請耐心等候。'
					},{
						title : '資料清除結果',
						id:'ClearResult',
						style:'color:#f00;',
						html:''
					}]
				});
	}
});
