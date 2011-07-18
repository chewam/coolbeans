<?php

function getRequest() {
    $handle = fopen('php://input','r');
    $jsonInput = fgets($handle);
    $args = json_decode($jsonInput, true);
    return $args;
    // return $args[0];
}

function getUser($openid) {
    $user = User::all(array(
        'conditions' => array('openid = ?', $openid)
    ));
    if ($user && sizeof($user)) {
        $user = $user[0];
        return $user;
    } else return false;
}

function getTotalTime($time_in, $time_out) {
    return (strtotime($time_out) - strtotime($time_in)) / 60;
}

function getDiveDate($date) {
    $dive_date = explode('T', $date);
    return $dive_date[0];
}

function getTimeIn($date, $time_in) {
    $date = getDiveDate($date);
    return $date .' '. $time_in;
}

function getTimeOut($date, $time_out) {
    return getTimeIn($date, $time_out);
}

function getPreviousDive($dive) {
    $prev = Dive::find('all', array(
        'offset' => 0,
        'limit' => 1,
        'order' => 'dive_date desc, time_in desc',
        'select' => 'pg_end, ROUND(TIME_TO_SEC(TIMEDIFF((SELECT time_in FROM dives WHERE id = '.$dive->id.'), time_out)) / 60) AS "interval"',
        'conditions' => 'dive_date <= "'. $dive->dive_date .'" AND time_out < "'.$dive->time_in.'" AND TIME_TO_SEC(TIMEDIFF("'.$dive->time_in.'", time_out)) < (6 * 60 * 60)'
    ));
    if ($prev && sizeof($prev)) {
        $prev = $prev[0];
        return $prev;
    } else return false;
}

function getInterval($dive) {
    $interval = PressureInterval::find('all', array(
        'offset' => 0,
        'limit' => 1,
        'conditions' => 'group_start = "'.$dive->pg_end.'" AND time_min <= '.$dive->interval.' AND time_max >= '.$dive->interval
    ));
    if ($interval && sizeof($interval)) {
        $interval = $interval[0];
        return $interval;
    } else return false;
}

function getStartPressureGroup($dive) {
    $pg_start = '0';
    if (($prev = getPreviousDive($dive)) !== false) {
        if (strlen($prev->pg_end)) {
            $interval = getInterval($prev);
            $pg_start = $interval->group_end;
        }
    }
    return $pg_start;
}

function getEndPressureGroup($dive) {
    $max_depth =& $dive->max_depth;
    $total_time =& $dive->total_time;
    $pg_end = PressureGroup::find('all', array(
        'offset' => 0,
        'limit' => 1,
        'conditions' => 'oxygen = 21 AND depth >= '. $max_depth .' AND btime >= ' . $total_time
    ));
    if ($pg_end && sizeof($pg_end)) {
        $pg_end = $pg_end[0];
        return $pg_end->pg;
    } else return 'UNKNOWN';
}

?>