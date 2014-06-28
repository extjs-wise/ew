Ext.define('Ews.store.grid.store', (function() {
			return {
				extend: 'Ext.data.Store',
				autoLoad:true,
				pageSize:1,
				storeId: 'Ews.store.grid.store'
//				model:'Ews.model.grid.model'
				/*requires: ['Ext.data.Store'],
				proxy: {
					type: 'ajax',
					url: appBaseUrl + 'examples/data/tree/files.json'
				},*/
				
			};
		})());
