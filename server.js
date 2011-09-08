console.log('node version: ' + process.version);


var Cb = require('./app'),
    test = require('./test'),
    // vows = require('vows'),
    connect = require('connect');



Cb.tables.on('dataloaded', function(tables) {
    console.log("Tables data load: OK");
});


var server = connect(

    connect.favicon(),

    connect.logger(),

    connect.query(),

    connect.router(function(app) {
        app.get('/', function(req, res) {
            var dive = (new Cb.Dive(req.query)).compute();
            var json = JSON.stringify(dive.data);
            if (req.query.callback) {
                res.setHeader('Content-Type', 'application/x-javascript');
                json = req.query.callback + '([' + json + '])';
            }
            res.end(json);
        });

        app.get('/test', function(req, res) {
            test.run(req, res);
            res.end();
        });

        // app.get('/dives/:id', function(req, res) {
        //     var dive = new CoolBeans.Dive();
        //     dive.load(req.params.id, function callback(data) {
        //         var json = JSON.stringify(data);
        //         res.end(json);
        //     });
        // });

    })

);


server.listen(3000);


console.log("Server listening on 3000: OK");
