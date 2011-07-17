<?php

    include('server/config.php');

?>

<html>
    <head>
        <link rel="stylesheet" type="text/css" href="libs/ext-4.0.2a/resources/css/ext-all.css">
        <link rel="stylesheet" type="text/css" href="client/css/style.css">
        
        <script src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=false&amp;key=<?php print $config['googlekey']; ?>" type="text/javascript"></script>

        <script type="text/javascript" charset="utf-8" src="libs/ext-4.0.2a/ext-debug.js"></script>
        <script type="text/javascript" charset="utf-8" src="client/js/index.js"></script>
    </head>
    <body></body>
</html>