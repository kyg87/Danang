var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://dridy:fkawk1@ds121906.mlab.com:21906/danang',['partner','partnerCol']);

router.get('/partner', function(req, res, next){

    console.log(req.query.page);
    console.log(req.query.size);
    
    // db.humorbook.find(function(err, humorbook){
    //     if(err){
    //         res.send(err);
    //     }
    //     res.json(humorbook);
    // }).sort({"id":1})
    db.partner.count( function(err,totalCount){

        pageNum = Math.ceil(totalCount/parseInt(req.query.size));

        console.log('전체글수 : ' + totalCount);
        console.log('전체페이지수 : ' + pageNum);

     
     

        db.partner.find().sort({ '_id': -1 }).skip((parseInt(req.query.page) - 1) * req.query.size).limit(parseInt(req.query.size)).toArray(function(err, result) {
            if (err) throw err;
            
            res.json({page : pageNum, value : result})
          });
    });

})

router.get('/partnerCol', function(req, res, next){
    
        console.log(req.query.page);
        console.log(req.query.size);
        
        // db.humorbook.find(function(err, humorbook){
        //     if(err){
        //         res.send(err);
        //     }
        //     res.json(humorbook);
        // }).sort({"id":1})
        db.partnerCol.count( function(err,totalCount){
    
            pageNum = Math.ceil(totalCount/parseInt(req.query.size));
    
            console.log('전체글수 : ' + totalCount);
            console.log('전체페이지수 : ' + pageNum);
    
         
         
    
            db.partnerCol.find().sort({ '_id': 1 }).skip((parseInt(req.query.page) - 1) * req.query.size).limit(parseInt(req.query.size)).toArray(function(err, result) {
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

router.post('/partner', function(req, res, next){

    var humorbook = req.body;
    console.log(humorbook);
    if(!humorbook.title ){
        res.status(400);
        res.json({
            "error" : "Bad Data"
        });
    }else{
        db.partner.save(humorbook,function(err, humorbook){
            if(err){
                res.send(err);
            }
            res.json(humorbook);
        })
    }

})

router.post('/partnerCol', function (req, res, next) {

   

    var humorbook = req.body;
    console.log(humorbook);
    if (!humorbook.key) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.partnerCol.save(humorbook, function (err, humorbook) {
            if (err) {
                res.send(err);
            }
            res.json(humorbook);
            
        })
    }

})


router.put('/partner/:id', function(req, res, next){
    var board = req.body;

    console.log(board);
    
    var temp = 'value.'+ board.index +'.value'
    
    console.log(board.part.key)
    db.partner.update(
        { _id: mongojs.ObjectId(board._id),"value.key":board.part.key },
        {
            $set:
                {
                    "value.$.value": board.part.value
                }
        }
        , function (err, boards) {
            if (err) {
                res.send(err);
            }
            res.json(boards);
        }
    )
})

router.put('/partner', function(req, res, next){
    var board = req.body;

    console.log(board);
    
    // var temp = 'value.'+ board.index +'.value'
    
    // console.log(board.part.key)
    db.partner.update(
        { },
        {
            $addToSet:
                {
                    "value": { $each: board }
                }
        },
        
        {multi:true}, 
        function (err, boards) {
            if (err) {
                res.send(err);
            }
            res.json(boards);
        }
    )
})

router.put('/partner', function(req, res, next){
    var board = req.body;

    console.log(board);
    
    // var temp = 'value.'+ board.index +'.value'
    
    // console.log(board.part.key)
    db.partner.update(
        { },
        {
            $addToSet:
                {
                    "value": { $each: board }
                }
        },
        
        {multi:true}, 
        function (err, boards) {
            if (err) {
                res.send(err);
            }
            res.json(boards);
        }
    )
})

router.put('/partnerAdd/:id', function(req, res, next){
    var board = req.body;

    console.log(board);
    
    // var temp = 'value.'+ board.index +'.value'
    
    // console.log(board.part.key)
    db.partner.update(
        {_id: mongojs.ObjectId(req.params.id)},
        {
            $addToSet:
                {
                    "value": { $each: board }
                }
        },
        
        {multi:true}, 
        function (err, boards) {
            if (err) {
                res.send(err);
            }
            res.json(boards);
        }
    )
})


router.delete('/partner/:id', function(req, res, next){
    db.humorbook.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, humorbook){
        if(err){
            res.send(err);
        }
        res.json(humorbook);
    });
})



router.get('/partnerCol/:key', function(req, res, next){
    
    console.log(req.params.key);

    db.partnerCol.findOne({ key: req.params.key}, function (err, humorbook) {
        if (err) {
            res.send(err);
        }
        res.json(humorbook);
    })
})

router.get('/partner/:key', function(req, res, next){
    
    console.log(req.params.key);

    db.partner.findOne({ title: req.params.key}, function (err, humorbook) {
        if (err) {
            res.send(err);
        }
        res.json(humorbook);
    })
})
module.exports = router;