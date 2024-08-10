"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
dotenv_1.default.config();
const userSchema = new mongoose_1.default.Schema({
    email: String,
    password: String,
});
userSchema.plugin(passport_local_mongoose_1.default);
const userModel = mongoose_1.default.model("user", userSchema);
passport_1.default.use(userModel.createStrategy());
exports.default = userModel;
//# sourceMappingURL=user.js.map