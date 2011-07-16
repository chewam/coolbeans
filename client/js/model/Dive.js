Ext.define('CB.model.Dive', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        {name: 'dive_date', type: 'date', mapping: 'dive_date.date'},
        'country', 'country_id', 'location', 'site', 'total_time', 'max_depth', 'pg_start', 'pg_end', 'time_in', 'time_out', 'objective_id'
    ]
});
