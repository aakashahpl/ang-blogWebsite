import mongoose from 'mongoose';
import categoryModel from './categories';
const postSchema = new mongoose.Schema({
    title : String,
    permalink:String,
    category:{
        categoryId:{ type: mongoose.Types.ObjectId, ref: categoryModel },
        category:{ type: mongoose.Types.ObjectId, ref: categoryModel }
    },
    postImgPath:String,
    excerpt:String,
    content:String,
    isFeatured:Boolean,
    views:Number,
    status:String,
    createdAt:Date

});

const postModel = mongoose.model('categories', postSchema);

export default postModel;
