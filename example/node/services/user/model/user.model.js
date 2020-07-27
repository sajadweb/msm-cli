import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
  deletedAt:{  date: {type:Date} , actor:{ type: Schema.Types.ObjectId , ref:'contact'}   },
  createdAt: { type: Date , default: Date.now() },
  updatedAt: { type: Date },
});

const userModel = mongoose.model('user', userSchema);
export default userModel;
