/**
	Usage:
	Example:
	var dialog = Ext.create('Ews.dialog.Panel',{
		items:[{
			//xtype:'panel',
			//height:60,
			//collapsible:true
			title:'Menu',
			html: 'The main menu'
		},{
			//xtype:'panel',
			//height:60,
			//collapsible:true
			title:'Content',
			html: 'The main content!'
		}]
	});
	dialog.show();
*/
Ext.define('Ews.view.dialog.Panel', (function() {
			return {
				extend: 'Ext.window.Window',
				requires: ['Ext.window.Window', 'Ext.panel.Panel', 'Ext.util.ComponentDragger', 'Ext.util.Region'],
				alias: ['widget.ews.dialogPanel', 'widget.ews.dialog', 'widget.ews.window'],
				alternateClassName: ['Ews.window.Window', 'Ews.Window', 'Ews.Dialog', 'Ews.dialog.Dialog', 'Ews.dialog.DialogPanel', 'Ews.dialog.Panel'],
				title: 'Message',
				header: {
					titlePosition: 2,
					titleAlign: 'center'
				},
				closable: true,
				closeAction: 'hide',
				minWidth: 400,
				minHeight: 300,
				width: 400,
				height: 300,
				layout: {
					type: 'vbox',
					align: 'stretch' /* center, left, stretchmax*/
				},
				/*
					tools: [{
							type: 'pin'
						}
					],
				*/
				defaults: {
					xtype: 'panel',
					height: 60,
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					flex: 1,
					collapsible: true
				},
				maximizable: true
			};
		})());
