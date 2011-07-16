<?php

header('Content-Type: text/plain');

include('../config.php');

$handle = fopen('php://input','r');
$jsonInput = fgets($handle);
$R = json_decode($jsonInput, true);

$dive = Dive::create(array(
    'dive_date' => $R['dive_date'],
    'country_id' => $R['country_id'],
    'objective_id' => $R['objective_id'],
    'location' => $R['location'],
    'site' => $R['site'],
    'total_time' => (strtotime($R['time_out']) - strtotime($R['time_in'])) / 60,
    'max_depth' => $R['max_depth'],
    'pg_start' => $R['pg_start'],
    'pg_end' => $R['pg_end'],
    'time_in' => $R['time_in'],
    'time_out' => $R['time_out']
));

if (($date = $dive->dive_date) === null)
    $date = array('date' => null);

$dive = array(
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

print '{"success":true, data:['.json_encode($dive).']}';

?>