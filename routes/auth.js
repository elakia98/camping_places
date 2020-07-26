let express=require("express");
let router=express.Router();
let passport=require("passport");
let User=require('../models/user');

//root route
router.get('/',function(req,res){
    res.render('landing');
});
//register form
router.get("/register",function(req,res){
    res.render("register");
});
//handle signup logic
router.post("/register",function(req,res){
    let newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,User){
        if(err){
            console.log(err);
            req.flash("error",err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","welcome to camping"+ User.username);
            res.redirect("/campground");
        })
    });
});

//show login form
router.get("/login",function(req,res){
    res.render("login");
});

//handling login logic
router.post("/login",passport.authenticate("local",
    {
        successRedirect:"/campground",
        failureRedirect:"/login"
    }),function(req,res){
});

//logout route
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","logged u out");
    res.redirect("/campground");
});



module.exports=router;

