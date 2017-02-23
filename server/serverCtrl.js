var app = require('./server.js');
var db = app.get('db');

module.exports = {
   createHike: function(req, res){
      db.create_hike([
         req.body.hikeName,
         req.body.nickName,
         req.body.hikeSummary,
         req.body.milesLong,
         req.body.elevationGain,
         req.body.difficulty,
         req.body.rating
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
   }
}