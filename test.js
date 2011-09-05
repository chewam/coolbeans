Cb = require('./app');

module.exports = function() {

    var tables = Cb.tables;

    var tests = [{
        title: 'test 1',
        query: {
            depth: 11,
            duration: 58
        },
        result: {
            endPg: 'N'
        }
    }, {
        title: 'test 2',
        query: {
            lastPg: 'N',
            interval: 56,
            depth: 10,
            duration: 61
        },
        result: {
            startPg: 'E',
            endPg: 'Q',
            rnt: 34
        }
    }, {
        title: 'test 3',
        query: {
            depth: 15,
            duration: 39
        },
        result: {
            endPg: 'M'
        }
    }, {
        title: 'test 4',
        query: {
            lastPg: 'M',
            interval: 66,
            depth: 12,
            duration: 43
        },
        result: {
            startPg: 'C',
            endPg: 'O',
            rnt: 23
        }
    }, {
        title: 'test 5',
        query: {
            lastPg: 'O',
            interval: 173,
            depth: 12,
            duration: 38
        },
        result: {
            startPg: 'A',
            endPg: 'K',
            rnt: 9
        }
    }, {
        title: 'test 6',
        query: {
            levels: '30,10|20,26'
        },
        result: {
            endPg: 'P'
        }
    }, {
        title: 'test 7',
        query: {
            lastPg: 'P',
            interval: 75,
            levels: '16,25|12,20'
        },
        result: {
            startPg: 'D',
            endPg: 'R',
            rnt: 19
        }
    }];

    return {

        run: function() {
            var t, d, status;
            for (var i = 0, l = tests.length; i < l; i++) {
                t = tests[i];
                status = 'OK';
                d = (new Cb.Dive(t.query)).compute().data;
                for (var attr in t.result) {
                    if (t.result[attr] !== d[attr]) status = 'KO';
                }
                console.log(t.title, status, t.result);
            }
        }

    };

}();