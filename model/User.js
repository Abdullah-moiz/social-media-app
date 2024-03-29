import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    bio: String,
    profile : String,
    background : String,
    dob : Date,
    phoneNumber : String,
},{timestamps :true});

const User = mongoose.models.User  || mongoose.model('User', UserSchema);

export default User;