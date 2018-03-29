var https = require('https');
var url = require('url');
var querystring = require('querystring');
var static = require('node-static');
var file = new static.Server('.');
var fs = require("fs");

const options = {
    key: fs.readFileSync('keys/key.pem'),
    cert: fs.readFileSync('keys/cert.pem'),
    passphrase: 'qwerty'
};

var status = {
    STATUS: '/cashboxstatus.json',
    OPEN: '/cycleopen.json',
    CLOSE: '/cycleclose.json',
    FISCAL: '/fiscalcheck.json'
};

function accept(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Authorization, Content-Type');

    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    // res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    var fileContent;
    var url = req.url.replace(/\?.+/g, '');

    switch (url) {
        case status.STATUS:
            // если URL запроса /status, то...
            fileContent = fs.readFileSync("server/status.json", "utf8");

            setTimeout(function() {
                res.end(fileContent);
            }, 500);
            break;

        case status.CLOSE:
            // если URL запроса /close, то...
            fileContent = fs.readFileSync("server/close.json", "utf8");

            setTimeout(function() {
                res.end(fileContent);
            }, 500);
            break;

        case status.OPEN:
            // если URL запроса /open, то...
            fileContent = fs.readFileSync("server/open.json", "utf8");

            setTimeout(function() {
                res.end(fileContent);
            }, 500);
            break;

        case status.FISCAL:
            // если URL запроса /fiscal, то...
            fileContent = fs.readFileSync("server/fiscal.json", "utf8");

            setTimeout(function() {
                res.end(fileContent);
            }, 500);
            break;

        default:
            // иначе считаем это запросом к обычному файлу и выводим его
            file.serve(req, res); // (если он есть)
    }
}

// ------ этот код запускает веб-сервер -------
if (!module.parent) {
    https.createServer(options, accept).listen(8443);
} else {
    exports.accept = accept;
}

console.log('Server running on port 8443');