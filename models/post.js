const slug = require('mongoose-slug-generator');
const mongoose = require('mongoose');
mongoose.plugin(slug);


let postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tags: Array,
    created_at: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        slug: 'title'
    },
    content: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true,
    },
    image_url: String
});

// EXAMPLE OF CUSTOM VALIDATOR TO MAKE SURE STRING IS MORE THAN 3 CHARACTERS
postSchema.path('title').validate(function(title) {
    return title && title.length > 3;
}, "Title must be more than 3 characters")

let postModel = mongoose.model('Post', postSchema);

module.exports = postModel;
