Ext.Loader.setPath('Ext.ux', '../../libs/ext-4.0.2a/examples/ux');

Ext.application({

    name: 'CB',

    appFolder: 'client/js',

    controllers: [
        'Dives'
    ],

    launch: function() {
        if (CB.isLogin) {
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
        } else {
            new Ext.Panel({
                autoRender: true,
                autoShow: true,
                floating: true,
                html: '<iframe src="http://coolbeans.rpxnow.com/openid/embed?token_url=http%3A%2F%2Fhome.chewam.com%2Fpub%2Fcoolbeans%2Fserver%2Frpx.php" scrolling="no" frameBorder="no" allowtransparency="true" style="width:400px;height:240px"></iframe>'
            });
        }
    }

});
