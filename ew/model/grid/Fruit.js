Ext.define('Ews.model.grid.Fruit', {
		extend: 'Ext.data.Model',
		fields: [
			'id','name', 'nick', {
				name: 'color',
				type: 'string'
			}, {
				name: 'weight',
				type: 'float'
			}, {
				name: 'amount',
				type: 'int'
			},
			'paydate'
		],
		validations: [{
				type: 'presence',
				field: 'name'
			}, {
				type: 'length',
				field: 'nick',
				max: 50
			}, {
				type: 'length',
				field: 'color',
				min: 2,
				max: 50
			}
		]
	});
