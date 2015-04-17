/* shortly-angular */

var User = require('./userModel.js'),
    Q    = require('q'),
    jwt  = require('jwt-simple');

module.exports = {
  signin: function (req, res, next) {
    var username = req.body.username,
        password = req.body.password;

    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then(function(foundUser) {
              if (foundUser) {
                var token = jwt.encode(user, 'secret');
                res.json({token: token});
              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    var username  = req.body.username,
        password  = req.body.password,
        create,
        newUser;

    var findOne = Q.nbind(User.findOne, User);

    // check to see if user already exists
    findOne({username: username})
      .then(function(user) {
        if (user) {
          next(new Error('User already exist!'));
        } else {
          // make a new user if not one
          create = Q.nbind(User.create, User);
          newUser = {
            username: username,
            password: password
          };
          return create(newUser);
        }
      })
      .then(function (user) {
        // create token to send back for auth
        var token = jwt.encode(user, 'secret');
        res.json({token: token});
      })
      .fail(function (error) {
        next(error);
      });
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      var findUser = Q.nbind(User.findOne, User);
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  }
};


/* awkwardalps */

// var mongoose = require('mongoose');
// var db = mongoose.createConnection("mongodb://localhost/corgi"); //connects to database called corgi
// var bcrypt = require('bcrypt')

// // need to adjust this to match the connection, etc. in the events-controller file

// module.exports = {
//   signin: function(req, res) {
//     var user = db.users.find({ name: req.data.user.username })
//     bcrypt.compare(user.password, req.data.user.password, function(err, res) {
//       if (err) throw err;
//       console.log('logged in')

//       // Need to figure out what to do about sessions here.  Probably will use express-sessions, or jwt.encode to generate token.
//       // res.json({token: token})
//     })
//   },

//   signup: function(req, res) {
//     var user = req.data.user 

//     // auto-generate salt and hash password
//     bcrypt.genSalt(10, function(err, salt) {
//       bcrypt.hash(user.password, salt, function(err, hash) {
//           // Store hash in user object. 
//           user.password = hash
//           db.users.save(user)
//           signin(user)
//         });
//     });

//   },

//   // this will be used to view events that a user has already joined
//   userEvents: function(req, res) {
//     var eventIDs = db.users.find({ name: req.data.user.username }).eventIDs
//     var events = []
//     eventIDs.forEach(function(evID) {
//       events.push(db.events.find({ eventID: evID }))
//     })
//     res.json(events)
//   }
// }
