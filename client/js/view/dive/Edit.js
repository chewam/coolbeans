Ext.define('CB.view.dive.Edit', {

    extend: 'Ext.form.Panel',

    alias : 'widget.diveedit',

    title : 'Edit Dive',

    layout: 'anchor',

    defaults: {
        anchor: '100%',
        labelWidth: 50
    },

    bodyPadding: '20',

    disabled: true,

    initComponent: function() {

        Ext.define('Country', {
            extend: 'Ext.data.Model',
            fields: ['id', 'name']
        });

        Ext.define('Objective', {
            extend: 'Ext.data.Model',
            fields: ['id', 'name']
        });

        this.items = [{
            xtype: 'fieldcontainer',
            border: false,
            layout: 'hbox',
            defaults: {
                flex: 1,
                labelWidth: 50,
                margin: '0 0 3 10'
            },
            items: [{
                xtype: 'combobox',
                name: 'country_id',
                margin: '0 0 3 0',
                fieldLabel: 'Country',
                displayField: 'name',
                valueField: 'id',
                hideTrigger: true,
                typeAhead: false,
                pageSize: 10,
                minChars: 2,
                listConfig: {
                    loadingText: 'Searching...',
                    emptyText: 'No matching countries found.'
                },
                store: new Ext.data.Store({
                    pageSize: 10,
                    model: 'Country',
                    proxy: {
                        type: 'ajax',
                        url: 'server/views/Countries.php',
                        reader: {
                            type: 'json',
                            root: 'data',
                            totalProperty: 'total',
                            successProperty: 'success'
                        }
                    }
                })
            }, {
                xtype: 'textfield',
                name : 'location',
                fieldLabel: 'Location'
            }, {
                xtype: 'textfield',
                name : 'site',
                fieldLabel: 'Dive site'
            }]
        }, {
            xtype: 'fieldcontainer',
            border: false,
            layout: 'hbox',
            defaults: {
                flex: 1,
                labelWidth: 50,
                margin: '0 0 3 10'
            },
            items: [{
                xtype: 'datefield',
                name : 'dive_date',
                margin: '0 0 3 0',
                // anchor: '0',
                maxWidth: 150,
                fieldLabel: 'Date'
            }, {
                xtype: 'combobox',
                name: 'objective_id',
                fieldLabel: 'Objective',
                displayField: 'name',
                valueField: 'id',
                maxWidth: 250,
                labelWidth: 55,
                // hideTrigger: true,
                // typeAhead: true,
                queryMode: 'local',
                // listConfig: {
                //     loadingText: 'Searching...',
                //     emptyText: 'No matching countries found.'
                // },
                store: new Ext.data.Store({
                    autoLoad: true,
                    model: 'Objective',
                    proxy: {
                        type: 'ajax',
                        url: 'server/views/Objectives.php',
                        reader: {
                            type: 'json',
                            root: 'data',
                            totalProperty: 'total',
                            successProperty: 'success'
                        }
                    }
                })
            }]
        }, {
            xtype:'fieldset',
            title: 'Level 1',
            items:[{
                xtype: 'fieldcontainer',
                border: false,
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    labelWidth: 50,
                    margin: '0 0 3 10'
                },
                items: [{
                    xtype: 'timefield',
                    margin: '0 0 3 0',
                    name : 'time_in',
                    format: 'H:i',
                    altFormats: 'H:i:s',
                    submitFormat: 'H:i',
                    increment: 30,
                    maxWidth: 120,
                    fieldLabel: 'Time in'
                }, {
                    xtype: 'timefield',
                    name : 'time_out',
                    format: 'H:i',
                    altFormats: 'H:i:s',
                    submitFormat: 'H:i',
                    increment: 30,
                    labelWidth: 55,
                    maxWidth: 120,
                    fieldLabel: 'Time out'
                }, {
                    xtype: 'displayfield',
                    name : 'total_time',
                    labelWidth: 30,
                    maxWidth: 200,
                    fieldLabel: 'Time'
                }]
            }, {
                xtype: 'fieldcontainer',
                border: false,
                layout: 'hbox',
                defaults: {
                    flex: 1,
                    labelWidth: 50,
                    margin: '0 0 3 10'
                },
                items: [{
                    xtype: 'numberfield',
                    name : 'max_depth',
                    margin: '0 0 3 0',
                    maxWidth: 120,
                    fieldLabel: 'Depth'
                }, {
                    xtype: 'displayfield',
                    name : 'pg_start',
                    labelWidth: 50,
                    maxWidth: 100,
                    fieldLabel: 'Start PG'
                }, {
                    xtype: 'displayfield',
                    name : 'pg_end',
                    labelWidth: 45,
                    maxWidth: 50,
                    fieldLabel: 'End PG'
                }]
            }]
        }];

        this.buttons = [
            {
                text: 'Save',
                action: 'save'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});