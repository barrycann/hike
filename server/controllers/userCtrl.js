const app = require('./../server.js');
const db = app.get('db');

module.exports = {
   me: function(req, res, next) {
      if (!req.user){
         console.log('Current user not found');
         return res.sendStatus(401).send('Current user not defined');
      } 
         return res.status(200).json(req.user);
   },

   updateCurrent: function(req, res, next){
      var updateUser = req.body;
      updateUser.userid = req.user.userid;

      db.users.save(updateUser, function(err, results){
         if(err){
            console.log('User update error', err);
            return res.status(401).send(err);
         }

         console.log('user: ', user);
         req.session.passport.user = user;
         res.status(200).send(user);
      });
   }
}