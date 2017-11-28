var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://dridy:fkawk1@ds121906.mlab.com:21906/danang',['tasks']);

router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
})

router.get('/tasks/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
})

router.post('/tasks', function(req, res, next){

    var task = req.body;

    if(!task.title || !(task.isDone + '')){
        res.status(400);
        res.json({
            "error" : "Bad Data"
        });
    }else{
        db.tasks.save(task,function(err, task){
            if(err){
                res.send(err);
            }
            res.json(tasks);
        })
    }

})

router.delete('/tasks/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
})

router.put('/tasks/:id', function(req, res, next){
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
        db.tasks.update({_id: mongojs.objectId(req.params.id)}, updTask, { }, function(err, tasks){
            if(err){
                res.send(err);
            }
            res.json(tasks);
        });
    }
})

module.exports = router;