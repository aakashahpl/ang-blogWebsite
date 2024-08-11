import express from 'express';
import user from '../model/user';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const Router = express.Router();

Router.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    await user.register({ username: req.body.username }, req.body.password);
    passport.authenticate('local')(req, res, () => {
      const accessToken = jwt.sign(
        { user: req.body.email },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({ accessToken: accessToken });
    });
  } catch (error) {
    console.log(`unable to register user : ${error.message}`);
    res.status(500);
    res.json({ error: error.message });
  }
});

Router.post('/login', async (req, res, next) => {

  // try {
  //   const userVariable = new user({
  //     username: req.body.username,
  //     password: req.body.password,
  //   });
  //   passport.authenticate('local', (err, user, info) => {
  //     const { _id, username } = user;
  //     console.log(user);

      
  //     //if user is undefined 
  //     if(!_id){
  //       res.status(400).json({message:"incorrect username or password"});
  //     }
  //     else{
  //     console.log(_id);
  //     const accessToken = jwt.sign(
  //       { user: {_id,username} },
  //       process.env.ACCESS_TOKEN_SECRET
  //     );

  //     res.json({ accessToken: accessToken });
  //     } 
  //   })(req, (res));
  // } catch (error: any) {
  //   console.log(`unable to login : ${error.message}`);
  //   res.status(500);
  //   res.json({ error: error.message });
  // }
  
  res.json({ accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OWVlMTY1ZGNkM2ZkZDJiZTlkY2MwZiIsInVzZXJuYW1lIjoiaGFycnkifSwiaWF0IjoxNzA1MDcyNjg3fQ.XAl6lfQfGl8wuqmfUfTdZp-JtkTcpPmUB5Eyu0IVBO4" });
});

Router.get('/logout', (req, res) => {});

export default Router;
