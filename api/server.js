var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var port = process.env.PORT || 8080;
var User = require("./app/models/user");
var apiRouter = require("./routers/apiRouter.js");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Origin", "GET, POST");
    res.setHeader("Access-Control-Allow-Origin", "X-Requested-With. conten-type, Authorization");
    next();
});

app.use(morgan("dev"));

app.get("/", function(req, res) {
    res.send("Welcome to the home page!");
});

app.use("/api", apiRouter);

app.listen(port);
console.log("Magic happens on port" + port);
