Cb = require('./app');

module.exports = function() {

    var tables = Cb.tables;

    function getTests() {
        return [{
            query: {},
            result: {endPg: '0'}
        }, {
            query: {depth: 11, duration: 58},
            result: {endPg: 'N'}
        }, {
            query: {depth: 25, duration: 25},
            result: {endPg: 'N', safetyStop: true, noDecompressionLimit: false}
        }, {
            query: {depth: 40, duration: 9},
            result: {endPg: 'G', safetyStop: true, noDecompressionLimit: true}
        }, {
            query: {startPg: 'C', depth: 16, duration: 26},
            result: {startPg: 'C', endPg: 'O', rnt: 17}
        }, {
            query: {lastPg: 'N', interval: 56, depth: 10, duration: 61},
            result: {startPg: 'E', endPg: 'Q', rnt: 34}
        }, {
            query: {depth: 15, duration: 39},
            result: {endPg: 'M'}
        }, {
            query: {lastPg: 'M', interval: 66, depth: 12, duration: 43},
            result: {startPg: 'C', endPg: 'O', rnt: 23}
        }, {
            query: {lastPg: 'O', interval: 173, depth: 12, duration: 38},
            result: {startPg: 'A', endPg: 'K', rnt: 9}
        }, {
            query: {levels: '30,10|20,26'},
            result: {endPg: 'P'}
        }, {
            query: {lastPg: 'P', interval: 75, levels: '16,25|12,20'},
            result: {startPg: 'D', endPg: 'R', rnt: 19}
        }];
    }

    function headTpl() {
        return '<head>'
                + '<style>'
                    + 'body {margin: 0; background: #EFEFEF; font-family: tahoma;}'
                    + 'h2 {margin: 0; padding: 10px;}'
                    + 'a {font-size: 0.6em;}'
                    + 'h3 {margin: 0 0 10px 0; border-bottom: 1px solid #EFEFEF; padding-bottom: 2px; font-family: tahoma;}'
                    + '.row {padding-bottom: 20px;}'
                    + '.container {display: -webkit-box; -webkit-box-align: stretch; box-orient: horizontal;}'
                    + '.box {-webkit-box-flex: 1; padding: 20px; margin: 0 10px; background: #FFF; border-radius: 3px}'
                    + '.box {font-family: Monaco,"Courier New","DejaVu Sans Mono","Bitstream Vera Sans Mono",monospace}'
                    + '.status {padding: 20px; padding: 20px; color: white; margin: 0 10px; border-radius: 3px; font-weight: bold}'
                    + '.status.OK {background: darkGreen;}'
                    + '.status.KO {background: darkRed;}'
                    + '.attribute.OK {color: darkGreen;}'
                    + '.attribute.KO {color: darkRed;}'
                + '</style>'
            + '</head>';
    }

    function bodyTpl(data, test, req) {
        var levels, queryString = [], url, cls;

        for (var attr in test.query) {
            queryString.push(attr+'='+test.query[attr]);
        }
        url = 'http://' + req.headers.host + '/?' + queryString.join('&');

        var html = '<div class="row">';
        html += '<h2>'+test.title+' <a target="_blank" href="'+url+'">'+url+'</a></h2>';
        html += '<div class="container">';

        html += '<div class="box">';
        html += '<h3>query</h3>';
        for (var attr in test.query) {
            html += '<div>'+attr+': '+test.query[attr]+'</div>';
        }
        html += '</div>';
        html += '<div class="box">';
        html += '<h3>expected result</h3>';
        for (var attr in test.result) {
            cls = test.result[attr].status ? test.result[attr].status : '';
            html += '<div class="attribute '+cls+'">'+attr+': '+test.result[attr]+'</div>';
        }
        html += '</div>';


        html += '<div class="box">';
        html += '<h3>response</h3>';
        for (var attr in data) {
            if (attr === 'levels') {
                levels = data[attr];
                html += '<div>levels:</div>';
                html += '<ul>';
                for (var i = 0, l = levels.length; i < l; i++) {
                    html += '<li>';
                    for (var index in levels[i]) {
                        html += '<div>' + index + ': ' + levels[i][index] + '</div>';
                    }
                    html += '</li>';
                }
                html += '</ul>';
            } else {
                cls = data[attr].status ? data[attr].status : '';
                html += '<div class="attribute '+cls+'">' + attr + ': ' + data[attr] + '</div>';
            }
        
        }
        html += '</div>';


        html += '<div class="status ' + test.status + '">' + test.status + '</div>';

        html += '</div></div>';
        return html;
    }

    return {

        run: function(req, res) {
            var t, d,
            tests = getTests();
            res.setHeader('Content-Type', 'text/html');
            for (var i = 0, l = tests.length; i < l; i++) {
                t = tests[i];
                t.status = 'OK';
                t.title = 'test ' + (i + 1);
                d = (new Cb.Dive(t.query)).compute().data;
                for (var attr in t.result) {
                    t.result[attr] = new String(t.result[attr]);
                    d[attr] = new String(d[attr]);
                    if (t.result[attr].toString() !== d[attr].toString()) {
                        t.result[attr].status = 'KO';
                        d[attr].status = 'KO';
                        t.status = 'KO';
                    } else {
                        t.result[attr].status = 'OK';
                        d[attr].status = 'OK';
                    }
                }
                res.write(headTpl());
                res.write(bodyTpl(d, t, req));
            }
        }

    };

}();