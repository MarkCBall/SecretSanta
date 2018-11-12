var express = require('express');
var router = express.Router();
//var postsController = require('../controllers/posts_controller');
const Post = require('../models/post');


router.get('/', function (req, res, next) {
    Post.find().exec((err, posts) => {
        console.log(posts)
        res.locals.posts = posts
        res.locals.title = "Blog Posts"
        res.render('camball')
    })
});


router.get('/:slug', function (req, res, next) {
    Post.find().exec((err, posts) => {
        let post = posts.filter(x => x['slug'] === req.params['slug'])[0];
        res.render('posts/show', { title: posts['title'], post })
    });
});



// Export routes
module.exports = router;
