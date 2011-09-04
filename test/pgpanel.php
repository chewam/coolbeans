<?php

    include('../server/config.php');
    
    session_start();
    if (!isset($_SESSION) || !isset($_SESSION['openid']) || !strlen($_SESSION['openid'])) {
        header('Location: ../index.php');
    }

?>

<html>
    <head>
        <link rel="stylesheet" type="text/css" href="../libs/ext-4.0.2a/resources/css/ext-all.css">
        <!-- <link rel="stylesheet" type="text/css" href="../client/css/style.css"> -->
        <script type="text/javascript" charset="utf-8" src="../libs/ext-4.0.2a/ext-debug.js"></script>
        
        <script>
            Ext.Loader.setPath('Ext.ux', '../client/js/ux');

            Ext.require([
                'Ext.form.*',
                'Ext.data.*',
                'Ext.grid.Panel',
                'Ext.ux.PgPanel',
                'Ext.layout.container.Column'
            ]);

            Ext.onReady(function() {

                Ext.QuickTips.init();

                var panel = new Ext.ux.PgPanel();
                panel.render(document.body);

            });
        </script>
        
    </head>
    <body></body>
</html>