const passport = require('passport'),
      Auth0Strategy = require('passport-auth0');

const app = require('./../server.js');
const db = app.get('db');

const config = require('./../../config.js');

//=== Passport and Auth0 =========================================
passport.use(new Auth0Strategy(config.authConfig, function(accessToken, refreshToken, extraParams, profile, done) {
  db.getUserByAuthId([profile.id], function(err, user) {

    user = user[0];

    if(err){
      return done(err);
    }

    else if (!user) {
      console.log('CREATING USER');
      db.create_user_by_auth([profile.displayName, profile.id, profile.picture], function(err, user) {
        if(err){
          return done(err);
        }
        console.log('USER CREATED');
        return done(null, user[0]); // GOES TO SERIALIZE USER
      })
    } else { //when we find the user, return it
      console.log('User found');
      return done(null, user);
      }
    })
  }
));

//=== Put User on Session ===========================================
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;