"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./db"));
const route_1 = __importDefault(require("./api/route"));
const category_1 = __importDefault(require("./api/category"));
const post_1 = __importDefault(require("./api/post"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'https://blog-website-chi-ecru.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '/uploads')));
app.use("/", route_1.default);
app.use("/category", category_1.default);
app.use("/post/", post_1.default);
app.get("/test", async (req, res) => {
    res.send("api working correctly");
});
(0, db_1.default)();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server is running on Port ${PORT}`);
});
//# sourceMappingURL=index.js.map