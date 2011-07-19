Ext.define('Ext.ux.GMapFieldContainer', {

    extend: 'Ext.form.FieldContainer',

    alias: 'widget.gmapfieldcontainer',

    layout: {
        type: 'hbox'
        // align: 'stretch'
    },

    requires: ['Ext.ux.GMapPanel', 'Ext.ux.GeoCodeProxy'],

    initComponent : function() {

        Ext.define('Address', {
            extend: 'Ext.data.Model',
            fields: ['address', 'lat', 'lng', 'country']
        });

        this.items = [{
            xtype: 'fieldcontainer',
            height: 300,
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            fieldDefaults: {labelWidth: 60},
            items: [{
                xtype: 'combobox',
                labelAlign: 'top',
                margin: '0 0 1 0',
                fieldLabel: 'Location',
                displayField: 'address',
                valueField: 'address',
                hideTrigger: true,
                minChars: 3,
                allowBlank: false,
                name: 'location',
                listConfig: {
                    loadingText: 'Searching...',
                    emptyText: 'No matching locations found.'
                },
                store: new Ext.data.Store({
                    model: 'Address',
                    proxy: {
                        type: 'geocode',
                        reader: {type: 'json'}
                    }
                }),
                listeners: {
                    scope: this,
                    select: function(combo, records, options) {
                        var map = this.down('gmappanel');
                        map.showLatLng(records[0].data);
                        this.down('displayfield[fieldLabel="Country"]').setValue(records[0].data.country.name);
                        this.down('displayfield[fieldLabel="Latitude"]').setValue(records[0].data.lat);
                        this.down('displayfield[fieldLabel="Longitude"]').setValue(records[0].data.lng);
                    }
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Country',
                submitValue: true,
                labelWidth: 50,
                margin: '0 0 0 0',
                name: 'country'
            }, {
                xtype: 'textfield',
                labelAlign: 'top',
                name : 'site',
                margin: '10 0 1 0',
                fieldLabel: 'Dive site'
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Latitude',
                submitValue: true,
                decimalPrecision: 8,
                margin: '0 0 1 0',
                name: 'lat'
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Longitude',
                submitValue: true,
                decimalPrecision: 8,
                name: 'lng'
            }, {
                xtype: 'datefield',
                name : 'dive_date',
                margin: '10 0 3 0',
                format: 'm/d/Y',
                altFormats: 'c',
                submitFormat: 'c',
                maxWidth: 160,
                allowBlank: false,
                fieldLabel: 'Date'
            }, {
                xtype: 'combobox',
                name: 'objective_id',
                fieldLabel: 'Objective',
                displayField: 'name',
                valueField: 'id',
                maxWidth: 250,
                // labelWidth: 55,
                queryMode: 'local',
                store: new Ext.data.Store({
                    autoLoad: true,
                    model: 'Objective',
                    proxy: {
                        type: 'ajax',
                        url: 'server/views/Objectives.php',
                        reader: {
                            type: 'json',
                            root: 'data',
                            successProperty: 'success'
                        }
                    }
                })
            }]
        }, {
            xtype: 'panel',
            height: 300,
            margin: '0 0 0 5',
            layout: 'fit',
            flex: 2,
            border: false,
            items: [{
                xtype: 'gmappanel',
                listeners: {
                    scope: this,
                    markermove: this.onMarkerMove
                }
            }]
        }];

        this.callParent();
    },

    onMarkerMove: function(gmap, data) {
        console.log("onMarkerMove", this, arguments);
        this.down('displayfield[fieldLabel="Latitude"]').setValue(data.lat);
        this.down('displayfield[fieldLabel="Longitude"]').setValue(data.lng);
    }

});

