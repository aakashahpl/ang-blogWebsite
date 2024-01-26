import express from "express";
import postModel from "../model/post";
import multer from "multer";
import verifyToken from "./auth";

const route3 = express.Router();

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

route3.post("/save", upload.single("postImg"), (req, res) => {
    try {
        if (!req.file) {
            console.log("no file upload");
        }
        
        const postObject = req.body;
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

route3.get("/fetch", verifyToken, async (req, res) => {
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

export default route3;
