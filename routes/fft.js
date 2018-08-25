var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var ObjectId = require('mongodb').ObjectID;
var db = mongojs('mongodb://dridy:fkawk1@ds011923.mlab.com:11923/motherbirds',['fft']);

router.get('/fft', function(req, res, next){
    // db.boards.find().sort({ '_id': -1 }).toArray(function(err, boards){
    //     if(err){
    //         res.send(err);
    //     }
    //     res.json(boards);
    // });

    console.log(req.query.page);
    console.log(req.query.size);
    

    db.fft.count( function(err,totalCount){

        pageNum = Math.ceil(totalCount/parseInt(req.query.size));

        console.log('전체글수 : ' + totalCount);
        console.log('전체페이지수 : ' + pageNum);

     
     

        db.fft.find().sort({ '_id': -1 }).skip((parseInt(req.query.page) - 1) * req.query.size).limit(parseInt(req.query.size)).toArray(function(err, result) {
            if (err) throw err;
            
            res.json({page : pageNum, value : result})
          });
    });
})



module.exports = router;