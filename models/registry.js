//const slug = require('mongoose-slug-generator');
const mongoose = require('mongoose');
//mongoose.plugin(slug);


let Schema = new mongoose.Schema({
    name: {type: String, required: true}, giftTo: {type: String, required: true}, givenGift: Boolean });

let Model = mongoose.model('gift', Schema);

module.exports = Model;