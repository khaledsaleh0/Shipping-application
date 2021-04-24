import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const { ExtractJwt } = passportJwt;

import User from "../models/userModel.js";
//* ============================================================

export default function (passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.JWT_SECRET;
  passport.use(new LocalStrategy(User.authenticate()));

  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      console.log("JWT", jwtPayload);
      User.findOne({ _id: jwtPayload.id }, (err, user) => {
        if (err) return done(err, false);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
        .lean() // converts the docuement to JSON-object to modify it (add token_id property for token verification).
        .exec();
    })
  );

  passport.serializeUser(User.serializeUser());

  passport.deserializeUser(User.deserializeUser());
}
