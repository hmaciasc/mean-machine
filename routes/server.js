var express = require("express");
var app = express();
var path = require("path");

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});

var adminRouter = express.Router();

adminRouter.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

adminRouter.get("/", function(req, res) {
    res.send("I am dashboard!");
});

adminRouter.get("/users", function(req, res) {
    res.send("I show all the users!");
});

adminRouter.param("name", function(req, res, next, name) {
    console.log("Validating " + name);
    req.name = name;
    next();
});

adminRouter.get("/users/:name", function(req, res) {
    res.send("Hello " + req.params.name + "!");
});

adminRouter.get("/posts", function(req, res) {
    res.send("I show all the posts!");
});

app.use("/admin", adminRouter);

app.listen(1337);
console.log("Visit me at http://localhost:1337");
