import mongoose from "mongoose";
import User from "./User.js";

const PostSchema = new mongoose.Schema({
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    title: {
        type: String,
        required: true,
        trim : true
    },
    description: {
        type: String,
        required: true,
        trim : true
    },
    postImage  : {
        type : String,
        required : true,
    }
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;
