import connectDB from "@/DB/connectDB";
import validateToken from "@/middleware/validateToken";
import Joi from "joi";
import User from "@/model/User";



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
                await get_all_user_profile(req, res);
            });
            break;
        default:
            res.status(400).json({ success: false, message: 'Invalid Request' });
    }
}


const get_all_user_profile = async (req, res) => {
   try {
        const getUSerData = await User.find({}).select('-password');
        if(getUSerData) return res.status(200).json({ success: true, data: getUSerData });
   } catch (error) {
         console.log('error in getting all user profile (controller) => ', error);
         return res.status(500).json({ success: false, message: 'Something Went Wrong' });
   }
}


