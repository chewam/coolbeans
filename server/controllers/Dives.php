<?php

header('Content-Type: text/plain');

include('../config.php');

$R =& $_REQUEST;

$options = array('limit' => $R['limit']);
$dives = Dive::find('all', $options);

foreach ($dives as $dive)
    echo $dive->to_json();

?>