Ext.define('Ews.view.tree.Panel', (function() {
			return {
				extend: 'Ext.tree.Panel',
				region: 'west',
				alias: ['widget.ews.treepanel', 'widget.ews.tree'],
				alternateClassName: ['Ews.tree.Panel', 'Ews.tree.TreePanel', 'Ews.TreePanel', 'Ews.view.tree.Panel'],
				requires: ['Ext.tree.Panel', 'Ext.tree.View', 'Ext.selection.TreeModel', 'Ext.tree.Column', 'Ext.data.TreeStore'],
				viewType: 'treeview',
				selType: 'treemodel',
				minWidth: 80,
				minHeight: 200,
				autoScroll: true,
				title: 'Tree',
				rootVisible: false,
				initComponent: function() {
					var me = this,
						cls = [me.treeCls],
						store = me.store,
						view;

					if (me.useArrows) {
						cls.push(me.arrowCls);
						me.lines = false;
					}

					if (me.lines) {
						cls.push(me.linesCls);
					} else if (!me.useArrows) {
						cls.push(me.noLinesCls);
					}

					if (Ext.isString(store)) {
						store = me.store = Ext.StoreMgr.lookup(store);
					} else if (!store || Ext.isObject(store) && !store.isStore) {
						store = me.store = new Ext.data.TreeStore(Ext.apply({
									root: me.root,
									fields: me.fields,
									model: me.model,
									folderSort: me.folderSort
								}, store));
					} else if (me.root) {
						store = me.store = Ext.data.StoreManager.lookup(store);
						store.setRootNode(me.root);
						if (me.folderSort !== undefined) {
							store.folderSort = me.folderSort;
							store.sort();
						}
					}

					// I'm not sure if we want to this. It might be confusing
					// if (me.initialConfig.rootVisible === undefined && !me.getRootNode()) {
					//     me.rootVisible = false;
					// }

					me.viewConfig = Ext.apply({
							rootVisible: me.rootVisible,
							animate: me.enableAnimations,
							singleExpand: me.singleExpand,
							node: store.getRootNode(),
							hideHeaders: me.hideHeaders
						}, me.viewConfig);

					// If the user specifies the headers collection manually then dont inject our own
					if (!me.columns) {
						if (me.initialConfig.hideHeaders === undefined) {
							me.hideHeaders = true;
						}
						me.addCls(me.autoWidthCls);
						me.columns = [{
								xtype: 'treecolumn',
								text: 'Name',
								width: Ext.isIE6 ? '100%' : 10000, // IE6 needs width:100%
								dataIndex: me.displayField
							}
						];
					}

					if (me.cls) {
						cls.push(me.cls);
					}
					me.cls = cls.join(' ');

					me.callParent();

					// TreeModel has to know about the TreeStore so that pruneRemoved can work properly upon removal
					// of nodes.
					me.selModel.treeStore = me.store;

					view = me.getView();

					// Relay events from the TreeView.
					// An injected LockingView relays events from its locked side's View
					me.relayEvents(view, [
							/**
							 * @event checkchange
							 * Fires when a node with a checkbox's checked property changes
							 * @param {Ext.data.NodeInterface} node The node who's checked property was changed
							 * @param {Boolean} checked The node's new checked state
							 */
							'checkchange',
							/**
							 * @event afteritemexpand
							 * @inheritdoc Ext.tree.View#afteritemexpand
							 */
							'afteritemexpand',
							/**
							 * @event afteritemcollapse
							 * @inheritdoc Ext.tree.View#afteritemcollapse
							 */
							'afteritemcollapse'
						]);

					// If there has been a LockingView injected, this processing will be performed by the locked TreePanel
					if (!view.isLockingView) {
						// If the root is not visible and there is no rootnode defined, then just lets load the store
						if (!view.rootVisible && !me.getRootNode()) {
							me.setRootNode({
									expanded: true
								});
						}
					}
				}
			};
		})());
