Ext.require(['Ext.data.TreeStore']);
Ext.onReady(function() {
		initTreeStore();
		initGridStore();
	});

function initTreeStore() {
	console.log(appBaseUrl);
	var oTree = Ext.create('Ews.store.tree.Files', {
			model: 'Ews.model.tree.Files',
			storeId: 'examples.store.demo.Files',
			root: {
				name: 'Folder',
				expanded: true
			},
			proxy: {
				type: 'ajax',
				api: {
					create: appBaseUrl + 'examples/data/tree/Files.create.json',
					read: appBaseUrl + 'examples/data/tree/Files.read.json',
					update: appBaseUrl + 'examples/data/tree/files.json',
					destroy: appBaseUrl + 'examples/data/tree/files.json'
				}
				//url: appBaseUrl + 'examples/data/tree/files.json'
			}
			/*
					proxy:{
						type: 'ajax',
						url: (appBaseUrl + 'examples/data/tree/files.json')
					}
				*/
		});
}

function initGridStore() {
	var oGrid = Ext.create('Ews.store.grid.Fruit', {
			storeId: 'examples.store.demo.Fruit',
			pageSize:4
	});
}
