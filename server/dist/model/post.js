"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categories_1 = __importDefault(require("./categories"));
const user_1 = __importDefault(require("./user"));
const postSchema = new mongoose_1.default.Schema({
    title: String,
    postImg: Object,
    permalink: String,
    category: {
        categoryId: { type: mongoose_1.default.Types.ObjectId, ref: categories_1.default },
        category: String
    },
    postImgName: String,
    excerpt: String,
    content: String,
    isFeatured: Boolean,
    views: Number,
    status: String,
    createdAt: Date,
    userId: { type: mongoose_1.default.Types.ObjectId, ref: user_1.default }
});
const postModel = mongoose_1.default.model('posts', postSchema);
exports.default = postModel;
//# sourceMappingURL=post.js.map