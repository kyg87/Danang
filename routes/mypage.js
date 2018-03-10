var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var ObjectId = require('mongodb').ObjectID;
var db = mongojs('mongodb://dridy:fkawk1@ds121906.mlab.com:21906/danang',['mypage']);

router.get('/mypage', function(req, res, next){
    db.mypage.count( function(err,totalCount){

        pageNum = Math.ceil(totalCount/parseInt(req.query.size));

        console.log('전체글수 : ' + totalCount);
        console.log('전체페이지수 : ' + pageNum);

     
     

        db.mypage.find().sort({ '_id': -1 }).skip((parseInt(req.query.page) - 1) * req.query.size).limit(parseInt(req.query.size)).toArray(function(err, result) {
            if (err) throw err;
            
            res.json({page : pageNum, value : result})
          });
    });
})

router.get('/closeEvent', function(req, res, next){

    var dt = new Date();

    var month = dt.getMonth() + 1;
    var day = (dt.getDate() < 10 ? '0' : '' ) + dt.getDate();
    var year = dt.getFullYear().toString();
    var today = year.substr(2,2) + "." + month + "." + day;


    db.mypage.find({ 'winday': { $lte:today } },function (err, result) {
        if (err) throw err;

        res.json(result);

    });
  
})

router.get('/event/:id', function(req, res, next){
    db.event.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, boards){
        if(err){
            res.send(err);
        }
        res.json(boards);
    });
    
})

router.post('/mypage', function(req, res, next){

    var board = req.body;
    console.log(board);
    if(!board.title ){
        res.status(400);
        res.json({
            "error" : "Bad Data"
        });
    }else{
        db.mypage.save(board,function(err, boards){
            if(err){
                res.send(err);
            }
            res.json(boards);
        })
    }

})

router.delete('/mypage/:id', function(req, res, next){
    console.log(req.params.id)
    db.mypage.remove({_id: req.params.id}, function(err, mypage){
        if(err){
            res.send(err);
        }
        res.json(mypage);
    });
})

router.put('/event/:id', function(req, res, next){
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