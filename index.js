var express = require("express");
var app = express();
var http = require("http");
var port = 3000;
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var urlencodedParser = bodyParser.urlencoded({
  extended: false
})
mongoose.connect('mongodb://localhost:27017/users');
app.use(express.static(__dirname + '/'));



var smtpTransport = nodemailer.createTransport(smtpTransport({
  service: 'Gmail',
  auth: {
    user: 'tplatformtest@gmail.com',
    pass: 'amazeacademy1617'
  }
}));

app.post('/send', urlencodedParser, function(req, res) {
    var mailOptions = {
        from: '"Amaze" <info@amaze.com>', // sender address
        to: req.body.friend, // list of receivers
        subject: 'Register to girl.Code ', // Subject line
        text: 'Follow this link to register to girl.Code ', // plaintext body
        html: '<b>Register to girl.Code</b> <p>Sign up to join at www.amaze.co.uk/girlCode</p>' // html body
    };
console.log(req)
    smtpTransport.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

    res.redirect("/submit.html");
});



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
        type: Boolean
    },
    friend: {
        type: String
    }

});

var User = mongoose.model('User', girl);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
}).listen(port);

app.get('/admin', function(req, res) {
    res.sendFile(__dirname + '/admin.html');
})

app.get('/getData', function(req, res) {
    User.find({}, function(err, array) {
        console.log(array);
        res.json(array);
    })
})


app.post('/', urlencodedParser, function(req, res) {

    var girls = new User({
        name: req.body.name,
        email: req.body.email,
        school: req.body.school,
        year: req.body.year,
        info: req.body.info,
        cs: req.body.cs,
        friend: req.body.friend,

        admin: Boolean
    });
    girls.save(function(err) {
        if (err) throw err;
        console.log("saved")
    });
    res.redirect("./submit.html")

});





console.log("listening to port *" + port);
