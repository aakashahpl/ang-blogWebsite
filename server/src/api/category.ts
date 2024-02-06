import express from 'express';
import verifyToken from './auth';
import categoryModel from '../model/categories';

const Router = express.Router();


interface decodedToken {
  user: {
    _id: string;
    username: string;
  },
  iat:Number;
}

Router.post('/save', verifyToken, async (req, res) => {
  try {
    const decodedToken:any= req.user;
    const category = {
      category: req.body.category,
      status: req.body.status,
      userId: decodedToken.user._id,
    };
    console.log(category);
    const addNewCategory = new categoryModel(category);
    addNewCategory.save();
    return res.status(200).json({
      message: 'category saved successfully',
    });
  } catch (error) {
    return res.status(400).json({
      message: 'category not added',
    });
  }
});

Router.get('/fetch',verifyToken, async (req, res) => {
  try {
    const decodedToken:any = req.user;
    const userId = decodedToken.user._id;
    const categories = await categoryModel.find({userId:userId});

    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(400).json({
      message: "couldn't fetch categories data",
    });
  }
});

Router.put('/update/:_id', verifyToken, async (req, res) => {
  try {
    console.log(req.params._id);
    const updateCategory = await categoryModel.findOneAndUpdate(
      { _id: req.params._id },
      { category: req.body.category, status: req.body.status }
    );
    return res.json({
      category: updateCategory,
      message: 'category successfully updated',
    });
  } catch (error) {
    return res.status(400).json({
      message: 'falied to update your category',
      errorCode: error,
    });
  }
});

Router.delete('/delete/:_id', verifyToken, async (req, res) => {
  const deleteCategory = await categoryModel.findByIdAndDelete({
    _id: req.params._id,
  });
  return res
    .status(200)
    .json({ movie: deleteCategory, message: 'Category deleted successfully' });
});

export default Router;
