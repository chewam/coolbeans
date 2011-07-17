<?php

require_once '/Users/goldledoigt/Work/htdocs/libs/php-activerecord/ActiveRecord.php';

ActiveRecord\Config::initialize(function($cfg) {
    $cfg->set_model_directory('models');
    $cfg->set_connections(array(
        'development' => 'mysql://root:juX2p0mX@localhost/coolbeans'
    ));
});



?>