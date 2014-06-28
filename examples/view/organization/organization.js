Ext.require([
		'Ext.data.*',
		'Ext.grid.*',
		'Ext.tree.Panel',
		'Ews.*',
		'Ews.view.container.*'
	]);
var wsGrid, wsTree, centerContainer;
Ext.onReady(function() {
		initTree();
		initGrid();
		initViewport();
		Ext.log(wsGrid.region);
	});

function initTree() {
	var oStore = Ext.data.StoreManager.lookup('examples.store.oraganization.Files');
	wsTree = Ext.create('Ews.view.tree.Panel', {
			region: 'west',
			store: oStore,
			width: 200,
			columns: [{
					xtype: 'treecolumn',
					header: 'Files',
					dataIndex: 'text',
					flex: 1
				}
			]
		});
}

function initGrid() {
	/*Model*/
	/*Store*/
	var oStore = Ext.data.StoreManager.lookup('examples.store.organization.organization');
	var organizationColumns = [{
	    // id assigned so we can apply custom css (e.g. .x-grid-cell-topic b { color:#333 })
	    // TODO: This poses an issue in subclasses of Grid now because Headers are now Components
	    // therefore the id will be registered in the ComponentManager and conflict. Need a way to
	    // add additional CSS classes to the rendered cells.
	    text: "机构名称",
	    dataIndex: 'NAME',
	    flex: 1,
	    width:200,
	    renderer: formatName,
	    sortable: true
	},{
	    text: "ID",
	    dataIndex: 'ID',
	    width: 100,
	    hidden: true,
	    sortable: true
	},{
	    text: "分类",
	    dataIndex: 'CATEGORY',
	    width: 150,
	    align: 'center',
	    renderer: formatCategory,
	    sortable: true
	},{
		text: "创建时间",
		dataIndex: 'CREATE_DATE',
		width: 150,
		align: 'center',
		renderer: formatDate,
		sortable: true
	},{
	    text: "PID",
	    dataIndex: 'PID',
	    hidden: true
	}];
	/*View*/
	wsGrid = Ext.create('Ews.view.grid.Panel', {
			region: 'center',
			title: '机构管理',
			width: 500,
			height: 200,
			columns: organizationColumns,
			buttons: [{
					iconCls: 'fcat add-icon',
					text: 'add'
				}
			],
			store: oStore
		});
}

function initViewport() {
	centerContainer = Ext.create('Ews.container.Viewport', {
			layout: 'border',
			overflowX: 'scroll',
			title: 'Ext Layout Browser',
			items: [wsTree,wsGrid]
		});
}
/**格式化名称*/
function formatName(value, p, record) {
    return Ext.String.format('<b><a href="/organization/detail.do?id={1}" target="_blank">{0}</a></b>',value,record.getId());
}
/**格式化日期*/
function formatDate(value, p, r) {
    return Ext.Date.dateFormat(new Date(value), 'Y-m-d');
}
/**格式化分类*/
function formatCategory(value, p, r) {
	var str = "";
	if(value==1){
		str="政府机构"
	}else {
		str="企事业单位";
	}
	return str;
}
