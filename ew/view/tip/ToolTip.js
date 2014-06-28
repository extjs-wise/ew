Ext.define('Ews.view.tip.ToolTip', (function() {
			return {
				extend: 'Ext.tip.ToolTip',
				alias: ['widget.ews.tooltip'],
				alternateClassName: ['Ews.ToolTip', 'Ews.tip.ToolTip'],
				initComponent: function() {
					var me = this;
					me.callParent(arguments);
					me.lastActive = new Date();
					me.setTarget(me.target);
					me.origAnchor = me.anchor;
				}
			};
		}));
