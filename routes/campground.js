let express=require("express");
let router=express.Router();
let campground=require('../models/campground');
let middleware=require('../middleware');
//INDEX-show alll campgrounds

router.get('/campground',function(req,res){
    console.log(req.user);
    //Get all the campgrounds from database
    campground.find({},function(err,allcampgrounds){
        if(err){
            console.log("something went wrong");
        }else{
            res.render('campgrounds/app',{camps:allcampgrounds,currentUser:req.user});
        }
    });
});

//create-add new campgrounds to the database

router.post('/campground',middleware.isLoggedIn,function(req,res){
    let name=req.body.name;
    let price=req.body.price;
    let image=req.body.image;
    let desc=req.body.description;
    let author={
        id:req.user._id,
        username:req.user.username
    };
    let newcamp={name:name,price:price,image:image,description:desc,author:author};
    campground.create(newcamp,function(err,newly){
        if(err){
            console.log("error occured");
        }else{
            console.log(newly);
            res.redirect('/campground');
        }
    });
    
});
//NEW-display the form to add the campgrounds to the database

router.get('/campground/new',middleware.isLoggedIn,function(req,res){
    res.render('campgrounds/new');
});

//show-it shows mmore info about one campgrounds

router.get('/campgrounds/:id',function(req,res){
    campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundcampground);
            res.render("campgrounds/show",{campground:foundcampground});
        }
    });
});

//edit campground route

router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    //if user logged in
        campground.findById(req.params.id,function(err,foundCampground){
            
            res.render("campgrounds/edit",{campground:foundCampground});
       });
    //does user own thecampground?  
});

//update campground route
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
    //res.send("wonderfullll");
    //find and update the corect campground
    campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
    //redirect somewheere(show page)
});

//destroy campground route
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
    campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campground");
        }
    })
});

module.exports=router;