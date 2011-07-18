Ext.define('CB.model.Dive', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        {name: 'dive_date', type: 'date', dateFormat: 'c'},
        {name: 'max_depth', type: 'int'},
        'time_in', 'time_out', 'lat', 'lng',
        'country', 'location', 'site', 'total_time', 'pg_start', 'pg_end', 'objective_id'
    ]
});
