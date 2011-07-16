Ext.application({

    name: 'CB',

    appFolder: 'client/js',

    controllers: [
        'Dives'
    ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [{
                region: 'west',
                width: 250,
                split: true,
                xtype: 'divelist'
            }, {
                region: 'center',
                xtype: 'tabpanel',
                activeTab: 0,
                items:[{
                    title: 'Log',
                    xtype: 'diveedit'
                }]
            }]
        });
    }

});
