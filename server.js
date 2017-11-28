var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');
var boards = require('./routes/boards');

var port = 3000;

var app = express();

app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname,'client/dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  
    next();
  });
  

app.use('/api', tasks);
app.use('/api',boards);

app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
})
app.listen(port, function(){
    console.log('Server started on Port ' + port);
})