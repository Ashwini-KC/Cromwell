import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
},{
    timestamp: true
});

//To hash password
userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//To match hashed password with entered password
userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password);
};

const User = mongoose.model('User', userSchema);

export default User;