let mongoose=require("mongoose");
let campground=require("./models/campground");
//const router=express.Router();
let comment=require('./models/comment');

let data=[
    {
        name:"Clouds Rest",
        image:"https://images-na.ssl-images-amazon.com/images/I/51rGfDZbbsL._SX355_.jpg",
        description:"Clouds Rest is a mountain in Yosemite National Park east northeast of Yosemite Village, California. Although there are many peaks in the park having far greater elevation, Clouds Rest's proximity to the valley gives it a very high degree of visual prominence."
    },
    {
        name:"Cloud Mesa",
        image:"https://cdn.vox-cdn.com/thumbor/FMUIaXcnBaKK9YqdP8qtxUog150=/0x0:4741x3161/1200x800/filters:focal(1992x1202:2750x1960)/cdn.vox-cdn.com/uploads/chorus_image/image/59535149/shutterstock_625918454.0.jpg",
        description:"Clouds Rest is a mountain in Yosemite National Park east northeast of Yosemite Village, California. Although there are many peaks in the park having far greater elevation, Clouds Rest's proximity to the valley gives it a very high degree of visual prominence.ice"
    },
    {
        name:"Canyon floor",
        image:"https://www.nomadtravellers.com/images/articles/Rinjani-Trekking-Company/Rinjani-trekking-volcano_IMGP7442-rt.jpg",
        description:"Clouds Rest is a mountain in Yosemite National Park east northeast of Yosemite Village, California. Although there are many peaks in the park having far greater elevation, Clouds Rest's proximity to the valley gives it a very high degree of visual prominence."
    }
]

function seedDB()
{
    campground.remove({},function(err){
        if(err)
            console.log(err);
        console.log("removed everything");
        data.forEach(function(seed){
            campground.create(seed,function(err,campground){
                if(err)
                    console.log(err);
                else{
                    console.log("added a campground");
                    //create a comment
                    comment.create(
                        {
                            text:"nice place but i wish if therre is internet it was awesome",
                            author:"Elakkiya"
                        },function(err,comment)
                        {
                            if(err){
                                console.log(err);
                            }else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("creted new comment");
                            }
                        }
                    )
                }
            });
        });
    });
    
}

module.exports=seedDB;