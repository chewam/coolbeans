Ext.define('CB.view.dive.Map', {
    extend: 'Ext.Panel',

    requires: ['Ext.ux.GMapPanel'],

    alias: 'widget.divemap',

    title : 'Map',

    layout: 'fit',

    border: false,

    initComponent : function() {

        // this.items = [{
        //     border: false,
            // xtype: 'gmappanel',
            // zoomLevel: 14,
            // gmapType: 'map',
            // mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
            // mapControls: ['GSmallMapControl','GMapTypeControl','NonExistantControl'],
            // setCenter: {
            //     geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA',
            //     marker: {title: 'Fenway Park'}
            // },
            // markers: [{
            //     lat: 42.339641,
            //     lng: -71.094224,
            //     marker: {title: 'Boston Museum of Fine Arts'},
            //     listeners: {
            //         click: function(e){
            //             Ext.Msg.alert({title: 'Its fine', text: 'and its art.'});
            //         }
            //     }
            // },{
            //     lat: 42.339419,
            //     lng: -71.09077,
            //     marker: {title: 'Northeastern University'}
            // }]
        // }];

        this.callParent(arguments);
    },

    setCenter: function(address) {
        // var map = this.down('gmappanel').geoCodeLookup(address);
    }
 
});