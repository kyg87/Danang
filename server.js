var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');

var index = require('./routes/index');
var tasks = require('./routes/tasks');
var boards = require('./routes/boards');
var humors = require('./routes/humors');
var bodygall = require('./routes/bodygall');
var star = require('./routes/star');
var event = require('./routes/event');
var mypage = require('./routes/mypage');
var filejo = require('./routes/filejo');
var j_caeyul = require('./routes/j_caeyul');
var he_le_n_= require('./routes/he_le_n_');
var partner = require('./routes/partner');
var port = 80;

var app = express();

app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname,'client/dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static('public'));

app.use(function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  
    next();
  });
  
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');

/** API path that will upload the files */
app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        console.log(req.file);
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({filePath : req.file.filename , error_code: 0, err_desc: null });
    });
});

app.use('/api', tasks);
app.use('/api',boards);
app.use('/api',humors);
app.use('/api',bodygall);
app.use('/api',star);
app.use('/api',event);
app.use('/api',mypage);
app.use('/api',filejo);
app.use('/api',j_caeyul);
app.use('/api',he_le_n_);

app.use('/klpnet', partner)

app.use('/users', express.static('uploads'));

app.get('/game01', function(req, res){
    res.render('pages/game.html')
});

app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
})



app.listen(port, function(){
    console.log('Server started on Port ' + port);
})


var client_id = 'Npy5GGG83x';
var client_secret = 'Npy5GGG83x';
var state = "RAMDOM_STATE";
var redirectURI = encodeURI("localtest.mydomain.com");
var api_url = "";
app.get('/naverlogin', function (req, res) {
  api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
   res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
   res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
 });
 app.get('/callback', function (req, res) {
    code = req.query.code;
    state = req.query.state;
    api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
     + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
    var request = require('request');
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
     };
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
        res.end(body);
      } else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    });
  });
//  app.listen(3000, function () {
//    console.log('http://127.0.0.1:3000/naverlogin app listening on port 3000!');
//  });