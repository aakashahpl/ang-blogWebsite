import mongoose from 'mongoose';
import categoryModel from './categories';
import userModel from './user';
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
    createdAt:Date,
    userId:{type:mongoose.Types.ObjectId,ref:userModel}

});

const postModel = mongoose.model('posts', postSchema);

export default postModel;
