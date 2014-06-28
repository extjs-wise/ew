Ext.require([
		'Ext.data.*',
		'Ext.grid.*',
		'Ews.*',
		'Ext.Viewport'
	]);
Ext.onReady(function() {
		/*Model*/
		Ext.define('Ex.model.ClientA', {
				extend: 'Ext.data.Model',
				fields: [
					'name', 'lastname', 'email', 'country', {
						name: 'client',
						type: 'int'
					}, {
						name: 'age',
						type: 'int'
					}, {
						name: 'active',
						type: 'boolean'
					}, {
						name: 'amount',
						type: 'float'
					},
					'paydate'
				]
			});
		var model = Ext.create('Ex.model.ClientA', {});
		/*Store*/
		var store = Ext.create('Ext.data.Store', {
				model: 'Ex.model.ClientA',
				data: [{
						client: 1,
						name: 'David',
						lastname: 'Lee',
						age: 24,
						email: 'david@email.com',
						country: 'PRC',
						paydate: '08/08/2012',
						amount: 120.5,
						active: true
					}, {
						client: 1,
						name: 'Lisa',
						lastname: 'Brown',
						age: 25,
						email: 'lisa@email.com',
						country: 'Australia',
						paydate: '08/08/2012',
						amount: 120.5,
						active: false
					}
				]
			});
		var columns = [{
				text: 'Name',
				width: 100,
				dataIndex: 'name'
			}, {
				text: 'Last Name',
				width: 100,
				dataIndex: 'lastname'
			}, {
				text: 'Age',
				width: 50,
				dataIndex: 'age'
			}, {
				text: 'Email Address',
				width: 150,
				dataIndex: 'email'
			}, {
				text: 'Country',
				width: 80,
				dataIndex: 'country'
			}, {
				text: 'Pay Date',
				flex: 1,
				dataIndex: 'paydate'
			}, {
				text: 'Total',
				flex: 1,
				dataIndex: 'amount'
			}, {
				text: 'Active?',
				flex: 1,
				dataIndex: 'active'
			}
		];
		/*View*/
		var wsgrid = Ext.create('Ews.view.grid.Panel', {
				title:'grid0',
				width:500,
				height:200,
				columns: columns,
				store: store
			});
		var exgrid = Ext.create('Ews.grid.Panel', {
				region:'center',
				title:'grid1',
				width:500,
				height:200,
				columns: columns,
				store: store
			});
		var centerContainer = Ext.create('Ext.Viewport', {
				layout: 'border',
				title: 'Ext Layout Browser',
				items: [ exgrid, wsgrid]
			});
		Ext.log(wsgrid.region);
	});
