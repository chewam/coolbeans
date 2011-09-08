Ext.ux.MainPanel = Ext.extend(Ext.Panel, {

    layout: 'card',

    activeItem: 0,

    initComponent: function() {

        this.backButton = new Ext.Button({
            xtype: 'button',
            ui: 'back',
            text: 'back',
            hidden: true,
            scope: this,
            handler: this.onBack
        });

        this.dockedItems = [{
            dock: 'top',
            xtype: 'toolbar',
            title: 'RECREATIONAL DIVE PLANNER'
        }, {
            dock: 'bottom',
            xtype: 'toolbar',
            items: this.backButton
        }];

        this.items = [{
            xtype: 'form-panel',
            listeners: {
                scope: this,
                afterrender: this.onFormRender
            }
        }, {
            xtype: 'result-panel'
        }];

        Ext.ux.MainPanel.superclass.initComponent.apply(this, arguments);

        this.mon(Ext.ux.ResultStore, 'load', this.onResultLoad, this);

    },

    onResultLoad: function(store, records, success) {
        if (success) {
            var record = records[0],
                form = this.items.getAt(0),
                panel = this.items.getAt(1);

            panel.update(record.data);
            this.setActiveItem(1, 'flip');
            this.backButton.show();
            form.reset();
        }
    },

    onFormRender: function() {
        var el = Ext.getBody().down('.loadmask');
        if (el) Ext.Anim.run(el, 'fade', {
            after: Ext.createDelegate(el.remove, el)
        });
    },

    onBack: function() {
        this.backButton.hide();
        this.setActiveItem(0, 'flip');
    }

});
