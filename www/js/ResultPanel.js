Ext.ux.ResultPanel = Ext.extend(Ext.Panel, {

    bodyCls: 'result-panel',

    tpl: '<div class="result-box">{endPg}</div>'

    // initComponent: function() {
    //     Ext.ux.ResultPanel.superclass.initComponent.apply(this, arguments);
    // }

});

Ext.reg('result-panel', Ext.ux.ResultPanel);
