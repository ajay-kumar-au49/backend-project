const mongoose = require('mongoose');

const postSchema = new mongoose.Schema ({
    userId : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        max : 50,
    },
    img : {
        type : String,
    },
    likes : {
        type : Array,
        default : []
    },
  },
  { timestamps : true }
)

const PostModel = mongoose.model("posts", postSchema);

module.exports = PostModel;