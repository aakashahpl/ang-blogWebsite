import mongoose from 'mongoose';
import userModel from './user';
const categorySchema = new mongoose.Schema({
  category: String,
  status: Boolean,
  userId: { type: mongoose.Types.ObjectId, ref: userModel },
});

const categoryModel = mongoose.model('categories', categorySchema);

export default categoryModel;
