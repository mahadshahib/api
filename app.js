var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var router = express.Router();
var mongoOp = require("./models/mongo");

// setup ports
var server_port = 8080;
var server_ip_address = '0.0.0.0';

//API logic
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));

router.get("/", function (req, res) {
    res.json({ "error": false, "message": "Welcome to a test API v.0.1" });
});

//route() will allow you to use same path for different HTTP operation.
//So if you have same URL but with different HTTP OP such as POST,GET etc
//Then use route() to remove redundant code.

router.route("/users")
    .get(function (req, res) {
        var response = {};
        mongoOp.find({}, function (err, data) {
            // Mongo command to fetch all data from collection.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })
    .post(function (req, res) {
        var db = new mongoOp();
        var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        db.userName = req.body.userName;
        // Hash the password using SHA1 algorithm.
        db.description = req.body.description;
        db.save(function (err) {
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
            if (err) {
                response = { "error": true, "message": "Error adding data" };
            } else {
                response = { "error": false, "message": "Data added" };
            }
            res.json(response);
        });
    });

router.route("/users/:id")
    .get(function (req, res) {
        var response = {};
        mongoOp.findById(req.params.id, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(response);
        });
    })
    .put(function (req, res) {
        var response = {};
        // first find out record exists or not
        // if it does then update the record
        mongoOp.findById(req.params.id, function (err, data) {
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                // we got data from Mongo.
                // change it accordingly.
                if (req.body.userName !== undefined) {
                    // case where email needs to be updated.
                    data.userName = req.body.userName;
                }
                if (req.body.description !== undefined) {
                    // case where password needs to be updated
                    data.description = req.body.description;
                }
                // save the data
                data.save(function (err) {
                    if (err) {
                        response = { "error": true, "message": "Error updating data" };
                    } else {
                        response = { "error": false, "message": "Data is updated for " + req.params.id };
                    }
                    res.json(response);
                })
            }
        });
    })
    .delete(function (req, res) {
        var response = {};
        // find the data
        mongoOp.findById(req.params.id, function (err, data) {
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                // data exists, remove it.
                mongoOp.remove({ _id: req.params.id }, function (err) {
                    if (err) {
                        response = { "error": true, "message": "Error deleting data" };
                    } else {
                        response = { "error": true, "message": "Data associated with " + req.params.id + "is deleted" };
                    }
                    res.json(response);
                });
            }
        });
    });

app.use('/', router);

// server listens in on port
app.listen(server_port, server_ip_address, function (err) {
    if (err) {
        return console.log('Cannot listen', err)
    } else {
        console.log("Listening on " + server_ip_address + ", server_port " + server_port);
    }
});