//const slug = require('mongoose-slug-generator');
const mongoose = require('mongoose');
//mongoose.plugin(slug);


let Schema = new mongoose.Schema({
    partner1: {type: String, required: true}, partner2: String });

// EXAMPLE OF CUSTOM VALIDATOR TO MAKE SURE STRING IS MORE THAN 3 CHARACTERS
//postSchema.path('title').validate(function(title) {
//    return title && title.length > 3;
//}, "Title must be more than 3 characters")

let Model = mongoose.model('camball', Schema);

module.exports = Model;
