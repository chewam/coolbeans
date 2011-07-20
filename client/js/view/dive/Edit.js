var yopmap;
Ext.define('CB.view.dive.Edit', {

    extend: 'Ext.form.Panel',

    alias : 'widget.diveedit',

    requires: ['Ext.ux.GMapFieldContainer', 'Ext.ux.PgPanel', 'Ext.ux.statusbar'],

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
            xtype: 'statusbar',
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

        this.items = [{
            xtype: 'gmapfieldcontainer'
        }, {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items:[{
                xtype: 'fieldcontainer',
                flex: 1,
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