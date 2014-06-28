Ext.require(['Ext.ux.TreePicker']);
Ext.define('Ews.view.form.field.TreePicker', {
		extend: 'Ext.ux.TreePicker',
		alias: ['widget.ews.treepicker'],
		alternateClassName: ['Ews.form.field.TreePicker', 'Ews.field.TreePicker', 'Ews.TreePicker'],
		maxHeight: 22,
		maxWidth: 250,
		displayField: 'text',
		margin: '10 0 10 0',
		value: 'value',
		minPickerHeight: 100,
		createPicker: function() {
			var me = this;
			me.tree = me.tree || {};
			var picker = new Ext.tree.Panel(Ext.merge({
						shrinkWrapDock: 2,
						floating: true,
						manageHeight: false,
						shadow: false
					}, me.tree, {
						minHeight: me.minPickerHeight || me.tree.minHeight,
						maxHeight: me.maxPickerHeight || me.tree.maxHeight,
						displayField: me.displayField || me.tree.displayField,
						columns: me.columns || me.tree.columns,
						store: me.store || me.tree.store,
						listeners: {
							scope: me,
							itemclick: function(view, record, node, rowIndex, e) {
								me.onItemClick(view, record, node, rowIndex, e);
								if (Ext.isObject(me.tree) === true) {
									if (Ext.isObject(me.tree.listeners) === true) {
										if (Ext.isFunction(me.tree.listeners.itemclick) === true) {
											me.tree.listeners.itemclick(view, record, node, rowIndex, e);
										}
									}
								}
							}
						},
						viewConfig: {
							listeners: {
								scope: me,
								render: me.onViewRender
							}
						}
					})),
				view = picker.getView();
			if (Ext.isIE9 && Ext.isStrict) {
				// In IE9 strict mode, the tree view grows by the height of the horizontal scroll bar when the items are highlighted or unhighlighted.
				// Also when items are collapsed or expanded the height of the view is off. Forcing a repaint fixes the problem.
				view.on({
						scope: me,
						highlightitem: me.repaintPickerView,
						unhighlightitem: me.repaintPickerView,
						afteritemexpand: me.repaintPickerView,
						afteritemcollapse: me.repaintPickerView
					});
			}
			return picker;
		},
		/**
		 * Handles a click even on a tree node
		 * @private
		 * @param {Ext.tree.View} view
		 * @param {Ext.data.Model} record
		 * @param {HTMLElement} node
		 * @param {Number} rowIndex
		 * @param {Ext.EventObject} e
		 */
		onItemClick: function(view, record, node, rowIndex, e) {
			var me = this;
			this.selectItem(record);
		}
	});
