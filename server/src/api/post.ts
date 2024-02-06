import express from "express";
import postModel from "../model/post";
import multer from "multer";
import verifyToken from "./auth";

const Router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("inside multer code ");
        cb(null, "src/uploads");
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + "-" + file.originalname;
        req.body.postImgName = fileName;
        cb(null,fileName );
    },
});

const upload = multer({ storage: storage });

Router.post("/save",verifyToken, upload.single("postImg"), (req, res) => {
    try {
        if (!req.file) {
            console.log("no file upload");
        }
        const decodedToken: any = req.user;
        const userId = decodedToken.user._id;
        const postObject = req.body;
        postObject.userId = userId;
        console.log(postObject);
        const newPost = new postModel(postObject);
        newPost.save();
        return res.status(200).json({
            message: "post successfully saved",
        });
    } catch (error) {
        return res.status(200).json({
            message: "post not saved ",
            error: error.message,
        });
    }
});

Router.get("/fetch", verifyToken, async (req, res) => {
    try {
        const decodedToken: any = req.user;
        const userId = decodedToken.user._id;
        const posts = await postModel.find({ userId: userId });
        return res.status(200).json({
            posts,
        });
    } catch (error) {
        return res.status(400).json({
            message: "couldn't fetch posts data",
            error: error.message,
        });
    }
});

Router.put("/update/:_id",verifyToken,async(req,res)=>{
    try {
        const post = await postModel.findById(req.params._id);
        if(!post){
            return res.status(401).json({error:"No post with the corresponding _id"})
        }
        for(const key in req.body){
            post[key] = req.body[key];
        }
        await post.save();
        res.status(200).json({message:"Post updated successfully"});
        
    } catch (error) {
        res.status(500).json({error:"internal server error"});
        
    }
})

Router.delete("/delete/:_id",verifyToken,async(req,res)=>{
    try {
        const deletePost = await postModel.findByIdAndDelete(req.params._id);
        return res.status(200).json({message : "post successfully deleted"});
        
    } catch (error) {
       res.status(500).json({error:"failed to delete post"}) ;
    }
})

export default Router;
