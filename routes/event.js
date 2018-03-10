var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var ObjectId = require('mongodb').ObjectID;
var db = mongojs('mongodb://dridy:fkawk1@ds121906.mlab.com:21906/danang',['event']);

router.get('/event', function(req, res, next){
    // db.boards.find().sort({ '_id': -1 }).toArray(function(err, boards){
    //     if(err){
    //         res.send(err);
    //     }
    //     res.json(boards);
    // });

    // console.log(req.query.page);
    // console.log(req.query.size);
    

    db.event.count( function(err,totalCount){

        pageNum = Math.ceil(totalCount/parseInt(req.query.size));

        console.log('전체글수 : ' + totalCount);
        console.log('전체페이지수 : ' + pageNum);

     
     

        db.event.find().sort({ '_id': -1 }).skip((parseInt(req.query.page) - 1) * req.query.size).limit(parseInt(req.query.size)).toArray(function(err, result) {
            if (err) throw err;
            
            res.json({page : pageNum, value : result})
          });
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


router.delete('/event/:id', function(req, res, next){
    db.star.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, boards){
        if(err){
            res.send(err);
        }
        res.json(boards);
    });
})

// router.put('/event/:id', function(req, res, next){
//     var board = req.body;
//     var updBoard = {};

//     if(board.title){
//         updBoard.title = board.title;
//     }

//     if(board.content){
//         updBoard.content = board.content;
//     }

//     if(board.writer){
//         updBoard.writer = board.writer;
//     }

//     if(board.date){
//         updBoard.date = board.date;
//     }

//     if(board.type){
//         updBoard.type = board.type
//     }

    

//     db.boards.update({_id: mongojs.ObjectId(req.params.id)}, updBoard,function(err, boards){
//         if(err){
//             res.send( err);
//         }
//         res.json(boards);
//     });
// })

module.exports = router;