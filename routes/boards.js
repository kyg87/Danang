var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://dridy:fkawk1@ds121906.mlab.com:21906/danang',['boards']);

router.get('/boards', function(req, res, next){
    db.boards.find().sort({ '_id': -1 }).toArray(function(err, boards){
        if(err){
            res.send(err);
        }
        res.json(boards);
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
    var task = req.body;
    var updTask = {};

    if(task.isDone){
        updTask.isDone = task.isDone;
    }

    if(task.title){
        updTask.title = task.title;
    }

    if(!updTask){
        res.status(400);
        res.json({
            "error":"bad Data"
        })
    }
    else{
        db.boards.update({_id: mongojs.objectId(req.params.id)}, updTask, { }, function(err, boards){
            if(err){
                res.send(err);
            }
            res.json(boards);
        });
    }
})

module.exports = router;