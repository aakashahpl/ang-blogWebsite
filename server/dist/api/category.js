"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const categories_1 = __importDefault(require("../model/categories"));
const Router = express_1.default.Router();
Router.post('/save', auth_1.default, async (req, res) => {
    try {
        const decodedToken = req.user;
        const category = {
            category: req.body.category,
            status: req.body.status,
            userId: decodedToken.user._id,
        };
        console.log(category);
        const addNewCategory = new categories_1.default(category);
        addNewCategory.save();
        return res.status(200).json({
            message: 'category saved successfully',
        });
    }
    catch (error) {
        return res.status(400).json({
            message: 'category not added',
        });
    }
});
Router.get('/fetch', auth_1.default, async (req, res) => {
    try {
        const decodedToken = req.user;
        console.log("inside fetch route in category api");
        console.log(decodedToken);
        const userId = decodedToken.user._id;
        const categories = await categories_1.default.find({ userId: userId });
        return res.status(200).json({ categories });
    }
    catch (error) {
        return res.status(400).json({
            message: "couldn't fetch categories data",
        });
    }
});
Router.get('/fetch-all', async (req, res) => {
    try {
        console.log("inside fetch-all route in category api");
        const categories = await categories_1.default.find();
        return res.status(200).json({ categories });
    }
    catch (error) {
        return res.status(400).json({
            message: "couldn't fetch categories data",
        });
    }
});
Router.put('/update/:_id', auth_1.default, async (req, res) => {
    try {
        console.log(req.params._id);
        const updateCategory = await categories_1.default.findOneAndUpdate({ _id: req.params._id }, { category: req.body.category, status: req.body.status });
        return res.json({
            category: updateCategory,
            message: 'category successfully updated',
        });
    }
    catch (error) {
        return res.status(400).json({
            message: 'falied to update your category',
            errorCode: error,
        });
    }
});
Router.delete('/delete/:_id', auth_1.default, async (req, res) => {
    const deleteCategory = await categories_1.default.findByIdAndDelete({
        _id: req.params._id,
    });
    return res
        .status(200)
        .json({ movie: deleteCategory, message: 'Category deleted successfully' });
});
exports.default = Router;
//# sourceMappingURL=category.js.map