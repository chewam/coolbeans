var CC;

Ext.data.AbstractStore.override({
    sync: function(config) 
    {
        config = config || {};

        var defaults = {
            scope: this,
            callback: Ext.emptyFn
        }
        
        config = Ext.apply(defaults, config);

        var me        = this,
            options   = {},
            toCreate  = me.getNewRecords(),
            toUpdate  = me.getUpdatedRecords(),
            toDestroy = me.getRemovedRecords(),
            needsSync = false;

        if (toCreate.length > 0) {
            options.create = toCreate;
            needsSync = true;
        }

        if (toUpdate.length > 0) {
            options.update = toUpdate;
            needsSync = true;
        }

        if (toDestroy.length > 0) {
            options.destroy = toDestroy;
            needsSync = true;
        }

        if (needsSync && me.fireEvent('beforesync', options) !== false) {
            var batch = me.proxy.batch(options, me.getBatchListeners());
            
            batch.on('complete', Ext.bind(config.callback, config.scope, [this, options]), this, {single:true});
        }
    }
});

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
        this.enableAutoSave = true;
        
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
            'diveedit pgpanel timefield[name="time_in"]': {
                change: this.onFieldChange
            },
            'diveedit gmapfieldcontainer textfield[name="site"]': {
                change: this.onFieldChange
            },
            'diveedit gmapfieldcontainer datefield[name="dive_date"]': {
                change: this.onFieldChange
            },
            'diveedit gmapfieldcontainer combobox[name="location"]': {
                change: this.onFieldChange
            },
            'diveedit gmapfieldcontainer combobox[name="objective_id"]': {
                change: this.onFieldChange
            },
            'diveedit pgpanel': {
                pgchange: this.setLevels
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

    onFieldChange: function() {
        if (this.enableAutoSave) {
            console.log("onFieldChange", this, arguments);
            if (this.fieldChangeTimeout) clearTimeout(this.fieldChangeTimeout);
            this.fieldChangeTimeout = setTimeout(Ext.bind(this.updateDive, this), 3000);
        }
    },

    addDive: function() {
        var rec = new CB.model.Dive({
            dive_date: '',
            country_id: ''
        });
        this.getDivesStore().insert(0, rec);
        this.listView.getView().select(0);
    },

    setLevels: function(pgpanel, data, pg) {
        console.log("setLevels", this, arguments);
        var record = this.getDivesStore().getAt(this.activeRecordIndex);
        record.set('levels', data);
        this.onFieldChange();
    },

    updateDive: function(button) {
        if (this.fieldChangeTimeout) delete this.fieldChangeTimeout;
        var form = this.editView.getForm();
        if (form.isValid()) {
            this.editView.down('statusbar').showBusy();
            var record = this.editView.getRecord(),
                values = this.editView.getValues();
            record.set(values);
            this.getDivesStore().sync({
                scope: this,
                callback: function() {
                    this.editView.down('statusbar').clearStatus();
                }
            });
        } else {
            console.log("FORM INVALID", form);
        }
    },

    updateCombo: function(record) {
        var combo = this.editView.down('combobox[name="location"]');
        combo.store.removeAll();
        combo.store.add({
            address: record.get('location'),
            lat: record.get('lat'),
            lng: record.get('lng'),
            country: record.get('country')
        });
    },

    updateMap: function(record) {
        this.editView.down('gmappanel').showLatLng({
            lat: record.get('lat'),
            lng: record.get('lng')
        });
    },

    updateLevels: function(record) {
        this.editView.down('pgpanel').updateLevels(record.get('levels'));
    },

    updatePreviousDive: function(record) {
        this.editView.down('pgpanel').updatePreviousDive(record.get('previous_dive'));
    },

    editDive: function(grid, records) {
        if (records.length) {
            var record = records[0];
            this.enableAutoSave = false;
            this.updateCombo(record);
            this.updateLevels(record);
            this.updateMap(record);
            this.updatePreviousDive(record);
            this.editView.loadRecord(record);
            this.activeRecordIndex = this.getDivesStore().indexOf(record);
            this.enableAutoSave = true;
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