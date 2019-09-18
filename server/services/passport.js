import passport from "passport";
import User from "../models/user";
import config from "../config";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
//Create local Strategy
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  //verify this email and pass, call done with user
  //if correct
  //otherwise call done with false
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

//setup optons for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret
};

// Create JWT Strategy

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  //See if the user id in the payload exists in the DB
  User.findById(payload.sub, (err, user) => {
    if (err) {
      //not found, call done without the object
      done(err, false);
      return;
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});
// Tell passport to use this Strategy
passport.use(jwtLogin);
passport.use(localLogin);

export default jwtLogin;
