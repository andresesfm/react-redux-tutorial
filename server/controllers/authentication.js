import jwt from "jwt-simple";
import config from "../config";
import User from "../models/user";

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide an email and password" });
  }
  //see if user with given email exists
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    //if a user with email does exist return error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }
    // if user with email does not exist create and save user record
    const user = new User({
      email: email,
      password: password
    });
    user.save(err => {
      if (err) {
        return next(err);
      }

      // respond to request
      res.send({ token: tokenForUser(user) });
    });
  });
};

export { signup, signin };
