var express = require('express');
var app = express();
var router = require("./router/router.js");

// setup ports
var server_port = 8080;
var server_ip_address = '0.0.0.0';

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", router);

// server listens in on port
app.listen(server_port, server_ip_address, function () {
	 console.log( "Listening on " + server_ip_address + ", server_port " + server_port );
});