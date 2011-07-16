<?php

header('Content-Type: text/plain');

include('../config.php');

$R =& $_REQUEST;

$order = 'dive_date desc';

if (isset($R['sort'])) {
    $order = array();
    $R['sort'] = json_decode($R['sort'], true);
    foreach ($R['sort'] as $col) {
        $order[] = $col['property'] .' '. $col['direction'];
    }
    $order = implode(',', $order);
}

$options = array(
    'include' => array('country'),
    // 'joins' => array('country'),
    'limit' => $R['limit'],
    'offset' => $R['start'],
    'order' => $order
);
$dives = Dive::find('all', $options);

$i = 0;
$data = array();
foreach ($dives as $dive) {

    if (($date = $dive->dive_date) === null)
        $date = array('date' => null);

    $data[] = array(
        'id' => $dive->id,
        'dive_date' => $date,
        'location' => $dive->location,
        'site' => $dive->site,
        'max_depth' => $dive->max_depth,
        'total_time' => $dive->total_time,
        'time_in' => $dive->time_in,
        'time_out' => $dive->time_out,
        'pg_start' => $dive->pg_start,
        'pg_end' => $dive->pg_end,
        'country_id' => $dive->country_id,
        'objective_id' => $dive->objective_id,
        'country' => array(
            'id' => $dive->country_id,
            'name' => $dive->country_name
        )
    );
}

print '{"success":true, data:'. json_encode($data) .'}';

?>