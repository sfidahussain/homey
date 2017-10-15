var express    = require("express"),
    mongoose   = require("mongoose"),
    app        = express();
    
// Connect to db
mongoose.connect("mongodb://localhost/yelp_camp_v12", {useMongoClient: true});

// SCHEMA SETUP
var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

// Model
module.exports = mongoose.model("Comment", commentSchema);