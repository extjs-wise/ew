Ext.require(['Ext.data.Model']);
Ext.define('Ews.model.tree.Files', (function() {
			return {
				extend: 'Ext.data.Model',
				idProperty:'id',
				fields:[
						{name:'id', type:'int'},
						{name:'text', type:'string'}
					]//,
					//proxy: {
						//type: 'ajax',
						//api:{
						//	create: appBaseUrl + 'examples/data/tree/Files.create.json',
						//	read: appBaseUrl + 'examples/data/tree/files.json',
						//	update: appBaseUrl + 'examples/data/tree/files.json',
						//	destroy: appBaseUrl + 'examples/data/tree/files.json'
						//}
						//url: appBaseUrl + 'examples/data/tree/files.json'
					//}
			};
		})());
