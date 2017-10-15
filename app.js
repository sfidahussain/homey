var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    localStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Home     = require("./models/home"),
    Comment        = require("./models/comment"),
    User           = require ("./models/user"),
    seedDB         = require("./seeds");
 
// requiring routes    
var commentRoutes    = require("./routes/comments"),
    authRoutes       = require("./routes/index"),
    homeRoutes = require("./routes/homes");
    
mongoose.connect("mongodb://localhost/yelp_camp_v12",{useMongoClient: true});
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

//Setup passport 
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user; 
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", authRoutes);
app.use("/homes", homeRoutes);
app.use("/homes/:id/comments",commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});