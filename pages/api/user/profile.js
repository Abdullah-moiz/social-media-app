import connectDB from "@/DB/connectDB";
import User from '@/model/User'
import validateToken from "@/middleware/validateToken";



export const config = {
    api: {
        externalResolver: true,
    },
};





export default async (req, res) => {
    await connectDB();
    const { method } = req;
    switch (method) {
        case 'PUT':
            await validateToken(req, res, async () => {
                await updateProfile(req, res);
            });
            break;
        default:
            res.status(400).json({ success: false, message: 'Invalid Request' });
    }
}


const updateProfile = async (req, res) => {
    try {
        const { id, name, dob, bio, phoneNumber, background, profile } = req.body;

        

        const updateProfile = await User.findByIdAndUpdate(id, { name, bio, dob, phoneNumber, profile, background }, { new: true });
        if (updateProfile) return res.status(200).json({ success: true, message: 'Profile Updated Successfully', data: { name: updateProfile?.name, email: updateProfile?.email, profile: updateProfile?.profile, background: updateProfile?.background, dob: updateProfile?.dob, bio: updateProfile?.bio, _id: updateProfile?._id } });

    } catch (error) {
        console.log('error in updating Profile  (api) => ', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


