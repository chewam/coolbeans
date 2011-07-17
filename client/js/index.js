Ext.Loader.setPath('Ext.ux', '../../libs/ext-4.0.2a/examples/ux');

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
                width: 300,
                split: true,
                collapsible: true,
                xtype: 'divelist'
            }, {
                region: 'center',
                xtype: 'tabpanel',
                activeTab: 0,
                items:[{
                    title: 'Log',
                    xtype: 'diveedit'
                }, {
                    xtype: 'divemap'
                }, {
                    title: 'Access Plan',
                    disabled: true
                }, {
                    title: 'Prepare',
                    disabled: true
                }]
            }]
        });
    }

});
