Ext.regModel('Result', {
    fields: ['oxygen', 'lastPg', 'levels', 'maxDepth', 'interval', 'startPg', 'rnt', 'endPg']
});

Ext.ux.ResultStore = new Ext.data.Store({
    model: 'Result',
    proxy: {
        type: 'scripttag',
        url : 'http://coolbeans.chewam.com/'
    }
});
