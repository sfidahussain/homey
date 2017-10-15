var mongoose   = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");
    
// SCHEMA SETUP
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);
// Model
module.exports = mongoose.model("User", UserSchema);