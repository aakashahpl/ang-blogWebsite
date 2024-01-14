import express from 'express';
import user from '../model/user';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const route1 = express.Router();

route1.post('/register', async (req, res) => {
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

route1.post('/login', async (req, res, next) => {
  try {
    const userVariable = new user({
      username: req.body.username,
      password: req.body.password,
    });
    passport.authenticate('local', (err, user, info) => {
      const { _id, username } = user;
      console.log(_id);
      const accessToken = jwt.sign(
        { user: {_id,username} },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({ accessToken: accessToken });
    })(req, (res));
  } catch (error: any) {
    console.log(`unable to login : ${error.message}`);
    res.status(500);
    res.json({ error: error.message });
  }
});

route1.get('/logout', (req, res) => {});

export default route1;
