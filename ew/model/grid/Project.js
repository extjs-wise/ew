Ext.require(['Ext.data.Model']);
Ext.define('Ews.model.grid.Project', (function() {
			return {
				extend: 'Ext.data.Model',
				fields: [{
						name: 'id',
						type: 'string'
					}, {
						name: 'name',
						type: 'string'
					}, {
						name: 'department_id',
						type: 'string'
					}, {
						name: 'register_time',
						type: 'string'
					}, {
						name: 'check_status',
						type: 'string'
					}
				]
			};
		})());
