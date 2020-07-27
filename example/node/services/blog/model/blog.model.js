import mongoose, { Schema } from 'mongoose';
const blogSchema = new Schema({
  deletedAt:{  date: {type:Date} , actor:{ type: Schema.Types.ObjectId , ref:'contact'}   },
  createdAt: { type: Date , default: Date.now() },
  updatedAt: { type: Date },
});

const blogModel = mongoose.model('blog', blogSchema);
export default blogModel;
