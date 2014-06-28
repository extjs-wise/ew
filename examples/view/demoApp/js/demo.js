Ext.require([
		'Ext.data.Store',
		'Ext.data.TreeStore',
		'Ext.grid.Panel',
		'Ext.grid.plugin.RowEditing',
		'Ext.tree.Panel',
		'Ews.*',
		'Ews.view.container.Viewport',
		'Ews.view.form.Panel',
		'Ews.view.form.Panel',
		//'Ews.view.form.field.*',
		'Ews.view.form.field.TreePicker',
		'Ews.view.form.field.MultiFileUploadPanel'
	]);
var wsTree, centerContainer;
Ext.onReady(function() {
		initTree();
		initGrid();
		initViewport();
		Ext.log(wsGrid.region);
	});

function initTree() {
	var oStore = Ext.data.StoreManager.lookup('examples.store.demo.Files');
	console.log({
			oStore: oStore
		});
	wsTree = Ext.create('Ews.view.tree.Panel', {
			region: 'west',
			store: oStore,
			width: 200,
			columns: [{
					xtype: 'treecolumn',
					header: 'Files',
					dataIndex: 'text',
					flex: 1
				}
			],
			listeners: {
				itemclick: function(oThis, record, item, index, e, eOpts) {
					var tabpanel = centerContainer.getComponent('tabpanel'),
						url = record.url || 'https://www.facebook.com',
						itemId = record.id || Ext.id(),
						itemTitle = record.title || "OK" + itemId;
					if (Ext.isObject(tabpanel.getComponent(itemId)) === true) {
						tabpanel.setActiveTab(itemId);
					} else {
						var iframe = Ext.create('Ext.ux.IFrame', {
								title: itemTitle,
								closable: true,
								width: '100%',
								height: '100%',
								itemId: itemId,
								src: (url.indexOf("http://") === 0 ? url : (appBaseUrl + (url || 'examples/data-grid.html'))) + '?theme=' + (Ext.themeName) + '&lang=' + (lang || 'zh_CN') + '&charset=' + (charset || 'utf-8')
							});
						tabpanel.insert(0, iframe);
					}
				}
			}
		});
}

function initGrid() {
	/*Model*/
	/*Store*/
	var oStore = Ext.data.StoreManager.lookup('examples.store.demo.Fruit');
	var fruitColumns = [{
			text: 'NAME',
			flex: 0,
			//minWidth:10,
			//columnWidth: 20,
			//maxWidth:20,
			tdCls: 'text-wrap',
			dataIndex: 'name',
			editor: {
				xtype: 'textfield',
				allowBlank: false
			}
		}, {
			text: 'NICK',
			flex: 1,
			dataIndex: 'nick'
		}, {
			text: 'COLOR',
			flex: 1,
			dataIndex: 'color'
		}, {
			xtype: 'numbercolumn',
			text: 'WEIGHT(kg)',
			flex: 1,
			dataIndex: 'weight',
			format: '0.0 kg',
			editor: {
				xtype: 'numberfield',
				allowBlank: false,
				minValue: 1,
				maxValue: 150000
			}
		}, {
			text: 'AMOUNT',
			flex: 1,
			dataIndex: 'amount'
		}, {
			xtype: 'datecolumn',
			text: 'PAYDATE',
			flex: 1,
			dataIndex: 'paydate',
			//format: 'Y/m/d',
			editor: {
				xtype: 'datefield',
				allowBlank: false,
				//format: 'Y/m/d',
				minValue: '2006-01-01',
				minText: 'Cannot have a start date before the company existed!',
				maxValue: Ext.Date.format(new Date(), 'Y-m-d')
			}
		}
	];
	/*View*/
	wsGrid = Ext.create('Ews.view.grid.Panel', {
			region: 'center',
			title: 'Fruit',
			width: '100%',
			height: '100%',
			columns: fruitColumns,
			buttons: [{
					iconCls: 'fcat add-icon',
					text: 'add',
					listeners: {
						click: {
							fn: function() {
								console.log({
										'MultiFileUploadPanel': Ext.create('Ews.view.form.field.MultiFileUploadPanel', {})
									});
								initForm();
							}
						}
					}
				}
			],
			store: oStore,
			defaultBtnsDescription: '',
			plugins: [{
					ptype: 'rowediting',
					clicksToMoveEditor: 2,
					autoCancel: false
				}
			]
		});
}

function initViewport() {
	centerContainer = Ext.create('Ews.view.container.Viewport', {
			layout: 'border',
			overflowX: 'scroll',
			title: 'Ext Layout Browser',
			items: [wsTree, {
					xtype: 'tabpanel',
					region: 'center',
					itemId: 'tabpanel',
					//layout: 'border',
					activeTab: 0,
					width: '100%',
					items: [{
							xtype: 'panel',
							title: wsGrid.title,
							layout: 'border',
							items: [wsGrid]
						}, {
							title: 'Foo'
						}, {
							title: 'Bar',
							tabConfig: {
								title: 'Custom Title',
								tooltip: 'A button tooltip'
							}
						}
					]
				}
			]
		});
}

function initForm() {
	var aFormItem = [],
		aFormButtons = [];
	aFormItem = [];
	aFormButtons = [];

	var oStore = Ext.data.StoreManager.lookup('examples.store.demo.Files');

	var dialog = Ext.create('Ews.view.dialog.Panel', {
			items: [{
					xtype: 'ews.form',
					items: [{
							xtype: 'ews.treepicker',
							width: 200,
							height: 30,
							maxHeight: 22,
							labelWidth: 60,
							displayField: 'text',
							fieldLabel: 'fieldLabel',
							name: 'name',
							value: 'text',
							minPickerHeight: 100,
							tree: {
								rootVisible: false
							},
							store: oStore
						}, {
							xtype: 'ews.multifileuploadpanel',
							id: 'ak47',
							width: '100%',
							items: [{
									xtype: 'textfield'
								}
							]
						}
					]
				}
			]
		});
	dialog.show();
}
