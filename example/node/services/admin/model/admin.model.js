import mongoose, { Schema } from 'mongoose';
const adminSchema = new Schema({
  deletedAt:{  date: {type:Date} , actor:{ type: Schema.Types.ObjectId , ref:'contact'}   },
  createdAt: { type: Date , default: Date.now() },
  updatedAt: { type: Date },
});

const adminModel = mongoose.model('admin', adminSchema);
export default adminModel;
