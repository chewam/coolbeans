Ext.define('CB.view.dive.List' ,{

    extend: 'Ext.grid.Panel',

    alias : 'widget.divelist',

    title : 'All Dives',

    store: 'Dives',

    initComponent: function() {
        this.columns = [
            Ext.create('Ext.grid.RowNumberer'),
            {header: 'Date',  dataIndex: 'dive_date', xtype: 'datecolumn', format: 'd/m/Y', resizable: false, width: 70},
            {header: 'Dive site', dataIndex: 'site', flex: 1},
            {header: 'Time',  dataIndex: 'total_time', resizable: false, width: 40, align: 'center'},
            {header: 'Depth',  dataIndex: 'max_depth', resizable: false, width: 40, align: 'center'},
        ];

        this.dockedItems = [{
            xtype: 'toolbar',
            items: ['->', {
                iconCls: 'icon-add',
                action: 'add',
                tooltip: 'Add a dive'
            }, {
                iconCls: 'icon-delete',
                action: 'delete',
                tooltip: 'Delete selected dive'
            }]
        }];

        this.callParent(arguments);

    }

});
