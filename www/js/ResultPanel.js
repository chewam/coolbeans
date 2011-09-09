Ext.ux.ResultPanel = Ext.extend(Ext.Panel, {

    bodyCls: 'result-panel',

    tpl: new Ext.XTemplate(
        '<div class="result-box {[ this.getBoxClass(values) ]}">',
            '{[ this.getEndPg(values) ]}',
        '</div>',
        {
            compiled: true,

            getBoxClass: function(data) {
                var cls = '';
                if (data.noDecompressionLimit) {
                    cls = 'result-box-ndl';
                } else if (data.safetyStop) {
                    cls = 'result-box-st';
                }
                return cls;
            },

            getEndPg: function(data) {
                return data.endPg === '' ? 0 : data.endPg;
            }

        }
    )

    // initComponent: function() {
    //     Ext.ux.ResultPanel.superclass.initComponent.apply(this, arguments);
    // }

});

Ext.reg('result-panel', Ext.ux.ResultPanel);
