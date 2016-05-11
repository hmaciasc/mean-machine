var express = require("express"),
    mongoose = require("mongoose"),
    User = require("../app/models/user.js");

mongoose.connect("mongodb://mm:mm123@ds017582.mlab.com:17582/mdeftbit");

var apiRouter = express.Router();

apiRouter.use(function(req, res, next) {
    console.log("Somebody just came to our app!");
    next();
});

apiRouter.get("/", function(req, res) {
    res.json({
        message: "hooray! welcome"
    });
});

apiRouter.use("/api", apiRouter);

apiRouter.route("/users").post(function(req, res){
  var user = new User();
  user.name = req.body.name;
  user.username = req.body.username;
  user.password = req.body.password;
  user.save(function(err){
  if(err){
    if(err.code == 11000)
      return res.json({success: false, message: "A user with that username already exists. "});
    else
      return res.send(err);
  }
    res.json({message: "User created!"});
  });
})
.get(function(req, res){
  User.find(function(err, users){
    if(err) res.send(err);
    res.json(users);
  });
});


apiRouter.route("/users/:user_id")
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err) res.send(err);
            res.json(user);
        });
    })
    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err) res.send(err);
            if (req.body.name) user.name = req.body.name;
            if (req.body.username) user.username = req.body.username;
            if (req.body.password) user.password = req.body.password;      
            user.save(function(err) {
                if (err) res.send(err);res.json({ message: "User updated!" });
            })      
        })
    })
    .delete(function(req, res) {
        User.remove({ 
            _id: req.params.user_id
        }, function(err, user) {
            if (err) return res.send(err);
            res.json({ message: 'Successfully deleted' });
            });
    });

module.exports = apiRouter;