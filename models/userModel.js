const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
        name : {
            type : String,
            required : true,
            unique : true,
            maxLength : 25,
            
        },
        email : {
            type : String,
            required : true,
            unique : true,
        },
        password : {
            type : String,
            required : true,
            min : 5
        }, 
        profilePicture : {
            type : String,
            default : ""
        },
        coverPicture : {
            type : String,
            default : ""
        },
        followers : {
            type : Array,
            default : []
        },
        followings : {
            type : Array,
            default : []
        },
        isAdmin : {
            type : Boolean,
            default : false
        },
        desc : {
            type : String,
            max : 50
        },
        city : {
            type: String,
            max : 50
        },
        from : {
            type : String,
            max : 50
        }, 
        relationship : {
            type : Number,
            enum : [1, 2, 3],
        },
    },
    { timestamps : true }
)

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;