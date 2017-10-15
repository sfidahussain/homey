var express       = require("express"),
    Home    = require("../models/home"),
    Comment       = require("../models/comment"),
    middleware    = require("../middleware"),
    router        = express.Router({mergeParams: true});
    
//NEW COMMENT - show form to create new home
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find home by id
    Home.findById(req.params.id, function(err, home){
        if(err) {
           res.redirect("/homes");
        }    
        else {
            res.render("comments/new", {home: home});
        }
    });
});

//CREATE - add new comment to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // lookup home using ID
    Home.findById(req.params.id, function(err, home){
        if(err) {
            res.redirect("/homes");
        }    
        else {
           // console.log(req.body.comment);
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                }    
                else {
                    // add username and id to comment
                    // console.log(req.user.username);
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    // connect new comment to home
                    home.comments.push(comment);
                    home.save();
                    // redirect camgpround show page 
                    req.flash("sucess", "Successfully added comment");
                    res.redirect("/homes/" + home._id);
                }
            });
        }
    });
});

// EDIT COMMENT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err) {
            res.redirect("back");    
        }
        else {
            res.render("comments/edit", {home_id: req.params.id, comment: foundComment});    
        }
    });
});

// UPDATE COMMENT ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err) {
            res.redirect("back");    
        }
        else {
            res.redirect("/homes/" + req.params.id);    
        }
    });
});

// DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err) {
          res.redirect("back");
      } 
      else {
          req.flash("success", "Comment deleted");
          res.redirect("/homes/" + req.params.id);  
      }
    });
});


module.exports = router;