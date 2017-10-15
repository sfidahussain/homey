var Home    = require("../models/home"),
    Comment       = require("../models/comment");
//middleware
var middlewareObj = {};

middlewareObj.checkHomeOwnership = function(req, res, next){
   // is user logged in at all 
        if(req.isAuthenticated()) {
            Home.findById(req.params.id, function(err, home){
                if(err){
                    req.flash("error", "Home not found");
                    res.redirect("back");
                } else {
                   // does user own the home? 
                   if(home.author.id.equals(req.user._id)) {
                        next();
                   }
                   else {
                       req.flash("error", "You don't have permission to do that");
                       res.redirect("back");
                   }
                }
            });               
        }
        else {
            req.flash("error", "You need to be logged in to do that");
            res.redirect("back");
        }    
}


middlewareObj.checkCommentOwnership = function(req, res, next){
   // is user logged in at all 
        if(req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    req.flash("error", "Comment not found");
                    res.redirect("back");
                } else {
                   // does user own the comment? 
                   if(foundComment.author.id.equals(req.user._id)) {
                        next();
                   }
                   else {
                       req.flash("error", "You don't have permission to do that");
                       res.redirect("back");
                   }
                }
            });               
        }
        else {
            req.flash("error", "You need to be logged in to do that");
            res.redirect("back");
        }    
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;