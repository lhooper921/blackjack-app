// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

    app.get("/", function(req, res) {
        // If the user already has an account send them to the members page

        res.sendFile(path.join(__dirname, "../public/register.html"));
      });
    
      app.get("/login", function(req, res) {
        // If the user already has an account send them to the members page

        res.sendFile(path.join(__dirname, "../public/hooperLogin.html"));
      });
    
      // Here we've add our isAuthenticated middleware to this route.
      // If a user who is not logged in tries to access this route they will be redirected to the signup page
      app.get("/index", isAuthenticated, function(req, res) {
        db.User.findAll({
          order: [['chips', 'DESC']],
          limit: 5
        })
        .then((user) => {
          console.log(user);
          res.render("index", {user: user});
        })
        .catch((err) => console.log(err));
        //res.sendFile(path.join(__dirname, "../public/index.html"));
      });

      app.get("/rules", isAuthenticated, function(req, res) {
        res.render("rules", {});
        //res.sendFile(path.join(__dirname, "../public/rules.handlebars"))
      });

      app.get("/account", isAuthenticated, function(req, res) {
        res.render("account", req.user);
       // res.sendFile(path.join(__dirname, "../public/account.html"))
      });

      app.get("/game", isAuthenticated, function(req, res) {
        res.render("game", {});
       // res.sendFile(path.join(__dirname, "../public/"))
      });
    
      app.get("/leaderboard", isAuthenticated, function(req, res) {
        db.User.findAll({
          order: [['chips', 'DESC']],
          limit: 10
        })
        .then((user) => {
          console.log(user);
          res.render("leaderboard", {user: user});
        })
        .catch((err) => console.log(err));
      });
};