Ext.define('CB.model.Dive', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        {name: 'dive_date', type: 'date'/*, mapping: 'dive_date.date'*/},
        // {name: 'time_in', type: 'date', mapping: 'time_in.date'},
        // {name: 'time_out', type: 'date', mapping: 'time_out.date'},
        'time_in', 'time_out',
        'country', 'country_id', 'location', 'site', 'total_time', 'max_depth', 'pg_start', 'pg_end', 'objective_id'
    ]
});
