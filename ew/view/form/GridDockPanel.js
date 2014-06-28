Ext.define('Ews.view.form.GridDockPanel', (function() {
			return {
				extend: 'Ext.form.Panel',
				region: 'north',
				requires: ['Ext.form.Panel'],
				alias: ['widget.ews.formsearchpanel', 'widget.ews.searchpanel'],
				alternateClassName: ['Ews.form.GridDockPanel', 'Ews.view.form.GridDockPanel'],
				layout:'column',
				defaults:{
					xtype:'textfield',
					labelAlign:'right',
					labelWidth:90,
					padding:'2 2 2 2',
					hideEmptyLabel:false
				},
				columnWidth:'10%',
				columnWidth:30,
				padding:'1 1 1 1',

				initComponent: function() {
					var me = this;

					if (me.frame) {
						me.border = false;
					}

					me.initFieldAncestor();
					me.callParent();

					me.relayEvents(me.form, [
							/**
							 * @event beforeaction
							 * @inheritdoc Ext.form.Basic#beforeaction
							 */
							'beforeaction',
							/**
							 * @event actionfailed
							 * @inheritdoc Ext.form.Basic#actionfailed
							 */
							'actionfailed',
							/**
							 * @event actioncomplete
							 * @inheritdoc Ext.form.Basic#actioncomplete
							 */
							'actioncomplete',
							/**
							 * @event validitychange
							 * @inheritdoc Ext.form.Basic#validitychange
							 */
							'validitychange',
							/**
							 * @event dirtychange
							 * @inheritdoc Ext.form.Basic#dirtychange
							 */
							'dirtychange'
						]);

					// Start polling if configured
					if (me.pollForChanges) {
						me.startPolling(me.pollInterval || 500);
					}
				}
			};
		})());
