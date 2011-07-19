Ext.define('Ext.ux.PgPanel', {

    extend: 'Ext.form.Panel',

    alias: 'widget.pgpanel',

    bodyPadding: '10 10 0 10',

    levelStartIndex: 1,

    pollForChanges: true,

    initComponent : function() {

        // Ext.apply(Ext.form.field.VTypes, {
        //     pgpanel: Ext.bind(this.handleFielValidation, this)
        // });

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
                xtype: 'timefield'
            }, {
                fieldLabel: 'Time out',
                width: 60,
                name: 'time_out',
                margin: '0 0 0 50',
                // format: 'H:i',
                // altFormats: 'c',
                // submitFormat: 'H:i:s',
                // increment: 30,
                submitValue: true,
                xtype: 'displayfield'
            }, {
                fieldLabel: 'PG end',
                width: 50,
                name: 'pg_end',
                submitValue: true,
                xtype: 'displayfield'
            }]
        }, {
            layout: 'hbox',
            border: false,
            items:[{
                height: 100,
                // width: 60,
                border: false,
                layout: {
                    type: 'vbox'
                    // align: 'center'
                },
                items:[{
                    xtype: 'button',
                    tooltip: 'Add level',
                    iconCls: 'icon-add',
                    margin: '4 3 0 0',
                    // height: 23,
                    // width: 23,
                    scope: this,
                    handler: this.addLevel
                }, {
                    xtype: 'button',
                    tooltip: 'Delete last level',
                    iconCls: 'icon-delete',
                    margin: '3 3 0 0',
                    // margin: '9 0 0 5',
                    // height: 23,
                    // width: 23,
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

        // this.on('fielderrorchange', function() {
        //     console.log("fielderrorchange", this, arguments);
        // });
        // 
        // this.on('fieldvaliditychange', function() {
        //     console.log("fieldvaliditychange", this, arguments);
        // });
        // 
        // this.getForm().on('validitychange', function() {
        //     console.log("validitychange", this, arguments);
        // })

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
                    // pack: 'start',
                    // align: 'left'
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
                    // vtype: 'pgpanel'
                }, {
                    fieldLabel: 'Depth (meters)',
                    width: 145,
                    labelWidth: 90,
                    margin: '0 0 0 10',
                    xtype: 'numberfield',
                    minValue: 0,
                    name: 'pp_depth',
                    value: data ? data.depth : undefined
                    // vtype: 'pgpanel'
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

    // handleFielValidation: function() {
    //     if (this.timeout) clearTimeout(this.timeout);
    //     this.timeout = setTimeout(Ext.bind(this.calculatePg, this), 2000);
    //     return true;
    // },

    handleValuesChange: function(field, newValue, oldValue) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(Ext.bind(this.calculatePg, this), 500);
    },

    calculatePg: function() {
        if (this.timeout) delete this.timeout;

        var fields, time, depth,
            data = [], total_time = 0,
            storeLevels = true,
            fieldsets = this.query('fieldset');

        for (var i = 0, l = fieldsets.length; i < l; i++) {
            fields = fieldsets[i].query('numberfield');
            time = parseInt(fields[0].getValue());
            depth = parseInt(fields[1].getValue());
            total_time += time;
            if (storeLevels && time > 0 && depth > 0) {
                data.push({
                    time: time,
                    depth: depth
                });
            } else storeLevels = false;
        }

        if (data.length) {
            this.getPg(data);
        }

        if (total_time > 0) {
            this.updateTimeOut(total_time);
        }

        // var values = this.getValues();
        // if (values.time_in && values.pp_time) {
        //     this.calculateTimeOut();
        // }
        // console.log("calculatePg", this, values, values.pp_pg_start, values.time_in, values.btime, values.pp_depth);
        // if (/*values.pp_pg_start && values.time_in && */values.btime && values.pp_depth) {
        //     this.getPg({
        //         // pg_start: values.pp_pg_start,
        //         // time_in: values.time_in,
        //         btime: values.btime,
        //         depth: values.pp_depth
        //     });
        // }
    },

    updateTimeOut: function(time) {
        var time_in = this.down('timefield[name="time_in"]').getValue();
        // var dt = new Date(time_in);
        dt = Ext.Date.add(time_in, Ext.Date.MINUTE, time);
        this.down('displayfield[name="time_out"]').setValue(Ext.Date.format(dt, 'H:i'));
        // console.log("updateTimeOut", this, arguments, time_in, dt);
    },

    // calculateTimeOut: function() {
    //     console.log("calculateTimeOut", this, arguments);
    // },

    getPg: function(data) {
        // console.log("getPg", this, arguments);
        Ext.Ajax.request({
            url: 'server/views/PressureGroups.php',
            params: Ext.encode(data),
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

});

