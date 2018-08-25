var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var ObjectId = require('mongodb').ObjectID;
var db = mongojs('mongodb://dridy:fkawk1@ds121906.mlab.com:21906/danang',['avNumber']);
var PythonShell = require('python-shell');

router.get('/av', function(req, res, next){
    
     console.log(req.query.cid);
     var option ={
         mode: 'text',
         pythonPath:'',
         pythonOptions:['-u'],
         scriptPath:'',
         args:[req.query.cid]
     }
     var pyshell = new PythonShell('dmm.3.py',option);
 
     pyshell.on('message', function(message){
         console.log(message)
         res.json(message)
     })
     pyshell.end(function(err){

         if(err){
             throw err;
         }
         console.log('finished')
         db.avNumber.findOne( {},function(err, boards){
            if(err){
                res.send(err);
            }
            res.json(boards);
        })

     })

 })

module.exports = router;