<?php

header('Content-Type: text/plain');

include('../config.php');

$handle = fopen('php://input','r');
$jsonInput = fgets($handle);
$R = json_decode($jsonInput, true);

$dive = Dive::find($R['id']);

$dive->delete();

print '{"success":true}';

// $total_time = (strtotime($R['time_out']) - strtotime($R['time_in'])) / 60;
// $dive_date = explode('T', $R['dive_date']);
// $dive_date = $dive_date[0];

// $dive = Dive::create(array(
//     'dive_date' => $R['dive_date'],
//     'country_id' => $R['country_id'],
//     'objective_id' => $R['objective_id'],
//     'location' => $R['location'],
//     'site' => $R['site'],
//     'total_time' => $total_time,
//     'max_depth' => $R['max_depth'],
//     'pg_start' => $R['pg_start'],
//     'pg_end' => $R['pg_end'],
//     'time_in' => $dive_date .' '. $R['time_in'],
//     'time_out' => $dive_date .' '. $R['time_out']
// ));
// 
// $data = $dive->to_json(array(
//     'include' => array('country')
// ));
// 
// print '{"success":true, data:['.$data.']}';

?>