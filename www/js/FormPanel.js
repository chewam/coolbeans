Ext.ux.FormPanel = Ext.extend(Ext.form.FormPanel, {

    submitOnAction: true,

    depthMinValue: 0,

    depthMaxValue: 42,

    durationMinValue: 0,

    durationMaxValue: 219,

    durationTable: [
        [10, 219], [12, 147], [14, 98],
        [16, 72], [18, 56], [20, 45],
        [22, 37], [25, 29], [30, 20],
        [35, 14], [40, 9], [42, 8]
    ],

    depthFieldsetTitleTpl: new Ext.XTemplate(
        'Depth: {depth} {[values.depth > 1 ? "meters" : "meter"]}',
        {compiled: true}
    ),

    durationFieldsetTitleTpl: new Ext.XTemplate(
        'Duration: {duration} {[values.duration > 1 ? "minutes" : "minute"]}',
        {compiled: true}
    ),

    initComponent: function() {

        var depthField = {
            xtype: 'fieldset',
            title: this.depthFieldsetTitleTpl.apply({depth: this.depthMinValue}),
            items: [{
                name: 'depth',
                xtype: 'sliderfield',
                autoCorrect: false,
                autoComplete: false,
                useClearIcon: true,
                minValue: this.depthMinValue,
                maxValue: this.depthMaxValue,
                listeners: {
                    scope: this,
                    drag: this.onDepthChange,
                    change: this.onDepthChange
                }
            }]
        };

        var durationField = {
            xtype: 'fieldset',
            title: this.durationFieldsetTitleTpl.apply({duration: this.durationMinValue}),
            items: [{
                name: 'duration',
                xtype: 'sliderfield',
                autoCorrect: false,
                autoComplete: false,
                useClearIcon: true,
                minValue: this.durationMinValue,
                maxValue: this.durationMaxValue,
                listeners: {
                    scope: this,
                    drag: this.onDurationChange,
                    change: this.onDurationChange
                }
            }]
        };

        var buttons = {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            items: [{
                xtype: 'button',
                margin: '20 0 0 0',
                width: 200,
                text: 'OK',
                scope: this,
                handler: this.sendData
            }]
        };

        this.items = [depthField, durationField, buttons];

        this.onFieldAction = Ext.createDelegate(this.sendData, this);

        Ext.ux.FormPanel.superclass.initComponent.apply(this, arguments);

    },

    onDepthChange: function(slider, thumb, value) {
        var depthFieldset = this.items.first(),
            duration = this.getMaxDuration(value),
            title = this.depthFieldsetTitleTpl.apply({depth: value});

        depthFieldset.setTitle(title);
        this.updateDurationSlider(duration);
    },

    onDurationChange: function(slider, thumb, value) {
        var durationFieldset = this.items.getAt(1),
            title = this.durationFieldsetTitleTpl.apply({duration: value});

        durationFieldset.setTitle(title);
    },

    getMaxDuration: function(value) {
        var duration = 0,
            t = this.durationTable;
        for (var i = 0, l = t.length; i < l; i++) {
            if (!duration || value >= t[i][0]) {
                duration = t[i][1];
            }
        }
        return duration;
    },

    updateDurationSlider: function(duration) {
        var title,
            durationFieldset = this.items.getAt(1),
            slider = durationFieldset.items.first(),
            thumb = slider.getThumb();

        slider.maxValue = duration;

        if (thumb.dragObj) {
            thumb.dragObj.updateBoundary();
            duration = slider.constrain(thumb.getValue());
            title = this.durationFieldsetTitleTpl.apply({duration: duration});
            durationFieldset.setTitle(title);
            duration = slider.getPixelValue(duration, thumb);
            slider.moveThumb(thumb, duration, 0);
        }
    },

    sendData: function() {
        this.setLoading(true);
        Ext.ux.ResultStore.load({
            params: this.getValues(),
            callback: Ext.createDelegate(this.setLoading, this, [false], false)
        });
    },

    reset: function() {
        var title,
            depthFieldset = this.items.getAt(0),
            durationFieldset = this.items.getAt(1);

        title = this.durationFieldsetTitleTpl.apply({duration: 0});
        durationFieldset.setTitle(title);

        title = this.depthFieldsetTitleTpl.apply({depth: 0});
        depthFieldset.setTitle(title);

        Ext.ux.FormPanel.superclass.reset.apply(this, arguments);
    }

});

Ext.reg('form-panel', Ext.ux.FormPanel);