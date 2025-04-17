import express from "express";
import bodyParser from "body-parser";
import connectToDB from "./db";
import route1 from "./api/route";
import route2 from "./api/category"
import route3 from "./api/post";
import cors from "cors";
import path from "path";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  };

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use("/",route1);
app.use("/category",route2);
app.use("/post/",route3);
app.get("/test",async(req,res)=>{
    res.send("api working correctly");
})

connectToDB();
const PORT = process.env.PORT||3001;
app.listen(PORT,()=>{
    console.log(`server is running on Port ${PORT}`);
}) 