var CC;

Ext.define('CB.controller.Dives', {

    extend: 'Ext.app.Controller',

    views: [
        'dive.List',
        'dive.Edit',
        'dive.Map'
    ],

    stores: [
        'Dives'
    ],

    models: [
        'Dive'
    ],

    init: function() {
        CC = this;
        this.activeRecordIndex = false;

        this.control({
            'divelist': {
                render: this.onListRender,
                selectionchange: this.editDive
            },
            'divelist button[action=add]': {
                click: this.addDive
            },
            'divelist button[action=delete]': {
                click: this.deleteDive
            },
            'diveedit toolbar button[action=save]': {
                click: this.updateDive
            },
            'diveedit': {
                render: this.onEditRender 
            },
            'divemap': {
                render: this.onMapRender 
            }
        });
        
        this.getDivesStore().on('load', function(store) {
            if (this.listView && store.getCount()) {
                this.listView.getView().select(0);
            }
        }, this);
    },

    onMapRender: function(map) {
        this.mapView = map;
    },

    onListRender: function(grid) {
        this.listView = grid;
    },

    onEditRender: function(form) {
        this.editView = form;
    },

    addDive: function() {
        var rec = new CB.model.Dive({
            dive_date: '',
            country_id: ''
        });
        this.getDivesStore().insert(0, rec);
        this.listView.getView().select(0);
    },

    updateDive: function(button) {
        var form = this.editView.getForm();
        if (form.isValid()) {
            var record = this.editView.getRecord(),
                values = this.editView.getValues();
            record.set(values);
            this.getDivesStore().sync();
        } else {
            console.log("FORM INVALID", form);
        }
    },

    editDive: function(grid, records) {
        if (records.length) {
            var record = records[0],
                combo = this.editView.down('combobox[name="location"]');
            // this.editView.enable();
            // this.mapView.setCenter(record.get("location") + ', ' + record.get("country").name);
            combo.store.removeAll();
            combo.store.add({
                address: record.get('location'),
                lat: record.get('lat'),
                lng: record.get('lng'),
                country: record.get('country')
            });
            this.editView.loadRecord(record);
            this.editView.down('gmappanel').showLatLng({
                lat: record.get('lat'),
                lng: record.get('lng')
            });
            // console.log("COMBO", combo, combo.store, record.get('location'));
            // combo.setValue(record.get('location'));
            this.activeRecordIndex = this.getDivesStore().indexOf(record);
        } else if (this.activeRecordIndex !== false) {
            this.editView.down('combobox[name="location"]').store.removeAll();
            this.listView.getView().select(this.activeRecordIndex);
        }
    },

    deleteDive: function() {
        var form = this.editView.getForm();
        if (form.isValid()) {
            Ext.Msg.confirm('Delete Dive', 'Are you sure you want to delete this dive?',
                function (response) {
                    if (response === 'yes') {
                        var record = this.editView.getRecord();
                        this.getDivesStore().remove(record);
                        this.getDivesStore().sync();
                    }
                }
            , this);
        } else {
            console.log("FORM INVALID", form);
        }
    }

});