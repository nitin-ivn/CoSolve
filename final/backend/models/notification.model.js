import mongoose from "mongoose";
//used for sending mails for user to get notified 
const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false }
},{timestamps:true});

export const Notification = mongoose.model('Notification', notificationSchema);