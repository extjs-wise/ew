Ext.define('Ews.store.grid.organization', (function() {
			return {
				extend: 'Ext.data.Store',
				autoLoad:true,
				pageSize:1,
				storeId: 'Ews.store.grid.organization',
				model:'Ews.model.grid.organization',
				/*requires: ['Ext.data.Store'],
				proxy: {
					type: 'ajax',
					url: appBaseUrl + 'examples/data/tree/files.json'
				},*/
				proxy: {
					type: 'ajax',
					api: {
						create: appBaseUrl + 'examples/data/grid/Fruit.create.json',
						read: 'http://localhost:8080/com.wisesoft.egovernment.web/organization/list.json',
						update: appBaseUrl + 'examples/data/grid/Fruit.update.json',
						destroy: appBaseUrl + 'examples/data/grid/Fruit.destroy.json'
					},
					//url: appBaseUrl + 'examples/data/grid/Fruit.create.json',

					reader: {
						type: 'json',
						root: 'topics',
						totalProperty:'totalCount',
						successProperty:'success'
					},
					writer: {
						type: 'json',
						allowSingle: false
					}
				}
			};
		})());
