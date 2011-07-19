<?php

    include('server/config.php');
    
    session_start();
    if (!isset($_SESSION) || !isset($_SESSION['openid']) || !strlen($_SESSION['openid'])) {
        header('Location: index.php');
    }

?>

<html>
    <head>
        <link rel="stylesheet" type="text/css" href="libs/ext-4.0.2a/resources/css/ext-all.css">
        <link rel="stylesheet" type="text/css" href="client/css/style.css">
        <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false&amp;key=<?php print $config['googlekey']; ?>"></script>
        <script type="text/javascript" charset="utf-8" src="libs/ext-4.0.2a/ext-debug.js"></script>
        <script type="text/javascript" charset="utf-8">
            Ext.ns('CB.user');
            CB.user.ID = '<?php print $_SESSION["openid"]; ?>';
            CB.user.NAME = '<?php print $_SESSION["name"]; ?>';
            CB.user.EMAIL = '<?php print $_SESSION["email"]; ?>';
        </script>
        <script type="text/javascript" charset="utf-8" src="client/js/index.js"></script>
    </head>
    <body></body>
</html>