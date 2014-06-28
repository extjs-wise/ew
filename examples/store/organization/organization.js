Ext.require(['Ext.data.TreeStore']);
Ext.onReady(function() {
		initTreeStore();
		initGridStore();
	});

function initTreeStore() {
	var oTree = Ext.create('Ews.store.tree.Files', {
			model: 'Ews.model.tree.Files',
			storeId: 'examples.store.oraganization.Files',
			root: {
				name: 'Folder',
				expanded: true
			},
			proxy: {
				type: 'ajax',
				api: {
					create: appBaseUrl + 'examples/data/tree/Files.create.json',
					//read: appBaseUrl + 'examples/data/tree/Files.create.json',
					read: 'http://localhost:8080/com.wisesoft.egovernment.web/organization/getOrganizationJson.html',
					update: appBaseUrl + 'examples/data/tree/files.json',
					destroy: appBaseUrl + 'examples/data/tree/files.json'
				}
				//url: 'http://localhost:8080/com.wisesoft.egovernment.web/organization/getOrganizationJson.html'
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
	var oGrid = Ext.create('Ews.store.grid.organization', {
			storeId: 'examples.store.organization.organization',
			pageSize:4
	});
}
