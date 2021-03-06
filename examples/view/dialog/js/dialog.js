Ext.require(['Ews.*']);
Ext.onReady(function() {
		var dialog = Ext.create('Ews.dialog.Panel', {
				items: [{
						//xtype:'panel',
						//height:60,
						//collapsible:true
						title: 'Menu',
						html: 'The main menu'
					}, {
						//xtype:'panel',
						//height:60,
						//collapsible:true
						title: 'Content',
						html: 'The main content!'
					}
				]
			});
		dialog.show();
	});

Ext.require([
		'Ext.tab.*',
		'Ext.window.*',
		'Ext.tip.*',
		'Ext.layout.container.Border'
	]);
Ext.onReady(function() {
		var win,
			button = Ext.create('Ext.Button', {
					text: 'layout window',
					renderTo: Ext.getBody(),
					listeners: {
						click: {
							fn: function() {

								if (!win) {
									win = Ext.create('widget.window', {
											title: 'Layout Window with title <em>after</em> tools',
											header: {
												titlePosition: 2,
												titleAlign: 'center'
											},
											closable: true,
											closeAction: 'hide',
											width: 600,
											minWidth: 350,
											height: 350,
											tools: [{
													type: 'pin'
												}
											],
											layout: {
												type: 'border',
												padding: 5
											},
											items: [{
													region: 'west',
													title: 'Navigation',
													width: 200,
													split: true,
													collapsible: true,
													floatable: false
												}, {
													region: 'center',
													xtype: 'tabpanel',
													items: [{
															// LTR even when example is RTL so that the code can be read
															rtl: false,
															title: 'Bogus Tab',
															html: '<p>Window configured with:</p><pre style="margin-left:20px"><code>header: {\n    titlePosition: 2,\n    titleAlign: "center"\n},\ntools: [{type: "pin"}],\nclosable: true</code></pre>'
														}, {
															title: 'Another Tab',
															html: 'Hello world 2'
														}, {
															title: 'Closable Tab',
															html: 'Hello world 3',
															closable: true
														}
													]
												}
											]
										});
								}
								var button = this;
								(button.dom || button).disabled = true;
								if (win.isVisible()) {
									win.hide(this, function() {
											button.disabled = false;
										});
								} else {
									win.show(this, function() {
											button.disabled = false;
										});
								}
							}
						}
					}
				});

	});
