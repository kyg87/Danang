var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var ObjectId = require('mongodb').ObjectID;
var db = mongojs('mongodb://dridy:fkawk1@ds121906.mlab.com:21906/danang',['filejo']);

router.get('/filejo', function(req, res, next){
    // db.boards.find().sort({ '_id': -1 }).toArray(function(err, boards){
    //     if(err){
    //         res.send(err);
    //     }
    //     res.json(boards);
    // });

    // console.log(req.query.page);
    // console.log(req.query.size);
    

    db.filejo.count( function(err,totalCount){

        pageNum = Math.ceil(totalCount/parseInt(req.query.size));

        console.log('전체글수 : ' + totalCount);
        console.log('전체페이지수 : ' + pageNum);

     
     

        db.filejo.find().sort({ '_id': -1 }).skip((parseInt(req.query.page) - 1) * req.query.size).limit(parseInt(req.query.size)).toArray(function(err, result) {
            if (err) throw err;
            
            res.json({page : pageNum, value : result})
          });
    });
})

router.get('/filejo/:id', function(req, res, next){
    db.filejo.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, boards){
        if(err){
            res.send(err);
        }
        res.json(boards);
    });
})


router.delete('/filejo/:id', function(req, res, next){
    db.filejo.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, boards){
        if(err){
            res.send(err);
        }
        res.json(boards);
    });
})


module.exports = router;