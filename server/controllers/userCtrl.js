var app = require('./../server.js');
var db = app.get('db');

module.exports = {
   me: function(req, res, next) {
      if (!req.session.passport){
         return res.status(401).send('Current user not defined');
      } else {
         return res.status(200).json(req.user);
      }
   },

   updateCurrentUser: function(req, res, next){

      db.update_current_user([
        req.params.userid,
        req.body.useremail,
        req.body.userbio
      ], (err, results) =>{
         if(err){
            console.error('User update error: ', err);
            return res.send(err);
         }
         res.status(200).send(results);
      });
   }


}