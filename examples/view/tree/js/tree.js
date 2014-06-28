Ext.require(['Ext.tree.Panel', 'Ews.*']);
Ext.onReady(function() {
		var oStore = Ext.data.StoreManager.lookup('Ews.store.tree.example.Files');
		var oTree = Ext.create('Ews.view.tree.Panel', {
				renderTo: Ext.getBody(),
				store: oStore,
				columns: [{
						xtype: 'treecolumn',
						header: 'Files',
						dataIndex: 'text',
						flex: 1
					}
				]
			});
	});
