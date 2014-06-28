Ext.require([ "Ext.data.Model" ]), Ext.define("Ews.model.tree.Files", function() {
    return {
        extend: "Ext.data.Model",
        idProperty: "id",
        fields: [ {
            name: "id",
            type: "int"
        }, {
            name: "text",
            type: "string"
        } ]
    };
}()), Ext.require([ "Ext.data.Model" ]), Ext.define("Ews.model.grid.Project", function() {
    return {
        extend: "Ext.data.Model",
        fields: [ {
            name: "id",
            type: "string"
        }, {
            name: "name",
            type: "string"
        }, {
            name: "department_id",
            type: "string"
        }, {
            name: "register_time",
            type: "string"
        }, {
            name: "check_status",
            type: "string"
        } ]
    };
}()), Ext.define("Ews.model.grid.Fruit", {
    extend: "Ext.data.Model",
    fields: [ "id", "name", "nick", {
        name: "color",
        type: "string"
    }, {
        name: "weight",
        type: "float"
    }, {
        name: "amount",
        type: "int"
    }, "paydate" ],
    validations: [ {
        type: "presence",
        field: "name"
    }, {
        type: "length",
        field: "nick",
        max: 50
    }, {
        type: "length",
        field: "color",
        min: 2,
        max: 50
    } ]
}), Ext.define("Ews.model.grid.organization", {
    extend: "Ext.data.Model",
    fields: [ "NAME", "ID", "CATEGORY", "CREATE_DATE", "PID" ]
}), Ext.define("Ews.store.tree.Files", function() {
    return {
        extend: "Ext.data.TreeStore",
        requires: [ "Ext.data.TreeStore" ],
        proxy: {
            type: "ajax",
            api: {
                create: appBaseUrl + "examples/data/tree/Files.create.json",
                read: appBaseUrl + "examples/data/tree/Files.read.json",
                update: appBaseUrl + "examples/data/tree/files.json",
                destroy: appBaseUrl + "examples/data/tree/files.json"
            }
        }
    };
}()), Ext.define("Ews.store.grid.Fruit", function() {
    return {
        extend: "Ext.data.Store",
        autoLoad: !0,
        pageSize: 1,
        storeId: "Ews.store.grid.Fruit",
        model: "Ews.model.grid.Fruit",
        proxy: {
            type: "ajax",
            api: {
                create: appBaseUrl + "examples/data/grid/Fruit.create.json",
                read: appBaseUrl + "examples/data/grid/Fruit.read.json",
                update: appBaseUrl + "examples/data/grid/Fruit.update.json",
                destroy: appBaseUrl + "examples/data/grid/Fruit.destroy.json"
            },
            reader: {
                type: "json",
                root: "data",
                totalProperty: "total",
                successProperty: "success"
            },
            writer: {
                type: "json",
                allowSingle: !1
            }
        }
    };
}()), Ext.define("Ews.store.grid.store", function() {
    return {
        extend: "Ext.data.Store",
        autoLoad: !0,
        pageSize: 1,
        storeId: "Ews.store.grid.store"
    };
}()), Ext.define("Ews.store.grid.organization", function() {
    return {
        extend: "Ext.data.Store",
        autoLoad: !0,
        pageSize: 1,
        storeId: "Ews.store.grid.organization",
        model: "Ews.model.grid.organization",
        proxy: {
            type: "ajax",
            api: {
                create: appBaseUrl + "examples/data/grid/Fruit.create.json",
                read: "http://localhost:8080/com.wisesoft.egovernment.web/organization/list.json",
                update: appBaseUrl + "examples/data/grid/Fruit.update.json",
                destroy: appBaseUrl + "examples/data/grid/Fruit.destroy.json"
            },
            reader: {
                type: "json",
                root: "topics",
                totalProperty: "totalCount",
                successProperty: "success"
            },
            writer: {
                type: "json",
                allowSingle: !1
            }
        }
    };
}()), Ext.define("Ews.view.tab.Panel", {
    extend: "Ext.tab.Panel",
    alias: "widget.ews.tabpanel",
    alternateClassName: [ "Ews.tab.Panel", "Ews.TabPanel" ]
}), Ext.define("Ews.view.dialog.Panel", function() {
    return {
        extend: "Ext.window.Window",
        requires: [ "Ext.window.Window", "Ext.panel.Panel", "Ext.util.ComponentDragger", "Ext.util.Region" ],
        alias: [ "widget.ews.dialogPanel", "widget.ews.dialog", "widget.ews.window" ],
        alternateClassName: [ "Ews.window.Window", "Ews.Window", "Ews.Dialog", "Ews.dialog.Dialog", "Ews.dialog.DialogPanel", "Ews.dialog.Panel" ],
        title: "Message",
        header: {
            titlePosition: 2,
            titleAlign: "center"
        },
        closable: !0,
        closeAction: "hide",
        minWidth: 400,
        minHeight: 300,
        width: 400,
        height: 300,
        layout: {
            type: "vbox",
            align: "stretch"
        },
        defaults: {
            xtype: "panel",
            height: 60,
            layout: {
                type: "vbox",
                align: "stretch"
            },
            flex: 1,
            collapsible: !0
        },
        maximizable: !0
    };
}()), Ext.define("Ews.view.tip.ToolTip", function() {
    return {
        extend: "Ext.tip.ToolTip",
        alias: [ "widget.ews.tooltip" ],
        alternateClassName: [ "Ews.ToolTip", "Ews.tip.ToolTip" ],
        initComponent: function() {
            var e = this;
            e.callParent(arguments), e.lastActive = new Date(), e.setTarget(e.target), e.origAnchor = e.anchor;
        }
    };
}), Ext.define("Ews.view.container.Viewport", function() {
    return {
        extend: Ext.container.Viewport,
        alias: "widget.ews.viewport",
        xtype: "ws.viewport",
        alternateClassName: [ "Ews.Viewport", "Ews.container.Viewport" ],
        requires: [ "Ext.container.Container", "Ext.container.Viewport" ],
        isViewport: !1,
        overflowX: "scroll",
        layout: "border"
    };
}()), Ext.define("Ews.view.tree.Panel", function() {
    return {
        extend: "Ext.tree.Panel",
        region: "west",
        alias: [ "widget.ews.treepanel", "widget.ews.tree" ],
        alternateClassName: [ "Ews.tree.Panel", "Ews.tree.TreePanel", "Ews.TreePanel", "Ews.view.tree.Panel" ],
        requires: [ "Ext.tree.Panel", "Ext.tree.View", "Ext.selection.TreeModel", "Ext.tree.Column", "Ext.data.TreeStore" ],
        viewType: "treeview",
        selType: "treemodel",
        minWidth: 80,
        minHeight: 200,
        autoScroll: !0,
        title: "Tree",
        rootVisible: !1,
        initComponent: function() {
            var e, t = this, i = [ t.treeCls ], r = t.store;
            t.useArrows && (i.push(t.arrowCls), t.lines = !1), t.lines ? i.push(t.linesCls) : t.useArrows || i.push(t.noLinesCls), 
            Ext.isString(r) ? r = t.store = Ext.StoreMgr.lookup(r) : !r || Ext.isObject(r) && !r.isStore ? r = t.store = new Ext.data.TreeStore(Ext.apply({
                root: t.root,
                fields: t.fields,
                model: t.model,
                folderSort: t.folderSort
            }, r)) : t.root && (r = t.store = Ext.data.StoreManager.lookup(r), r.setRootNode(t.root), 
            void 0 !== t.folderSort && (r.folderSort = t.folderSort, r.sort())), t.viewConfig = Ext.apply({
                rootVisible: t.rootVisible,
                animate: t.enableAnimations,
                singleExpand: t.singleExpand,
                node: r.getRootNode(),
                hideHeaders: t.hideHeaders
            }, t.viewConfig), t.columns || (void 0 === t.initialConfig.hideHeaders && (t.hideHeaders = !0), 
            t.addCls(t.autoWidthCls), t.columns = [ {
                xtype: "treecolumn",
                text: "Name",
                width: Ext.isIE6 ? "100%" : 1e4,
                dataIndex: t.displayField
            } ]), t.cls && i.push(t.cls), t.cls = i.join(" "), t.callParent(), t.selModel.treeStore = t.store, 
            e = t.getView(), t.relayEvents(e, [ "checkchange", "afteritemexpand", "afteritemcollapse" ]), 
            e.isLockingView || e.rootVisible || t.getRootNode() || t.setRootNode({
                expanded: !0
            });
        }
    };
}()), Ext.define("Ews.view.form.field.Number", {
    extend: "Ext.form.field.Number",
    alias: "widget.ews.numberfield",
    alternateClassName: [ "Ews.form.NumberField", "Ews.form.Number", "Ews.form.field.Number" ]
}), Ext.define("Ews.view.form.field.ComboBox", function() {
    return {
        extend: "Ext.form.field.ComboBox",
        alternateClassName: [ "Ews.form.field.ComboBox", "Ews.form.ComboBox" ],
        alias: [ "widget.ews.combobox", "widget.ews.combo" ]
    };
}()), Ext.define("Ews.view.form.field.Checkbox", function() {
    return {
        extend: "Ext.form.field.Checkbox",
        alias: [ "widget.ews.checkboxfield", "widget.ews.checkbox" ],
        alternateClassName: "Ews.form.Checkbox"
    };
}()), Ext.require([ "Ext.ux.TreePicker" ]), Ext.define("Ews.view.form.field.ComboBoxTree", {
    extend: "Ext.ux.TreePicker",
    alias: [ "widget.ews.comboboxtree", "widget.ews.treepicker" ],
    alternateClassName: [ "Ews.form.field.ComboBoxTree", "Ews.field.ComboBoxTree", "Ews.ComboBoxTree", "Ews.form.field.TreePicker", "Ews.field.TreePicker", "Ews.TreePicker" ],
    maxHeight: 22,
    labelWidth: 60,
    width: 200,
    maxWidth: 250,
    displayField: "text",
    margin: "10 0 0 10",
    value: "value",
    minPickerHeight: 100,
    createPicker: function() {
        var e = this, t = new Ext.tree.Panel(Ext.apply({
            shrinkWrapDock: 2,
            floating: !0,
            manageHeight: !1,
            shadow: !1
        }, e.tree, {
            minHeight: e.minPickerHeight,
            maxHeight: e.maxPickerHeight,
            displayField: e.displayField,
            columns: e.columns,
            store: e.store,
            listeners: {
                scope: e,
                itemclick: e.onItemClick
            },
            viewConfig: {
                listeners: {
                    scope: e,
                    render: e.onViewRender
                }
            }
        })), i = t.getView();
        return Ext.isIE9 && Ext.isStrict && i.on({
            scope: e,
            highlightitem: e.repaintPickerView,
            unhighlightitem: e.repaintPickerView,
            afteritemexpand: e.repaintPickerView,
            afteritemcollapse: e.repaintPickerView
        }), t;
    },
    onItemClick: function(e, t) {
        this.selectItem(t);
    }
}), Ext.require([ "Ext.panel.Panel" ]), Ext.define("Ews.view.form.field.MultiFileUploadPanel", function() {
    return {
        extend: "Ext.panel.Panel",
        alias: "widget.ews.multifileuploadpanel",
        alternateClassName: [ "Ews.form.field.MultiFileUploadPanel", "Ews.field.MultiFileUpload", "Ews.MultiFileUpload" ],
        layout: "vbox",
        id: "mfup",
        items: [ {
            xtype: "textfield"
        } ],
        initComponent: function() {
            var e = this;
            e.addEvents("beforeclose", "close", "beforeexpand", "beforecollapse", "expand", "collapse", "titlechange", "iconchange", "iconclschange", "glyphchange", "float", "unfloat"), 
            e.collapsible && this.addStateEvents([ "expand", "collapse" ]), e.unstyled && e.setUI("plain"), 
            e.frame && e.setUI(e.ui + "-framed"), e.bridgeToolbars(), e.items = e.initMFUPItems(), 
            e.callParent(arguments), e.collapseDirection = e.collapseDirection || e.headerPosition || Ext.Component.DIRECTION_TOP, 
            e.hiddenOnCollapse = new Ext.dom.CompositeElement();
        },
        initMFUPItems: function() {
            var e = this;
            return e.ewsid = e.id + Ext.id(), [ {
                xtype: "panel",
                layout: {
                    type: "vbox"
                },
                id: "mfulp_fj_panel" + e.ewsid,
                width: "100%",
                flex: 6,
                border: 0,
                items: [ {
                    xtype: "panel",
                    id: "mfulp_fj_" + e.ewsid + "_1",
                    layout: "hbox",
                    width: "100%",
                    margin: "5 0 5 5",
                    border: 0,
                    flex: 1,
                    items: [ {
                        xtype: "filefield",
                        labelAlign: "left",
                        id: e.ewsid + "_1",
                        width: "85%",
                        fieldLabel: e.label,
                        name: e.ewsid + "_1",
                        buttonText: "选择文件"
                    }, {
                        name: "deleteFileBtn",
                        xtype: "button",
                        margin: "0 0 0 10",
                        text: "删除",
                        listeners: {
                            click: {
                                fn: function() {
                                    console.log({
                                        "click this": this
                                    });
                                    try {
                                        var t = Ext.getCmp("mfulp_fj_" + e.ewsid + "_1");
                                        t && Ext.getCmp("mfulp_fj_panel" + e.ewsid).remove(t), Ext.getCmp("mfulp_fj_panel" + e.ewsid).doLayout();
                                    } catch (i) {
                                        alert(i.name + " " + i.message);
                                    }
                                }
                            }
                        },
                        fieldLabel: "删除"
                    } ]
                } ]
            }, {
                xtype: "panel",
                layout: "hbox",
                width: "100%",
                border: 0,
                items: [ {
                    width: "80%",
                    border: 0
                }, {
                    name: "addFileBtn",
                    xtype: "button",
                    margin: "0 0 5 10",
                    text: "添加附件",
                    listeners: {
                        click: {
                            fn: function() {
                                try {
                                    Ext.getCmp("mfulp_fj_panel" + e.ewsid).add(e.insertMFUPItem("mfulp_fj_" + e.ewsid + Ext.id())), 
                                    Ext.getCmp("mfulp_fj_panel" + e.ewsid).doLayout();
                                } catch (t) {
                                    alert(t.name + " " + t.message);
                                }
                            }
                        }
                    },
                    fieldLabel: "添加附件"
                } ]
            } ];
        },
        insertMFUPItem: function(e) {
            var t = this, i = new Ext.panel.Panel({
                id: e,
                layout: "hbox",
                width: "100%",
                margin: "5 0 5 5",
                border: 0,
                flex: 1,
                items: [ {
                    xtype: "filefield",
                    labelAlign: "left",
                    id: e + "_filefield",
                    width: "85%",
                    fieldLabel: t.label,
                    name: e + "_filefield",
                    buttonText: "选择文件"
                }, {
                    name: "deleteFileBtn",
                    xtype: "button",
                    margin: "0 0 0 10",
                    text: "删除",
                    listeners: {
                        click: {
                            fn: function() {
                                try {
                                    var i = Ext.getCmp(e);
                                    i && Ext.getCmp("mfulp_fj_panel" + t.ewsid).remove(i), Ext.getCmp("mfulp_fj_panel" + t.ewsid).doLayout();
                                } catch (r) {
                                    alert(r.name + " " + r.message);
                                }
                            }
                        }
                    },
                    fieldLabel: "删除"
                } ]
            });
            return i;
        }
    };
}()), Ext.define("Ews.view.form.field.Text", {
    extend: "Ext.form.field.Text",
    alias: "widget.ews.textfield",
    alternateClassName: [ "Ews.form.TextField", "Ews.form.Text", "Ews.form.field.Text" ]
}), Ext.require([ "Ext.ux.TreePicker" ]), Ext.define("Ews.view.form.field.TreePicker", {
    extend: "Ext.ux.TreePicker",
    alias: [ "widget.ews.treepicker" ],
    alternateClassName: [ "Ews.form.field.TreePicker", "Ews.field.TreePicker", "Ews.TreePicker" ],
    maxHeight: 22,
    maxWidth: 250,
    displayField: "text",
    margin: "10 0 10 0",
    value: "value",
    minPickerHeight: 100,
    createPicker: function() {
        var e = this;
        e.tree = e.tree || {};
        var t = new Ext.tree.Panel(Ext.merge({
            shrinkWrapDock: 2,
            floating: !0,
            manageHeight: !1,
            shadow: !1
        }, e.tree, {
            minHeight: e.minPickerHeight || e.tree.minHeight,
            maxHeight: e.maxPickerHeight || e.tree.maxHeight,
            displayField: e.displayField || e.tree.displayField,
            columns: e.columns || e.tree.columns,
            store: e.store || e.tree.store,
            listeners: {
                scope: e,
                itemclick: function(t, i, r, o, a) {
                    e.onItemClick(t, i, r, o, a), Ext.isObject(e.tree) === !0 && Ext.isObject(e.tree.listeners) === !0 && Ext.isFunction(e.tree.listeners.itemclick) === !0 && e.tree.listeners.itemclick(t, i, r, o, a);
                }
            },
            viewConfig: {
                listeners: {
                    scope: e,
                    render: e.onViewRender
                }
            }
        })), i = t.getView();
        return Ext.isIE9 && Ext.isStrict && i.on({
            scope: e,
            highlightitem: e.repaintPickerView,
            unhighlightitem: e.repaintPickerView,
            afteritemexpand: e.repaintPickerView,
            afteritemcollapse: e.repaintPickerView
        }), t;
    },
    onItemClick: function(e, t) {
        this.selectItem(t);
    }
}), Ext.define("Ews.view.form.field.Radio", {
    extend: "Ext.form.field.Radio",
    alias: [ "widget.ews.radiofield", "widget.ews.radio" ],
    alternateClassName: [ "Ews.form.Radio", "Ews.form.field.Radio" ]
}), Ext.define("Ews.view.form.field.Date", {
    extend: "Ext.form.field.Date",
    alias: [ "widget.ews.datefield", "widget.ews.date" ],
    alternateClassName: [ "Ews.form.Date", "Ews.form.field.Date", "Ews.view.form.field.DateField", "Ews.form.field.DateField", "Ews.form.DateField" ]
}), Ext.define("Ews.view.form.FieldSet", function() {
    return {
        extend: "Ext.form.FieldSet",
        requires: [ "Ext.form.FieldSet" ],
        alias: [ "widget.ews.formfieldset", "widget.ews.fieldset" ],
        alternateClassName: [ "Ews.form.FieldSet", "Ews.view.form.FieldSet" ],
        initComponent: function() {
            var e = this, t = e.baseCls;
            e.addEvents("create"), e.initFieldAncestor(), e.callParent(), e.layout.managePadding = e.layout.manageOverflow = !1, 
            e.addEvents("beforeexpand", "beforecollapse", "expand", "collapse"), e.collapsed && (e.addCls(t + "-collapsed"), 
            e.collapse()), (e.title || e.checkboxToggle || e.collapsible) && (e.addTitleClasses(), 
            e.legend = Ext.widget(e.createLegendCt())), e.initMonitor();
        }
    };
}()), Ext.define("Ews.view.form.Panel", function() {
    return {
        extend: "Ext.form.Panel",
        alias: [ "widget.ews.form" ],
        alternateClassName: [ "Ews.view.FormPanel", "Ews.form.FormPanel", "Ews.form.Panel" ],
        region: "north",
        defaults: {
            xtype: "textfield",
            labelAlign: "right",
            labelWidth: 90,
            padding: "2 2 2 2",
            hideEmptyLabel: !1
        },
        columnWidth: 30,
        padding: "1 1 1 1",
        initComponent: function() {
            var e = this;
            e.frame && (e.border = !1), e.initFieldAncestor(), e.callParent(), e.relayEvents(e.form, [ "beforeaction", "actionfailed", "actioncomplete", "validitychange", "dirtychange" ]), 
            e.pollForChanges && e.startPolling(e.pollInterval || 500);
        }
    };
}()), Ext.define("Ews.view.form.GridDockPanel", function() {
    return {
        extend: "Ext.form.Panel",
        region: "north",
        requires: [ "Ext.form.Panel" ],
        alias: [ "widget.ews.formsearchpanel", "widget.ews.searchpanel" ],
        alternateClassName: [ "Ews.form.GridDockPanel", "Ews.view.form.GridDockPanel" ],
        layout: "column",
        defaults: {
            xtype: "textfield",
            labelAlign: "right",
            labelWidth: 90,
            padding: "2 2 2 2",
            hideEmptyLabel: !1
        },
        columnWidth: "10%",
        columnWidth: 30,
        padding: "1 1 1 1",
        initComponent: function() {
            var e = this;
            e.frame && (e.border = !1), e.initFieldAncestor(), e.callParent(), e.relayEvents(e.form, [ "beforeaction", "actionfailed", "actioncomplete", "validitychange", "dirtychange" ]), 
            e.pollForChanges && e.startPolling(e.pollInterval || 500);
        }
    };
}()), Ext.define("Ews.form.SearchPanel", function() {
    return {
        extend: "Ews.form.GridDockPanel",
        requires: [ "Ews.form.GridDockPanel" ],
        alias: [ "widget.ews.formsearchpanel", "widget.ews.searchpanel" ],
        alternateClassName: [ "Ews.form.SearchPanel", "Ews.view.form.SearchPanel" ],
        initComponent: function() {
            var e = this;
            e.frame && (e.border = !1), e.initFieldAncestor(), e.callParent(), e.relayEvents(e.form, [ "beforeaction", "actionfailed", "actioncomplete", "validitychange", "dirtychange" ]), 
            e.pollForChanges && e.startPolling(e.pollInterval || 500);
        }
    };
}()), Ext.define("Ews.view.grid.Panel", function() {
    return {
        extend: "Ext.grid.Panel",
        region: "north",
        requires: [ "Ext.grid.Panel", "Ext.grid.View" ],
        alias: [ "widget.ews.gridpanel", "widget.ews.grid" ],
        alternateClassName: [ "Ews.list.ListView", "Ews.ListView", "Ews.grid.GridPanel", "Ews.grid.Panel", "Ews.view.grid.Panel" ],
        viewType: "gridview",
        lockable: !1,
        rowLines: !0,
        columnLines: !0,
        minWidth: 700,
        width: "100%",
        minHeight: 210,
        height: "100%",
        title: "Grid",
        border: "0 0 0 0",
        plugins: [],
        initComponent: function() {
            var e = this;
            e._init_ews(), e.store = e._build_store(), e.columns = e._build_columns(), e._build_default_btns_and_forms(), 
            e.dockedItems = e._build_docked_items();
            var t = e.utils("callFunction")("_get_default_form_style");
            switch (t) {
              case "dock":
                break;

              case "dialog":            }
            this.callParent(arguments), e._init_events();
        },
        _init_ews: function() {
            var e = this, t = e.utils("chain");
            e.default_view_config = {
                showPreview: !0,
                scrollOffset: 0,
                forceFit: !0,
                autoFill: !0,
                fitcontainer: !0,
                emptyText: "There is nothing to show."
            }, t("default_view_config", "viewConfig"), e._default_default_btns_config = {
                R: {
                    xtype: "button",
                    iconCls: "fcat search-icon",
                    text: "Search",
                    itemId: "default_search_btn",
                    listeners: {
                        click: function(e, t, i) {
                            var r = e.ownerCt.ownerCt, o = r.search_form, a = r.editingPlugin;
                            r.utils("execFuncOf")("cancelEdit", a), r.utils("toggleDefaultForm")(e, t, i, o);
                        }
                    }
                },
                C: {
                    xtype: "button",
                    iconCls: "fcat add-icon",
                    text: "Add",
                    itemId: "default_add_btn",
                    listeners: {
                        click: function(e, t, i) {
                            {
                                var r = e.ownerCt.ownerCt, o = r.add_form;
                                o.items.items[0];
                            }
                            r.utils("consolelog")({
                                me: r,
                                This: this
                            }, "_default_default_btns_config");
                            var a = r.editingPlugin;
                            r.utils("execFuncOf")("cancelEdit", a), r.utils("toggleDefaultForm")(e, t, i, o);
                        }
                    }
                },
                U: {
                    xtype: "button",
                    iconCls: "fcat edit-icon",
                    text: "Edit",
                    itemId: "default_update_btn",
                    disabled: !0,
                    listeners: {
                        click: function(e, t, i) {
                            var r = e.ownerCt.ownerCt, o = r.edit_form, a = o.items.items[0], l = a.getForm(), n = r.getSelectionModel().getSelection()[0];
                            r.utils("consolelog")({
                                edit_form: l,
                                record: n
                            }, "_default_default_btns_config"), l.activeRecord = n, n ? (a.down("#save").enable(), 
                            l.loadRecord(n)) : (a.down("#save").disable(), l.reset());
                            var s = r.editingPlugin;
                            r.utils("execFuncOf")("cancelEdit", s), r.utils("toggleDefaultForm")(e, t, i, o);
                        }
                    }
                },
                D: {
                    xtype: "button",
                    iconCls: "fcat delete-icon",
                    text: "Delete",
                    itemId: "default_delete_btn",
                    disabled: !0,
                    listeners: {
                        click: function(e) {
                            var t = e.ownerCt.ownerCt, i = t.getSelectionModel().getSelection()[0], r = t.getView().getSelectionModel().getSelection()[0], o = t.locale["default"].confirm["delete"], a = o.title, l = o.message.replace(/\$1/, "<br/><br/>(" + t.utils("concatenateValuesOfJSONToString")(r.getData()) + ")");
                            t.utils("consolelog")({
                                record: i,
                                view: t.getView(),
                                selection: r
                            }, "_default_default_btns_config"), t.utils("consolelog")(o, "_default_default_btns_config");
                            var n = t.editingPlugin;
                            t.utils("execFuncOf")("cancelEdit", n), Ext.MessageBox.confirm(a, l, function(e) {
                                t.utils("consolelog")(arguments, "_default_default_btns_config"), "yes" === e && void 0 !== r && this.store.remove(r);
                            }, t);
                        }
                    }
                }
            }, t("_default_default_btns_config", "defaultBtnsConfig"), e.defaultFormDefaultBtns = e._default_default_form_default_btns = [ {
                iconCls: "fcat reset-icon",
                text: e.locale["default"].reset_btn.text,
                listeners: {
                    click: function(t) {
                        {
                            var i = t, r = i.ownerCt, o = r.ownerCt;
                            o.ownerCt;
                        }
                        e.utils("consolelog")({
                            btn_obj: i,
                            form_obj: o
                        }, "reset");
                        var a = o.getForm(), l = a.activeRecord;
                        Ext.isDefined(l) === !0 ? a.loadRecord(a.activeRecord) : a.reset();
                    }
                }
            }, {
                iconCls: "fcat cancel-icon",
                text: e.locale["default"].cancel_btn.text,
                listeners: {
                    click: function(t, i, r) {
                        var o = t, a = o.ownerCt, l = a.ownerCt, n = l.ownerCt;
                        e.utils("toggleDefaultForm")(t, i, r, n);
                    }
                }
            } ], t("_default_default_form_default_btns", "defaultFormDefaultBtns"), e._default_default_add_form = {
                buttons: [ {
                    iconCls: "fcat do-icon",
                    text: e.locale["default"].add_form.submit_btn.text,
                    listeners: {
                        click: function(t, i, r) {
                            var o = t, a = o.ownerCt, l = a.ownerCt, n = l.ownerCt;
                            l.isValid() === !0 && (e.fireEvent("create", t, n, l, l.getValues()), e.utils("toggleDefaultForm")(t, i, r, n), 
                            l.getForm().reset());
                        }
                    }
                } ]
            }, t("_default_default_add_form", "defaultAddForm"), e._default_default_search_form = {
                buttons: [ {
                    iconCls: "fcat do-icon",
                    text: e.locale["default"].search_form.submit_btn.text,
                    listeners: {
                        click: function(t) {
                            {
                                var i = t, r = i.ownerCt, o = r.ownerCt, a = (o.ownerCt, o.getForm()), l = (a.getFieldValues(), 
                                a.getValues(), a.getFields(), e.getStore());
                                l.getProxy();
                            }
                            l.load({
                                scope: this,
                                callback: function(t, i, r) {
                                    e.utils("consolelog")({
                                        records: t,
                                        operation: i,
                                        success: r
                                    }, "_default_default_search_form");
                                }
                            }), e.utils("consolelog")({
                                form: a,
                                values: a.getValues(),
                                fieldValues: a.getFieldValues(),
                                fields: a.getFields(),
                                store: e.store,
                                proxy: e.getStore().getProxy(),
                                reader: e.getStore().getProxy().getReader()
                            }, "_default_default_search_form");
                        }
                    }
                } ]
            }, t("_default_default_search_form", "defaultSearchForm"), e._default_default_edit_form = {
                buttons: [ {
                    iconCls: "fcat do-icon",
                    text: e.locale["default"].edit_form.submit_btn.text,
                    itemId: "save",
                    listeners: {
                        click: function(t, i, r) {
                            var o = t, a = o.ownerCt, l = a.ownerCt, n = l.getForm(), s = l.ownerCt;
                            e.utils("consolelog")({
                                form_obj: l,
                                form: l.getForm()
                            }, "_default_default_edit_form"), n.updateRecord(), e.utils("toggleDefaultForm")(t, i, r, s);
                        }
                    }
                } ]
            }, t("_default_default_edit_form", "defaultEditForm"), e._default_default_form = {
                buttons: e._default_default_form_default_btns
            }, t("_default_default_form", "defaultForm"), e._default_columns = {
                items: {
                    rownumberer: {
                        xtype: "rownumberer",
                        renderer: function(t, i, r, o) {
                            e.utils("consolelog")({
                                a: arguments,
                                d: r.getData()
                            }, "_default_columns");
                            var a = "<b>" + e.utils("concatenateValuesOfJSONToString")(r.getData()) + "</b>";
                            return i.tdAttr = "data-qtip='" + a + "'", o + 1;
                        }
                    }
                },
                defaults: {
                    flext: 1,
                    minWidth: 10,
                    maxWidth: 1024,
                    defaultWidth: 30,
                    editor: {
                        xtype: "textfield",
                        allowBlank: !1
                    }
                }
            }, t("_default_columns", "defaultColumns"), e._default_btns_description = "CRUD", 
            t("_default_btns_description", "defaultBtnsDescription"), e._default_forms_style = "dialog", 
            t("_default_forms_style", "defaultFormsStyle"), e._with_no = [], t("_with_no", "withNo"), 
            e._default_locale = {
                "default": {
                    form: {
                        title: "FORM"
                    },
                    search_form: {
                        title: "SEARCH",
                        submit_btn: {
                            text: "SEARCH"
                        }
                    },
                    add_form: {
                        title: "ADD",
                        submit_btn: {
                            text: "ADD"
                        }
                    },
                    edit_form: {
                        title: "EDIT",
                        submit_btn: {
                            text: "SAVE"
                        }
                    },
                    reset_btn: {
                        text: "RESET"
                    },
                    cancel_btn: {
                        text: "CANCEL"
                    },
                    C: {
                        text: "Add"
                    },
                    R: {
                        text: "Search"
                    },
                    U: {
                        text: "Update"
                    },
                    D: {
                        text: "Delete"
                    },
                    confirm: {
                        "delete": {
                            title: "DELETION CONFIRMATION",
                            message: "Ary you sure you want to execute the DELETION ? $1"
                        }
                    }
                }
            }, t("_default_locale", "locale");
        },
        _init_public_property: function() {
            var e = this;
            e.static_private_public_name_config = {
                default_view_config: "viewConfig",
                _default_default_btns_config: "defaultBtnsConfig",
                _default_default_form_default_btns: "defaultFormDefaultBtns",
                _default_default_add_form: "defaultAddForm",
                _default_default_search_form: "defaultSearchForm",
                _default_default_edit_form: "defaultEditForm",
                _default_default_form: "defaultForm",
                _default_columns: "defaultColumns",
                _default_btns_description: "defaultBtnsDescription",
                _default_forms_style: "defaultFormsStyle",
                _with_no: "withNo",
                _default_locale: "locale",
                _build_store: "",
                _build_columns: "",
                _build_buttons: "",
                _build_docked_items: "",
                _build_default_btns_and_forms: "",
                _build_search_form: "",
                _build_add_form: "",
                _build_edit_form: "",
                _get_default_form_style: "getDefaultFormStyle"
            }, e.utils("initPublicProperty")(e.static_private_public_name_config);
        },
        _build_store: function() {
            var e = this;
            return e.store;
        },
        _build_columns: function() {
            var e, t, i, r = this, o = r.utils("getProperty")("defaultColumns") || {}, a = o.items, l = [], n = r.columns;
            for (t in a) r.utils("withNo")(t) === !1 && l.push(a[t]);
            return Ext.isObject(n) === !0 ? (n = r.utils("getProperty")("columns") || {}, i = n.items) : Ext.isArray(n) === !0 ? (i = n, 
            n = {
                items: n
            }) : (n = {}, i = []), l = l.concat(i), e = Ext.merge({}, o, n, {
                items: l
            });
        },
        _build_buttons: function() {},
        _build_docked_items: function() {
            var e = this, t = e.dockedItems, i = e.default_btns, r = e.utils("_get_default_form_style")(), o = "dock" === r ? e.default_forms : [], a = i.length > 0 ? [ "-" ].concat(i).concat([ "-" ]) : [];
            return [ {
                xtype: "pagingtoolbar",
                dock: "bottom",
                store: this.store,
                items: a,
                displayInfo: !0
            } ].concat(o).concat(t) || [];
        },
        _build_default_btns_and_forms: function() {
            var e, t, i = this, r = (i.utils("getProperty")("defaultBtnsDescription") || "").split("").reverse(), o = r.length, a = i.utils("getProperty")("defaultBtnsConfig");
            i.default_forms = [], i.default_btns = [];
            for (var l = function(e) {
                switch (e) {
                  case "C":
                    i.add_form = i._build_add_form(), i.default_forms.push(i.add_form);
                    break;

                  case "R":
                    i.search_form = i._build_search_form(), i.default_forms.push(i.search_form);
                    break;

                  case "U":
                    i.edit_form = i._build_edit_form(), i.default_forms.push(i.edit_form);
                }
            }; o-- > 0; ) e = r[o], t = Ext.merge(a[e], {
                text: i.locale["default"][e].text
            }), i.default_btns.push(t), l(e);
            i.default_btns = i.default_btns.concat([ "-", {
                text: i.locale["default"].auto_sync_btn.text || "autoSync",
                enableToggle: !0,
                pressed: !0,
                tooltip: "When enabled, Store will execute Ajax requests as soon as a Record becomes dirty.",
                scope: this,
                hidden: !0,
                toggleHandler: function(e, t) {
                    i.utils("consolelog")({
                        store: this.store
                    }, "autoSync"), this.store.autoSync = t;
                }
            }, {
                text: "batch",
                enableToggle: !0,
                hidden: !0,
                pressed: !0,
                tooltip: "When enabled, Store will batch all records for each type of CRUD verb into a single Ajax request.",
                scope: this,
                toggleHandler: function(e, t) {
                    this.store.getProxy().batchActions = t;
                }
            }, {
                text: "writeAllFields",
                enableToggle: !0,
                pressed: !1,
                tooltip: "When enabled, Writer will write *all* fields to the server -- not just those that changed.",
                scope: this,
                hidden: !0,
                toggleHandler: function(e, t) {
                    this.store.getProxy().getWriter().writeAllFields = t;
                }
            } ]);
        },
        _build_search_form: function() {
            var e, t = this;
            return t.store.addListener("beforeload", function(e, i, r) {
                t.utils("consolelog")({
                    store: e,
                    operation: i,
                    oEOpts: r
                }, "_build_search_form"), i.params = i.params || {};
                var o = i.params, a = t.search_form.items.items[0].getForm().getValues();
                t.utils("callFunction")("_sync_read_params", o, a);
            }), e = t.utils("initDefaultForm")({
                form_type: "Search",
                form_title: t.locale["default"].search_form.title,
                submit_btn_name: t.locale["default"].search_form.submit_btn.text
            });
        },
        _build_add_form: function() {
            var e = this;
            return this.utils("initDefaultForm")({
                form_type: "Add",
                form_title: e.locale["default"].add_form.title,
                submit_btn_name: e.locale["default"].add_form.submit_btn.text
            });
        },
        _build_edit_form: function() {
            var e = this;
            return this.utils("initDefaultForm")({
                form_type: "Edit",
                form_title: e.locale["default"].edit_form.title,
                submit_btn_name: e.locale["default"].edit_form.submit_btn.text
            });
        },
        _get_default_form_style: function() {
            var e = this, t = e.utils("getProperty")("defaultFormsStyle");
            return Ext.isString(t) === !0 ? t : "dock";
        },
        _sync_read_params: function(e, t) {
            var i;
            for (i in t) "" !== t[i] && (e[i] = t[i]);
            return e;
        },
        _build_cell_tip: function() {
            t.utils("consoledebug")("/*BEGIN _build_cell_tip*/", "_build_cell_tip");
            var e, t = this, i = t.getView(), r = Ext.create("Ews.view.tip.ToolTip", {
                target: i.el,
                delegate: i.itemSelector,
                trackMouse: !0,
                renderTo: Ext.getBody(),
                listeners: {
                    beforeshow: function(e) {
                        t.utils("consolelog")(arguments, "_build_cell_tip"), e.update('Over company "' + i.getRecord(e.triggerElement).get("company") + '"');
                    }
                }
            });
            return e = r, t.utils("consoledebug")("/*END _build_cell_tip*/", "_build_cell_tip"), 
            e;
        },
        _init_events: function() {
            var e = this, t = function(t, i, r) {
                switch (e = e || r, i) {
                  case "listeners":
                    e[i] = Ext.merge({}, e[i], e[t]);
                    break;

                  default:
                    e.utils("chain")(t, i);
                }
            };
            e._on_select_change = function(t, i) {
                var r = e.utils("getProperty")("defaultBtnsConfig"), o = r.D.itemId || "default_delete_btn", a = this.down("#" + o), l = r.U.itemId || "default_update_btn", n = this.down("#" + l), s = 0 === i.length;
                e.utils("consolelog")({
                    disableFlag: s,
                    deleteItem: a
                }, "_init_events"), e.utils("execFuncOf")("setDisabled", a, s), e.utils("execFuncOf")("setDisabled", n, s);
            }, e.getSelectionModel().on("selectionchange", function(t, i) {
                e.utils("callFunction")("_on_select_change", t, i);
            }, e), e._default_listeners = {
                create: function(e, t, i, r) {
                    var o = this;
                    o.utils("consolelog")({
                        me: o,
                        store: o.getStore(),
                        data: r
                    }, "_init_events"), o.getStore().insert(0, r), o.utils("triggerListener")("create", arguments);
                },
                afterrender: function(e) {
                    var t = e, i = t.getView();
                    t.utils("consolelog")({
                        a: arguments,
                        v: i
                    }, "_default_listeners"), i.tip = Ext.create("Ews.view.tip.ToolTip", {
                        target: i.el,
                        delegate: i.cellSelector,
                        trackMouse: !0,
                        renderTo: Ext.getBody(),
                        listeners: {
                            beforeshow: function(e) {
                                gridColums = i.getGridColumns(), column = gridColums[e.triggerElement.cellIndex], 
                                record = i.getRecord(e.triggerElement.parentNode), t.utils("consolelog")({
                                    tip: e,
                                    ele: e.triggerElement,
                                    column: column,
                                    dataIndex: column.dataIndex,
                                    record: record,
                                    get: record.get(column.dataIndex)
                                }), myToolTipText = "<b>" + e.triggerElement.innerHTML + "</b>", e.update(myToolTipText);
                            }
                        }
                    }), t.utils("triggerListener")("afterrender", arguments);
                }
            }, e.listeners = e.utils("getProperty")("listeners"), t("_default_listeners", "listeners", e), 
            console.log({
                listeners: e.listeners
            });
        },
        utils: function(e) {
            var t = this, i = function(e, t) {
                var i, r, o = !0;
                if (o === !0) {
                    0 === arguments.length ? (o = new Date(), r = "it's ") : 1 === arguments.length ? (o = e, 
                    r = "it's ") : 2 === arguments.length && (o = t - e, r = "spend ");
                    var a = new Date(o);
                    i = r + a.getSeconds() + ":" + a.getMilliseconds();
                } else i = "";
                return i;
            }, r = function(e, t) {
                var i = !0, r = {
                    _build_cell_tip: !0,
                    fGetPublicName: !1,
                    fGetPrivateName: !1,
                    fGetDefaultName: !1,
                    fGetStaticName: !1,
                    ifDefaultPropertyExist: !1,
                    initDefaultForm: !0,
                    gridColumnsToFormItems: !0,
                    analysePropertyConfigureObject: !1,
                    autoSync: !1,
                    _default_default_search_form: !0,
                    _default_default_edit_form: !1,
                    _default_default_btns_config: !0,
                    reset: !1
                };
                i === !0 && r[t] !== !1 && Ext.isDefined(window.console) === !0 && "function" === Ext.typeOf(window.console.log) && window.console.log([ t, e ]);
            }, o = function(e, t) {
                var r;
                r = new Date();
                var o = !1, a = {
                    _build_cell_tip: !1,
                    getProperty: !0
                };
                o === !0 && a[t] !== !1 && Ext.isDefined(window.console) === !0 && "function" === Ext.typeOf(window.console.debug) && console.debug([ i(r.getTime()), e ]);
            }, a = function(e) {
                var t = /[^a-zA-Z]+/, i = t.test(e) === !0 ? t.exec(e)[0] : "";
                return i;
            }, l = function(e) {
                o("BEGIN fGetPublicName");
                var t = /^_/, i = /^[_]+/, a = /_[a-z]/, l = /[a-z]/, n = (e.search(a), ""), s = "";
                if (t.test(e) === !0) if (e = e.replace(t, ""), i.test(e) === !0) ; else for (;a.test(e) === !0; ) n = a.exec(e), 
                Ext.isArray(n) === !0 && (n = n[0], s = l.exec(n), Ext.isArray(s) === !0 && (s = s[0], 
                s = s.toUpperCase(), e = e.replace(n, s)));
                return r({
                    fGetPublicName: e
                }, "fGetPublicName"), o("END fGetPublicName"), e;
            }, n = function(e) {
                o("BEGIN fGetPrivateName");
                var t = /[A-Z]/, i = "", a = "";
                for (r({
                    sPropertyName: e
                }, "fGetPrivateName"); t.test(e) === !0; ) r({
                    sPropertyName: e
                }, "fGetPrivateName"), i = t.exec(e)[0], a = "_" + i.toLowerCase(), r({
                    sPropertyName: e
                }, "fGetPrivateName"), e = e.replace(i, a), r({
                    sPropertyName: e
                }, "fGetPrivateName");
                return /^[_]{3,}[a-z]/.test(e) === !1 && (e = "_" + e), r({
                    fGetPrivateName: e
                }, "fGetPrivateName"), o("END fGetPrivateName"), e;
            }, s = function(e) {
                o("BEGIN fGetUpperName1");
                var t, i = a(e), r = i.split("").length, l = new RegExp("_([_]{" + (r - 1) + "}[a-z])", "g"), n = function(e, t, i) {
                    var r = "";
                    return r = 0 === i ? t : -1 !== t.indexOf("_") ? t : t.toUpperCase();
                };
                return t = e.replace(l, n), o("END fGetUpperName1"), t;
            }, d = function(e) {
                o("BEGIN fGetLowerName");
                var t, i = a(e), r = i.split("").length, l = new RegExp("(^[a-z]|[A-Z])|(_[_]{" + (r - 1) + "}[a-z])", "g"), n = function(e) {
                    var t = "";
                    return t = "_" + e.toLowerCase();
                };
                return t = r > 3 ? e : e.replace(l, n), o("END fGetLowerName"), t;
            }, u = function(e) {
                var t;
                o("BEGIN fGetDefaultName");
                var i = a(e), l = e.substring(0, 1), n = e.substring(1);
                return t = i + "default" + l.toUpperCase() + n, r({
                    fGetDefaultName: t
                }, "fGetDefaultName"), o("END fGetDefaultName"), t;
            }, f = function(e) {
                var t;
                o("BEGIN fGetStaticName");
                var i = a(e), l = e.substring(0, 1), n = e.substring(1);
                return t = i + "static" + l.toUpperCase() + n, r({
                    fGetStaticName: t
                }, "fGetStaticName"), o("END fGetStaticName"), t;
            }, c = function(e) {
                o("BEGIN withNo");
                var i, r = t.utils("getProperty")("withNo") || [], a = {}, l = Ext.isArray(r) ? r.join() : r;
                if (Ext.isString(e) === !0) i = -1 !== ("," + l + ",").indexOf("," + e + ",") ? !0 : !1; else if (Ext.isArray(e)) {
                    e = [ e ];
                    for (var n, s = e.length; s-- > 0; ) n = e[s], a[n] = Ext.isString(n) && -1 !== ("," + l + ",").indexOf("," + n + ",") ? !0 : !1;
                    i = resultobj;
                }
                return o("END withNo"), i;
            }, m = function(e) {
                o("BEGIN gridColumnsToFormItems");
                var i;
                if (Ext.isObject(e) === !0) {
                    e = e.items || [];
                    for (var a, l = e.reverse().length, n = [], s = {}, d = [ [ "fieldLabel", "text" ], [ "name", "dataIndex" ], [ "xtype", {
                        editor: "xtype"
                    } ], [ "format", "format" ], [ "minValue", {
                        editor: "minValue"
                    } ], [ "minText", {
                        editor: "minText"
                    } ], [ "maxValue", {
                        editor: "maxValue"
                    } ], [ "allowBlank", {
                        editor: "allowBlank"
                    } ] ] || {
                        fieldLabel: "text",
                        name: "dataIndex",
                        xtype: "editor.xtype"
                    }; l-- > 0; ) a = e[l], Ext.isDefined(a.dataIndex) !== !1 && (s = {}, a = Ext.merge({}, t.utils("getProperty")("defaultColumns").defaults, a), 
                    r(t.utils("analysePropertyConfigureObject")(d, s, a), "gridColumnsToFormItems"), 
                    r({
                        form_item_obj_prop: s,
                        grid_columns_item: a
                    }, "gridColumnsToFormItems"), n.push(s), s = {});
                    e.reverse(), i = n;
                } else Ext.isArray(e) !== !1 && (i = e);
                return r({
                    gridColumnsToFormItems__form_items_ary: i
                }, "gridColumnsToFormItems"), o("END gridColumnsToFormItems"), i;
            }, g = function(e) {
                o("/*BEGIN initDefaultForm*/");
                var i;
                e = e || {};
                var r, a, l = e.form_type || "Add", n = /^./, s = e.form_title || t.locale["default"].form.title, d = t.columns, u = t.utils("getProperty")("default" + n.exec(l)[0].toUpperCase() + l.substring(1).toLowerCase() + "Form") || {}, f = Ext.isObject(u), c = t.utils("getProperty")("defaultFormDefaultBtns") || [];
                r = f !== !0 || Ext.isObject(u.items) !== !0 && "array" !== Ext.typeOf(u.items) ? t.utils("convertGridColumnsToFormItems")(d) : u.items, 
                a = f !== !0 || Ext.isObject(u.buttons) !== !0 && "array" !== Ext.typeOf(u.buttons) ? c : (u.buttons || []).concat(c), 
                defaultFormStyle = t.utils("callFunction")("_get_default_form_style"), form_container = {}, 
                t.utils("consolelog")({
                    DEFAULTFORMBUTTON: a,
                    _default_form_default_btns: t.utils("getProperty")("defaultFormDefaultBtns"),
                    form_items: r,
                    default_form: u
                }, "initDefaultForm");
                var m = function() {
                    var e = Ext.create("Ews.view.form.GridDockPanel", Ext.merge({}, {
                        overflowX: "auto",
                        overflowY: "auto"
                    }, u, {
                        items: r,
                        buttons: a
                    }));
                    return Ext.create("Ews.view.form.FieldSet", {
                        title: s,
                        hidden: !0,
                        dock: "bottom",
                        padding: "0 0 0 0",
                        margin: "0 0 0 0",
                        overflowX: "auto",
                        overflowY: "auto",
                        items: [ e ]
                    });
                }, g = function() {
                    var e = Ext.create("Ews.view.form.Panel", Ext.merge({}, {
                        collapsible: !1,
                        layout: "column",
                        width: 600,
                        height: "auto",
                        overflowX: "auto",
                        overflowY: "auto"
                    }, u, {
                        items: r,
                        buttons: a
                    }));
                    return t.utils("consolelog")({
                        form_items: r,
                        default_form: u
                    }, "initDefaultForm"), Ext.create("Ews.view.dialog.Panel", {
                        title: s,
                        width: u.width || 600,
                        height: u.height || 100,
                        minWidth: u.minWidth || 300,
                        minHeight: u.minHeight || 170,
                        overflowX: "auto",
                        overflowY: "auto",
                        hidden: !0,
                        items: [ e ]
                    });
                };
                switch (defaultFormStyle) {
                  case "dock":
                    form_container = m();
                    break;

                  case "dialog":
                    form_container = g();
                    break;

                  default:
                    form_container = form;
                }
                return i = form_container, o("/*BEGIN initDefaultForm*/"), i;
            }, p = function(e, i, r, a) {
                o("BEGIN toggleDefaultForm");
                for (var l, n, s = t.default_forms, d = s.length, u = a.isVisible(); d-- > 0; ) n = s[d], 
                n !== a && n.hide({
                    duration: 2e3,
                    to: {
                        opacity: 0
                    }
                });
                return l = u === !1 ? a.show({
                    duration: 2e3,
                    to: {
                        opacity: 90
                    }
                }) : a.hide({
                    duration: 2e3,
                    to: {
                        opacity: 0
                    }
                }), o("END toggleDefaultForm"), l;
            }, _ = function(e) {
                o("BEGIN initPublicProperty");
                var i, r;
                for (i in e) r = e[i], Ext.isString(r) === !0 && ("" === r && (r = s(i)), t[r] = t[r] || t[i]);
                o("END initPublicProperty");
            }, x = function(e) {
                o("BEGIN mergeProperty"), r({
                    mergeProperty: e
                });
                var i, a = u(e), l = f(e);
                return i = Ext.merge({}, t[a], t[e], t[l]), o("END mergeProperty"), i;
            }, E = function(e) {
                o("BEGIN mergeDefaultAndStaticProperty");
                var i, a;
                return r({
                    mergeDefaultAndStaticProperty: e
                }), i = t.utils("getProperty")(u(e)), a = t.utils("getProperty")(f(e)), o("END mergeDefaultAndStaticProperty"), 
                Ext.merge({}, i, t[e], a);
            }, w = function(e) {
                o("BEGIN ifUpperPropertyExist");
                var t, i;
                return i = s(e), t = i === e ? !1 : !0, o("END ifUpperPropertyExist"), t;
            }, y = function(e) {
                o("BEGIN ifLowerPropertyExist");
                var t, i;
                return r({
                    ifLowerPropertyExist: e
                }), i = d(e), t = i === e ? !1 : !0, o("END ifLowerPropertyExist"), t;
            }, h = function(e) {
                o("BEGIN ifThisPropertyExist");
                var i = !1;
                return i = Ext.isDefined(t[e]) === !0 || b(e) === !0 || v(e) === !0 ? !0 : !1, o("END ifThisPropertyExist"), 
                i;
            }, b = function(e) {
                var i;
                return o("BEGIN ifDefaultPropertyExist"), r({
                    ifDefaultPropertyExist: e
                }, "ifDefaultPropertyExist"), i = Ext.isDefined(t[u(e)]), o("END ifDefaultPropertyExist"), 
                i;
            }, v = function(e) {
                var i;
                return o("BEGIN ifStaticPropertyExist"), i = Ext.isDefined(t[f(e)]), o("END ifStaticPropertyExist"), 
                i;
            }, P = function(e) {
                o("BEGIN getProperty");
                var i;
                return t.utils("ifUpperPropertyExist")(e) === !0 ? (o(e + " is exsit at it's UPPER level ", "getProperty"), 
                i = t.utils("getUpperLevelProperty")(e)) : t.utils("ifThisPropertyExist")(e) === !1 ? (o(e + " is not exsit at it's level ", "getProperty"), 
                t.utils("ifLowerPropertyExist")(e) === !0 ? (o(e + " is exsit at it's LOWER level ", "getProperty"), 
                i = t.utils("getLowerLevelProperty")(e)) : (o(e + " is already the lowest value.", "getProperty"), 
                i = void 0)) : (o({
                    propertyExist: e
                }, "getProperty"), i = t.utils("getThisProperty")(e)), o("END getProperty"), i;
            };
            P = function(e) {
                var i;
                return i = t[e];
            };
            var C = function(e) {
                o("BEGIN getFunction");
                var i;
                return i = t.utils("getProperty")(e), "function" !== Ext.typeOf(i) && (i = function() {}), 
                o("END getFunction"), i;
            }, N = function(e) {
                o("BEGIN callFunction");
                var i;
                return i = t.utils("getProperty")(e), "function" !== Ext.typeOf(i) && (i = function() {}), 
                i = i.apply(t, Array.prototype.slice.call(arguments, 1)), o("END callFunction"), 
                i;
            }, D = function(e) {
                var i, r = s(e);
                return i = t.utils("getProperty")(r);
            }, F = function(e) {
                o("BEGIN getLowerLevelProperty");
                var i, r = d(e);
                return t.utils("ifThisPropertyExist")(r) === !1 ? (o(r + " is not exsit at it's level ", "getProperty"), 
                t.utils("ifLowerPropertyExist")(r) === !0 ? (o(r + " is exsit at it's LOWER level ", "getProperty"), 
                i = t.utils("getLowerLevelProperty")(r)) : (o(r + " is already the lowest value.", "getProperty"), 
                i = void 0)) : (o({
                    propertyExist: r
                }, "getProperty"), i = t.utils("getThisProperty")(r)), o("END getLowerLevelProperty"), 
                i;
            }, S = function(e) {
                o("BEGIN getDefaultProperty"), r({
                    getDefaultProperty: e
                }, "getDefaultProperty");
                var i, a, l, n = u(e);
                return r("default property is " + n, "getDefaultProperty"), t.utils("ifUpperPropertyExist")(n) === !0 ? l = t.utils("getUpperLevelProperty")(n) : t.utils("ifThisPropertyExist")(n) === !0 ? (r("default property is exist", "getDefaultProperty"), 
                i = t.utils("getDefaultProperty")(n), r("default property's defaultValue is " + i, "getDefaultProperty"), 
                a = t.utils("getStaticProperty")(n), r("default property's staticValue is " + a, "getDefaultProperty"), 
                l = t.utils("getThisProperty")(n)) : l = t.utils("ifLowerPropertyExist")(n) === !0 ? t.utils("getLowerLevelProperty")(n) : void 0, 
                o("END getDefaultProperty"), l;
            }, T = function(e) {
                o("BEGIN getStaticProperty");
                var i, a = f(e);
                return t.utils("ifUpperPropertyExist")(a) === !0 ? i = t.utils("getUpperLevelProperty")(a) : t.utils("ifThisPropertyExist")(a) === !0 ? (r({
                    getStaticProperty: a
                }, "getStaticProperty"), i = t.utils("getThisProperty")(a)) : i = t.utils("ifLowerPropertyExist")(a) === !0 ? t.utils("getLowerLevelProperty")(a) : void 0, 
                o("END getStaticProperty"), i;
            }, k = function(e) {
                o("BEGIN getThisProperty"), r({
                    getThisProperty: e
                }, "getThisProperty");
                var i, a = t.utils("getDefaultProperty")(e), l = t.utils("getStaticProperty")(e), n = t[e], s = l || n || a || {}, d = Ext.typeOf(s);
                switch (d) {
                  case "array":
                    i = Ext.Array.merge([], a, t[e], l);
                    break;

                  case "object":
                    i = Ext.Object.merge({}, a, t[e], l);
                    break;

                  case "function":
                  case "date":
                  case "string":
                  case "number":
                    i = s;
                    break;

                  default:
                    i = s;
                }
                return o("END getThisProperty"), i;
            }, I = function(e, i, a) {
                o("BEGIN analysePropertyConfigureObject");
                var l, n, s, d = e.length;
                for (i = i || {}, a = a || {}; d-- > 0; ) l = e[d], n = t.utils("analyseIt")(l[0], i), 
                s = t.utils("analyseIt")(l[1], a), r({
                    targetAry: n,
                    sourceAry: s
                }, "analysePropertyConfigureObject"), void 0 !== s[1][s[0]] && (n[1][n[0]] = s[1][s[0]]);
                return o("END analysePropertyConfigureObject"), i;
            }, B = function(e, i) {
                o("BEGIN analyseIt");
                var r, a;
                return Ext.isObject(i) === !1 ? r = [ e, i ] : Ext.isString(e) === !0 ? (a = null, 
                r = t.utils("analyseString")(e, i, a)) : Ext.isObject(e) === !0 ? (a = {}, r = t.utils("analyseObject")(e, i, a)) : Ext.isArray(e) === !0 ? (a = "USE DEFAULT FUNCTION PLS.", 
                r = t.utils("analyseArray")(e, i, a)) : r = "WARNING, Out of the edge of the design.", 
                o("END analyseIt"), r;
            }, G = function(e, t) {
                return o("BEGIN analyseString"), Ext.isDefined(t[e]) === !1, o("END analyseString"), 
                [ e, t ];
            }, O = function(e, i, r) {
                o("BEGIN analyseObject");
                var a, l;
                r = r || {};
                for (a in e) {
                    Ext.isDefined(i[a]) === !1 && (i[a] = r), l = t.utils("analyseIt")(e[a], i[a]);
                    break;
                }
                return o("END analyseObject"), l;
            }, A = function(e, i, r) {
                o("BEGIN analyseArray");
                var a, l, n = e.length || 0;
                return r = "function" === Ext.typeOf(r) ? r : function(e, i) {
                    var r, o = e.length, a = [];
                    for (e.reverse(); o-- > 0; ) r = e[o], resultArys.push(t.utils("analyseIt")(r, i));
                    return a.join(" ");
                }, n-- > 0 ? (l = e[n], "function" === Ext.typeOf(l) ? (n++, a = "function" === Ext.typeOf(r) ? r(e, i) : void 0) : a = "function" === Ext.typeOf(l) ? l(e.slice(1), i) : void 0) : a = void 0, 
                o("END analyseArray"), a;
            }, L = function(e, i) {
                t[i] = Ext.isDefined(t[i]) === !0 ? t[i] : t[e];
            }, j = function(e, t) {
                var i;
                return Ext.isDefined(t) === !1 ? i = void 0 : Ext.isObject(t) === !1 ? i = void 0 : "function" === Ext.typeOf(t[e]) ? (i = t[e], 
                i = i.apply(t, Array.prototype.slice.call(arguments, 2))) : i = void 0, i;
            }, U = function(e, i) {
                var r, o, a = t.utils("getProperty")("listener");
                return Ext.isDefined(a) === !0 ? (o = a[e], r = "function" === Ext.typeOf(o) ? o.apply(t, i) : void 0) : r = void 0, 
                r;
            }, V = function(e) {
                var t;
                return t = "object" === Ext.typeOf(e) ? JSON.stringify(e) : "", t = t.replace(/([\{,][^\:]*[\:])/g, " ").replace(/}$/g, " ");
            }, R = {
                chain: L,
                execFuncOf: j,
                triggerListener: U,
                concatenateValuesOfJSONToString: V,
                getPublicName: l,
                getPrivateName: n,
                getULName: s,
                getLLName: d,
                getDefaultName: u,
                getStaticName: f,
                consolelog: r,
                consoledebug: o,
                withNo: c,
                convertGridColumnsToFormItems: m,
                initDefaultForm: g,
                toggleDefaultForm: p,
                initPublicProperty: _,
                mergeProperty: x,
                ifUpperPropertyExist: w,
                ifLowerPropertyExist: y,
                ifThisPropertyExist: h,
                ifDefaultPropertyExist: b,
                ifStaticPropertyExist: v,
                getProperty: P,
                getFunction: C,
                callFunction: N,
                getUpperLevelProperty: D,
                getLowerLevelProperty: F,
                getDefaultProperty: S,
                getStaticProperty: T,
                getThisProperty: k,
                mergeDefaultAndStaticProperty: E,
                analysePropertyConfigureObject: I,
                analyseIt: B,
                analyseString: G,
                analyseObject: O,
                analyseArray: A
            };
            return Ext.isString(e) === !0 && "" !== e ? void 0 === R[e] ? function() {} : R[e] : R;
        }
    };
}()), Ext.onReady(function() {
    var e;
    Ext.Date && (Ext.Date.monthNames = [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ], 
    Ext.Date.dayNames = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ], Ext.Date.formatCodes.a = "(this.getHours() < 12 ? '上午' : '下午')", 
    Ext.Date.formatCodes.A = "(this.getHours() < 12 ? '上午' : '下午')", e = {
        g: 1,
        c: "if (/(上午)/i.test(results[{0}])) {\nif (!h || h == 12) { h = 0; }\n} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
        s: "(上午|下午)",
        calcAtEnd: !0
    }, Ext.Date.parseCodes.a = Ext.Date.parseCodes.A = e, Ext.Date.defaultFormat = "Y-m-d"), 
    Ext.util && Ext.util.Format && Ext.apply(Ext.util.Format, {
        thousandSeparator: ",",
        decimalSeparator: ".",
        currencySign: "¥",
        dateFormat: "Y-m-d"
    });
}), Ext.define("Ews.locale.zh_CN.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "读取中..."
}), Ext.define("Ews.locale.zh_CN.view.grid.Panel", {
    override: "Ews.view.grid.Panel",
    locale: {
        "default": {
            form: {
                title: "表单"
            },
            search_form: {
                title: "搜索",
                submit_btn: {
                    text: "搜索"
                }
            },
            add_form: {
                title: "新增",
                submit_btn: {
                    text: "新增"
                }
            },
            edit_form: {
                title: "修改",
                submit_btn: {
                    text: "修改"
                }
            },
            reset_btn: {
                text: "重置"
            },
            cancel_btn: {
                text: "取消"
            },
            auto_sync_btn: {
                text: "自动保存"
            },
            C: {
                text: "新增"
            },
            R: {
                text: "搜索"
            },
            U: {
                text: "修改"
            },
            D: {
                text: "删除"
            },
            confirm: {
                "delete": {
                    title: "删除提示",
                    message: "您确定要删除么？ $1"
                }
            }
        }
    }
}), Ext.define("Ext.locale.zh_CN.picker.Date", {
    override: "Ext.picker.Date",
    format: "Y-m-d"
}), Ext.define("Ext.locale.zh_CN.form.field.Date", {
    override: "Ext.form.field.Date",
    format: "Y-m-d",
    defaultFormat: "Y-m-d"
}), Ext.define("Ext.locale.zh_CN.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    format: "Y-m-d"
});