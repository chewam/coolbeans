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
            items: [{
                iconCls: 'icon-add',
                text: 'Add',
                scope: this,
                handler: this.onAddClick
            }, {
                iconCls: 'icon-delete',
                text: 'Delete',
                disabled: true,
                itemId: 'delete',
                scope: this,
                handler: this.onDeleteClick
            }]
        }];

        this.callParent(arguments);
    },

    onAddClick: function() {
        var rec = new CB.model.Dive({
            date: '',
            location: ''
        }), edit = this.editing;
        this.store.insert(0, rec);
        this.getView().select(0);
    }

});
