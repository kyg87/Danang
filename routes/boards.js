var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var ObjectId = require('mongodb').ObjectID;
var db = mongojs('mongodb://dridy:fkawk1@ds121906.mlab.com:21906/danang',['boards','replys']);

router.get('/boards', function(req, res, next){
    db.boards.count( function(err,totalCount){

        pageNum = Math.ceil(totalCount/parseInt(req.query.size));

        console.log('전체글수 : ' + totalCount);
        console.log('전체페이지수 : ' + pageNum);

     
     

        db.boards.find().sort({ '_id': -1 }).skip((parseInt(req.query.page) - 1) * req.query.size).limit(parseInt(req.query.size)).toArray(function(err, result) {
            if (err) throw err;
            
            res.json({page : pageNum, value : result})
          });
    });
})

router.get('/board/:id', function(req, res, next){
    db.boards.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, boards){
        if(err){
            res.send(err);
        }
        res.json(boards);
    });
})

router.post('/board', function(req, res, next){

    var board = req.body;
    console.log(board);
    if(!board.title ){
        res.status(400);
        res.json({
            "error" : "Bad Data"
        });
    }else{
        db.boards.save(board,function(err, boards){
            if(err){
                res.send(err);
            }
            res.json(boards);
        })
    }

})

router.delete('/board/:id', function(req, res, next){
    db.boards.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, boards){
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


router.post('/reply', function(req, res, next){

    var board = req.body;
    console.log(board);
    if(!board.content ){
        res.status(400);
        res.json({
            "error" : "Bad Data"
        });
    }else{
        db.replys.save(board,function(err, boards){
            if(err){
                res.send(err);
            }
            res.json(boards);
        })
    }

})

router.get('/replys', function(req, res, next){
    db.replys.count( function(err,totalCount){

        pageNum = Math.ceil(totalCount/parseInt(req.query.size));

        console.log('전체글수 : ' + totalCount);
        console.log('전체페이지수 : ' + pageNum);
        console.log('replys : ' + req.query.id)

     
     

        db.replys.find({'id': req.query.id}).sort({ '_id': 1 }).skip((parseInt(req.query.page) - 1) * req.query.size).limit(parseInt(req.query.size)).toArray(function(err, result) {
            if (err) throw err;
            
            res.json({page : pageNum, value : result})
          });
    });
})


module.exports = router;