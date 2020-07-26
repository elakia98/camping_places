let campground=require('../models/campground');
let Comment=require('../models/comment');
//all the middleware starts here
let middlewareObj={};
middlewareObj.checkCampgroundOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                req.flash("error","campground not found");
               res.redirect("back");
           }else{
               console.log(foundCampground.author.id);
               console.log(req.user._id);
               if(foundCampground.author.id.equals(req.user._id)){
                    next();
               }else{
                   req.flash("error","you dont have the permission to do that");
                   res.redirect("back");
               }
              
           }
       });
    }else{
        req.flash("error","You need to be logged in to do that")
        res.redirect("back");
    }
}



middlewareObj.checkCommentOwnership=function(req,res,next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id,function(err,foundComment){
                if(err){
                   res.redirect("back");
               }else{
                   //console.log(foundCampground.author.id);
                   //console.log(req.user._id);
                   if(foundComment.author.id.equals(req.user._id)){
                        next();
                   }else{
                       req.flash("error","You dont have the permission to do that");
                       res.redirect("back");
                   }
                  
               }
           });
        }else{
            req.flash("error","you need to be logged in to do that");
            res.redirect("back");
        }
}

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that");
    res.redirect("/login");
}

module.exports=middlewareObj;

