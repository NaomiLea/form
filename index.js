var express = require("express");
var app = express();
var http = require("http");
var port = 3000;
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/users');

app.use(express.static(__dirname + '/'));


var Schema = mongoose.Schema;
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

var girl = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    school: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    info: {
      type: String
    },
    cs: {
  
    }

});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
}).listen(port);


app.post('/', urlencodedParser, function(req, res) {
    var User = mongoose.model('User', girl);
    var girls = new User({
        name: req.body.name,
        email: req.body.email,
        school: req.body.school,
        year: req.body.year,
        info: req.body.info,
        cs: req.body.cs,

        admin: Boolean
    });
    girls.save(function(err) {
        if (err) throw err;
        console.log("saved")
    });
    res.redirect("./submit.html")

});




console.log("listening to port *" + port);
