Ext.define('Ews.store.tree.Files', (function() {
			return {
				extend: 'Ext.data.TreeStore',
				requires: ['Ext.data.TreeStore']/*,
				proxy: {
					type: 'ajax',
					url: appBaseUrl + 'examples/data/tree/files.json'
				}*/
				,proxy: {
					type: 'ajax',
					api:{
						create: appBaseUrl + 'examples/data/tree/Files.create.json',
						read: appBaseUrl + 'examples/data/tree/Files.read.json',
						update: appBaseUrl + 'examples/data/tree/files.json',
						destroy: appBaseUrl + 'examples/data/tree/files.json'
					}
					//url: appBaseUrl + 'examples/data/tree/files.json'
				}
			};
		})());
