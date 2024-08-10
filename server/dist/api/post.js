"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_1 = __importDefault(require("../model/post"));
const multer_1 = __importDefault(require("multer"));
const auth_1 = __importDefault(require("./auth"));
const Router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        console.log("inside multer code ");
        cb(null, "src/uploads");
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + "-" + file.originalname;
        req.body.postImgName = fileName;
        cb(null, fileName);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
Router.post("/save", auth_1.default, upload.single("postImg"), (req, res) => {
    try {
        if (!req.file) {
            console.log("no file upload");
        }
        const decodedToken = req.user;
        const userId = decodedToken.user._id;
        const postObject = req.body;
        postObject.userId = userId;
        console.log(postObject);
        const newPost = new post_1.default(postObject);
        newPost.save();
        return res.status(200).json({
            message: "post successfully saved",
        });
    }
    catch (error) {
        return res.status(200).json({
            message: "post not saved ",
            error: error.message,
        });
    }
});
Router.get("/fetch", auth_1.default, async (req, res) => {
    try {
        const decodedToken = req.user;
        const userId = decodedToken.user._id;
        const posts = await post_1.default.find({ userId: userId });
        return res.status(200).json({
            posts,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "couldn't fetch posts data",
            error: error.message,
        });
    }
});
Router.get("/fetch-all", async (req, res) => {
    try {
        const posts = await post_1.default.find();
        return res.status(200).json({
            posts,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "couldn't fetch posts data",
            error: error.message,
        });
    }
});
Router.put("/update/:_id", auth_1.default, async (req, res) => {
    try {
        const post = await post_1.default.findById(req.params._id);
        if (!post) {
            return res.status(401).json({ error: "No post with the corresponding _id" });
        }
        for (const key in req.body) {
            post[key] = req.body[key];
        }
        await post.save();
        res.status(200).json({ message: "Post updated successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});
Router.delete("/delete/:_id", auth_1.default, async (req, res) => {
    try {
        const deletePost = await post_1.default.findByIdAndDelete(req.params._id);
        return res.status(200).json({ message: "post successfully deleted" });
    }
    catch (error) {
        res.status(500).json({ error: "failed to delete post" });
    }
});
exports.default = Router;
//# sourceMappingURL=post.js.map