import connectDB from "@/DB/connectDB";
import User from '@/model/User'
import fs from 'fs';
import path from 'path'
import crypto from 'crypto';
import formidable from "formidable";
import validateToken from "@/middleware/validateToken";


export const config = {
    api: {
        bodyParser: false,
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
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error', err)
                throw err
            }
            let profileImage = files.profile;
            let backgroundImage = files.background;



            const randomString = crypto.randomBytes(6).toString('hex');


            let profileImageSavedName;
            let backgroundImageSavedName;


            if (profileImage?.size > 0) {
                const oldPathProfile = profileImage.filepath;
                const originalFileNameProfile = profileImage.originalFilename;
                const fileExtensionProfile = path.extname(originalFileNameProfile);
                const fileNameProfile = `${originalFileNameProfile.replace(fileExtensionProfile, '')}_${randomString}${fileExtensionProfile}`;
                const newPathProfile = path.join(process.cwd(), 'public', 'profile', fileNameProfile);


              

                fs.readFile(oldPathProfile, function (err, data) {
                    if (err) throw err;
                    fs.writeFile(newPathProfile, data, function (err) {
                        if (err) throw err;
                    });
                    fs.unlink(oldPathProfile, function (err) {
                        if (err) throw err;
                    });
                });

                profileImageSavedName = fileNameProfile;
            }

            if (backgroundImage?.size > 0) {
                const oldPathBackground = backgroundImage.filepath;
                const originalFileNameBackground = backgroundImage.originalFilename;
                const fileExtensionBackground = path.extname(originalFileNameBackground);
                const fileNameBackground = `${originalFileNameBackground.replace(fileExtensionBackground, '')}_${randomString}${fileExtensionBackground}`;
                const newPathBackground = path.join(process.cwd(), 'public', 'profile', fileNameBackground);
                


               

                fs.readFile(oldPathBackground, function (err, data) {
                    if (err) throw err;
                    fs.writeFile(newPathBackground, data, function (err) {
                        if (err) throw err;
                    });
                    fs.unlink(oldPathBackground, function (err) {
                        if (err) throw err;
                    });
                });

                backgroundImageSavedName = fileNameBackground;


            }


            const { id, name, bio, dob, phoneNumber } = fields;


            const checkProfile = await User.findById(id);

            if(checkProfile){
                if (checkProfile?.profile  && profileImageSavedName && checkProfile.profile !== profileImageSavedName) {
                    const oldProfileImagePath = path.join(process.cwd(), 'public', 'profile', checkProfile.profile);
                    fs.unlink(oldProfileImagePath, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                    });
                }
    
                if (checkProfile?.background && backgroundImageSavedName && checkProfile.background !== backgroundImageSavedName) {
                    const oldBackgroundImagePath = path.join(process.cwd(), 'public', 'background', checkProfile.background);
                    
                    fs.unlink(oldBackgroundImagePath, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                    });
                }


                const updateProfile = await User.findByIdAndUpdate(id, { name, bio, dob, phoneNumber, profile: profileImageSavedName, background: backgroundImageSavedName }, { new: true });
                if (updateProfile) return res.status(200).json({ success: true, message: 'Profile Updated Successfully', data: { name: updateProfile?.name, email: updateProfile?.email, profile: updateProfile?.profile, background: updateProfile?.background, dob: updateProfile?.dob, bio: updateProfile?.bio, _id: updateProfile?._id } });
            }

          


            return res.status(400).json({ success: false, message: 'Profile Not Updated' });

        })
    } catch (error) {
        console.log('error in updating Profile  (api) => ', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


