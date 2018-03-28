var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment    = require('./models/comment')
var data = [
    {
        name: 'Cloud"s Rest',
        image: 'https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
        description: 'Near the Fall River Entrance. Douglas fir, lodgepole pine, ponderosa pine and the occasional Engelmann spruce forests the campground, offering equal amounts of sun and shade. Grasses, shrubs and seasonal wildflowers fill the open meadows. Aspenglen contains several drive-to family sites for tents and RVs. A few sites are more secluded, walk-to tent sites.'
    },
    {
        name: 'Desert Mesa',
        image: 'https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg',
        description: 'A pleasant mix of Douglas fir, Lodgepole pine, Ponderosa pine, and the occasional Engelmann spruce forests the campground, offering equal amounts of sun and shade. Grasses, shrubs and seasonal wildflowers fill the open meadows.'
    },
    {
        name: 'Canyon Floor',
        image: 'https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
        description: 'Longs Peak Campground is located about 20 minutes south of Estes Park on Hwy 7. This small, tents-only campground is forested and at a fairly high elevation of 9500 feet (3000 m)'
    }
]
function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err)
        }
        console.log("remove campground!");
    })
    // Add a few campgrounds
    data.forEach(function (seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err)
            } else {
                console.log("added a campground")
                // Create a comment
                Comment.create(
                    {
                        text: "This place is great",
                        author: 'Homer'
                    }, function(err, comment){
                        if(err){
                            console.log(err)
                        } else {
                            campground.comments.push(comment._id)
                            campground.save()
                            console.log("created new comment")
                        }
                    }
                )
            }
        })
    });
    // Add a few comments
}
module.exports = seedDB;