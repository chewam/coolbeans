<?php

session_start();

header('Content-Type: application/json');

include('../config.php');

$R =& $_REQUEST;
$S =& $_SESSION;

$user = User::all(array('conditions' => array('openid = ?', $S['openid'])));
$user = $user[0];

$order = 'dive_date desc';
if (isset($R['sort'])) {
    $order = array();
    $R['sort'] = json_decode($R['sort'], true);
    foreach ($R['sort'] as $col) {
        $order[] = $col['property'] .' '. $col['direction'];
    }
    $order = implode(',', $order);
}

$options = array(
    'order' => $order,
    'conditions' => array('user_id = ?', $user->id)
);

if (isset($R['limit'])) {
    $options['limit'] = $R['limit'];
}

if (isset($R['start'])) {
    $options['offset'] = $R['start'];
}   

$dives = Dive::find('all', $options);

$data = array();
foreach ($dives as $dive) {
    $data[] = $dive->to_json(array(
        'methods' => 'levels'
    ));
}

print '{"success":true, data:['. implode(',', $data) .']}';

?>