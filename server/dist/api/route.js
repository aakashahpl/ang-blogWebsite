"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../model/user"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Router = express_1.default.Router();
Router.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        await user_1.default.register({ username: req.body.username }, req.body.password);
        passport_1.default.authenticate('local')(req, res, () => {
            const accessToken = jsonwebtoken_1.default.sign({ user: req.body.email }, process.env.ACCESS_TOKEN_SECRET);
            res.json({ accessToken: accessToken });
        });
    }
    catch (error) {
        console.log(`unable to register user : ${error.message}`);
        res.status(500);
        res.json({ error: error.message });
    }
});
Router.post('/login', async (req, res, next) => {
    try {
        const userVariable = new user_1.default({
            username: req.body.username,
            password: req.body.password,
        });
        console.log(userVariable);
        passport_1.default.authenticate('local', (err, user, info) => {
            const { _id, username } = user;
            console.log(user);
            //if user is undefined 
            if (!_id) {
                res.status(400).json({ message: "incorrect username or password" });
            }
            else {
                console.log(_id);
                const accessToken = jsonwebtoken_1.default.sign({ user: { _id, username } }, process.env.ACCESS_TOKEN_SECRET);
                res.json({ accessToken: accessToken });
            }
        })(req, (res));
    }
    catch (error) {
        console.log(`unable to login : ${error.message}`);
        res.status(500);
        res.json({ error: error.message });
    }
    // res.json({ accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OWVlMTY1ZGNkM2ZkZDJiZTlkY2MwZiIsInVzZXJuYW1lIjoiaGFycnkifSwiaWF0IjoxNzA1MDcyNjg3fQ.XAl6lfQfGl8wuqmfUfTdZp-JtkTcpPmUB5Eyu0IVBO4" });
});
Router.get('/logout', (req, res) => { });
exports.default = Router;
//# sourceMappingURL=route.js.map