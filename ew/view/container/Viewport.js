Ext.define('Ews.view.container.Viewport', (function() {
			return {
				extend: Ext.container.Viewport,
				alias: 'widget.ews.viewport',
				xtype:'ws.viewport',
				alternateClassName: ['Ews.Viewport', 'Ews.container.Viewport'],
				requires: ['Ext.container.Container', 'Ext.container.Viewport'],
				isViewport: false,
				overflowX:'scroll',
				layout: 'border'
			};
		})());
