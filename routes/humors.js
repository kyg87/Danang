var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

//var db = mongojs('mongodb://dridy:fkawk1@ds121906.mlab.com:21906/danang',['humorbook']);
var db = mongojs('mongodb://dridy:1234@ds013475.mlab.com:13475/heroku_4s0bvwj7',['humorbook']);

router.get('/humors', function(req, res, next){

    console.log(req.query.page);
    console.log(req.query.size);
    
    // db.humorbook.find(function(err, humorbook){
    //     if(err){
    //         res.send(err);
    //     }
    //     res.json(humorbook);
    // }).sort({"id":1})
    db.humorbook.count( function(err,totalCount){

        pageNum = Math.ceil(totalCount/parseInt(req.query.size));

        console.log('전체글수 : ' + totalCount);
        console.log('전체페이지수 : ' + pageNum);

     
     

        db.humorbook.find().sort({ '_id': -1 }).skip((parseInt(req.query.page) - 1) * req.query.size).limit(parseInt(req.query.size)).toArray(function(err, result) {
            if (err) throw err;
            
            res.json({page : pageNum, value : result})
          });
    });

})

router.get('/humor/:id', function(req, res, next){
    db.humorbook.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, humorbook){
        if(err){
            res.send(err);
        }
        res.json(humorbook);
    })
})

router.post('/humor', function(req, res, next){

    var humorbook = req.body;
    console.log(humorbook);
    if(!board.title ){
        res.status(400);
        res.json({
            "error" : "Bad Data"
        });
    }else{
        db.humorbook.save(board,function(err, humorbook){
            if(err){
                res.send(err);
            }
            res.json(humorbook);
        })
    }

})

router.delete('/humorbook/:id', function(req, res, next){
    db.humorbook.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, humorbook){
        if(err){
            res.send(err);
        }
        res.json(humorbook);
    });
})


module.exports = router;