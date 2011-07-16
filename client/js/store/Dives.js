Ext.define('CB.store.Dives', {
    extend: 'Ext.data.Store',
    model: 'CB.model.Dive',
    autoLoad: true,
    remoteSort: true,
    sorters: [{property: 'dive_date', direction: 'DESC'}],
    proxy: {
        type: 'ajax',
        api: {
            read: 'server/views/Dives.php',
            create: 'server/controllers/createDives.php',
            update: 'server/controllers/updateDives.php'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});
