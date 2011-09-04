<?php

session_start();
header('Content-Type: text/plain');
include('../config.php');
include('../functions.php');

$S =& $_SESSION;
$U = getUser($S['openid']);
$R = getRequest();

// $R['time_in']
// $R['last_time_out']
// $R['last_pg_end']

function getInterval($time_in, $last_time_out) {
    return 0;
}

function getPgStart($last_pg_end, $interval) {
    PressureInterval::find('all', array(
        'conditions' => 'oxygen = 21 AND pg_start = "'. $last_pg_end .'" AND time_min <= '. $interval .' AND time_max >= '. $interval
    ));
    return 'none';
}

function getResidualNitrogenTime() {
    return 0;
}

function getPgEnd($levels) {
    $pgs = array();
    foreach ($levels as $data) {
        $pg = PressureGroup::find('all', array(
            'offset' => 0,
            'limit' => 1,
            'conditions' => 'oxygen = 21 AND depth >= '. $data['depth'] .' AND btime >= ' . $data['time']
        ));
        $pgs[] = $pg[0]->pg;
    }

    $index = 0;
    foreach ($pgs as $pg) {
        $index += ord($pg) - 64;
    }

    return chr($index + 64);
}

$interval = getInterval($R['time_in'], $R['last_time_out']);
$pg_start = getPgStart($R['last_pg_end'], $interval);
$rnt = getResidualNitrogenTime($pg_start, $R['levels']);
$pg_end = getPgEnd($R['levels'], $rnt);

print '{"success":true, "pg_start":"'.$pg_start.'", "pg_end":"'.$pg_end.'", "interval":'.$interval.', "rnt":'.$rnt.'}';

?>