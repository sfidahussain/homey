var express       = require("express"),
    Home    = require("../models/home"),
    middleware    = require("../middleware"),
    router        = express.Router();

//INDEX - show all homes
router.get("/", function(req, res){
    // Get all homes from DB
    Home.find({}, function(err, allHomes){
       if(err){
           res.redirect("/homes");
       } else {
          res.render("homes/index",{homes:allHomes});
       }
    });
});

//CREATE - add new home to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to homes array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var newHome = {name: name, price: price, image: image, description: desc, author: {id: req.user._id, username: req.user.username}};
    // Create a new home and save to DB
    Home.create(newHome, function(err, newlyCreated){
        if(err){
            res.redirect("/homes");
        } else {
            //redirect back to homes page
            res.redirect("/homes");
        }
    });
});

//NEW - show form to create new home
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("homes/new.ejs"); 
});

// SHOW - shows more info about one home
router.get("/:id", function(req, res){
    //find the home with provided ID
    Home.findById(req.params.id).populate("comments").exec(function(err, foundHome){
        if(err){
           res.redirect("/homes");
        } else {
            //console.log(foundhome)
            //render show template with that home
            res.render("./homes/show", {home: foundHome});
        }
    });
});

// EDIT home ROUTE
router.get("/:id/edit", middleware.checkHomeOwnership, function(req,res){
    Home.findById(req.params.id, function(err, home){
        res.render("./homes/edit", {home: home});
    });
});

// UPDATE Home ROUTE
router.put("/:id", middleware.checkHomeOwnership, function(req, res){
    //find and update the correct home 
    // find and update the correct home
    Home.findByIdAndUpdate(req.params.id, req.body.home, function(err, updatedHome){
       if(err){
           res.redirect("/homes");
       } else {
           //redirect somewhere(show page)
           res.redirect("/homes/" + req.params.id);
       }
    });
    // redirect somewhere (show page)
});

// DESTROY
router.delete("/:id", middleware.checkHomeOwnership, function(req, res){
    Home.findByIdAndRemove(req.params.id, function(err){
       if(err) {
           res.redirect("/homes");
       } 
       else {
           req.flash("success", "Home deleted");
           res.redirect("/homes");
       }
    });
});

module.exports = router;