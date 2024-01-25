import express from 'express';
import postModel from '../model/post';
import multer from 'multer';

const route3 = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/src/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

route3.post("/save",upload.single("postImg"),(req,res)=>{
  try {
    const postObject = req.body;
    console.log(postObject);
    const newPost = new postModel(postObject);
    newPost.save();
    return res.status(200).json({
      message : "post successfully saved",
    })
    
  } catch (error) {
    return res.status(200).json({
      message: "post not saved ",
      error:error.message
    })
  }
})




export default route3;