var mysql = require('mysql')

var connection =mysql.createConnection({
    host: 'localhost',
    user: 'lse',
    password : '1025',
    database : 'motherbirds'
})

connection.connect();

connection.query('SELECT * FROM COMMENTS', function(err,rows,fields){
    if(err) throw err
    console.log(rows);
})