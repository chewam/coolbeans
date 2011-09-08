Ext.regModel('Result', {
    fields: ['oxygen', 'lastPg', 'levels', 'maxDepth', 'interval', 'startPg', 'rnt', 'endPg']
});

Ext.ux.ResultStore = new Ext.data.Store({
    model: 'Result',
    proxy: {
        type: 'scripttag',
        url : 'http://192.168.1.13:3000/'
    }
});
