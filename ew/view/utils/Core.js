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
Ext.define('Ews.view.utils.Core', (function() {

				var utils = function(funcNameStr) {
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
					var getUpperListener = function(sListenerName){
						var oResult;
						return oResult;
					};
					var getLowerListener = function(sListenerName){
						var oResult;
						return oResult;
					};
					var getDefaultListener = function(sListenerName){
						var oResult;
						return oResult;
					};
					var getStaticListener = function(sListenerName){
						var oResult;
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
			return {
			};
		})());
