<?php

header('Content-Type: text/plain');

include('../config.php');

$handle = fopen('php://input','r');
$jsonInput = fgets($handle);
$R = json_decode($jsonInput, true);

$dive = Dive::find($R['id']);

$total_time = (strtotime($R['time_out']) - strtotime($R['time_in'])) / 60;

$dive->dive_date = $R['dive_date'];
$dive->country_id = $R['country_id'];
$dive->objective_id = $R['objective_id'];
$dive->location = $R['location'];
$dive->site = $R['site'];
$dive->total_time = $total_time;
$dive->max_depth = $R['max_depth'];

$dive_date = explode('T', $R['dive_date']);
$dive_date = $dive_date[0];

$dive->time_in = $dive_date .' '. $R['time_in'];
$dive->time_out = $dive_date .' '. $R['time_out'];

$prevs = Dive::find('all', array(
    'offset' => 0,
    'limit' => 1,
    'order' => 'dive_date desc, time_in desc',
    'conditions' => 'dive_date <= "'. $R['dive_date'] .'" AND time_out < "'.$dive_date .' '. $R['time_in'].'" AND TIME_TO_SEC(TIMEDIFF("'.$dive_date .' '. $R['time_in'].'", time_out)) < (6 * 60 * 60)'
));

// PG CALC
if (!$prevs) {
    $dive->pg_start = '0';
} else {
    foreach ($prevs as $prev) {
        if (strlen($prev->pg_end)) {
            $pg_start = 'TO CALCULATE';
        } else {
            $pg_start = '0';
        }
        $dive->pg_start = $pg_start;
    }
}

$pg_ends = PressureGroup::find('all', array(
    'offset' => 0,
    'limit' => 1,
    'conditions' => 'oxygen = 21 AND depth >= '. $R['max_depth'] .' AND btime >= ' . $total_time
));
foreach ($pg_ends as $pg_end) {
    $dive->pg_end = $pg_end->pg;
}

$dive->save();

$data = $dive->to_json(array(
    'include' => array('country')
));

print '{"success":true, data:['.$data.']}';

?>