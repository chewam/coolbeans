var Cb = require('./app'),
    connect = require('connect');


// Cb.tables.on('load', function() {
//     console.log("Tables load: OK");
// });


var server = connect(

    connect.logger(),

    connect.query(),

    connect.router(function(app) {
        app.get('/', function(req, res) {
            var dive = (new Cb.Dive(req.query)).compute();
            var json = JSON.stringify(dive.data);
            res.end(json);
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
