<?php

    include('server/config.php');

?>

<html>
    <head>
        <!-- <link rel="stylesheet" type="text/css" href="libs/ext-4.0.2a/resources/css/ext-all.css">
        <link rel="stylesheet" type="text/css" href="client/css/style.css">
        <script src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=false&amp;key=<?php print $config['googlekey']; ?>" type="text/javascript"></script>
        <script type="text/javascript" charset="utf-8" src="libs/ext-4.0.2a/ext-debug.js"></script>
        <script type="text/javascript" charset="utf-8" src="client/js/index.js"></script> -->
        <style>
            body {background-color: #F1F1F1;}
            .page {
                width: 1000px;
                margin: 20px auto;
                background-color: #FFFFFF;
            }
        </style>
    </head>
    <body>
        <div class="page">
            <iframe src="http://coolbeans.rpxnow.com/openid/embed?token_url=http%3A%2F%2Fhome.chewam.com%2Fpub%2Fcoolbeans%2Fserver%2Frpx.php" scrolling="no" frameBorder="no" allowtransparency="true" style="width:368px;height:218px"></iframe>
        </div>
    </body>
</html>