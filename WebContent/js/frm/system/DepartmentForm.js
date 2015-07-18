DepartmentForm = Ext.extend(Ext.Window, {
	formPanel : null,
	constructor : function(_cfg) {
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		DepartmentForm.superclass.constructor.call(this, {
					layout : 'fit',
					id : 'DepartmentFormWin',
					title : '部門信息',
					iconCls : 'menu-department',
					width : 400,
					height : 210,
					minWidth : 399,
					minHeight : 169,
					items : this.formPanel,
					border : false,
					modal : true,
					plain : true,
					buttonAlign : 'center',
					buttons : this.buttons
				});
	},// end of the constructor
	initUIComponents : function() {
		var url = __ctxPath + '/system/addDepartment.do';
		if(this.isEdit){
			url = __ctxPath + '/system/saveDepartment.do';
		}
		this.formPanel = new Ext.form.FormPanel({
			frame : false,
			id : 'departmentForm',
			bodyStyle : 'padding : 5px;',
			layout : 'form',
			defaultType : 'textfield',
			url : url,
			defaultType : 'textfield',
			reader : new Ext.data.JsonReader({
						root : 'data'
					}, [{
								name : 'depId',
								mapping : 'depId'
							}, {
								name : 'depName',
								mapping : 'depName'
							}, {
								name : 'depDesc',
								mapping : 'depDesc'
							}, {
								name : 'parentId',
								mapping : 'parentId'
							}]),

			defaults : {
				anchor : '95%,95%',
				allowBlank : true,
				selectOnFocus : true,
				msgTarget : 'side'
			},
			items : [{
						xtype : 'hidden',
						name : 'department.depId',
						id : 'depId'
					}, {
						xtype : 'hidden',
						name : 'department.parentId',
						id : 'parentId',
						value : this.nodeId
					}, {
						fieldLabel : '部門名稱',
						name : 'department.depName',
                        allowBlank:false,
						blankText : '非空!',
						id : 'depName'
					}, {
						fieldLabel : '部門簡述',
						xtype : 'textarea',
						name : 'department.depDesc',
						blankText : '非空!',
						id : 'depDesc'
					}]
		});
		this.buttons = [{
					text : '保存',
					iconCls : 'btn-save',
					handler : function() {
						var tree1 = Ext.getCmp('treePanel');
						if (Ext.getCmp('departmentForm').getForm().isValid()) {
							Ext.getCmp('departmentForm').getForm().submit({
										waitMsg : '正在提交...',
										success : function(formPanel, o) {
											Ext.ux.Toast.msg('信息', '添加成功！')
											Ext.getCmp('DepartmentFormWin')
													.close();
											tree1.root.reload();
										}
									});
						}
					}

				}, {
					text : '取消',
					iconCls : 'btn-del',
					handler : function() {
						Ext.getCmp('DepartmentFormWin').close();
					}
				}];// end of the buttons
	}
});