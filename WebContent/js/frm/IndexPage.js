var IndexPage = Ext.extend(Ext.Viewport, {
	top: new Ext.Panel({
		region: 'north',
		id: '__nortPanel',
		contentEl: 'app-header',
		height: 60
	}),
	center: null,
	west: new Ext.Panel({
		region: 'west',
		id: 'west-panel',
		title: '導航',
		iconCls: 'menu-navigation',
		split: true,
		width: 180,
		autoScroll: true,
		layout: 'form',//accordion
		collapsible: true,
		items: []
	}),
	south: new Ext.Panel({
		region: 'south',
		height: 28,
		border: false,
		bbar: [{
			xtype: "tbfill"
		}, {
			xtype: 'tbtext',
			text: "新樺精機股份有限公司",
			id: 'toolbarCompanyName'
		}, {
			xtype: 'tbseparator'
		}, {
			pressed: false,
			text: '關於系統',
			iconCls: 'menu-info',
			handler: function() {
				if (Ext.getCmp('aboutsys')) {
					Ext.getCmp('aboutsys').show()
				} else {
					var t = this.text;
					var ic = this.iconCls;
					new Ext.Window({
						title: t,
						id: 'aboutsys',
						iconCls: ic,
						width: 400,
						height: 210,
						resizable: false,
						items: [new Ext.Panel({
							autoHeight: true,
							columnWidth: 1,
							autoScroll: true,
							autoLoad: {
								url: __ctxPath + '/js/frm/about.jsp',
								nocache: true
							}
						})]
					}).show()
				}
			}
		}, '-',
		{
			text: '收展',
			iconCls: 'btn-expand',
			handler: function() {
				var panel = Ext.getCmp("__nortPanel");
				if (panel.collapsed) {
					panel.expand(true)
				} else {
					panel.collapse(true)
				}
			}
		}, '-',
		{
			xtype: 'combo',
			mode: 'local',
			editable: false,
			value: '切換主題',
			width: 100,
			triggerAction: 'all',
			store: [
				['ext-all', '默認淺藍'],
				['ext-all-css04', '灰白主題'],
				['ext-all-css05', '青色主題'],
				['ext-all-css03', '粉紅主題'],
				['xtheme-tp', '灰色主題'],
				['xtheme-default2', '灰藍主題'],
				['xtheme-default16', '綠色主題'],
				['xtheme-access', 'Access風格']
			],
			listeners: {
				scope: this,
				'select': function(combo, record, index) {
					if (combo.value != '') {
						var expires = new Date();
						expires.setDate(expires.getDate() + 300);
						setCookie("theme", combo.value, expires, __ctxPath);
						Ext.util.CSS.swapStyleSheet("theme", __ctxPath + "/ext3/resources/css/" + combo.value + ".css")
					}
				}
			}
		}]
	}),
	constructor: function() {
		this.center = new Ext.TabPanel({
			id: 'centerTabPanel',
			region: 'center',
			deferredRender: true,
			enableTabScroll: true,
			autoDestroy: true,
			activeTab: 0,
			defaults: {
				autoScroll: true,
				closable: true
			},
			items: [],
			plugins: new Ext.ux.TabCloseMenu(),
			listeners: {
				'add': function(tabPanel, comp, index) {
					if (tabPanel.items.length >= 6) {
						tabPanel.remove(tabPanel.items.get(0));
						tabPanel.doLayout()
					}
				}
			}
		});
		IndexPage.superclass.constructor.call(this, {
			layout: "border",
			items: [this.top, this.west, this.center, this.south]
		});
		this.afterPropertySet();
		this.loadWestMenu()
	},
	afterPropertySet: function() {
		setInterval('CalConv()', 1000)
	},
	loadWestMenu: function() {
		var westPanel = Ext.getCmp('west-panel');
		Ext.Ajax.request({
			url: __ctxPath + '/panelTreeMenu.do',
			success: function(response, options) {
				var arr = eval(response.responseText);
				var __activedPanelId = getCookie("__activedPanelId");
				for (var i = 0; i < arr.length; i++) {
					var doc = strToDom(arr[i].subXml);
					var root = doc.documentElement || doc;
					var panel = new Ext.tree.TreePanel({
						id: arr[i].id,
						title: arr[i].text,
						iconCls: arr[i].iconCls,
						layout: 'fit',
						animate: true,
						border: false,
						autoHeight: true,
						loader: new htsoft.ux.TreeXmlLoader({
							preloadChildren: true
						}),
						root: new Ext.tree.AsyncTreeNode({
							text: root.tagName,
							xmlNode: root
						}),
						listeners: {
							'click': App.clickNode
						},
						rootVisible: false
					});
					westPanel.add(panel);
					panel.on('expand', function(p) {
						var expires = new Date();
						expires.setDate(expires.getDate() + 30);
						setCookie("__activedPanelId", p.id, expires, __ctxPath)
					});
					if (arr[i].id == __activedPanelId) {
						westPanel.layout.activeItem = panel
					}
				};
				westPanel.doLayout()
			}
		})
	}
});
IndexPage.resetPassword = function() {
	$ImportJs('ResetMyPasswordForm', function(view) {})
};
//http://tool.lu/js/