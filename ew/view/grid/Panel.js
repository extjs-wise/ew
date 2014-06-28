/**
外部命名规则为aaaBbbCcc
内部命名规则为_aaa_bbb_ccc
外部命名变量 优先级高于 内部命名变量。
默认值命名规则为default开头。
静态值命名规则为static开头。
默认值变量 会被普通命名变量重写，
普通命名变量 会被静态值命名变量重写。
所有存在对应默认值或静态值的变量拥有get方法。
*/
Ext.define('Ews.view.grid.Panel', (function() {
			return {
				extend: 'Ext.grid.Panel',
				region: 'north',
				requires: ['Ext.grid.Panel', 'Ext.grid.View'],
				alias: ['widget.ews.gridpanel', 'widget.ews.grid'],
				alternateClassName: ['Ews.list.ListView', 'Ews.ListView', 'Ews.grid.GridPanel', 'Ews.grid.Panel', 'Ews.view.grid.Panel'],
				viewType: 'gridview',
				lockable: false,
				rowLines: true,
				columnLines: true,
				minWidth: 700,
				width: '100%',
				minHeight: 210,
				height: '100%',
				title: 'Grid',
				border: '0 0 0 0',
				plugins: [
					/*{
					ptype:'gridheaderresizer',
					dynamic:true,
					pluginId:'gridheaderresizer'
					}*/
				],
				initComponent: function() {
					var me = this;
					me._init_ews();
					//me.createModel();
					//me.utils('consolelog')(me.utils('getProperty')('_default_columns'));
					me.store = me._build_store();
					me.columns = me._build_columns();
					me._build_default_btns_and_forms();
					me.dockedItems = me._build_docked_items();
					var default_form_style = me.utils("callFunction")("_get_default_form_style");
					switch (default_form_style) {
						case 'dock':
							break;
						case 'dialog':
							break;
						default:
							break;
					}
					this.callParent(arguments);
					//me.cellTip = me._build_cell_tip();
					me._init_events();
				},
				_init_ews: function() {
					var me = this;
					var chain = me.utils("chain");
					me.default_view_config = {
						showPreview: true,
						scrollOffset: 0,
						forceFit: true,
						autoFill: true,
						fitcontainer: true,
						emptyText: 'There is nothing to show.'
					};
					chain("default_view_config", "viewConfig");
					me._default_default_btns_config = {
						R: {
							xtype: 'button',
							iconCls: 'fcat search-icon',
							text: 'Search',
							itemId: 'default_search_btn',
							listeners: {
								click: function(oThis, ev, oEOpts) {
									var me = oThis.ownerCt.ownerCt,
										search_form = me.search_form;
									var edit = me.editingPlugin;
									me.utils("execFuncOf")("cancelEdit", edit);
									me.utils('toggleDefaultForm')(oThis, ev, oEOpts, search_form);
								}
							}
						},
						C: {
							xtype: 'button',
							iconCls: 'fcat add-icon',
							text: 'Add',
							itemId: 'default_add_btn',
							listeners: {
								click: function(oThis, ev, oEOpts) {
									var me = oThis.ownerCt.ownerCt,
										add_form_panel = me.add_form,
										add_form = add_form_panel.items.items[0];
									me.utils("consolelog")({
											me: me,
											This: this
										}, "_default_default_btns_config");
									var edit = me.editingPlugin;
									me.utils("execFuncOf")("cancelEdit", edit);
									me.utils('toggleDefaultForm')(oThis, ev, oEOpts, add_form_panel);
									/*
										var rec = new Writer.Person({
												first: '',
												last: '',
												email: ''
											});
											edit.cancelEdit();
											this.store.insert(0, rec);
											edit.startEditByPosition({
												row: 0,
												column: 1
											});
											*/
								}
							}
						},
						U: {
							xtype: 'button',
							iconCls: 'fcat edit-icon',
							text: 'Edit',
							itemId: 'default_update_btn',
							disabled: true,
							listeners: {
								click: function(oThis, ev, oEOpts) {
									var me = oThis.ownerCt.ownerCt,
										edit_form_container_panel = me.edit_form,
										edit_form_panel = edit_form_container_panel.items.items[0],
										edit_form = edit_form_panel.getForm(),
										record = me.getSelectionModel().getSelection()[0];
									me.utils("consolelog")({
											edit_form: edit_form,
											record: record
										}, "_default_default_btns_config");
									edit_form.activeRecord = record;
									if (record) {
										edit_form_panel.down('#save').enable();
										edit_form.loadRecord(record);
									} else {
										edit_form_panel.down('#save').disable();
										edit_form.reset();
									}
									var edit = me.editingPlugin;
									me.utils("execFuncOf")("cancelEdit", edit);
									me.utils('toggleDefaultForm')(oThis, ev, oEOpts, edit_form_container_panel);
								}
							}
						},
						D: {
							xtype: 'button',
							iconCls: 'fcat delete-icon',
							text: 'Delete',
							itemId: 'default_delete_btn',
							disabled: true,
							listeners: {
								click: function(oThis, ev, oEOpts) {
									var me = oThis.ownerCt.ownerCt,
										record = me.getSelectionModel().getSelection()[0];
									var selection = me.getView().getSelectionModel().getSelection()[0],
										deletion_locale = me.locale["default"]["confirm"]["delete"],
										title = deletion_locale.title,
										message = deletion_locale.message.replace(/\$1/, "<br/><br/>(" + me.utils("concatenateValuesOfJSONToString")(selection.getData()) + ")");
									//Ext.Msg.alert('clicked', '');

									me.utils("consolelog")({
											record: record,
											view: me.getView(),
											selection: selection
										}, "_default_default_btns_config");
									me.utils("consolelog")(deletion_locale, "_default_default_btns_config");
									var edit = me.editingPlugin;
									me.utils("execFuncOf")("cancelEdit", edit);
									Ext.MessageBox.confirm(title, message, function(sButtonId, sText, oOpt) {
											me.utils("consolelog")(arguments, "_default_default_btns_config");
											if (sButtonId === "yes" && selection !== undefined) {
												this.store.remove(selection);
											}
										}, me);
								}
							}
						}
					};
					chain("_default_default_btns_config", "defaultBtnsConfig");
					me.defaultFormDefaultBtns = me._default_default_form_default_btns = [{
							iconCls: 'fcat reset-icon',
							text: me.locale['default'].reset_btn.text,
							listeners: {
								click: function(oThis, ev, oEOpts) {
									var btn_obj = oThis,
										toolbar_obj = btn_obj.ownerCt,
										form_obj = toolbar_obj.ownerCt,
										form_container_obj = form_obj.ownerCt;
									me.utils("consolelog")({
											btn_obj: btn_obj,
											form_obj: form_obj
										}, "reset");
									var form = form_obj.getForm(),
										record = form.activeRecord;
									if (Ext.isDefined(record) === true) {
										form.loadRecord(form.activeRecord);
									} else {
										form.reset();
									}
								}
							}
						}, {
							iconCls: 'fcat cancel-icon',
							text: me.locale['default'].cancel_btn.text,
							listeners: {
								click: function(oThis, ev, oEOpts) {
									var btn_obj = oThis,
										toolbar_obj = btn_obj.ownerCt,
										form_obj = toolbar_obj.ownerCt,
										form_container_obj = form_obj.ownerCt;
									me.utils('toggleDefaultForm')(oThis, ev, oEOpts, form_container_obj);
								}
							}
						}
					];
					chain("_default_default_form_default_btns", "defaultFormDefaultBtns");
					me._default_default_add_form = {
						buttons: [{
								iconCls: 'fcat do-icon',
								text: me.locale['default'].add_form.submit_btn.text,
								listeners: {
									click: function(oThis, ev, oEOpts) {
										var btn_obj = oThis,
											toolbar_obj = btn_obj.ownerCt,
											form_obj = toolbar_obj.ownerCt,
											form_container_obj = form_obj.ownerCt;
										if (form_obj.isValid() === true) {
											me.fireEvent('create', oThis, form_container_obj, form_obj, (form_obj.getValues()));
											me.utils('toggleDefaultForm')(oThis, ev, oEOpts, form_container_obj);
											form_obj.getForm().reset();
										}
									}
								}
							}
						] /*.concat(me.utils("getProperty")("_default_form_default_btns"))*/
					};
					chain("_default_default_add_form", "defaultAddForm");
					me._default_default_search_form = {
						buttons: [{
								iconCls: 'fcat do-icon',
								text: me.locale['default'].search_form.submit_btn.text,
								listeners: {
									click: function(oThis, ev, oEOpts) {
										var btn_obj = oThis,
											toolbar_obj = btn_obj.ownerCt,
											form_obj = toolbar_obj.ownerCt,
											form_container_obj = form_obj.ownerCt;
										var form = form_obj.getForm(),
											fieldValues = form.getFieldValues(),
											/* the original type value of all fields.;*/
											values = form.getValues(),
											/* the string value of all the field.;*/
											fields = form.getFields(),
											/* fields.items then get array of all the field.;*/
											store = me.getStore(),
											oProxy = store.getProxy();
										/*modify the read to set param in url. change the read api of the proxy*/
										//oProxy.api.read = oProxy.api.read.replace(/(^[^\?]+)\??[^\?]*/,"$1") + "?hello=world";
										//store.setProxy(oProxy);
										/*set params by modify the params attribute in operation.;*/
										/*see _build_search_form*/
										/* execute the load*/
										store.load({
												scope: this,
												callback: function(records, operation, success) {
													// the operation object
													// contains all of the details of the load operation
													me.utils("consolelog")({
															records: records,
															operation: operation,
															success: success
														}, "_default_default_search_form");
												}
											});

										me.utils("consolelog")({
												form: form,
												values: form.getValues(),
												fieldValues: form.getFieldValues(),
												fields: form.getFields(),
												store: me.store,
												proxy: me.getStore().getProxy(),
												reader: me.getStore().getProxy().getReader()
											}, "_default_default_search_form");
									}
								}
							}
						] /*.concat(me.utils("getProperty")("_default_form_default_btns"))*/
					};
					chain("_default_default_search_form", "defaultSearchForm");
					me._default_default_edit_form = {
						buttons: [{
								iconCls: 'fcat do-icon',
								text: me.locale['default'].edit_form.submit_btn.text,
								itemId: 'save',
								listeners: {
									click: function(oThis, ev, oEOpts) {
										var btn_obj = oThis,
											toolbar_obj = btn_obj.ownerCt,
											form_panel_obj = toolbar_obj.ownerCt,
											form_obj = form_panel_obj.getForm(),
											form_container_obj = form_panel_obj.ownerCt;
										me.utils("consolelog")({
												form_obj: form_panel_obj,
												form: form_panel_obj.getForm()
											}, "_default_default_edit_form");
										form_obj.updateRecord();
										me.utils('toggleDefaultForm')(oThis, ev, oEOpts, form_container_obj);
									}
								}
							}
						] /*.concat(me.utils("getProperty")("_default_form_default_btns"))*/
					};
					chain("_default_default_edit_form", "defaultEditForm");
					me._default_default_form = {
						buttons: me._default_default_form_default_btns
					};
					chain("_default_default_form", "defaultForm");
					me._default_columns = {
						items: {
							rownumberer: {
								xtype: 'rownumberer',
								renderer: function(oValue, oMetaData, oRecord, nRowIndex, nColIndex, oStore, oView) {
									me.utils("consolelog")({
											a: arguments,
											d: oRecord.getData()
										}, "_default_columns");
									var myToolTipText = "<b>" + me.utils("concatenateValuesOfJSONToString")(oRecord.getData()) + "</b>";
									oMetaData.tdAttr = 'data-qtip=\'' + myToolTipText + '\'';
									return (nRowIndex + 1);
								}
							}
						},
						defaults: {
							flext: 1,
							minWidth: 10,
							maxWidth: 1024,
							defaultWidth: 30,
							editor: {
								xtype: 'textfield',
								allowBlank: false
							}
						}
					};
					chain("_default_columns", "defaultColumns");
					me._default_btns_description = 'CRUD';
					chain("_default_btns_description", "defaultBtnsDescription");
					me._default_forms_style = ('dialog' || 'dock' || 'rowediting');
					chain("_default_forms_style", "defaultFormsStyle");
					me._with_no = [];
					chain("_with_no", "withNo");
					me._default_locale = {
						"default": {
							form: {
								title: 'FORM'
							},
							search_form: {
								title: 'SEARCH',
								submit_btn: {
									text: 'SEARCH'
								}
							},
							add_form: {
								title: 'ADD',
								submit_btn: {
									text: 'ADD'
								}
							},
							edit_form: {
								title: 'EDIT',
								submit_btn: {
									text: 'SAVE'
								}
							},
							reset_btn: {
								text: 'RESET'
							},
							cancel_btn: {
								text: 'CANCEL'
							},
							C: {
								text: 'Add'
							},
							R: {
								text: 'Search'
							},
							U: {
								text: 'Update'
							},
							D: {
								text: 'Delete'
							},
							"confirm": {
								"delete": {
									"title": "DELETION CONFIRMATION",
									"message": "Ary you sure you want to execute the DELETION ? $1"
								}
							}
						}
					};
					chain("_default_locale", "locale");
					//me._init_public_property();
				},
				_init_public_property: function() {
					var me = this;
					me.static_private_public_name_config = {
						"default_view_config": "viewConfig",
						"_default_default_btns_config": "defaultBtnsConfig",
						"_default_default_form_default_btns": "defaultFormDefaultBtns",
						"_default_default_add_form": "defaultAddForm",
						"_default_default_search_form": "defaultSearchForm",
						"_default_default_edit_form": "defaultEditForm",
						"_default_default_form": "defaultForm",
						"_default_columns": "defaultColumns",
						"_default_btns_description": "defaultBtnsDescription",
						"_default_forms_style": "defaultFormsStyle",
						"_with_no": "withNo",
						"_default_locale": "locale",
						'_build_store': '',
						'_build_columns': '',
						'_build_buttons': '',
						'_build_docked_items': '',
						'_build_default_btns_and_forms': '',
						'_build_search_form': '',
						'_build_add_form': '',
						'_build_edit_form': '',
						"_get_default_form_style": "getDefaultFormStyle"
					};
					me.utils('initPublicProperty')(me.static_private_public_name_config);
				},
				//createModel: function() {},
				_build_store: function() {
					var me = this;
					return me.store;
				},
				_build_columns: function() {
					var oResult, me = this,
						defaultColumnsObj = me.utils('getProperty')('defaultColumns') || {},
						defaultColumnsItemsObj = defaultColumnsObj.items,
						prop, defaultColumnsItemsAry = [],
						me_columns = me.columns,
						me_columns_items;
					/*convert columns from the format of columns configure.*/
					for (prop in defaultColumnsItemsObj) {
						if (me.utils('withNo')(prop) === false) {
							defaultColumnsItemsAry.push(defaultColumnsItemsObj[prop]);
						}
					}
					/*to compatable array style of the configure of columns*/
					if (Ext.isObject(me_columns) === true) {
						me_columns = me.utils("getProperty")("columns") || {};
						me_columns_items = me_columns.items;
					} else if (Ext.isArray(me_columns) === true) {
						me_columns_items = me_columns;
						me_columns = {
							items: me_columns
						};
					} else {
						me_columns = {};
						me_columns_items = [];
					}
					defaultColumnsItemsAry = defaultColumnsItemsAry.concat(me_columns_items);
					/*me.utils('consolelog')(Ext.merge({}, defaultColumnsObj, me_columns, {
								items: defaultColumnsItemsAry
							}));
					*/
					oResult = Ext.merge({}, defaultColumnsObj, me_columns, {
							items: defaultColumnsItemsAry
						});
					return oResult;
				},
				_build_buttons: function() {},
				_build_docked_items: function() {
					var me = this,
						docked_items = me.dockedItems,
						default_btns = me.default_btns,
						defaultFormStyle = me.utils("_get_default_form_style")(),
						default_dock_forms = (defaultFormStyle === 'dock' ? me.default_forms : []),
						pagingtoolbar_items = (default_btns.length > 0 ? (['-'].concat(default_btns).concat(['-'])) : []);
					//Ext.log(this.store);
					return ([{
								xtype: 'pagingtoolbar',
								dock: 'bottom',
								store: this.store,
								items: pagingtoolbar_items,
								displayInfo: true
							}
						].concat(default_dock_forms).concat(docked_items) || []);
				},
				_build_default_btns_and_forms: function() {
					var me = this;
					var aDefaultBtnsDescription = (me.utils("getProperty")("defaultBtnsDescription") || "").split("").reverse(),
						nDefaultBtnsDescriptionLength = aDefaultBtnsDescription.length,
						sDefaultBtnsDescription, oDefaultBtnsDescription = me.utils("getProperty")("defaultBtnsConfig"),
						oConfig;
					me.default_forms = [];
					me.default_btns = [];
					var buildDefaultForms = function(sType) {
						switch (sType) {
							case 'C':
								me.add_form = me._build_add_form();
								me.default_forms.push(me.add_form);
								break;
							case 'R':
								me.search_form = me._build_search_form();
								me.default_forms.push(me.search_form);
								break;
							case 'U':
								me.edit_form = me._build_edit_form();
								me.default_forms.push(me.edit_form);
								break;
							default:
								break;
						}
					};
					/*Add default buttons on dock according to the _default_btns_description*/
					while (nDefaultBtnsDescriptionLength-- > 0) {
						sDefaultBtnsDescription = aDefaultBtnsDescription[nDefaultBtnsDescriptionLength];
						oConfig = Ext.merge(oDefaultBtnsDescription[sDefaultBtnsDescription], {
								text: me.locale['default'][sDefaultBtnsDescription].text
							});
						me.default_btns.push(oConfig);
						buildDefaultForms(sDefaultBtnsDescription);
					}
					me.default_btns = me.default_btns.concat(['-', {
								text: me.locale['default'].auto_sync_btn.text || 'autoSync',
								enableToggle: true,
								pressed: true,
								tooltip: 'When enabled, Store will execute Ajax requests as soon as a Record becomes dirty.',
								scope: this,
								hidden: true,
								toggleHandler: function(btn, pressed) {
									me.utils("consolelog")({
											store: this.store
										}, "autoSync");
									this.store.autoSync = pressed;
								}
							}, {
								text: 'batch',
								enableToggle: true,
								hidden: true,
								pressed: true,
								tooltip: 'When enabled, Store will batch all records for each type of CRUD verb into a single Ajax request.',
								scope: this,
								toggleHandler: function(btn, pressed) {
									this.store.getProxy().batchActions = pressed;
								}
							}, {
								text: 'writeAllFields',
								enableToggle: true,
								pressed: false,
								tooltip: 'When enabled, Writer will write *all* fields to the server -- not just those that changed.',
								scope: this,
								hidden: true,
								toggleHandler: function(btn, pressed) {
									this.store.getProxy().getWriter().writeAllFields = pressed;
								}
							}
						]);
				},
				_build_search_form: function() {
					var oResult, me = this;
					me.store.addListener("beforeload", function(store, operation, oEOpts) {
							me.utils("consolelog")({
									store: store,
									operation: operation,
									oEOpts: oEOpts
								}, "_build_search_form");
							operation.params = operation.params || {};
							var params = operation.params,
								values = me.search_form.items.items[0].getForm().getValues();
							me.utils("callFunction")("_sync_read_params", params, values);
						});
					oResult = me.utils("initDefaultForm")({
							form_type: 'Search',
							form_title: me.locale['default'].search_form.title,
							submit_btn_name: me.locale['default'].search_form.submit_btn.text
						});
					return oResult;
				},
				_build_add_form: function() {
					var me = this;
					return this.utils("initDefaultForm")({
							form_type: 'Add',
							form_title: me.locale['default'].add_form.title,
							submit_btn_name: me.locale['default'].add_form.submit_btn.text
						});
				},
				_build_edit_form: function() {
					var me = this;
					return this.utils("initDefaultForm")({
							form_type: 'Edit',
							form_title: me.locale['default'].edit_form.title,
							submit_btn_name: me.locale['default'].edit_form.submit_btn.text
						});
				},
				_get_default_form_style: function() {
					var me = this;
					var default_form_style = me.utils("getProperty")("defaultFormsStyle");
					return Ext.isString(default_form_style) === true ? default_form_style : "dock";
				},
				_sync_read_params: function(oParams, oValues) {
					var me = this,
						prop;
					for (prop in oValues) {
						if (oValues[prop] !== "") {
							oParams[prop] = oValues[prop];
						} else {
							/*DO NOTHING*/
						}
					}
					return oParams;
				},
				_build_cell_tip: function() {
					me.utils("consoledebug")("/*BEGIN _build_cell_tip*/", "_build_cell_tip");
					var oResult, me = this,
						view = me.getView();
					var tip = Ext.create('Ews.view.tip.ToolTip', {
							// The overall target element.
							target: view.el,
							// Each grid row causes its own separate show and hide.
							delegate: view.itemSelector,
							// Moving within the row should not hide the tip.
							trackMouse: true,
							// Render immediately so that tip.body can be referenced prior to the first show.
							renderTo: Ext.getBody(),
							listeners: {
								// Change content dynamically depending on which element triggered the show.
								beforeshow: function updateTipBody(tip) {
									me.utils("consolelog")(arguments, "_build_cell_tip");
									tip.update('Over company "' + view.getRecord(tip.triggerElement).get('company') + '"');
								}
							}
						});
					oResult = tip;
					me.utils("consoledebug")("/*END _build_cell_tip*/", "_build_cell_tip");
					return oResult;
				},
				_init_events: function() {
					var me = this;
					var chain = function(a, b, c) {
						me = me || c;
						/*Brand*/
						switch (b) {
							case "listeners":
								me[b] = Ext.merge({}, me[b], me[a]);
								break;
							default:
								me.utils("chain")(a, b);
								break;
						}
					};
					me._on_select_change = function(selModel, selections) {
						var _default_btns_config = me.utils("getProperty")("defaultBtnsConfig"),
							deleteItemId = _default_btns_config.D.itemId || "default_delete_btn",
							deleteItem = this.down("#" + deleteItemId),
							updateItemId = _default_btns_config.U.itemId || "default_update_btn",
							updateItem = this.down("#" + updateItemId),
							disableFlag = (selections.length === 0);
						me.utils("consolelog")({
								disableFlag: disableFlag,
								deleteItem: deleteItem
							}, "_init_events");
						me.utils("execFuncOf")("setDisabled", deleteItem, disableFlag);
						me.utils("execFuncOf")("setDisabled", updateItem, disableFlag);
					};
					me.getSelectionModel().on('selectionchange', function(selModel, selections) {
							me.utils("callFunction")("_on_select_change", selModel, selections);
						}, me);
					me._default_listeners = {
						create: function(oThis, oFormPanel, oForm, oData) {
							var me = this;
							me.utils("consolelog")({
									me: me,
									store: me.getStore(),
									data: oData
								}, "_init_events");
							me.getStore().insert(0, oData);
							/*
							if (Ext.isDefined(me.listeners) === true && Ext.typeOf(me.listeners.create) === "function") {
								me.listeners.create.apply(me, arguments);
							}
							*/
							me.utils("triggerListener")("create", arguments);
						},
						afterrender: function(oThis, oEOpts) {
							//console.log('Grid panel was just rendered');
							var me = oThis,
								gridView = me.getView();
							me.utils("consolelog")({
									a: arguments,
									v: gridView
								}, "_default_listeners");
							//create the ToolTip
							gridView.tip = Ext.create('Ews.view.tip.ToolTip', {
									// The overall target element.
									target: gridView.el,
									// Each grid row causes its own seperate show and hide.
									delegate: gridView.cellSelector,
									//delegate: gridView.itemsSelector,
									// Moving within the row should not hide the tip.
									trackMouse: true,
									// Render immediately so that tip.body can be referenced prior to the first show.
									renderTo: Ext.getBody(),
									listeners: {
										// Change content dynamically depending on which element triggered the show.
										beforeshow: function updateTipBody(tip) {
											//console.log('abc');
											gridColums = gridView.getGridColumns();
											column = gridColums[tip.triggerElement.cellIndex];
											//only display the tool tip for name column
											record = gridView.getRecord(tip.triggerElement.parentNode);
											me.utils("consolelog")({
													tip: tip,
													ele: tip.triggerElement,
													column: column,
													dataIndex: column.dataIndex,
													record: record,
													get: record.get(column.dataIndex)
												});
											myToolTipText = "<b>" + tip.triggerElement.innerHTML + "</b>";
											tip.update(myToolTipText);
										}
									}
								});
							me.utils("triggerListener")("afterrender", arguments);
						}
					};
					me.listeners = me.utils("getProperty")("listeners");
					chain("_default_listeners", "listeners", me);
					console.log({
							listeners: me.listeners
						});
				},
				utils: function(funcNameStr) {
					var me = this,
						getConsoleTime = function(nStartTime, nEndTime) {
							var oResult, time = true,
								str;
							if (time === true) {
								if (arguments.length === 0) {
									time = new Date();
									str = "it's ";
								} else if (arguments.length === 1) {
									time = nStartTime;
									str = "it's ";
								} else if (arguments.length === 2) {
									time = nEndTime - nStartTime;
									str = "spend ";
								} else {
									/*WARNING OUT OF THE EDGE OF DESIGN.*/
								}
								var date = new Date(time);
								oResult = (str + date.getSeconds() + ':' + date.getMilliseconds());
							} else {
								/*DO NOTHING;*/
								oResult = '';
							}
							return oResult;
						}, consoleTime = function(nStartTime, nEndTime) {
							var time = true,
								str;
							if (time === true) {
								console.log(getConsoleTime(nStartTime, nEndTime));
							} else {
								/*DO NOTHING;*/
							}
						}, consolelog = function(obj, selector) {
							var log = true,
								selectorObj = {
									"_build_cell_tip": true,
									"fGetPublicName": false,
									"fGetPrivateName": false,
									"fGetDefaultName": false,
									"fGetStaticName": false,
									"ifDefaultPropertyExist": false,
									"initDefaultForm": true,
									"gridColumnsToFormItems": true,
									"analysePropertyConfigureObject": false,
									"autoSync": false,
									"_default_default_search_form": true,
									"_default_default_edit_form": false,
									"_default_default_btns_config": true,
									"reset": false
								};
							if (log === true && selectorObj[selector] !== false) {
								if (Ext.isDefined(window.console) === true && Ext.typeOf(window.console.log) === "function") {
									window.console.log([selector, obj]);
								} else {
									/*DO NOTHING;*/
								}
							} else {
								/*DO NOTHING;*/
							}
						}, consoledebug = function(obj, selector) {
							var nS, nE;
							nS = new Date();
							var debug = false,
								selectorObj = {
									"_build_cell_tip": false,
									"getProperty": true
								};
							if (debug === true && selectorObj[selector] !== false) {
								if (Ext.isDefined(window.console) === true && Ext.typeOf(window.console.debug) === "function") {
									console.debug([getConsoleTime(nS.getTime()), obj]);
								} else {
									/*DO NOTHING;*/
								}
							} else {
								// DO NOTHING;
							}
						}, fGetPreHeader = function(sStr) {
							var patt = /[^a-zA-Z]+/,
								sPreHeader = (patt.test(sStr) === true ? patt.exec(sStr)[0] : "");
							return sPreHeader;
						}, fGetPublicName = function(sStr) {
							/*PublickName:aaaBbbCcc*/
							consoledebug('BEGIN fGetPublicName');
							var pattHeadRemove = /^_/,
								pattHeadRest = /^[_]+/,
								patt = /_[a-z]/,
								patt2 = /[a-z]/,
								headerStr = '',
								indexUnderline = sStr.search(patt),
								theUnderlineStr = '',
								newStr = '';
							if (pattHeadRemove.test(sStr) === true) {
								/*remove the first underline char*/
								sStr = sStr.replace(pattHeadRemove, '');
								if (pattHeadRest.test(sStr) === true) {
									/*READY TO RETURN NOW*/
								} else {
									/*DO NOTHING.*/
									while (patt.test(sStr) === true) {
										theUnderlineStr = patt.exec(sStr);
										if (Ext.isArray(theUnderlineStr) === true) {
											theUnderlineStr = theUnderlineStr[0];
											newStr = patt2.exec(theUnderlineStr);
											if (Ext.isArray(newStr) === true) {
												newStr = newStr[0];
												newStr = (newStr).toUpperCase();
												sStr = sStr.replace(theUnderlineStr, newStr);
											} else {
												/*WARNING the sStr that given is not the format of private.*/
											}
										} else {
											/*WARNING the sStr that given is not the format of private.*/
										}
									}
								}
								//sStr = headStr + sStr;
							} else {
								/*WARNING the sStr that given is not the format of private.*/
							}
							consolelog({
									fGetPublicName: sStr
								}, "fGetPublicName");
							consoledebug('END fGetPublicName');
							return sStr;
						}, fGetPrivateName = function(sPropertyName) {
							/*PrivateName:_aaa_bbb_ccc*/
							consoledebug('BEGIN fGetPrivateName');
							var pattUpper = /[A-Z]/,
								//indexUpperCase = sPropertyName.search(patt),
								patt = /_[a-z]/,
								patt2 = /_[a-z]/,
								theUpperCaseChar = '',
								newStr = '';
							consolelog({
									sPropertyName: sPropertyName
								}, 'fGetPrivateName');
							while (pattUpper.test(sPropertyName) === true) {
								consolelog({
										sPropertyName: sPropertyName
									}, 'fGetPrivateName');
								theUpperCaseChar = pattUpper.exec(sPropertyName)[0];
								newStr = '_' + theUpperCaseChar.toLowerCase();
								consolelog({
										sPropertyName: sPropertyName
									}, 'fGetPrivateName');
								sPropertyName = sPropertyName.replace(theUpperCaseChar, newStr);
								consolelog({
										sPropertyName: sPropertyName
									}, 'fGetPrivateName');
							}
							if (/^[_]{3,}[a-z]/.test(sPropertyName) === false) {
								sPropertyName = '_' + sPropertyName;
							} else {
								/*already the privatest/deepest level*/
							}
							consolelog({
									fGetPrivateName: sPropertyName
								}, 'fGetPrivateName');
							consoledebug('END fGetPrivateName');
							return sPropertyName;
						}, fGetUpperName = function(sStr) {
							consoledebug("BEGIN fGetUpperName1");
							var oResult, sPreHeader = fGetPreHeader(sStr),
								nLevel = sPreHeader.split("").length,
								patt = new RegExp("_([_]{" + (nLevel - 1) + "}[a-z])", "g"),
								pattReplacement = function(sMatch, sFirstChildMatch, nIndex, sTarget) {
									var oResult = "";
									if (nIndex === 0) {
										oResult = sFirstChildMatch;
									} else {
										if (sFirstChildMatch.indexOf('_') !== -1) {
											oResult = sFirstChildMatch;
										} else {
											oResult = sFirstChildMatch.toUpperCase();
										}
									}
									return oResult;
								};
							oResult = sStr.replace(patt, pattReplacement);
							consoledebug("END fGetUpperName1");
							return oResult;
						}, fGetLowerName = function(sStr) {
							consoledebug("BEGIN fGetLowerName");
							var oResult, sPreHeader = fGetPreHeader(sStr),
								nLevel = sPreHeader.split("").length,
								patt = new RegExp("(^[a-z]|[A-Z])|(_[_]{" + (nLevel - 1) + "}[a-z])", "g"),
								pattReplacement = function(sMatch, sFirstChildMatch, sSecondChildMatch, nIndex, sTarget) {
									var oResult = "";
									oResult = "_" + sMatch.toLowerCase();
									return oResult;
								};
							if (nLevel > 3) {
								oResult = sStr;
							} else {
								oResult = sStr.replace(patt, pattReplacement);
							}
							consoledebug("END fGetLowerName");
							return oResult;
						}, fGetDefaultName = function(sStr) {
							/*DefaultName:default_aaa_bbb_ccc; or defaultAaaBbbCcc;*/
							var oResult;
							consoledebug('BEGIN fGetDefaultName');
							var sPreHeader = fGetPreHeader(sStr),
								sHeader = sStr.substring(0, 1),
								sRest = sStr.substring(1);
							oResult = sPreHeader + 'default' + sHeader.toUpperCase() + sRest;
							consolelog({
									fGetDefaultName: oResult
								}, "fGetDefaultName");
							consoledebug('END fGetDefaultName');
							return oResult;
						}, fGetStaticName = function(sStr) {
							/*StaticName: static_aaa_bbb_ccc; or staticAaaBbbCcc;*/
							var oResult;
							consoledebug('BEGIN fGetStaticName');
							var sPreHeader = fGetPreHeader(sStr),
								sHeader = sStr.substring(0, 1),
								sRest = sStr.substring(1);
							oResult = sPreHeader + 'static' + sHeader.toUpperCase() + sRest;
							consolelog({
									fGetStaticName: oResult
								}, "fGetStaticName");
							consoledebug('END fGetStaticName');
							return oResult;
						};
					var withNo = function(optionsAry) {
						/**
						 *	optionsAry	[string, array]	the options needs to be matched.
						 *	usage:	if(this.utils.withNo('rownumberer')===true){do something;}
						 */
						consoledebug('BEGIN withNo');
						var withNo = me.utils("getProperty")("withNo") || [],
							resultObj = {}, withNoStr = Ext.isArray(withNo) ? withNo.join() : withNo,
							oResult;
						if (Ext.isString(optionsAry) === true) {
							if ((',' + withNoStr + ',').indexOf(',' + optionsAry + ',') !== -1) {
								oResult = true;
							} else {
								oResult = false;
							}
						} else if (Ext.isArray(optionsAry)) {
							optionsAry = [optionsAry];
							var optionsAry_length = optionsAry.length,
								optionsAryItemStr;
							while (optionsAry_length-- > 0) {
								optionsAryItemStr = optionsAry[optionsAry_length];
								if (Ext.isString(optionsAryItemStr) && (',' + withNoStr + ',').indexOf(',' + optionsAryItemStr + ',') !== -1) {
									resultObj[optionsAryItemStr] = true;
								} else {
									resultObj[optionsAryItemStr] = false;
								}
							}
							oResult = resultobj;
						} else {
							/*WARNING IT'S UNUSUAL TO SEE THIS MESSAGE.*/
						}
						consoledebug('END withNo');
						return oResult;
					};
					var gridColumnsToFormItems = function(aColumns) {
						consoledebug('BEGIN gridColumnsToFormItems');
						var oResult;
						if (Ext.isObject(aColumns) === true) {
							aColumns = aColumns.items || [];
							var columnsAry_length = aColumns.reverse().length,
								grid_columns_item, form_items_ary = [],
								form_item_obj = {}, converting_property_list = [
									["fieldLabel", "text"],
									["name", "dataIndex"],
									["xtype", {
											"editor": "xtype"
										}
									],
									["format", "format"],
									["minValue", {
											"editor": "minValue"
										}
									],
									["minText", {
											"editor": "minText"
										}
									],
									["maxValue", {
											"editor": "maxValue"
										}
									],
									["allowBlank", {
											"editor": "allowBlank"
										}
									]
								] || {
									fieldLabel: 'text',
									name: 'dataIndex',
									xtype: 'editor.xtype'
								},
								column_property;
							while (columnsAry_length-- > 0) {
								grid_columns_item = aColumns[columnsAry_length];
								//consolelog(columnsAry_length, "gridColumnsToFormItems");
								if (Ext.isDefined(grid_columns_item["dataIndex"]) === false) {
									continue;
								}
								//consolelog({form_item_obj_prop:form_item_obj[prop], grid_columns_item:grid_columns_item},"gridColumnsToFormItems");
								form_item_obj = {};
								grid_columns_item = Ext.merge({}, (me.utils('getProperty')('defaultColumns')).defaults, grid_columns_item);
								consolelog(me.utils("analysePropertyConfigureObject")(converting_property_list, form_item_obj, grid_columns_item), "gridColumnsToFormItems");
								consolelog({
										form_item_obj_prop: form_item_obj,
										grid_columns_item: grid_columns_item
									}, "gridColumnsToFormItems");
								/*
								for (prop in converting_property_list) {
									column_property = grid_columns_item[converting_property_list[prop]];
									if (column_property === undefined) {
										continue;
									} else {
										form_item_obj[prop] = column_property;
									}
								}
								*/
								form_items_ary.push(form_item_obj);
								form_item_obj = {};
							}
							aColumns.reverse();
							oResult = form_items_ary;
						} else if (Ext.isArray(aColumns) !== false) {
							oResult = aColumns;
						} else {
							/*WARNING IT'S NOT USUAL TO SEE THIS MESSAGE.*/
						}
						consolelog({
								'gridColumnsToFormItems__form_items_ary': oResult
							}, "gridColumnsToFormItems");
						consoledebug('END gridColumnsToFormItems');
						return oResult;
					};
					var initDefaultForm = function(oOpts) {
						consoledebug('/*BEGIN initDefaultForm*/');
						var oResult;
						oOpts = oOpts || {};
						var sFormType = oOpts.form_type || 'Add',
							rFromType = /^./,
							sFormTitle = oOpts.form_title || me.locale['default'].form.title;
						var grid_columns = me.columns,
							default_form = me.utils("getProperty")('default' + rFromType.exec(sFormType)[0].toUpperCase() + sFormType.substring(1).toLowerCase() + 'Form') || {},
							if_default_form_is_object = Ext.isObject(default_form),
							default_from_default_btns = me.utils("getProperty")("defaultFormDefaultBtns") || [],
							form_items, form_buttons;
						form_items = (if_default_form_is_object === true && (Ext.isObject(default_form.items) === true || Ext.typeOf(default_form.items) === "array") ? default_form.items : me.utils('convertGridColumnsToFormItems')(grid_columns));
						form_buttons = (if_default_form_is_object === true && (Ext.isObject(default_form.buttons) === true || Ext.typeOf(default_form.buttons) === "array") ? ((default_form.buttons || []).concat(default_from_default_btns)) : default_from_default_btns);
						defaultFormStyle = me.utils("callFunction")("_get_default_form_style"),
						form_container = {};
						me.utils("consolelog")({
								DEFAULTFORMBUTTON: form_buttons,
								_default_form_default_btns: me.utils("getProperty")("defaultFormDefaultBtns"),
								form_items: form_items,
								default_form: default_form
							}, "initDefaultForm");
						var initDockFormContainer = function() {
							var form = Ext.create('Ews.view.form.GridDockPanel', Ext.merge({}, {
										overflowX: 'auto',
										overflowY: 'auto'
									}, default_form, {
										items: form_items,
										buttons: form_buttons
									}));
							return Ext.create('Ews.view.form.FieldSet', {
									title: sFormTitle,
									//collapsible: true,
									hidden: true,
									dock: 'bottom',
									//border: '0 0 0 0',
									padding: '0 0 0 0',
									margin: '0 0 0 0',
									overflowX: 'auto',
									overflowY: 'auto',
									items: [form]
									//layout: 'column',
									//items: form_items.concat([{
									//			xtype: 'toolbar',
									//			border: '0 0 1 0',
									//			padding: '5 20 7 20',
									//			margin: '0 0 0 0',
									//			width: '100%',
									//			defaults: {
									//				minWidth: 80
									//			},
									//			items:form_buttons 
									//		}
									//	])
								});
						}, initDialogFormContainer = function() {
								var form = Ext.create('Ews.view.form.Panel', Ext.merge({}, {
											collapsible: false,
											layout: 'column',
											width: 600,
											height: 'auto',
											overflowX: 'auto',
											overflowY: 'auto'
										}, default_form, {
											items: form_items,
											buttons: form_buttons
										}));
								me.utils("consolelog")({
										form_items: form_items,
										default_form: default_form
									}, "initDefaultForm");
								return Ext.create('Ews.view.dialog.Panel', {
										title: sFormTitle,
										width: default_form.width || 600,
										height: default_form.height || 100,
										minWidth: default_form.minWidth || 300,
										minHeight: default_form.minHeight || 170,
										overflowX: 'auto',
										overflowY: 'auto',
										hidden: true,
										items: [form]
									});
							};
						switch (defaultFormStyle) {
							case 'dock':
								form_container = initDockFormContainer();
								break;
							case 'dialog':
								form_container = initDialogFormContainer();
								break;
							default:
								form_container = form;
								break;
						}
						oResult = form_container;
						consoledebug('/*BEGIN initDefaultForm*/');
						return oResult;
					};
					var toggleDefaultForm = function(oThis, ev, oEOpts, oForm) {
						consoledebug('BEGIN toggleDefaultForm');
						var oResult, default_forms_ary = me.default_forms,
							default_forms_length = default_forms_ary.length,
							default_forms_obj, isVisibleBool = oForm.isVisible();
						while (default_forms_length-- > 0) {
							default_forms_obj = default_forms_ary[default_forms_length];
							if (default_forms_obj !== oForm) {
								default_forms_obj.hide({
										duration: 2000,
										to: {
											opacity: 0
										}
									});
							}
						}
						oResult = isVisibleBool === false ? oForm.show({
								duration: 2000,
								to: {
									opacity: 90
								}
							}) : oForm.hide({
								duration: 2000,
								to: {
									opacity: 0
								}
							});
						consoledebug('END toggleDefaultForm');
						return oResult;
					};
					var initPublicProperty = function(oPrivatePublicNames) {
						consoledebug('BEGIN initPublicProperty');
						var prop, sPrivateName, sPublicName;
						for (sPrivateName in oPrivatePublicNames) {
							sPublicName = oPrivatePublicNames[sPrivateName];
							if (Ext.isString(sPublicName) === true) {
								if (sPublicName === "") {
									sPublicName = fGetUpperName(sPrivateName);
								} else {
									/*do nothing*/
								}
								me[sPublicName] = me[sPublicName] || me[sPrivateName];
							} else {
								/*WARNING IT'S NOT USUAL TO SEE THIS MESSAGE.*/
							}
						}
						consoledebug('END initPublicProperty');
					};
					var mergeProperty = function(sPropertyName) {
						consoledebug('BEGIN mergeProperty');
						consolelog({
								mergeProperty: sPropertyName
							});
						var oResult, defaultPropertyName = fGetDefaultName(sPropertyName),
							staticPropertyName = fGetStaticName(sPropertyName);
						oResult = Ext.merge({}, me[defaultPropertyName], me[sPropertyName], me[staticPropertyName]);
						consoledebug('END mergeProperty');
						return oResult;
					};
					var syncAllProperty = function(oPrivatePublicNames) {
						consoledebug('/*BEGIN syncAllProperty*/');
						var prop, sPrivateName, sPublicName, sGetFuncName, fGetFunc = function(sPrivateName, scope) {
								return scope.apply(function() {
										consolelog(this);
										var me = this;
										return me.utils('mergeProperty')(fGetUpperName(sPrivateName));
									});
							};
						for (sPrivateName in oPrivatePublicNames) {
							sGetFuncName = 'set_' + sPrivateName;
							sPublicName = oPrivatePublicNames[sPrivateName];
							me[sGetFuncName] = me[sGetFuncName] || fGetFunc(sPrivateName, scope);
						}


						/*TODO sync all default/normal/static property.*/
						for (sPrivateName in oPrivatePublicNames) {
							sPublicName = oPrivatePublicNames[sPrivateName] || fGetUpperName(sPrivateName);
							dealDefaultAndStaticProperty(sPublicName, me);
						}
						consoledebug('/*END syncAllProperty*/');
					};
					var syncProperty = function(sPrivateName) {
						var sPublicName = fGetUpperName(sPrivateName);
					};
					var dealDefaultAndStaticProperty = function(sPublicName, me) {
						consoledebug('BEGIN dealDefaultAndStaticProperty');
						consolelog({
								dealDefaultAndStaticProperty: sPublicName
							});
						var defaultName = fGetDefaultName(sPublicName),
							staticName = fGetStaticName(sPublicName),
							defaultProperty, staticProperty;
						if (Ext.isDefined(me[defaultName]) === true) {
							defaultProperty = me.utils('syncProperty')(defaultName);
						}
						if (Ext.isDefined(me[staticName]) === true) {
							staticProperty = me.utils('syncProperty')(staticName);
						}
						Ext.merge({}, defaultProperty, me[sPublicName], staticProperty);
						consoledebug('END dealDefaultAndStaticProperty');
					};
					var mergeDefaultAndStaticProperty = function(sPropertyName) {
						/*get default property value .*/
						consoledebug('BEGIN mergeDefaultAndStaticProperty');
						var defaultPropertyValue, staticPropertyValue;
						consolelog({
								mergeDefaultAndStaticProperty: sPropertyName
							});
						defaultPropertyValue = me.utils('getProperty')(fGetDefaultName(sPropertyName));
						staticPropertyValue = me.utils('getProperty')(fGetStaticName(sPropertyName));
						consoledebug('END mergeDefaultAndStaticProperty');
						return Ext.merge({}, defaultPropertyValue, me[sPropertyName], staticPropertyValue);
					};



					var ifUpperPropertyExist = function(sPropertyName) {
						consoledebug('BEGIN ifUpperPropertyExist');
						var oResult, sUpperLevelName;
						sUpperLevelName = fGetUpperName(sPropertyName);
						if (sUpperLevelName === sPropertyName) {
							/*IF UPPER LEVEL PROPERTY IS NOT EXIST*/
							oResult = false;
						} else {
							/*IF UPPER LEVEL PROPERTY IS EXIST*/
							oResult = true;
						}
						consoledebug('END ifUpperPropertyExist');
						return oResult;
					};
					var ifLowerPropertyExist = function(sPropertyName) {
						consoledebug('BEGIN ifLowerPropertyExist');
						var oResult, sLowerLevelName;
						consolelog({
								ifLowerPropertyExist: sPropertyName
							});
						sLowerLevelName = fGetLowerName(sPropertyName);
						if (sLowerLevelName === sPropertyName) {
							/*IF LOWER LEVEL PROPERTY IS NOT EXIST*/
							oResult = false;
						} else {
							/*IF LOWER LEVEL PROPERTY IS EXIST*/
							oResult = true;
						}
						consoledebug('END ifLowerPropertyExist');
						return oResult;
					};
					var ifThisPropertyExist = function(sPropertyName) {
						consoledebug('BEGIN ifThisPropertyExist');
						var oResult = false;
						if (Ext.isDefined(me[sPropertyName]) === true || ifDefaultPropertyExist(sPropertyName) === true || ifStaticPropertyExist(sPropertyName) === true) {
							oResult = true;
						} else {
							oResult = false;
						}
						consoledebug('END ifThisPropertyExist');
						return oResult;
					};
					var ifDefaultPropertyExist = function(sPropertyName) {
						var oResult;
						consoledebug('BEGIN ifDefaultPropertyExist');
						consolelog({
								ifDefaultPropertyExist: sPropertyName
							}, "ifDefaultPropertyExist");
						oResult = Ext.isDefined(me[fGetDefaultName(sPropertyName)]);
						consoledebug('END ifDefaultPropertyExist');
						return oResult;
					};
					var ifStaticPropertyExist = function(sPropertyName) {
						var oResult;
						consoledebug('BEGIN ifStaticPropertyExist');
						oResult = Ext.isDefined(me[fGetStaticName(sPropertyName)]);
						consoledebug('END ifStaticPropertyExist');
						return oResult;
					};
					var getProperty = function(sPropertyName) {
						consoledebug('BEGIN getProperty');
						var oResult;
						if (me.utils('ifUpperPropertyExist')(sPropertyName) === true) {
							/*IF UPPER LEVEL PROPERTY IS EXIST*/
							consoledebug(sPropertyName + " is exsit at it's UPPER level ", "getProperty");
							oResult = me.utils('getUpperLevelProperty')(sPropertyName);
						} else {
							/*IF THE DEFAULT PROPERTY AND STATIC PROPERTY AND THE ORIGINAL PROPERTY ARE ALL NOT EXIST. GO CHECK THE LOWER LEVEL PROPERTY.*/
							if (me.utils('ifThisPropertyExist')(sPropertyName) === false) {
								/*THIS PROPERTY IS NOT EXIST*/
								/*CHECK IF THE LOWER LEVEL PROPERTY IS EXIST*/
								consoledebug(sPropertyName + " is not exsit at it's level ", "getProperty");
								if (me.utils('ifLowerPropertyExist')(sPropertyName) === true) {
									consoledebug(sPropertyName + " is exsit at it's LOWER level ", "getProperty");
									oResult = me.utils('getLowerLevelProperty')(sPropertyName);
								} else {
									/*ALREADY THE LOWEREST VALUE*/
									consoledebug(sPropertyName + " is already the lowest value.", "getProperty");
									oResult = undefined;
								}
							} else {
								/*CHECK IF THE DEFAULT OR STATIC PROPERTY IS EXIST*/
								consoledebug({
										propertyExist: sPropertyName
									}, "getProperty");
								oResult = me.utils('getThisProperty')(sPropertyName);
							}
						}
						consoledebug('END getProperty');
						return oResult;
					};
					getProperty = function(sPropertyName) {
						var oResult;
						oResult = me[sPropertyName];
						return oResult;
					};
					var getFunction = function(sPropertyName) {
						consoledebug("BEGIN getFunction");
						var oResult;
						oResult = me.utils("getProperty")(sPropertyName);
						if (Ext.typeOf(oResult) !== "function") {
							oResult = function() {};
						} else {
							/*DO NOTHING;*/
						}
						consoledebug("END getFunction");
						return oResult;
					};
					var callFunction = function(sPropertyName, oParam) {
						consoledebug("BEGIN callFunction");
						var oResult;
						oResult = me.utils("getProperty")(sPropertyName);
						if (Ext.typeOf(oResult) !== "function") {
							oResult = function() {};
						} else {
							/*DO NOTHING;*/
						}
						oResult = oResult.apply(me, (Array.prototype.slice.call(arguments, 1)));
						consoledebug("END callFunction");
						return oResult;

					};
					var getUpperLevelProperty = function(sPropertyName) {
						var oResult, upperLevelPropertyName = fGetUpperName(sPropertyName);
						/*We need to look up and left and right. So we use getProperty, but not getThisProperty*/
						oResult = me.utils('getProperty')(upperLevelPropertyName);
						return oResult;
					};
					var getLowerLevelProperty = function(sPropertyName) {
						consoledebug('BEGIN getLowerLevelProperty');
						var oResult, propertyName = fGetLowerName(sPropertyName);
						/*DO NOT CHECK UPPER LEVEL IN THIS FUNCTION, to AVOID ENDLESS RECURSION.*/
						/*IF THE DEFAULT PROPERTY AND STATIC PROPERTY AND THE ORIGINAL PROPERTY ARE ALL NOT EXIST. GO CHECK THE LOWER LEVEL PROPERTY.*/
						if (me.utils('ifThisPropertyExist')(propertyName) === false) {
							/*THIS PROPERTY IS NOT EXIST*/
							/*CHECK IF THE LOWER LEVEL PROPERTY IS EXIST*/
							consoledebug(propertyName + " is not exsit at it's level ", "getProperty");
							if (me.utils('ifLowerPropertyExist')(propertyName) === true) {
								consoledebug(propertyName + " is exsit at it's LOWER level ", "getProperty");
								oResult = me.utils('getLowerLevelProperty')(propertyName);
							} else {
								/*ALREADY THE LOWEREST VALUE*/
								consoledebug(propertyName + " is already the lowest value.", "getProperty");
								oResult = undefined;
							}
						} else {
							/*CHECK IF THE DEFAULT OR STATIC PROPERTY IS EXIST*/
							consoledebug({
									propertyExist: propertyName
								}, "getProperty");
							oResult = me.utils('getThisProperty')(propertyName);
						}
						consoledebug('END getLowerLevelProperty');
						return oResult;
					};
					var getDefaultProperty = function(sPropertyName) {
						consoledebug('BEGIN getDefaultProperty');
						consolelog({
								getDefaultProperty: sPropertyName
							}, "getDefaultProperty");
						var propertyName = fGetDefaultName(sPropertyName),
							defaultValue, staticValue, oResult;
						consolelog("default property is " + propertyName, "getDefaultProperty");
						/* check upper level*/
						if (me.utils('ifUpperPropertyExist')(propertyName) === true) {
							/*UPER LEVEL PROPERTY IS EXIST*/
							oResult = me.utils('getUpperLevelProperty')(propertyName);
						} else {
							/* check if property is exist*/
							if (me.utils('ifThisPropertyExist')(propertyName) === true) {
								/* check default value*/
								consolelog("default property is exist", "getDefaultProperty");
								defaultValue = me.utils('getDefaultProperty')(propertyName);
								consolelog("default property's defaultValue is " + defaultValue, "getDefaultProperty");
								/* check static value*/
								staticValue = me.utils('getStaticProperty')(propertyName);
								consolelog("default property's staticValue is " + staticValue, "getDefaultProperty");
								//oResult = Ext.merge({}, defaultValue, me[propertyName], staticValue);
								oResult = me.utils("getThisProperty")(propertyName);
							} else if (me.utils('ifLowerPropertyExist')(propertyName) === true) {
								/* check lower level*/
								oResult = me.utils('getLowerLevelProperty')(propertyName);
							} else {
								oResult = undefined;
							}
						}
						consoledebug('END getDefaultProperty');
						return oResult;
					};
					var getStaticProperty = function(sPrivateName) {
						consoledebug('BEGIN getStaticProperty');
						var propertyName = fGetStaticName(sPrivateName),
							defaultValue, staticValue, oResult;
						/*check upper level*/
						if (me.utils('ifUpperPropertyExist')(propertyName) === true) {
							oResult = me.utils('getUpperLevelProperty')(propertyName);
						} else {
							/*check if property is exist*/
							if (me.utils('ifThisPropertyExist')(propertyName) === true) {
								/*check default value*/

								consolelog({
										getStaticProperty: propertyName
									}, "getStaticProperty");
								oResult = me.utils("getThisProperty")(propertyName);
							} else if (me.utils('ifLowerPropertyExist')(propertyName) === true) {
								/*check lower level*/
								oResult = me.utils('getLowerLevelProperty')(propertyName);
							} else {
								oResult = undefined;
							}
						}
						consoledebug('END getStaticProperty');
						return oResult;
					};
					var getThisProperty = function(sPropertyName) {
						/* check default value*/
						consoledebug('BEGIN getThisProperty');
						consolelog({
								getThisProperty: sPropertyName
							}, "getThisProperty");
						var oResult, defaultValue = me.utils('getDefaultProperty')(sPropertyName),
							staticValue = me.utils('getStaticProperty')(sPropertyName),
							originalValue = me[sPropertyName],
							fake = staticValue || originalValue || defaultValue || {},
							fakeType = Ext.typeOf(fake);
						switch (fakeType) {
							case "array":
								oResult = Ext.Array.merge([], defaultValue, me[sPropertyName], staticValue);
								break;
							case "object":
								oResult = Ext.Object.merge({}, defaultValue, me[sPropertyName], staticValue);
								break;
							case "function":
							case "date":
							case "string":
							case "number":
								oResult = fake;
								break;
							default:
								oResult = fake;
								break;
						}
						consoledebug('END getThisProperty');
						return oResult;
					};
					var analysePropertyConfigureObject = function(aConfigure, targetOwner, sourceOwner) {
						/*analyse propertyConfigureObject and convert one's property to another's.*/
						consoledebug('BEGIN analysePropertyConfigureObject');
						var prop, oConfigureItem, targetAry, sourceAry, nConfigureLength = aConfigure.length;
						targetOwner = targetOwner || {}, sourceOwner = sourceOwner || {};
						while (nConfigureLength-- > 0) {
							oConfigureItem = aConfigure[nConfigureLength];
							//consolelog({oConfigureItem:oConfigureItem,targetOwner:targetOwner, sourceOwner:sourceOwner})
							targetAry = me.utils('analyseIt')(oConfigureItem[0], targetOwner);
							sourceAry = me.utils('analyseIt')(oConfigureItem[1], sourceOwner);
							/*utils('analyseIt') return [propertyNameStr, ownerObject]*/
							consolelog({
									targetAry: targetAry,
									sourceAry: sourceAry
								}, "analysePropertyConfigureObject");
							if (sourceAry[1][sourceAry[0]] !== undefined) {
								targetAry[1][targetAry[0]] = sourceAry[1][sourceAry[0]];
							}
						}
						consoledebug('END analysePropertyConfigureObject');
						return targetOwner;
					};
					var analyseIt = function(targetObj, ownerObj) {
						/*targetObj is the configure object to be anlaysed.*/
						consoledebug('BEGIN analyseIt');
						var oResult, defaultValue;
						if (Ext.isObject(ownerObj) === false) {
							//consolelog({ownerObj:Ext.isObject(ownerObj)});
							oResult = [targetObj, ownerObj];
						} else {
							//consolelog({ownerObj:ownerObj});
							if (Ext.isString(targetObj) === true) {
								/*match*/
								/*there is only one way out.*/
								defaultValue = null; //'';
								oResult = me.utils('analyseString')(targetObj, ownerObj, defaultValue);
							} else if (Ext.isObject(targetObj) === true) {
								/*analyse it */
								defaultValue = {};
								oResult = me.utils('analyseObject')(targetObj, ownerObj, defaultValue);
							} else if (Ext.isArray(targetObj) === true) {
								/* add all items of Array to gether.*/
								defaultValue = 'USE DEFAULT FUNCTION PLS.';
								oResult = me.utils('analyseArray')(targetObj, ownerObj, defaultValue);
							} else {
								/*WARNING, Out of the edge of the design.*/
								oResult = "WARNING, Out of the edge of the design.";
							}
						}
						consoledebug('END analyseIt');
						return oResult;
					}, analyseString = function(targetStr, ownerObj, defaultValue) {
							consoledebug('BEGIN analyseString');
							if (Ext.isDefined(ownerObj[targetStr]) === false) {
								//ownerObj[targetStr] = defaultValue;
							} else {
								/*DO NOTHING*/
							}
							consoledebug('END analyseString');
							return [targetStr, ownerObj];
						}, analyseObject = function(targetObj, ownerObj, defaultValue) {
							consoledebug('BEGIN analyseObject');
							var prop, oResult;
							defaultValue = defaultValue || {};
							//consolelog({targetObj:targetObj});
							for (prop in targetObj) {
								//consolelog({prop:prop});
								if (Ext.isDefined(ownerObj[prop]) === false) {
									ownerObj[prop] = defaultValue;
								} else {
									/*DO NOTHING*/
								}
								//consolelog({targetObj_prop:targetObj[prop], ownerObj_prop:ownerObj[prop]});
								oResult = me.utils('analyseIt')(targetObj[prop], ownerObj[prop]);
								break;
								/*ONLY LOOP ONCE, OR YOU SHOULD put them into an Array.*/
							}
							consoledebug('END analyseObject');
							return oResult;
						}, analyseArray = function(targetAry, ownerObj, defaultValue) {
							consoledebug('BEGIN analyseArray');
							var oResult, aryLength = targetAry.length || 0,
								aryItem;
							defaultValue = (Ext.typeOf(defaultValue) === "function") ? defaultValue : function(targetAry, ownerObj) {
								var aryItem, aryLength = targetAry.length,
									resultAry = [];
								targetAry.reverse();
								while (aryLength-- > 0) {
									aryItem = targetAry[aryLength];
									resultArys.push(me.utils('analyseIt')(aryItem, ownerObj));
								}
								return resultAry.join(' ');
							}; /*defaultValue are surpposed to be a function.*/
							if (aryLength-- > 0) {
								aryItem = targetAry[aryLength];
								if (Ext.typeOf(aryItem) === "function") {
									aryLength++;
									if (Ext.typeOf(defaultValue) === "function") {
										oResult = defaultValue(targetAry, ownerObj);
									} else {
										/*WARNING, Out of the edge of the design.*/
										oResult = undefined;
									}
								} else if (Ext.typeOf(aryItem) === "function") {
									oResult = aryItem(targetAry.slice(1), ownerObj);
								} else {
									/*WARNING, Out of the edge of the design.*/
									oResult = undefined;
								}
							} else {
								/*WARNING, IT'S NOT USUAL TO SEE THIS MESSAGE.*/
								oResult = undefined;
							}
							consoledebug('END analyseArray');
							return oResult;
						};
					var chain = function(a, b) {
						/*Brand*/
						me[b] = (Ext.isDefined(me[b]) === true ? me[b] : me[a]);
					};
					var executeFunctionOf = function(sFunc, oOwner) {
						var oResult;
						if (Ext.isDefined(oOwner) === false) {
							oResult = undefined;
						} else if (Ext.isObject(oOwner) === false) {
							oResult = undefined;
						} else {
							if (Ext.typeOf(oOwner[sFunc]) === "function") {
								oResult = oOwner[sFunc];
								oResult = oResult.apply(oOwner, (Array.prototype.slice.call(arguments, 2)));
							} else {
								oResult = undefined;
							}
						}
						return oResult;
					};


					var ifUpperListenersExist = function(sListenersName) {
						consoledebug("BEGIN ifUpperListenersExist", "ifUpperListenersExist");
						sListenersName = sListenersName || "listeners";
						var oResult, sUpperLevelName;
						sUpperLevelName = fGetUpperName(sListenersName);
						if (sUpperLevelName === sListenersName) {
							/*IF UPPER LEVEL PROPERTY IS NOT EXIST*/
							oResult = false;
						} else {
							/*IF UPPER LEVEL PROPERTY IS EXIST*/
							oResult = true;
						}
						consoledebug("END ifUpperListenersExist", "ifUpperListenerExist");
						return oResult;
					};
					var ifLowerListenersExist = function(sListenersName) {
						consoledebug("BEGIN ifLowerListenersExist", "ifLowerListenersExist");
						sListenersName=sListenersName ||"listeners";
						var oResult, sLowerLevelName;
						consolelog({
								ifLowerListenersExist: sListenersName
							}, "ifLowerListenersExist");
						sLowerLevelName = fGetLowerName(sListenersName);
						if (sLowerLevelName === sListenersName) {
							/*IF LOWER LEVEL PROPERTY IS NOT EXIST*/
							oResult = false;
						} else {
							/*IF LOWER LEVEL PROPERTY IS EXIST*/
							oResult = true;
						}
						consoledebug("END ifLowerListenersExist", "ifLowerListenersExist");
						return oResult;
					};
					var ifThisListenersExist = function(sListenersName) {
						consoledebug("BEGIN ifThisListenersExist", "ifThisListenersExist");
						sListenersName = sListenersName || "listeners";
						var oResult = false;
						if (Ext.isDefined(me[sListenersName]) === true || ifDefaultListenersExist(sListenersName) === true || ifStaticListenersExist(sListenersName) === true) {
							oResult = true;
						} else {
							oResult = false;
						}
						consoledebug("END ifThisListenersExist","ifThisListenersExist");
						return oResult;
					};
					var ifDefaultListenersExist = function(sListenersName) {
						consoledebug('BEGIN ifDefaultListenersExist');
						sListenersName = sListenersName || "listeners";
						var oResult;
						consolelog({
								ifDefaultListenersExist: sListenersName
							}, "ifDefaultListenersExist");
						oResult = Ext.isDefined(me[fGetDefaultName(sListenersName)]);
						consoledebug('END ifDefaultListenersExist');
						return oResult;
					};
					var ifStaticListenersExist = function(sListenersName) {
						consoledebug('BEGIN ifStaticListenersExist');
						sListenersName = sListenersName || "listeners";
						var oResult;
						oResult = Ext.isDefined(me[fGetStaticName(sListenersName)]);
						consoledebug('END ifStaticListenersExist');
						return oResult;
					};

					var ifUpperListenerExist = function(sListenerName) {
						consoledebug('BEGIN ifUpperListenerExist');
						var oResult, sUpperLevelName;
						sUpperLevelName = fGetUpperName(sListenerName);
						if (sUpperLevelName === sListenerName) {
							/*IF UPPER LEVEL PROPERTY IS NOT EXIST*/
							oResult = false;
						} else {
							/*IF UPPER LEVEL PROPERTY IS EXIST*/
							oResult = true;
						}
						consoledebug('END ifUpperListenerExist');
						return oResult;
					};
					var ifLowerListenerExist = function(sListenerName) {
						consoledebug('BEGIN ifLowerListenerExist', "ifLowerListenerExist");
						var oResult, sLowerLevelName;
						consolelog({
								ifLowerListenerExist: sListenerName
							}, "ifLowerListenerExist");
						sLowerLevelName = fGetLowerName(sListenerName);
						if (sLowerLevelName === sListenerName) {
							/*IF LOWER LEVEL PROPERTY IS NOT EXIST*/
							oResult = false;
						} else {
							/*IF LOWER LEVEL PROPERTY IS EXIST*/
							oResult = true;
						}
						consoledebug('END ifLowerListenerExist', "ifLowerListenerExist");
						return oResult;
					};
					var ifThisListenerExist = function(sListenerName) {
						consoledebug('BEGIN ifThisListenerExist');
						var oResult = false;
						if (Ext.isDefined(me[sListenerName]) === true || ifDefaultListenerExist(sListenerName) === true || ifStaticListenerExist(sListenerName) === true) {
							oResult = true;
						} else {
							oResult = false;
						}
						consoledebug('END ifThisListenerExist');
						return oResult;
					};
					var ifDefaultListenerExist = function(sListenerName) {
						consoledebug('BEGIN ifDefaultListenerExist', "ifDefaultListenerExist");
						var oResult;
						consolelog({
								ifDefaultListenerExist: sListenerName
							}, "ifDefaultListenerExist");
						oResult = Ext.isDefined(me[fGetDefaultName(sListenerName)]);
						consoledebug('END ifDefaultListenerExist', "ifDefaultListenerExist");
						return oResult;
					};
					var ifStaticListenerExist = function(sListenerName) {
						var oResult;
						consoledebug('BEGIN ifStaticListenerExist');
						oResult = Ext.isDefined(me[fGetStaticName(sListenerName)]);
						consoledebug('END ifStaticListenerExist');
						return oResult;
					};

					var getListener = function(sListenerName) {
						consoledebug('BEGIN getListener');
						var oResult;
						if (me.utils('ifUpperExist')(sListenerName) === true) {
							/*IF UPPER LEVEL PROPERTY IS EXIST*/
							consoledebug(sListenerName + " is exsit at it's UPPER level ", "getListener");
							oResult = me.utils('getUpperLevelListener')(sListenerName);
						} else {
							/*IF THE DEFAULT PROPERTY AND STATIC PROPERTY AND THE ORIGINAL PROPERTY ARE ALL NOT EXIST. GO CHECK THE LOWER LEVEL PROPERTY.*/
							if (me.utils('ifThisListenerExist')(sListenerName) === false) {
								/*THIS PROPERTY IS NOT EXIST*/
								/*CHECK IF THE LOWER LEVEL PROPERTY IS EXIST*/
								consoledebug(sListenerName + " is not exsit at it's level ", "getListener");
								if (me.utils('ifLowerListenerExist')(sListenerName) === true) {
									consoledebug(sListenerName + " is exsit at it's LOWER level ", "getListener");
									oResult = me.utils('getLowerLevelListener')(sListenerName);
								} else {
									/*ALREADY THE LOWEREST VALUE*/
									consoledebug(sListenerName + " is already the lowest value.", "getListener");
									oResult = undefined;
								}
							} else {
								/*CHECK IF THE DEFAULT OR STATIC PROPERTY IS EXIST*/
								consoledebug({
										propertyExist: sListenerName
									}, "getListener");
								oResult = me.utils('getThisListener')(sListenerName);
							}
						}
						consoledebug('END getListener');
						return oResult;
					};
					var getUpperListener = function(sListenerName) {
						var oResult;
						return oResult;
					};
					var getLowerListener = function(sListenerName) {
						var oResult;
						return oResult;
					};
					var getDefaultListener = function(sListenerName) {
						consoledebug('BEGIN getDefaultListener');
						consolelog({
								getDefaultListener: sListenerName
							}, "getDefaultListener");
						var propertyName = fGetDefaultName(sListenerName),
							defaultValue, staticValue, oResult;
						consolelog("default property is " + propertyName, "getDefaultListener");
						/* check upper level*/
						if (me.utils('ifUpperListenerExist')(propertyName) === true) {
							/*UPER LEVEL PROPERTY IS EXIST*/
							oResult = me.utils('getUpperLevelListener')(propertyName);
						} else {
							/* check if property is exist*/
							if (me.utils('ifThisListenerExist')(propertyName) === true) {
								/* check default value*/
								consolelog("default property is exist", "getDefaultListener");
								defaultValue = me.utils('getDefaultListener')(propertyName);
								consolelog("default property's defaultValue is " + defaultValue, "getDefaultListener");
								/* check static value*/
								staticValue = me.utils('getStaticListener')(propertyName);
								consolelog("default property's staticValue is " + staticValue, "getDefaultListener");
								//oResult = Ext.merge({}, defaultValue, me[propertyName], staticValue);
								oResult = me.utils("getThisListener")(propertyName);
							} else if (me.utils('ifLowerListenerExist')(propertyName) === true) {
								/* check lower level*/
								oResult = me.utils('getLowerLevelListener')(propertyName);
							} else {
								oResult = undefined;
							}
						}
						consoledebug('END getDefaultListener');
						return oResult;
					};
					var getStaticListener = function(sListenerName) {
						var oResult;
						return oResult;
					};
					var getThisListener = function(sListenerName) {
						/* check default value*/
						consoledebug('BEGIN getThisListener');
						consolelog({
								getThisListener: sListenerName
							}, "getThisListener");
						var oResult, defaultValue = me.utils('getDefaultListener')(sListenerName),
							staticValue = me.utils('getStaticListener')(sListenerName),
							originalValue = me["listeners"][sListenerName],
							fake = staticValue || originalValue || defaultValue || {},
							fakeType = Ext.typeOf(fake);
						switch (fakeType) {
							case "array":
								oResult = Ext.Array.merge([], defaultValue, me[sListenerName], staticValue);
								break;
							case "object":
								/*TODO chage the rule
								listener:{
									render:{
										fn:function(){}

									}
								}
							*/
								oResult = Ext.Object.merge({}, defaultValue, me[sListenerName], staticValue);
								break;
							case "function":
							case "date":
							case "string":
							case "number":
								oResult = fake;
								break;
							default:
								oResult = fake;
								break;
						}
						consoledebug('END getThisListener');
						return oResult;
					};
					var triggerListener = function(sListenerName, aArguments) {
						var oResult, oListener = me.utils("getProperty")("listener"),
							fListener;

						if (Ext.isDefined(oListener) === true) {
							fListener = oListener[sListenerName];
							if (Ext.typeOf(fListener) === "function") {
								oResult = fListener.apply(me, aArguments);
							} else {
								oResult = undefined;
							}
						} else {
							oResult = undefined;
						}
						return oResult;
					};
					var concatenateValuesOfJSONToString = function(oJSON) {
						var oResult;
						if (Ext.typeOf(oJSON) === "object") {
							oResult = JSON.stringify(oJSON);
						} else {
							oResult = "";
						}
						oResult = oResult.replace(/([\{,][^\:]*[\:])/g, " ").replace(/}$/g, " ");
						return oResult;
					};
					var obj = {
						chain: chain,
						execFuncOf: executeFunctionOf,
						triggerListener: triggerListener,
						concatenateValuesOfJSONToString: concatenateValuesOfJSONToString,
						getPublicName: fGetPublicName,
						getPrivateName: fGetPrivateName,
						getULName: fGetUpperName,
						getLLName: fGetLowerName,
						getDefaultName: fGetDefaultName,
						getStaticName: fGetStaticName,
						consolelog: consolelog,
						consoledebug: consoledebug,
						withNo: withNo,
						convertGridColumnsToFormItems: gridColumnsToFormItems,
						initDefaultForm: initDefaultForm,
						toggleDefaultForm: toggleDefaultForm,
						initPublicProperty: initPublicProperty,
						mergeProperty: mergeProperty,
						ifUpperPropertyExist: ifUpperPropertyExist,
						ifLowerPropertyExist: ifLowerPropertyExist,
						ifThisPropertyExist: ifThisPropertyExist,
						ifDefaultPropertyExist: ifDefaultPropertyExist,
						ifStaticPropertyExist: ifStaticPropertyExist,
						getProperty: getProperty,
						getFunction: getFunction,
						callFunction: callFunction,
						getUpperLevelProperty: getUpperLevelProperty,
						getLowerLevelProperty: getLowerLevelProperty,
						getDefaultProperty: getDefaultProperty,
						getStaticProperty: getStaticProperty,
						getThisProperty: getThisProperty,
						mergeDefaultAndStaticProperty: mergeDefaultAndStaticProperty,
						analysePropertyConfigureObject: analysePropertyConfigureObject,
						analyseIt: analyseIt,
						analyseString: analyseString,
						analyseObject: analyseObject,
						analyseArray: analyseArray
					};
					if (Ext.isString(funcNameStr) === true && funcNameStr !== '') {
						if (obj[funcNameStr] === undefined) {
							return function() {};
						} else {
							return obj[funcNameStr];
						}
					}
					return obj;
				}
			};
		})());
