import mongoose from 'mongoose';
import categoryModel from './categories';
const postSchema = new mongoose.Schema({
    title : String,

    postImg:String,

    
    createdAt:Date

});

const postModel = mongoose.model("posts", postSchema);

export default postModel;
