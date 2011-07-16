<?php

header('Content-Type: text/plain');

include('../config.php');

$R =& $_REQUEST;

$options = array(
    'offset' => $R['start'],
    'limit' => $R['limit'],
    'order' => 'name asc',
    'conditions' => 'name LIKE "'. $R['query'] .'%"'
);
$countries = Country::find('all', $options);

$data = array();
foreach ($countries as $country)
    $data[] = $country->to_json();

$data = implode(',', $data);

print '{"success":true, data:['. $data .'], total:'. Country::count(array('conditions' => 'name LIKE "'. $R['query'] .'%"')) .'}';

?>