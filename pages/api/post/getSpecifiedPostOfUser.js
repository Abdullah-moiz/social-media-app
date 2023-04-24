import connectDB from "@/DB/connectDB";
import validateToken from "@/middleware/validateToken";
import Post from "@/model/Post";



export const config = {
    api: {
        externalResolver: true,
    },
};







export default async (req, res) => {
    await connectDB();
    const { method } = req;
    switch (method) {
        case 'GET':
            await validateToken(req, res, async () => {
                await get_specified_post_of_user(req, res);
            });
            break;
        default:
            res.status(400).json({ success: false, message: 'Invalid Request' });
    }
}

const get_specified_post_of_user = async (req, res) => {
    try {
        const { id } = req.query;
        const posts = await Post.find({ userID : id }).populate('userID', 'name profile email ');
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error in getting posts' });
    }
}