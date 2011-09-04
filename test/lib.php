<?php

function getInterval($last_time_out, $time_in) {
    if ($last_time_out and $time_in) {
        $lto = strtotime($last_time_out);
        $ti = strtotime($time_in);
        $interval = $ti - $lto;
        return $interval / 60;
    }
    return 0;
}

function getPgStart($last_pg_end, $interval, $oxygen) {
    if ($last_pg_end and $interval and $oxygen) {
        $pi = PressureInterval::all(array(
            'conditions' => 'oxygen = '.$oxygen.' AND pg_start = "'. $last_pg_end .'" AND time_min <= '. $interval .' AND time_max >= '. $interval
        ));
        $pi = $pi[0];
        return $pi->pg_end;
    }
    return 0;
}

function getMaxDepth($levels) {
    $depth = 0;
    for ($i = 0, $l = sizeof($levels); $i < $l; $i++) {
        if ($levels[$i]['depth'] > $depth) {
            $depth = $levels[$i]['depth'];
        }
    }
    return $depth;
}

function getRnt($pg_start, $max_depth, $oxygen) {
    if ($pg_start and $max_depth and $oxygen) {
        $rnt = ResidualNitrogenTime::all(array(
            'conditions' => 'oxygen = '.$oxygen.' AND pg = "'. $pg_start .'" AND depth >= '. $max_depth
        ));
        $rnt = $rnt[0];
        return $rnt->rnt;
    }
    return 0;
}

function getPgEnd($levels, $rnt, $oxygen) {
    if ($oxygen and $levels) {
        $pgs = array();
        for ($i = 0, $l = sizeof($levels); $i < $l; $i++) {
            if ($i > 0) $rnt = 0;
            $pg = PressureGroup::all(array(
                'conditions' => 'oxygen = '.$oxygen.' AND btime >= "'. ($rnt + $levels[$i]['time']) .'" AND depth >= '. $levels[$i]['depth']
            ));
            $pg = $pg[0];
            $pgs[] = $pg->pg;
        }

        $index = 0;
        foreach ($pgs as $pg) {
            $index += ord($pg) - 64;
        }
        return chr($index + 64);
    }
    return 0;
}

?>