import connectDB from "@/DB/connectDB";
import validateToken from "@/middleware/validateToken";
import Joi from "joi";
import Post from "@/model/Post";



export const config = {
    api: {
        externalResolver: true,
    },
};


const postValidateSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    postImage: Joi.string().required(),
});






export default async (req, res) => {
    await connectDB();
    const { method } = req;
    switch (method) {
        case 'POST':
            await validateToken(req, res, async () => {
                await add_post(req, res);
            });
            break;
        case 'GET':
            await validateToken(req, res, async () => {
                await get_all_post(req, res);
            });
            break;
        case 'DELETE':
            await validateToken(req, res, async () => {
                await delete_specified_post_of_user(req, res);
            });
            break;
        case 'PUT':
            await validateToken(req, res, async () => {
                await update_specified_post_of_user(req, res);
            });
            break;
        default:
            res.status(400).json({ success: false, message: 'Invalid Request' });
    }
}


const add_post = async (req, res) => {
    try {
        const data = req.body;
        const {title , description  , userID , postImage} = data
        const { error } = postValidateSchema.validate({title , description , postImage});

        if (error) return res.status(401).json({ success: false, message: error.details[0].message.replace(/['"]+/g, '') });
        const newPost = await Post.create(data);
        if (newPost) return res.status(201).json({ success: true, message: 'Post added successfully' });
    } catch (error) {
        console.log('error in adding Post (server) => ', error);
        res.status(500).json({ success: false, message: 'Something went wrong Please Retry !' });
    }
}


const get_all_post = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('userID', 'name  email bio profile background dob phoneNumber ');
        if (posts) return res.status(200).json({ success: true, data: posts });
    } catch (error) {
        console.log('error in getting posts (server) => ', error);
        res.status(500).json({ success: false, message: 'Something went wrong Please Retry !' });
    }
}


const delete_specified_post_of_user = async (req, res) => {
    try {
        const { userID , postID } = req.query;

        if(!userID || !postID) return res.status(400).json({ success: false, message: 'unAuthorized Please Login Again !' });

        const checkAuthorization =  await Post.findOne({ _id : postID , userID : userID });
        if(!checkAuthorization) return res.status(400).json({ success: false, message: 'You Are Unable To Delete Someone Else Post' });

        const post = await Post.findByIdAndDelete(postID);
        if(post) return res.status(200).json({ success: true, message : "Post Deleted Successfully" ,  });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error in deleting posts' });
    }
}


const update_specified_post_of_user = async (req, res) => {

    try {
        const data = req.body;

        const {  _id } = data;

        console.log(_id)

        const post = await Post.findByIdAndUpdate(_id , data);
        
        if(post)
        {
            const  getAllNewData =  await Post.find({});
            return res.status(200).json({ success: true, message : "Post updated Successfully" , data: getAllNewData });
        } 

    } catch (error) {

        res.status(400).json({ success: false, message: 'Error in deleting posts' });

    }
}