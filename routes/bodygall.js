var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var ObjectId = require('mongodb').ObjectID;
var db = mongojs('mongodb://dridy:fkawk1@ds121906.mlab.com:21906/danang',['bodygall']);

router.get('/bodygall', function(req, res, next){
    // db.boards.find().sort({ '_id': -1 }).toArray(function(err, boards){
    //     if(err){
    //         res.send(err);
    //     }
    //     res.json(boards);
    // });

    console.log(req.query.page);
    console.log(req.query.size);
    

    db.bodygall.count( function(err,totalCount){

        pageNum = Math.ceil(totalCount/parseInt(req.query.size));

        console.log('전체글수 : ' + totalCount);
        console.log('전체페이지수 : ' + pageNum);

     
     

        db.bodygall.find().sort({ '_id': -1 }).skip((parseInt(req.query.page) - 1) * req.query.size).limit(parseInt(req.query.size)).toArray(function(err, result) {
            if (err) throw err;
            
            res.json({page : pageNum, value : result})
          });
    });
})

router.get('/bodygall/:id', function(req, res, next){
    db.bodygall.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, boards){
        if(err){
            res.send(err);
        }
        res.json(boards);
    });
})

router.post('/bodygall', function(req, res, next){

    var board = req.body;
    console.log(board);
    if(!board.title ){
        res.status(400);
        res.json({
            "error" : "Bad Data"
        });
    }else{
        db.bodygall.save(board,function(err, boards){
            if(err){
                res.send(err);
            }
            res.json(boards);
        })
    }

})

router.delete('/board/:id', function(req, res, next){
    db.bodygall.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, boards){
        if(err){
            res.send(err);
        }
        res.json(boards);
    });
})

router.put('/board/:id', function(req, res, next){
    var board = req.body;
    var updBoard = {};

    if(board.title){
        updBoard.title = board.title;
    }

    if(board.content){
        updBoard.content = board.content;
    }

    if(board.writer){
        updBoard.writer = board.writer;
    }

    if(board.date){
        updBoard.date = board.date;
    }

    if(board.type){
        updBoard.type = board.type
    }

    

    db.boards.update({_id: mongojs.ObjectId(req.params.id)}, updBoard,function(err, boards){
        if(err){
            res.send( err);
        }
        res.json(boards);
    });
})

module.exports = router;