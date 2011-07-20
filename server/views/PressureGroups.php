<?php

session_start();
header('Content-Type: text/plain');
include('../config.php');
include('../functions.php');

$S =& $_SESSION;
$U = getUser($S['openid']);
$R = getRequest();

$pgs = array();
foreach ($R['levels'] as $data) {
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

$pg_end = chr($index + 64);

print '{"success":true, "pg": "'. chr($index + 64) .'"}';

?>