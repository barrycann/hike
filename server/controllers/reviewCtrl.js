var app = require('./../server.js');
var db = app.get('db');

module.exports = {
   createReview: function(req, res){
       db.create_review([
           req.body.hikeid,
           req.body.userid,
           req.body.reviewtitle,
           req.body.reviewtext,
           req.body.reviewrating,
           req.body.reviewtime
       ], function(err, results){
           if(err){
               console.error(err);
               return res.send(err);
           } else{
               res.status(200).send(results);
           }
       });
   }, 
   getReviewsByHike: function(req, res){
       db.get_reviews_by_hike([
           req.params.hikeid
       ], function(err, results){
           if(err){
               console.error(err);
               return res.send(err);
           } else {
               res.status(200).send(results);
           }
       });
   }
}