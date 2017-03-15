var express = require('express');
var app = express();

// setup ports
var server_port = 8080;
var server_ip_address = '0.0.0.0';

app.get('/', function (req, res) {
    res.status('200').send('Service is up');
});

// server listens in on port
app.listen(server_port, server_ip_address, function () {
	 console.log( "Listening on " + server_ip_address + ", server_port " + server_port );
});