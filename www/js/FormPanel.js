Ext.ux.FormPanel = Ext.extend(Ext.form.FormPanel, {

    submitOnAction: true,

    depthFieldsetTitle: 'Depth (meters) : ',

    depthMinValue: 0,

    depthMaxValue: 42,

    durationFieldsetTitle: 'Duration (minutes) : ',

    durationMinValue: 0,

    durationMaxValue: 219,

    initComponent: function() {

        var depthField = {
            xtype: 'fieldset',
            title: this.depthFieldsetTitle + this.depthMinValue,
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
                    drag: this.onDepthDrag
                }
            }]
        };

        var durationField = {
            xtype: 'fieldset',
            title: this.durationFieldsetTitle + this.durationMinValue,
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
                    drag: this.onDurationDrag
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

    onDepthDrag: function(slider, thumb, value) {
        var depthFieldset = this.items.getAt(0);
        depthFieldset.setTitle(this.depthFieldsetTitle + value);
    },

    onDurationDrag: function(slider, thumb, value) {
        var durationFieldset = this.items.getAt(1);
        durationFieldset.setTitle(this.durationFieldsetTitle + value);
    },

    sendData: function() {
        Ext.ux.ResultStore.load({
            params: this.getValues()
        });
    },

    reset: function() {
        var depthFieldset = this.items.getAt(0);
        depthFieldset.setTitle(this.depthFieldsetTitle + 0);
        var durationFieldset = this.items.getAt(1);
        durationFieldset.setTitle(this.durationFieldsetTitle + 0);
        Ext.ux.FormPanel.superclass.reset.apply(this, arguments);
    }

});

Ext.reg('form-panel', Ext.ux.FormPanel);