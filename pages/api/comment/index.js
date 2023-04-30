import connectDB from "@/DB/connectDB";
import validateToken from "@/middleware/validateToken";
import Joi from "joi";
import Comment from "@/model/Comment";



export const config = {
    api: {
        externalResolver: true,
    },
};


const commentValidateSchema = Joi.object({
    userComment: Joi.string().required(),
    userID: Joi.string().required(),
    postID: Joi.string().required(),
});






export default async (req, res) => {
    await connectDB();
    const { method } = req;
    switch (method) {
        case 'POST':
            await validateToken(req, res, async () => {
                await submit_new_comment(req, res);
            });
            break;
        case 'GET':
            await validateToken(req, res, async () => {
                await get_comment_of_Post(req, res);
            });
            break;
        default:
            res.status(400).json({ success: false, message: 'Invalid Request' });
    }
}


const submit_new_comment = async (req, res) => {
    try {
        const data = req.body;
        const { userComment, userID, postID } = data
        const { error } = commentValidateSchema.validate({ userComment , userID , postID });

        if (error) return res.status(401).json({ success: false, message: error.details[0].message.replace(/['"]+/g, '') });

        const newPost = await Comment.create(data);
        if (newPost) return res.status(201).json({ success: true, message: 'Comments Submitted Successfully successfully' });
    } catch (error) {
        console.log('error in adding Post (server) => ', error);
        res.status(500).json({ success: false, message: 'Something went wrong Please Retry !' });
    }


}


const get_comment_of_Post = async (req , res) => {
    try {
        const { id } = req.query;
        console.log(id)

        const allComments = await Comment.find({postID : id}).populate('userID', 'name profile email ').populate('postID');
        if(allComments) return res.json({success : true , data : allComments});
        
    } catch (error) {
        console.log('error in getting comments'+  error)
        return res.json({success : false , message : "Something went Wrong Please Retry Login !"});

    }

}