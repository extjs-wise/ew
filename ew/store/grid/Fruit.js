Ext.define('Ews.store.grid.Fruit', (function() {
			return {
				extend: 'Ext.data.Store',
				autoLoad:true,
				pageSize:1,
				storeId: 'Ews.store.grid.Fruit',
				model:'Ews.model.grid.Fruit',
				/*requires: ['Ext.data.Store'],
				proxy: {
					type: 'ajax',
					url: appBaseUrl + 'examples/data/tree/files.json'
				},*/
				proxy: {
					type: 'ajax',
					api: {
						create: appBaseUrl + 'examples/data/grid/Fruit.create.json',
						read: appBaseUrl + 'examples/data/grid/Fruit.read.json',
						update: appBaseUrl + 'examples/data/grid/Fruit.update.json',
						destroy: appBaseUrl + 'examples/data/grid/Fruit.destroy.json'
					},
					//url: appBaseUrl + 'examples/data/grid/Fruit.create.json',
					reader: {
						type: 'json',
						root: 'data',
						totalProperty:'total',
						successProperty:'success'
					},
					writer: {
						type: 'json',
						allowSingle: false
					}
				}
			};
		})());
