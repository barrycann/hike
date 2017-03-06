var app = require('./../server.js');
var db = app.get('db');

module.exports = {
   createHike: function(req, res){
      db.create_hike([
         req.body.hikename,
         req.body.nickname,
         req.body.hikesummary,
         req.body.mileslong,
         req.body.elevationgain,
         req.body.difficulty,
         req.body.rating,
         req.body.latitude,
         req.body.longitude,
         req.body.feature,
         req.body.photourl
      ], function(err, results){
         if(err){
            console.error(err);
            return res.send(err);
         }
         res.status(200).send(results);
      });
   },
   getAllHikes: function(req, res){
      db.get_all_hikes([], function(err, results){
         if(err){
            console.error(err);
            return res.send(err);
         }
         res.status(200).send(results);
      });   
   },
   getOneHike: function(req, res){
      db.get_one_hike([req.params.name], function(err, results){
         if(err){
            console.error(err);
            return res.send(err);
         }
         if(!results.length){
             return res.status(400).send("Hike not found");
         }
         res.status(200).send(results);
      })
   },
   getPerfectHike: function(req, res){
      db.get_perfect_hike([
         req.params.len1,
         req.params.len2,
         req.params.feat,
         ], function(err, results){
         if(err){
            console.error(err);
            return res.send(err);
         }
         // if(!results.length){
         //    return res.status(400).send("No hikes found.");
         // }
         return res.status(200).send(results);
      })
   },
   deleteHike: function(req, res){
      db.delete_hike([req.params.name], function(err, results){
         if(err){
            console.error(err);
            return res.send(err);
         }
         if(!results.length){
            return res.status(400).send("Hike not found");
         }
         res.send(200).send(results);
      })
   },
   createUser: function(req, res){
      db.create_user([
         req.body.username,
         req.body.userpassword,
         req.body.isadmin,
         req.body.userimage,
         req.body.userbio
      ], function(err, results){
         if(err){
            console.error(err);
            return res.send(err);
         }
         res.status(200).send(results);
      })
   },
   getAllUsers: function(req, res){
      db.get_all_users([], function(err, results){
         if(err){
            console.error(err);
            return res.send(err);
         }
         res.status(200).send(results);
      })
   },
   getOneUser: function(req, res){
      db.get_one_user([
         req.params.username
      ], function(err, results){
         if(err){
            console.error(err);
            return res.send(err);
         }
         res.status(200).send(results);
      })
   },
   deleteUser: function(req, res){
      db.delete_user([
         req.params.username
      ], function(err, results){
         if(err){
            console.error(err);
            return res.send(err);
         }
         res.status(200).send(results);
      })
   }
}