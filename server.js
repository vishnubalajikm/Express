var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
// var flash = require('express-flash');

var config = require('./config');
var app = express();

var User = require('./models/list');
// Middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// app.use(flash());

app.engine('ejs', engine);
app.set('view engine', 'ejs');


mongoose.connect(config.db, function(err){
  if(err){
    console.log(err );
  }else{
    console.log("Database connected to "+config.db);
  }
});

var mainRoutes = require('./routes/main');
app.use(mainRoutes);

app.listen(config.port, function(err){
  if(err) throw err;
  console.log("Server running..");
})
