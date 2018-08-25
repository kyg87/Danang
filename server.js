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
//var event = require('./routes/event');
var mypage = require('./routes/mypage');
var filejo = require('./routes/filejo');
var j_caeyul = require('./routes/j_caeyul');
var he_le_n_= require('./routes/he_le_n_');
var partner = require('./routes/partner');
var avNumber = require('./routes/avNumber');
var comments = require('./routes/comments');
var fft = require('./routes/fft');
var port = 80;

var app = express();

var frameguard = require('frameguard');

app.use(frameguard({action:'sameorigin'}))
app.use(frameguard())


var httpsRedirect = require('express-https-redirect');
app.use('/', httpsRedirect());



var fs = require('fs');
var https = require('https');

var privateKey = fs.readFileSync('/etc/letsencrypt/live/motherbirds.com/privkey.pem','utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/motherbirds.com/cert.pem','utf8');
var ca = fs.readFileSync('/etc/letsencrypt/live/motherbirds.com/chain.pem','utf8');

var credentials = {key : privateKey, cert : certificate, ca : ca };

 
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname,'primeNG/dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static('public'));

app.use(function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Credentials", true);
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
//app.use('/api',event);
app.use('/api',mypage);
app.use('/api',filejo);
app.use('/api',j_caeyul);
app.use('/api',he_le_n_);
app.use('/api',comments);
app.use('/api',fft);
//app.use('/api',avNumber);

app.use('/klpnet', partner);

app.use('/users', express.static('uploads'));

app.get('/game01', function(req, res){
    res.render('pages/game.html')
});

var PythonShell = require('python-shell');


app.get('/game02', function(req, res){
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
    })

});

app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname, 'primeNG/dist/index.html'));
})



app.listen(port, function(){
    console.log('Server started on Port ' + port);
})

https.createServer(credentials, app).listen(443);

