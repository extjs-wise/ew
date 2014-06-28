/*
This file is part of Ews JS 4.2

Copyright (c) 2011-2013 

Build date: 2014-6-10 16:36:44
*/
/**
 * Simplified Chinese translation
 * By WillKing
 * 09 June 2013
 *
 * update by WangZhi
 * 2014-6-10 15:00:57
 */

// changing the msg text below will affect the LoadMask

Ext.onReady(function() {
		var parseCodes;

		if (Ext.Date) {
			Ext.Date.monthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

			Ext.Date.dayNames = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

			Ext.Date.formatCodes.a = "(this.getHours() < 12 ? '上午' : '下午')";
			Ext.Date.formatCodes.A = "(this.getHours() < 12 ? '上午' : '下午')";

			parseCodes = {
				g: 1,
				c: "if (/(上午)/i.test(results[{0}])) {\n" + "if (!h || h == 12) { h = 0; }\n" + "} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
				s: "(上午|下午)",
				calcAtEnd: true
			};

			Ext.Date.parseCodes.a = Ext.Date.parseCodes.A = parseCodes;
			Ext.Date.defaultFormat = 'Y-m-d'
		}

		if (Ext.util && Ext.util.Format) {
			Ext.apply(Ext.util.Format, {
					thousandSeparator: ',',
					decimalSeparator: '.',
					currencySign: '\u00a5',
					// Chinese Yuan
					dateFormat: 'Y-m-d'
				});
		}
	});

Ext.define("Ews.locale.zh_CN.view.AbstractView", {
		override: "Ext.view.AbstractView",
		loadingText: "读取中..."
	});

Ext.define("Ews.locale.zh_CN.view.grid.Panel", {
		override: "Ews.view.grid.Panel",
		locale: {
			"default": {
				form: {
					title: '表单'
				},
				search_form: {
					title: '搜索',
					submit_btn: {
						text: '搜索' || '执行'
					}
				},
				add_form: {
					title: '新增',
					submit_btn: {
						text: '新增' || '添加'
					}
				},
				edit_form: {
					title: '修改',
					submit_btn: {
						text: '修改' || '保存'
					}
				},
				reset_btn: {
					text: '重置'
				},
				cancel_btn: {
					text: '取消'
				},
				auto_sync_btn: {
					text: '自动保存'
				},
				C: {
					text: '新增'
				},
				R: {
					text: '搜索'
				},
				U: {
					text: '修改'
				},
				D: {
					text: '删除'
				},
				"confirm": {
					"delete": {
						"title": "删除提示",
						"message": "您确定要删除么？ $1"
					}
				}
			}
		}
	});



Ext.define("Ext.locale.zh_CN.picker.Date", {
		override: "Ext.picker.Date",
		format: "Y-m-d"
	});
Ext.define("Ext.locale.zh_CN.form.field.Date", {
		override: "Ext.form.field.Date",
		format: "Y-m-d",
		defaultFormat: "Y-m-d"
	});


Ext.define("Ext.locale.zh_CN.grid.PropertyColumnModel", {
		override: "Ext.grid.PropertyColumnModel",
		format: "Y-m-d"
	});
