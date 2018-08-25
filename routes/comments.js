var mysql = require('mysql')
var express = require('express');
var router = express.Router();
var connection =mysql.createConnection({
    host: 'localhost',
    user: 'lse',
    password : '1025',
    database : 'motherbirds'
});

router.get('/comments', function(req, res, next){
    connection.connect();

    connection.query('CALL GET_COMMNETS()', function(err,rows,fields){
        if(err) throw err
        
        res.json(rows);
    })
})


module.exports = router;