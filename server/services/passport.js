import passport from "passport";
import User from "../models/user";
import config from "../config";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

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

export default jwtLogin;
