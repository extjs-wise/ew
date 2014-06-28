Ext.require(['Ext.panel.Panel']);
Ext.define('Ews.view.form.field.MultiFileUploadPanel', (function() {
			return {
				extend: 'Ext.panel.Panel',
				alias: 'widget.ews.multifileuploadpanel',
				alternateClassName: ['Ews.form.field.MultiFileUploadPanel', 'Ews.field.MultiFileUpload', 'Ews.MultiFileUpload'],
				layout: 'vbox',
				id: 'mfup',
				items: [{
						xtype: 'textfield'
					}
				],
				initComponent: function() {
					var me = this;
					me.addEvents(
						/**
						 * @event beforeclose
						 * Fires before the user closes the panel. Return false from any listener to stop the close event being
						 * fired
						 * @param {Ext.panel.Panel} panel The Panel object
						 */
						'beforeclose',
						/**
						 * @event close
						 * Fires when the user closes the panel.
						 * @param {Ext.panel.Panel} panel The Panel object
						 */
						'close',
						/**
						 * @event beforeexpand
						 * Fires before this panel is expanded. Return false to prevent the expand.
						 * @param {Ext.panel.Panel} p The Panel being expanded.
						 * @param {Boolean} animate True if the expand is animated, else false.
						 */
						"beforeexpand",
						/**
						 * @event beforecollapse
						 * Fires before this panel is collapsed. Return false to prevent the collapse.
						 * @param {Ext.panel.Panel} p The Panel being collapsed.
						 * @param {String} direction . The direction of the collapse. One of
						 *
						 *   - Ext.Component.DIRECTION_TOP
						 *   - Ext.Component.DIRECTION_RIGHT
						 *   - Ext.Component.DIRECTION_BOTTOM
						 *   - Ext.Component.DIRECTION_LEFT
						 *
						 * @param {Boolean} animate True if the collapse is animated, else false.
						 */
						"beforecollapse",
						/**
						 * @event expand
						 * Fires after this Panel has expanded.
						 * @param {Ext.panel.Panel} p The Panel that has been expanded.
						 */
						"expand",
						/**
						 * @event collapse
						 * Fires after this Panel has collapsed.
						 * @param {Ext.panel.Panel} p The Panel that has been collapsed.
						 */
						"collapse",
						/**
						 * @event titlechange
						 * Fires after the Panel title has been set or changed.
						 * @param {Ext.panel.Panel} p the Panel which has been resized.
						 * @param {String} newTitle The new title.
						 * @param {String} oldTitle The previous panel title.
						 */
						'titlechange',
						/**
						 * @event iconchange
						 * Fires after the Panel icon has been set or changed.
						 * @param {Ext.panel.Panel} p The Panel which has the icon changed.
						 * @param {String} newIcon The path to the new icon image.
						 * @param {String} oldIcon The path to the previous panel icon image.
						 */
						'iconchange',
						/**
						 * @event iconclschange
						 * Fires after the Panel iconCls has been set or changed.
						 * @param {Ext.panel.Panel} p The Panel which has the iconCls changed.
						 * @param {String} newIconCls The new iconCls.
						 * @param {String} oldIconCls The previous panel iconCls.
						 */
						'iconclschange',
						/**
						 * @event glyphchange
						 * Fired when the Panel glyph has been changed by the {@link #setGlyph} method.
						 * @param {Ext.panel.Panel} this
						 * @param {Number/String} newGlyph
						 * @param {Number/String} oldGlyph
						 */
						'glyphchange',
						/**
						 * @event float
						 * Fires after a collapsed Panel has been "floated" by clicking on
						 * it's header. Only applicable when the Panel is an item in a
						 * {@link Ext.layout.container.Border Border Layout}.
						 */
						'float',
						/**
						 * @event unfloat
						 * Fires after a "floated" Panel has returned to it's collapsed state
						 * as a result of the mouse leaving the Panel. Only applicable when
						 * the Panel is an item in a
						 * {@link Ext.layout.container.Border Border Layout}.
						 */
						'unfloat');
					if (me.collapsible) {
						// Save state on these two events.
						this.addStateEvents(['expand', 'collapse']);
					}
					if (me.unstyled) {
						me.setUI('plain');
					}
					if (me.frame) {
						me.setUI(me.ui + '-framed');
					}
					// Backwards compatibility
					me.bridgeToolbars();
					//me.callParent();
					me.items = me.initMFUPItems();
					me.callParent(arguments);
					me.collapseDirection = me.collapseDirection || me.headerPosition || Ext.Component.DIRECTION_TOP;
					// Used to track hidden content elements during collapsed state
					me.hiddenOnCollapse = new Ext.dom.CompositeElement();
				},
				initMFUPItems: function() {
					var me = this;
					me.ewsid = me.id + Ext.id();
					return [{
						xtype: 'panel',
						layout: {
							type: 'vbox'
						},
						id: 'mfulp_fj_panel' + me.ewsid,
						width: '100%',
						flex: 6,
						border: 0,
						items: [{
								xtype: 'panel',
								id: 'mfulp_fj_' + me.ewsid + '_1',
								layout: 'hbox',
								width: '100%',
								margin: '5 0 5 5',
								border: 0,
								flex: 1,
								items: [{
										xtype: 'filefield',
										labelAlign: 'left',
										id: me.ewsid + "_1",
										width: '85%',
										fieldLabel: me.label,
										name: me.ewsid + "_1",
										buttonText: '选择文件'
									}, {
										name: "deleteFileBtn",
										xtype: "button",
										margin: '0 0 0 10',
										text: '删除',
										listeners: {
											click: {
												fn: function() {
													console.log({
															'click this': this
														});
													try {
														var myt = Ext.getCmp('mfulp_fj_' + me.ewsid + '_1');
														if (myt) {
															Ext.getCmp('mfulp_fj_panel' + me.ewsid).remove(myt);
														}
														Ext.getCmp('mfulp_fj_panel' + me.ewsid).doLayout();
													} catch (e) {
														alert(e.name + " " + e.message);
													}
												}
											}
										},
										fieldLabel: "删除"
									}
								]
							}
						]
					}, {
						xtype: 'panel',
						layout: 'hbox',
						width: '100%',
						border: 0,
						items: [{
								width: '80%',
								border: 0
							}, {
								name: "addFileBtn",
								xtype: "button",
								margin: '0 0 5 10',
								text: '添加附件',
								listeners: {
									click: {
										fn: function() {
											try {
												Ext.getCmp('mfulp_fj_panel' + me.ewsid).add(me.insertMFUPItem('mfulp_fj_' + me.ewsid + Ext.id()));
												Ext.getCmp('mfulp_fj_panel' + me.ewsid).doLayout();
											} catch (e) {
												alert(e.name + " " + e.message);
											}
										}
									}
								},
								fieldLabel: "添加附件"
							}
						]
					}];
				},
				insertMFUPItem: function(id) {
					var me = this;
					var panel = new Ext.panel.Panel({
							id: id,
							layout: 'hbox',
							width: '100%',
							margin: '5 0 5 5',
							border: 0,
							flex: 1,
							items: [{
									xtype: 'filefield',
									labelAlign: 'left',
									id: id + '_filefield',
									width: '85%',
									fieldLabel: me.label,
									name: id+ '_filefield',
									buttonText: '选择文件'
								}, {
									name: "deleteFileBtn",
									xtype: "button",
									margin: '0 0 0 10',
									text: '删除',
									listeners: {
										click: {
											fn: function() {
												try {
													var myt = Ext.getCmp(id);
													if (myt) {
														Ext.getCmp('mfulp_fj_panel' + me.ewsid).remove(myt);
													}
													Ext.getCmp('mfulp_fj_panel' + me.ewsid).doLayout();
												} catch (e) {
													alert(e.name + " " + e.message);
												}
											}
										}
									},
									fieldLabel: "删除"
								}
							]
						});
					return panel;
				}
			};
		})());
