<?php

class Dive extends ActiveRecord\Model {
    static $belongs_to = array(
        array(/*'country', */'objective', 'user')
    );
    static $delegate = array(
        // array('name', 'to' => 'country', 'prefix' => 'country'),
        array('name', 'to' => 'objective', 'prefix' => 'objective')
    );

    public function levels() {
        return json_decode($this->levels);
    }

    public function previous_dive() {
        $dive = Dive::find('all', array(
            'offset' => 0,
            'limit' => 1,
            'order' => 'dive_date desc, time_in desc',
            'select' => 'time_in, time_out, pg_start, pg_end, TIMEDIFF("'.$this->time_in->format('Y-m-d H:i:s').'", time_out) AS interval_time, ROUND(TIME_TO_SEC(TIMEDIFF("'.$this->time_in->format('Y-m-d H:i:s').'", time_out)) / 60) AS "interval"',
            'conditions' => 'dive_date <= "'. $this->dive_date->format('Y-m-d H:i:s') .'" AND time_out < "'.$this->time_in->format('Y-m-d H:i:s').'" AND TIME_TO_SEC(TIMEDIFF("'.$this->time_in->format('Y-m-d H:i:s').'", time_out)) < (6 * 60 * 60)'
        ));
        
        if ($dive && sizeof($dive)) {
            // var_dump($dive[0]);
            $dive = $dive[0];
            return array(
                'time_in' => $dive->time_in->format('H:i'),
                'time_out' => $dive->time_out->format('H:i'),
                'pg_start' => $dive->pg_start,
                'pg_end' => $dive->pg_end,
                'interval_time' => $dive->interval_time,
                'interval' => $dive->interval,
            );
        } else return false;
    }

}

?>