var express = require('express');
var db = require('../db_config');
var passport = require('passport');
var app = express();
module.exports = app;


/*route*/

app.post('/login', passport.authenticate('local-login', {
    successRedirect:'/home',
    failureRedirect:'/',
    failureFlash : true // allow flash messages
}))

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});