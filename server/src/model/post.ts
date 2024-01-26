import mongoose from 'mongoose';
import categoryModel from './categories';
const postSchema = new mongoose.Schema({
    title : String,
    postImg : Object,
    permalink:String,
    category:{
        categoryId:{ type: mongoose.Types.ObjectId, ref: categoryModel },
        category:String
    },
    postImgName:String,
    excerpt:String,
    content:String,
    isFeatured:Boolean,
    views:Number,
    status:String,
    createdAt:Date

});

const postModel = mongoose.model('posts', postSchema);

export default postModel;
