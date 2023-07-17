

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title : {type : String, required : true},
    body : {type : String, required : true},
    device : {type : String, required : true}
})

const posts = mongoose.model('post',postSchema);

module.exports = posts;