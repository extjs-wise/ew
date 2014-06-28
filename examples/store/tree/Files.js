Ext.require(['Ext.data.TreeStore']);
Ext.onReady(function() {
		var oTree = Ext.create('Ews.store.tree.Files', {
				model: 'Ews.model.tree.Files',
				storeId: 'Ews.store.tree.example.Files',
				alias: 'store.tree.example.Files',
				root: {
					name: 'Folder',
					expanded: true
				},
				proxy: {
					type: 'ajax',
					api: {
						create: appBaseUrl + 'examples/data/tree/Files.create.json',
						read: appBaseUrl + 'examples/data/tree/Files.create.json',
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
	});
