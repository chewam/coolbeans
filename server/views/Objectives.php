<?php

header('Content-Type: text/plain');

include('../config.php');

$R =& $_REQUEST;

$options = array(
    'order' => 'id asc'
);
$objectives = Objective::find('all', $options);

$data = array();
foreach ($objectives as $objective)
    $data[] = $objective->to_json();

$data = implode(',', $data);

print '{"success":true, data:['. $data .']}';

?>