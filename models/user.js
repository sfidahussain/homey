var mongoose   = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");
    
// Connect to db
mongoose.connect("mongodb://localhost/yelp_camp_v12", {useMongoClient: true});

// SCHEMA SETUP
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);
// Model
module.exports = mongoose.model("User", UserSchema);