<?php

header('Content-Type: text/plain');

include('../config.php');

$handle = fopen('php://input','r');
$jsonInput = fgets($handle);
$R = json_decode($jsonInput, true);

$dive = Dive::find($R['id']);

$dive->delete();

print '{"success":true}';

?>