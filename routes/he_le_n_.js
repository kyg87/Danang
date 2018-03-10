var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var ObjectId = require('mongodb').ObjectID;
var db = mongojs('mongodb://dridy:fkawk1@ds121906.mlab.com:21906/danang',['he.le.n_','instaId']);

router.get('/instaList', function(req, res, next){
    
     db.instaId.find( {},function(err, boards){
         if(err){
             res.send(err);
         }
         res.json(boards);
     })

 })

 router.get('/he_le_n_', function(req, res, next){
    
     // db.instaId.findOne( {},function(err, boards){
     //     if(err){
     //         res.send(err);
     //     }
     //     res.json(boards);
     // })
     
     db.he.le.n_.count({},function(err,totalCount){
 
         pageNum = Math.ceil(totalCount/parseInt(req.query.size));
 
         console.log('전체글수 : ' + totalCount);
         console.log('전체페이지수 : ' + pageNum);
 
      
      
 
         db.he.le.n_.find().sort({ '_id': -1 }).skip((parseInt(req.query.page) - 1) * req.query.size).limit(parseInt(req.query.size)).toArray(function(err, result) {
             if (err) throw err;
             
             res.json({page : pageNum, value : result})
           });
     });
 })

router.get('/he_le_n_/:id', function(req, res, next){
   
    // db.instaId.findOne( {},function(err, boards){
    //     if(err){
    //         res.send(err);
    //     }
    //     res.json(boards);
    // })
    
    db.he.le.n_.count({instaId: req.params.id} ,function(err,totalCount){

        pageNum = Math.ceil(totalCount/parseInt(req.query.size));

        console.log('전체글수 : ' + totalCount);
        console.log('전체페이지수 : ' + pageNum);

     
     

        db.he.le.n_.find({instaId: req.params.id}).sort({ '_id': -1 }).skip((parseInt(req.query.page) - 1) * req.query.size).limit(parseInt(req.query.size)).toArray(function(err, result) {
            if (err) throw err;
            
            res.json({page : pageNum, value : result})
          });
    });
})




router.delete('/he_le_n_/:id', function(req, res, next){
    db.he.le.n_.remove({instaId: req.params.id}, function(err, boards){
        if(err){
            res.send(err);
        }
        res.json(boards);
    });
})


module.exports = router;