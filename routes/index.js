var express       = require("express"),
    Home    = require("../models/home"),
    passport      = require("passport"),
    localStrategy = require("passport-local"),
    Comment       = require("../models/comment"),
    User          = require ("../models/user"),
    router        = express.Router();
    
router.get("/", function(req, res){
    res.render("landing");
});

//show sign up form
router.get("/register", function(req, res){
    res.render("register");
});

//handling user sign up
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to homey " + user.username);
           res.redirect("/homes");
        });
    });

});

// LOGIN ROUTES
//render login form
router.get("/login", function(req, res){
   res.render("login"); 
});
//login logic
//middleware
router.post("/login", passport.authenticate("local", {
    successRedirect: "/homes",
    failureRedirect: "/login"
}) ,function(req, res){
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});


module.exports = router;