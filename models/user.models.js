import mongoose, { trusted } from "mongoose";
import bcrypt from "bcrypt"; // to hash password
import jwt from "jsonwebtoken"; // to generate refresh token
const userSchema=new mongoose.Schema({
    displayName:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true
    },
    username:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        index:true
    },
    password:{
        type:String,
        required:true
    },
    avatarUrl:{
        type:String, // we will upload the photo in the cloudinary and take and upload the public URL
        
    },
    role:{
        type:String,
        required:true,
        enum:["admin","user"]
    },
    reputation:{
        type:Number,
        default:0
    },
    department:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String
    },
    notification:[
        {
            type:String
        }
    ]
},{timeStamps:true});

userSchema.pre("save",async function(next){
    if (!this.isModified("password")) return next;
    this.password=await bcrypt.hash(this.password,10);
    next;
});

userSchema.methods.comparePassword= async function (userPassword){
    return await bcrypt.compare(this.password,userPassword);
}

//access token aur refresh token method banana hoga 

userSchema.methods.generateAccessToken=async function (){
    return await jwt.sign(
        // payload// ye wo chiz hai jisme ham likhnege ki kya kya dekr ham access token generate kr sakenge 
        {
            _id:this._id,
            email:this.email,
            displayName:this.displayName,
            username:this.username
        },
        process.env.ACCESS_TOKEN_KEY,
        {
            expiresIn:process.env.ACCESS_TOKEN_KEY_Expiry
        }

    )
}

userSchema.methods.generateRefreshToken=async function (){
    return await jwt.sign(
        // payload// ye wo chiz hai jisme ham likhnege ki kya kya dekr ham access token generate kr sakenge 
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_KEY,
        {
            expiresIn:process.env.REFRESH_TOKEN_KEY_EXPIRY
        }

    )
}


export const User=mongoose.model("User",userSchema);