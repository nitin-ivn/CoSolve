import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String,required:true,unique:true},
    phoneNumber: { type:String, required: true },
    password:{type:String,required:true},
    dateOfBirth: { type: Date, required: true },
    profilePicture:{type:String,default:''},
    gender:{type:String,enum:['male','female']},
    emergencyContact: {
        name: { type: String },
        phoneNumber: { type: String},
    }, 
    posts:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}],
    bookmarks:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}],
    ongoing:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}],
    completed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    ratings: [{ type: Number }],
},{timestamps:true});
export const User = mongoose.model('User', userSchema);