<?php

session_start();
header('Content-Type: text/plain');
include('../config.php');
include('../functions.php');

$S =& $_SESSION;
$U = getUser($S['openid']);
$R = getRequest();

// var_dump($R);

$dive = Dive::find(array(
    'conditions' => array('id = ? AND user_id = ?', $R['id'], $U->id)
));

// var_dump($dive);

$dive->total_time = getTotalTime($R['time_in'], $R['time_out']);
$dive->time_in = getTimeIn($R['dive_date'], $R['time_in']);
$dive->time_out = getTimeOut($R['dive_date'], $R['time_out']);
$dive->dive_date = $R['dive_date'];
$dive->country = $R['country'];
$dive->lat = $R['lat'];
$dive->lng = $R['lng'];
$dive->objective_id = $R['objective_id'];
$dive->location = $R['location'];
$dive->site = $R['site'];
$dive->max_depth = $R['max_depth'];
$dive->pg_start = getStartPressureGroup($dive);
$dive->pg_end = getEndPressureGroup($dive);

$dive->save();

$data = $dive->to_json(/*array(
    'include' => array('country')
)*/);

print '{"success":true, data:['.$data.']}';

?>