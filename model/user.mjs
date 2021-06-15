import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

  email: {
    type: String,
    trim: true,
    unique: false,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  password:{
    type:String,
    trim:true,
    required: 'password is required'
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  date: { type: Date, 
    default: Date.now 
  },
});


export default mongoose.model('user', UserSchema);