var CC;

Ext.define('CB.controller.Dives', {

    extend: 'Ext.app.Controller',

    views: [
        'dive.List',
        'dive.Edit'
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
            'diveedit button[action=save]': {
                click: this.updateDive
            },
            'diveedit': {
                render: this.onEditRender 
            }
        });
    },

    onListRender: function(form) {
        this.listView = form;
    },

    onEditRender: function(form) {
        this.editView = form;
    },

    updateDive: function(button) {
        var record = this.editView.getRecord(),
            values = this.editView.getValues();
        console.log("updateDive", record, values);
        record.set(values);
        this.getDivesStore().sync();
        // record.commit();
    },

    editDive: function(grid, records) {
        console.log("editEdive", this, arguments);
        if (records.length) {
            var record = records[0];
            this.editView.enable();
            console.log("YOP", this.editView.down('combobox'), record.get('country'));
            this.editView.down('combobox').store.add(record.get('country'));
            this.editView.loadRecord(record);
            this.activeRecordIndex = this.getDivesStore().indexOf(record);
        } else if (this.activeRecordIndex !== false) {
            console.log("select", this, arguments);
            this.editView.down('combobox').store.removeAll();
            this.listView.getView().select(this.activeRecordIndex);
        }
    }

});