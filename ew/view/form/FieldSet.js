Ext.define('Ews.view.form.FieldSet', (function() {
			return {
				extend: 'Ext.form.FieldSet',
				requires: ['Ext.form.FieldSet'],
				alias: ['widget.ews.formfieldset', 'widget.ews.fieldset'],
				alternateClassName: ['Ews.form.FieldSet', 'Ews.view.form.FieldSet'],
				initComponent: function() {
					var me = this,
						baseCls = me.baseCls;
						me.addEvents('create');

					me.initFieldAncestor();

					me.callParent();

					// Fieldsets cannot support managePadding because the managePadding config causes
					// the paddding to be added to the innerCt instead of the fieldset element.  The
					// padding must be on the fieldset element because the horizontal position of the
					// legend is determined by the fieldset element's padding
					// 
					// As a consequence of the inability to support managePadding, manageOverflow
					// cannot be supported either because the correct overflow cannot be calculated
					// without managePadding to adjust for cross-browser differences in the way
					// padding is handled on overflowing elements.
					// See Ext.layout.container.Auto for more info.
					me.layout.managePadding = me.layout.manageOverflow = false;

					me.addEvents(

						/**
						 * @event beforeexpand
						 * Fires before this FieldSet is expanded. Return false to prevent the expand.
						 * @param {Ext.form.FieldSet} f The FieldSet being expanded.
						 */
						"beforeexpand",

						/**
						 * @event beforecollapse
						 * Fires before this FieldSet is collapsed. Return false to prevent the collapse.
						 * @param {Ext.form.FieldSet} f The FieldSet being collapsed.
						 */
						"beforecollapse",

						/**
						 * @event expand
						 * Fires after this FieldSet has expanded.
						 * @param {Ext.form.FieldSet} f The FieldSet that has been expanded.
						 */
						"expand",

						/**
						 * @event collapse
						 * Fires after this FieldSet has collapsed.
						 * @param {Ext.form.FieldSet} f The FieldSet that has been collapsed.
						 */
						"collapse");

					if (me.collapsed) {
						me.addCls(baseCls + '-collapsed');
						me.collapse();
					}
					if (me.title || me.checkboxToggle || me.collapsible) {
						me.addTitleClasses();
						me.legend = Ext.widget(me.createLegendCt());
					}
					me.initMonitor();
				}
			};
		})());
