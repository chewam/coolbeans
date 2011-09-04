<?php

    include('../server/config.php');
    include('./lib.php');

    session_start();
    if (!isset($_SESSION) || !isset($_SESSION['openid']) || !strlen($_SESSION['openid'])) {
        header('Location: ../index.php');
    }

    $test = array();

    $test[] = array(
        'last_pg_end' => null,
        'last_time_out' => null,
        'time_in' => '2011-06-11 13:12:00',
        'levels' => array(
            array('depth' => 11, 'time' => 58)
        ),
        'results' => array(
            'interval' => 0,
            'pg_start' => 0,
            'rnt' => 0,
            'pg_end' => 'N'
        )
    );

    $test[] = array(
        'last_pg_end' => 'N',
        'last_time_out' => '2011-06-11 14:10:00',
        'time_in' => '2011-06-11 15:06:00',
        'levels' => array(
            array('depth' => 10, 'time' => 61)
        ),
        'results' => array(
            'interval' => 56,
            'pg_start' => 'E',
            'rnt' => 34,
            'pg_end' => 'Q'
        )
    );

    /****************************************************/

    $test[] = array(
        'last_pg_end' => null,
        'last_time_out' => null,
        'time_in' => '2011-06-23 13:27:00',
        'levels' => array(
            array('depth' => 15, 'time' => 39)
        ),
        'results' => array(
            'interval' => 0,
            'pg_start' => 0,
            'rnt' => 0,
            'pg_end' => 'M'
        )
    );

    $test[] = array(
        'last_pg_end' => 'M',
        'last_time_out' => '2011-06-23 14:06:00',
        'time_in' => '2011-06-23 15:12:00',
        'levels' => array(
            array('depth' => 12, 'time' => 43)
        ),
        'results' => array(
            'interval' => 66,
            'pg_start' => 'C',
            'rnt' => 23,
            'pg_end' => 'O'
        )
    );

    $test[] = array(
        'last_pg_end' => 'O',
        'last_time_out' => '2011-06-23 15:55:00',
        'time_in' => '2011-06-23 18:48:00',
        'levels' => array(
            array('depth' => 12, 'time' => 38)
        ),
        'results' => array(
            'interval' => 173,
            'pg_start' => 'A',
            'rnt' => 9,
            'pg_end' => 'K'
        )
    );

    /****************************************************/

    $test[] = array(
        'last_pg_end' => null,
        'last_time_out' => null,
        'time_in' => '2011-06-23 08:29:00',
        'levels' => array(
            array('depth' => 30 , 'time' => 10),
            array('depth' => 20 , 'time' => 26)
        ),
        'results' => array(
            'interval' => 0,
            'pg_start' => 0,
            'rnt' => 0,
            'pg_end' => 'P'
        )
    );

    $test[] = array(
        'last_pg_end' => 'P',
        'last_time_out' => '2011-06-23 09:05:00',
        'time_in' => '2011-06-23 10:20:00',
        'levels' => array(
            array('depth' => 16 , 'time' => 25),
            array('depth' => 12 , 'time' => 20)
        ),
        'results' => array(
            'interval' => 75,
            'pg_start' => 'D',
            'rnt' => 19,
            'pg_end' => 'R'
        )
    );

    for ($i = 0, $l = sizeof($test); $i < $l; $i++) {

        $interval = getInterval($test[$i]['last_time_out'], $test[$i]['time_in']);
        $pg_start = getPgStart($test[$i]['last_pg_end'], $interval, 21);
        $max_depth = getMaxDepth($test[$i]['levels']);
        $rnt = getRnt($pg_start, $max_depth, 21);
        $pg_end = getPgEnd($test[$i]['levels'], $rnt, 21);

        print '<h3>Test '.$i.':</h3>';
        print '<div>last pg end: '.$test[$i]['last_pg_end'].'</div>';
        print '<div>last time out: '.$test[$i]['last_time_out'].'</div>';
        print '<div>time in: '.$test[$i]['time_in'].'</div>';
        for ($j = 0, $m = sizeof($test[$i]['levels']); $j < $m; $j++) {
            print '<div>time: '.$test[$i]['levels'][$j]['time'].'&nbsp;&nbsp;';
            print 'depth: '.$test[$i]['levels'][$j]['depth'].'</div>';
        }
        print '<hr />';
        print '<div>interval: '.$interval.' '.($interval === $test[$i]['results']['interval'] ? 'OK' : 'KO').'</div>';
        print '<div>pg_start: '.$pg_start.' '.($pg_start === $test[$i]['results']['pg_start'] ? 'OK' : 'KO').'</div>';
        print '<div>rnt: '.$rnt.' '.($rnt === $test[$i]['results']['rnt'] ? 'OK' : 'KO').'</div>';
        print '<div>pg_end: '.$pg_end.' '.($pg_end === $test[$i]['results']['pg_end'] ? 'OK' : 'KO').'</div>';
        print '<hr />';
    }

?>
