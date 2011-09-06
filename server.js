console.log('node version: ' + process.version);

var Cb = require('./app'),
    test = require('./test'),
    // vows = require('vows'),
    connect = require('connect');


Cb.tables.on('dataloaded', function(tables) {

    console.log("Tables data load: OK");
    test.run();
    // var suite = vows.describe('tables');
    // suite.addBatch({
    //    'tables load': {
    //         topic: Cb.tables,
    //         'pressure groups table': function (topic) {
    //             /* Test the result of the topic */
    //             console.log("TOPIC", topic);
    //         }
    //     }
    // });

});


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
