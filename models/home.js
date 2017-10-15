var express    = require("express"),
    mongoose   = require("mongoose"),
    app        = express();
    
// Connect to db
mongoose.connect("mongodb://localhost/yelp_camp_v12", {useMongoClient: true});

// SCHEMA SETUP
var homeSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// Model
module.exports = mongoose.model("Home", homeSchema);