const pool = require('./models/dbConf');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const opts = {};
const dotEnv = require('dotenv').config()

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;
module.exports = passport => {passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
  pool.connect((err, client, done) => {
    if (err) {
      console.log('Error acquiring client', err.stack);
      return cb(err);
    }
    client
      .query('SELECT id, email, password FROM users WHERE id=$1', [jwt_payload.id], (err, result) => {
        if(err) {
          console.log('Error when selecting user on login', err);
          return cb(err)
        }
      })
      .then(user => {
        if(user) {
            return done(null, user);
        }
        return done(null, false);
    })
    .catch(err => console.error(err));
  });
}))
}