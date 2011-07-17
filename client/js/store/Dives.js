Ext.define('CB.store.Dives', {
    extend: 'Ext.data.Store',
    model: 'CB.model.Dive',
    autoLoad: true,
    remoteSort: true,
    sorters: [{property: 'dive_date', direction: 'DESC'}, {property: 'time_in', direction: 'DESC'}],
    proxy: {
        type: 'ajax',
        api: {
            read: 'server/views/Dives.php',
            create: 'server/controllers/createDives.php',
            update: 'server/controllers/updateDives.php',
            destroy: 'server/controllers/destroyDives.php',
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});
