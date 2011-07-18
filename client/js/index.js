Ext.Loader.setPath('Ext.ux', 'client/js/ux');

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
                region: 'north',
                height: 50,
                html: CB.user.NAME
            }, {
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
