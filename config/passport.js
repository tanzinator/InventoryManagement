// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var db = require('../db_config');
var bcrypt = require('bcrypt');
 
module.exports = function(passport) {
// used to serialize the user for the session
 passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    db.qb.where('id',id).get('users',function(err,results) {
        if (err) {
            console.log("ID:" + err);
        }
        done(err, results[0]);
    })       
});

// =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
            db.qb.where('username',username).get('users', function(err,results) {
                if (err) {
                    console.log("TANAY" + err)
                    return done(err);
                }
                if (!results.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }
                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, results[0].password), function(err,match){
                    
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); /// create the loginMessage and save it to session as flashdata
                })

                // all is well, return successful user
                return done(null, results[0]);

            })
        })
    );
};