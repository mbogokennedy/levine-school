"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var pg = require("pg").Pool;
var port = process.env.PORT || 5000;
var items = require("./routes/api/items");
var app = express();

// body parser middleware
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("api/items", results);

app.listen(port, function () {
    console.log("Server started on port " + port + ".");
});