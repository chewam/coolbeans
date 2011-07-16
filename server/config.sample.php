<?php

require_once '/the/path/to/ActiveRecord.php';

ActiveRecord\Config::initialize(function($cfg) {
    $cfg->set_model_directory('/the/path/to/your/models/directory');
    $cfg->set_connections(array(
        'development' => 'mysql://username:password@localhost/coolbeans'
    ));
});

?>