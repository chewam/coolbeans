Ext.define('CB.model.Dive', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        {name: 'dive_date', type: 'date', dateFormat: 'c'},
        {name: 'max_depth', type: 'int'},
        {name: 'time_out', convert: function(v, record) {
            var time_out;
            if (!v) return v;
            if (v.length === 5) {
                time_out = v + ':00';
            } else {
                var dt = new Date(v);
                time_out = Ext.Date.format(dt, 'H:i');
            }
            console.log("CONVERT", time_out, record, v);
            return time_out;
        }},
        'time_in', 'lat', 'lng',
        'country', 'location', 'site', 'total_time', 'pg_start', 'pg_end', 'objective_id', 'levels'
    ]
});
