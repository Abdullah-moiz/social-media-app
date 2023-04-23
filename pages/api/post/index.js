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