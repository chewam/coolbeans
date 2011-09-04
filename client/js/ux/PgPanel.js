Ext.define('Ext.ux.PgPanel', {

    extend: 'Ext.form.Panel',

    alias: 'widget.pgpanel',

    bodyPadding: '10 10 0 10',

    levelStartIndex: 1,

    // pollForChanges: true,

    initComponent : function() {

        this.items = [{
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox'
            },
            fieldDefaults: {
                labelAlign: 'top',
                labelWidth: 50,
                margin: '0 0 0 5'
            },
            items: [{
                fieldLabel: 'PG start',
                xtype: 'displayfield',
                margin: '0 0 0 15',
                submitValue: true,
                width: 50,
                name: 'pg_start',
                value: 0
            }, {
                fieldLabel: 'Time in',
                width: 60,
                name: 'time_in',
                format: 'H:i',
                altFormats: 'c',
                submitFormat: 'H:i:s',
                increment: 30,
                xtype: 'timefield',
                listeners: {
                    scope: this,
                    change: this.handleValuesChange
                }
            }, {
                fieldLabel: 'Time out',
                width: 60,
                name: 'time_out',
                margin: '0 0 0 50',
                submitValue: true,
                xtype: 'displayfield',
                value: ""
            }, {
                fieldLabel: 'PG end',
                width: 50,
                name: 'pg_end',
                submitValue: true,
                xtype: 'displayfield',
                value: ""
            }]
        }, {
            layout: 'hbox',
            border: false,
            items:[{
                height: 100,
                border: false,
                layout: {
                    type: 'vbox'
                },
                items:[{
                    xtype: 'button',
                    tooltip: 'Add level',
                    iconCls: 'icon-add',
                    margin: '4 3 0 0',
                    scope: this,
                    handler: this.addLevel
                }, {
                    xtype: 'button',
                    tooltip: 'Delete last level',
                    iconCls: 'icon-delete',
                    margin: '3 3 0 0',
                    scope: this,
                    handler: this.deleteLevel
                }]
            }, {
                flex: 1,
                border: false,
                id: 'fieldsetcontainer',
                items: [this.getLevelConfig()]
            }]
        }];

        this.callParent();

        

    },

    afterRender: function() {
        this.callParent();
        console.log("afterRender", this, arguments);
        // this.startChangePolling();
        this.form.on('dirtychange', function() {
            console.log("dirtychange", this, arguments);
        });
    },

    startChangePolling: function() {
        var task = Ext.create('Ext.util.TaskRunner', 2000);
        task.start({
            interval: 0,
            scope: this,
            run: this.checkFieldChanges
        });
        // this.pollTask = task;
    },

    checkFieldChanges: function() {
        var values = this.form.getValues(true, true, true);
        if (values.length) {
            values = Ext.urlDecode(values);
            console.log("values", values, values.length);
        }
    },

    getLevelConfig: function(data) {
        return {
            xtype:'fieldset',
            width: 335,
            title: 'Level ' + this.levelStartIndex,
            items:[{
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox'
                },
                defaults: {
                    listeners: {
                        scope: this,
                        change: this.handleValuesChange
                    }
                },
                items: [{
                    fieldLabel: 'Time (minutes)',
                    width: 145,
                    autoStripChars: true,
                    decimalPrecision: 0,
                    labelWidth: 90,
                    minValue: 0,
                    xtype: 'numberfield',
                    name: 'btime',
                    value: data ? data.time : undefined
                }, {
                    fieldLabel: 'Depth (meters)',
                    width: 145,
                    labelWidth: 90,
                    margin: '0 0 0 10',
                    xtype: 'numberfield',
                    minValue: 0,
                    name: 'pp_depth',
                    value: data ? data.depth : undefined
                }]
            }]
        };
    },

    addLevel: function() {
        this.levelStartIndex++;
        this.down('#fieldsetcontainer').add(this.getLevelConfig());
    },

    deleteLevel: function() {
        var fieldsets = this.query('fieldset');
        var l = fieldsets.length;
        if (l > 1) {
            this.levelStartIndex--;
            var last = fieldsets[l-1];
            last.ownerCt.remove(last);
        }
    },

    handleValuesChange: function(field, newValue, oldValue) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(Ext.bind(this.updateTimeAndPg, this), 500);
    },

    updateTimeAndPg: function() {
        if (this.timeout) delete this.timeout;
        this.updateTimeOut();
        this.updatePg();
    },

    updateTimeOut: function() {
        var fields,
            total_time = 0,
            fieldsets = this.query('fieldset');

        for (var i = 0, l = fieldsets.length; i < l; i++) {
            fields = fieldsets[i].query('numberfield');
            total_time += parseInt(fields[0].getValue());
        }

        if (total_time > 0) {
            var time_in = this.down('timefield[name="time_in"]').getValue();
            var dt = Ext.Date.add(time_in, Ext.Date.MINUTE, total_time);
            this.down('displayfield[name="time_out"]').setValue(Ext.Date.format(dt, 'H:i'));
        }
    },

    updatePg: function() {
        var data = [],
            fields, time, depth,
            fieldsets = this.query('fieldset');

        for (var i = 0, l = fieldsets.length; i < l; i++) {
            fields = fieldsets[i].query('numberfield');
            time = parseInt(fields[0].getValue());
            depth = parseInt(fields[1].getValue());
            if (time > 0 && depth > 0) {
                data.push({
                    time: time,
                    depth: depth
                });
            } else break;
        }

        if (data.length) {
            this.getPg(data);
        }
    },

    getPg: function(data) {
        var last_time_out = this.down('#previousdive displayfield[fieldLabel="Time out"]');
        var last_pg_end = this.down('#previousdive displayfield[fieldLabel="PG end"]');
        var time_in = this.down('timefield[name="time_in"]');
        console.log("getpg", time_in.getValue());
        Ext.Ajax.request({
            url: 'server/views/PressureGroups.php',
            params: Ext.encode({
                time_in: time_in ? Ext.Date.format(time_in.getValue(), 'H:i') : undefined,
                last_time_out: last_time_out ? last_time_out.getValue() : undefined,
                last_pg_end: last_pg_end ? last_pg_end.getValue() : undefined,
                levels: data
            }),
            scope: this,
            callback: function(options, success, response) {
                if (success) {
                    var json = Ext.decode(response.responseText);
                    this.down('displayfield[name="pg_end"]').setValue(json.pg);
                    this.fireEvent('pgchange', this, data, json.pg);
                    // console.log("callback", json);
                }
            }
        });
    },

    updateLevels: function(data) {
        console.log("updateLevels", this, arguments);
        this.levelStartIndex = 1;
        var fieldsets = this.query('fieldset');
        for (var i = 0, l = fieldsets.length; i < l; i++) {
            fieldsets[i].ownerCt.remove(fieldsets[i]);
        }
        if (data) {
            for (var i = 0, l = data.length; i < l; i++) {
                if (i > 0) this.levelStartIndex++;
                this.down('#fieldsetcontainer').add(this.getLevelConfig(data[i]));
            }
        } else {
            this.down('#fieldsetcontainer').add(this.getLevelConfig());
        }
    },

    updatePreviousDive: function(data) {
        var panel = this.down('#previousdive');
        if (panel) this.remove(panel);
        if (data) {
            this.insert(0, this.getPreviousDiveConfig(data));
        }
    },

    getPreviousDiveConfig: function(data) {
        return [{
            xtype: 'fieldcontainer',
            margin: '0 0 20 0',
            id: 'previousdive',
            layout: {
                type: 'hbox'
            },
            fieldDefaults: {
                labelAlign: 'top',
                labelWidth: 50,
                margin: '0 0 0 5'
            },
            items: [{
                fieldLabel: 'PG start',
                xtype: 'displayfield',
                margin: '0 0 0 15',
                width: 50,
                value: data.pg_start
            }, {
                fieldLabel: 'Time in',
                width: 60,
                xtype: 'displayfield',
                value: data.time_in
            }, {
                fieldLabel: 'Time out',
                width: 60,
                margin: '0 0 0 50',
                xtype: 'displayfield',
                value: data.time_out
            }, {
                fieldLabel: 'PG end',
                width: 50,
                xtype: 'displayfield',
                value: data.pg_end
            }, {
                fieldLabel: 'Interval',
                width: 50,
                xtype: 'displayfield',
                value: data.interval_time
            }]
        }];
    }

});

