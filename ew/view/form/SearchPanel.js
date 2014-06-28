Ext.define('Ews.form.SearchPanel', (function() {
			return {
				extend: 'Ews.form.GridDockPanel',
				requires: ['Ews.form.GridDockPanel'],
				alias: ['widget.ews.formsearchpanel', 'widget.ews.searchpanel'],
				alternateClassName: ['Ews.form.SearchPanel', 'Ews.view.form.SearchPanel'],
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
