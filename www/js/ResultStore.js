Ext.regModel('Result', {
    fields: [
        {name: 'oxygen', type: 'number'},
        {name: 'lastPg', type: 'string'},
        {name: 'levels'},
        {name: 'maxDepth', type: 'number'},
        {name: 'interval', type: 'number'},
        {name: 'startPg', type: 'string'},
        {name: 'rnt', type: 'number'},
        {name: 'endPg', type: 'string'},
        {name: 'safetyStop', type: 'boolean'},
        {name: 'noDecompressionLimit', type: 'boolean'}
    ]
});

Ext.ux.ResultStore = new Ext.data.Store({
    model: 'Result',
    proxy: {
        type: 'scripttag',
        url : 'http://coolbeans.chewam.com/api/'
    }
});
