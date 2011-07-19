var yopmap;
Ext.define('CB.view.dive.Edit', {

    extend: 'Ext.form.Panel',

    alias : 'widget.diveedit',

    requires: ['Ext.ux.GMapFieldContainer', 'Ext.ux.PgPanel'],

    title : 'Edit Dive',

    layout: 'anchor',

    defaults: {
        anchor: '100%',
        labelWidth: 50
    },

    autoScroll: true,

    bodyPadding: '10',

    initComponent: function() {

        Ext.define('Country', {
            extend: 'Ext.data.Model',
            fields: ['id', 'name']
        });

        Ext.define('Objective', {
            extend: 'Ext.data.Model',
            fields: ['id', 'name']
        });

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: ['->', {
                text: 'Save',
                // formBind: true,
                disabled: true,
                action: 'save'
            }, {
                text: 'Cancel',
                scope: this,
                disabled: true,
                handler: this.close
            }]
        }];

        // var map = yopmap = Ext.create('Ext.form.FieldContainer', {
        //         // The body area will contain three text fields, arranged
        //         // horizontally, separated by draggable splitters.
        //         layout: 'hbox',
        //         items: [{
        //             xtype: 'textfield',
        //             flex: 1
        //         }, {
        //             xtype: 'panel',
        //             height: 200,
        //             margin: '0 0 0 5',
        //             layout: 'fit',
        //             flex: 2,
        //             items: [{
        //                 xtype: 'gmappanel'
        //                 // zoomLevel: 14,
        //                 // gmapType: 'map',
        //                 // mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
        //                 // mapControls: ['GSmallMapControl','GMapTypeControl','NonExistantControl'],
        //                 // setCenter: {
        //                 //     geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA',
        //                 //     marker: {title: 'Fenway Park'}
        //                 // },
        //                 // markers: [{
        //                 //     lat: 42.339641,
        //                 //     lng: -71.094224,
        //                 //     marker: {title: 'Boston Museum of Fine Arts'},
        //                 //     listeners: {
        //                 //         click: function(e){
        //                 //             Ext.Msg.alert({title: 'Its fine', text: 'and its art.'});
        //                 //         }
        //                 //     }
        //                 // },{
        //                 //     lat: 42.339419,
        //                 //     lng: -71.09077,
        //                 //     marker: {title: 'Northeastern University'}
        //                 // }]
        //             }]
        //         }]
        // });

        this.items = [{
            xtype: 'gmapfieldcontainer'
        }, {
            // xtype: 'fieldcontainer',
            // border: false,
            // layout: 'hbox',
            // defaults: {
            //     flex: 1,
            //     labelWidth: 50,
            //     margin: '0 0 3 10'
            // },
            // items: [{
            //     xtype: 'combobox',
            //     name: 'country_id',
            //     allowBlank: false,
            //     margin: '0 0 3 0',
            //     fieldLabel: 'Country',
            //     displayField: 'name',
            //     valueField: 'id',
            //     hideTrigger: true,
            //     typeAhead: false,
            //     pageSize: 10,
            //     minChars: 2,
            //     listConfig: {
            //         loadingText: 'Searching...',
            //         emptyText: 'No matching countries found.'
            //     },
            //     store: new Ext.data.Store({
            //         pageSize: 10,
            //         model: 'Country',
            //         proxy: {
            //             type: 'ajax',
            //             url: 'server/views/Countries.php',
            //             reader: {
            //                 type: 'json',
            //                 root: 'data',
            //                 totalProperty: 'total',
            //                 successProperty: 'success'
            //             }
            //         }
            //     })
            // }, {
            //     xtype: 'textfield',
            //     name : 'location',
            //     fieldLabel: 'Location'
            // }, {
            //     xtype: 'textfield',
            //     name : 'site',
            //     fieldLabel: 'Dive site'
            // }]
        // }, {
        //     xtype: 'fieldcontainer',
        //     border: false,
        //     layout: 'hbox',
        //     defaults: {
        //         flex: 1,
        //         labelWidth: 50,
        //         margin: '0 0 3 10'
        //     },
        //     items: [{
        //         xtype: 'datefield',
        //         name : 'dive_date',
        //         margin: '0 0 3 0',
        //         format: 'm/d/Y',
        //         altFormats: 'c',
        //         submitFormat: 'c',
        //         // anchor: '0',
        //         maxWidth: 150,
        //         allowBlank: false,
        //         fieldLabel: 'Date'
        //     }, {
        //         xtype: 'combobox',
        //         name: 'objective_id',
        //         fieldLabel: 'Objective',
        //         displayField: 'name',
        //         valueField: 'id',
        //         maxWidth: 250,
        //         labelWidth: 55,
        //         queryMode: 'local',
        //         store: new Ext.data.Store({
        //             autoLoad: true,
        //             model: 'Objective',
        //             proxy: {
        //                 type: 'ajax',
        //                 url: 'server/views/Objectives.php',
        //                 reader: {
        //                     type: 'json',
        //                     root: 'data',
        //                     totalProperty: 'total',
        //                     successProperty: 'success'
        //                 }
        //             }
        //         })
        //     }]
        // }, {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items:[{
                xtype: 'fieldcontainer',
                flex: 1,
                // layout: 'vbox',
                items:[{
                    xtype: 'displayfield',
                    name : 'total_time',
                    labelWidth: 30,
                    maxWidth: 200,
                    fieldLabel: 'Total time'
                }, {
                    xtype: 'numberfield',
                    name : 'max_depth',
                    margin: '0 0 3 0',
                    maxWidth: 120,
                    fieldLabel: 'Max depth'
                }]
            }, {
                xtype: 'pgpanel',
                margin: '0 0 0 5',
                flex: 2
            }]            
        
        }];

        this.callParent(arguments);
    }
});