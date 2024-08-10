"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./user"));
const categorySchema = new mongoose_1.default.Schema({
    category: String,
    status: Boolean,
    userId: { type: mongoose_1.default.Types.ObjectId, ref: user_1.default },
});
const categoryModel = mongoose_1.default.model('categories', categorySchema);
exports.default = categoryModel;
//# sourceMappingURL=categories.js.map