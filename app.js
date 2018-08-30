var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds137862.mlab.com:37862/heroku_bhv0xx5r');

var User = mongoose.model("User", {name: String, email: String});

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser({urlencoded: true}));

app.get('/', (req, res)=>{
    res.render('homepage');
});

app.post('/send', (req, res)=>{
    var name = req.body.fname + " " + req.body.lname;
    var email = req.body.email;
    
    new User({name: name, email: email}).save().then(()=>{
        console.log('new user has logged in!');
    });
    res.redirect('/');
});

app.listen(process.env.PORT, process.env.IP, ()=>{
   console.log('Server is up!'); 
});
