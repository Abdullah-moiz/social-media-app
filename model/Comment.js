import mongoose from "mongoose";
import User from "./User.js";
import Post from './Post.js'

const CommentSchema = new mongoose.Schema({
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    postID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    },
    
    userComment: {
        type: String,
        required: true,
        trim : true
    },
    
}, { timestamps: true });

const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;
