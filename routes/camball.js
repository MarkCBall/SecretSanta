var express = require('express');
var router = express.Router();
//var postsController = require('../controllers/posts_controller');
//const Post = require('../models/post');

const Camball = require('../models/camball');
const Registry = require ('../models/registry')


router.get('/', function (req, res, next) {
    // Post.find().exec((err, posts) => {
        // console.log(posts)
        // res.locals.posts = posts
        res.locals.title = "Blog Posts"
        Camball.find().exec((err,camballs) => {
        res.locals.camballs = camballs;


        res.render('camball')
    })
});

router.get('/:giftGiver', function (req, res, next){
    
    Registry.find({name:req.params.giftGiver}, function (err, docs){
        console.log(docs+"are the docs")
        res.render('developerView', {docs:docs})
    })

    
})

router.put('/', function (req, res, next){
    
   
        //Make an array, one element per person, listing restricted partners
        var tArray = new Array();
        //var i = 1;
        Camball.find(function (err, docs){
            do{//because sometimes the person to give a gift is their spouse or self
                for (i=0; i<docs.length; i++){
                    let p1 = docs[i].partner1;
                    let p2 = docs[i].partner2;
                    if (p2!="nil"){
                        tArray.push({p1:p1,p2:p2})
                        tArray.push({p1:p2,p2:p1})
                    }
                    else
                        tArray.push({p1:p1,p2:p2})
                }

                //make an array, one element per person, listing who to give gifts to with logic
                //to prevent self gifts, gifts to partners or gifts to someone who already got a gift
                var gArray = new Array();
                for (let i=0; i<tArray.length; i++){//each loop determines one gift giving
                    nameToAdd = tArray[i].p1;
                    let r = Math.floor(Math.random()*tArray.length);
                    for (let n=0;n < tArray.length +10 ; n++){//loop through all possible people to give to
                        let x = (n+r)%tArray.length;
                        //if !(self, partner, already taken) then set and break loop
                        let xUngifted = true;
                        for (let y=0;y<tArray.length; y++){//check if the person already got a gift
                            if (gArray[y]!= null)
                                if (gArray[y].GiveTo == tArray[x].p1)
                                    xUngifted = false;
                        }
                        //    not giving to yourself             not your partner                  not given already      
                            if ((x != i &&                   tArray[x].p1 != tArray[i].p2     && xUngifted )){
                                gArray.push({name:nameToAdd,GiveTo:tArray[x].p1}) ;
                                break;
                            }
                    }       
                }
            }while( gArray.length < tArray.length);
            //console.log(gArray);
            console.log("there are "+ gArray.length + " gift givers")

            //move array into database
            for (let i=0;i<gArray.length;i++){
                new Registry ({name:gArray[i].name,giftTo:gArray[i].GiveTo})
                .save();
            };
        
        })//end find callback 
});//end router callback 


router.post('/', function (req, res, next){
    if (req.body.partner2.length == 0)
        new Camball({partner1: req.body.partner1, partner2:"nil"})
        .save(function() {res.redirect('camball')});
    else
        new Camball({partner1: req.body.partner1,     partner2: req.body.partner2})
        .save(function() {res.redirect('camball')});
})


///////HOW CAN I RERENDER AFTER THIS??????? 

router.delete('/:p1', function (req, res, next){
    //console.log("delete "+req.params.p1)
    Camball.deleteOne({partner1 : req.params.p1},function (err, deleted){
        //return res.redirect('camball');
        res.end();
        //res.render('../camball');
///is this redirecting to the slug, how to get back before slug

    })

});

// Export routes
module.exports = router;
