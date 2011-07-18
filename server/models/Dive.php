<?php

class Dive extends ActiveRecord\Model {
    static $belongs_to = array(
        array(/*'country', */'objective', 'user')
    );
    static $delegate = array(
        // array('name', 'to' => 'country', 'prefix' => 'country'),
        array('name', 'to' => 'objective', 'prefix' => 'objective')
    );
}

?>