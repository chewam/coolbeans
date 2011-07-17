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

$options = array('order' => $order);

if (isset($R['limit'])) {
    $options['limit'] = $R['limit'];
}

if (isset($R['start'])) {
    $options['offset'] = $R['start'];
}   

$dives = Dive::find('all', $options);

foreach ($dives as $dive) {
    $data[] = $dive->to_json(array(
        'include' => array('country')
    ));
}

print '{"success":true, data:['. implode(',', $data) .']}';

?>