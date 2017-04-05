//=== Require Dependencies ==================================
const express = require('express'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      massive = require('massive'),
      config = require('./../config');

const dbPassword = config.dbPassword;
const port = config.port;
const connectionString = `postgres://postgres:${dbPassword}@localhost/hikehike`;


//=== Initialize App ========================================
const app = module.exports = express();

app.use(express.static(__dirname + './../dist'));
app.use(bodyParser.json());

app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}));


//=== Database ==============================================
const massiveInstance = massive.connectSync({
  connectionString:connectionString
});
app.set('db', massiveInstance);
const db = app.get('db');


//=== Session and Passport ==================================
const passport = require('./services/passport.js');
app.use(passport.initialize());
app.use(passport.session());

//=== Passport Endpoints ====================================
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', 
  {
    successRedirect: '/#!/profile',
    failureRedirect: '/#!/'
  }
));

var isAuthed = function(req, res, next){
  if(!req.isAuthenticated()){
     return res.status(401).send("Not authenticated");
  }
  console.log("Authenticated");
  return next();
}

//=== Controllers ===========================================
const serverCtrl = require('./controllers/serverCtrl.js'),
      reviewCtrl = require('./controllers/reviewCtrl.js'),
      userCtrl = require('./controllers/userCtrl.js');


//=== Hike Endpoints =============================================
app.post('/api/hikes', serverCtrl.createHike);
app.get('/api/hikes', serverCtrl.getAllHikes);
app.get('/api/hikes/:name', serverCtrl.getOneHike);
app.delete('/api/hikes/:name', serverCtrl.deleteHike);
app.get('/api/hikes/:len1/:len2/:feat', serverCtrl.getPerfectHike);

app.post('/api/users', serverCtrl.createUser);
app.get('/api/users', serverCtrl.getAllUsers);
app.get('/api/users/:username', serverCtrl.getOneUser);
app.delete('/api/users/:username', serverCtrl.deleteUser);

//=== Review Endpoints ======================================
app.post('/api/reviews', reviewCtrl.createReview);
app.get('/api/reviews/:hikeid', reviewCtrl.getReviewsByHike);

//=== User Endpoints ========================================
app.get('/api/me', userCtrl.me);
app.put('/api/user/current', isAuthed, userCtrl.updateCurrent);
app.get('/api/logout', function(req, res) {
  req.session.destroy(function(err){
    return res.status(200).send('logged out');
  })
});

//=== Listen ================================================
app.listen(port, () => {
   console.log(`Listening on port ${port}...`);
})