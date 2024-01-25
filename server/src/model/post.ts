import mongoose from 'mongoose';
import categoryModel from './categories';
const postSchema = new mongoose.Schema({
    title : String,
<<<<<<< HEAD
    postImg : String,
    permalink:String,
    category:{
        categoryId:{ type: mongoose.Types.ObjectId, ref: categoryModel },
        category:{ type: mongoose.Types.ObjectId, ref: categoryModel }
    },
    // postImgPath:String,
    excerpt:String,
    content:String,
    isFeatured:Boolean,
    views:Number,
    status:String,
=======

    postImg:String,

    
>>>>>>> origin/main
    createdAt:Date

});

<<<<<<< HEAD
const postModel = mongoose.model('posts', postSchema);
=======
const postModel = mongoose.model("posts", postSchema);
>>>>>>> origin/main

export default postModel;
