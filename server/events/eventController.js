
/* shortly-angular */

var Link    = require('./eventModel.js'),
    Q       = require('q'),
    util    = require('../config/utils.js');


module.exports = {

  /* ALL EVENTS METHOD FROM OTHER PROJECT HERE */

  /* MAYBE USE THIS TECHNIQUE TO FIND A USER */
  findUrl: function (req, res, next, code) {  //part of the shortcode hijack w/eventRoutes.js
    var findLink = Q.nbind(Link.findOne, Link);
    findLink({code: code})
      .then(function (link) {
        if (link) {
          req.navLink = link;
          next();
        } else {
          next(new Error('Link not added yet'));
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  /* MAYBE USE THIS TECHNIQUE FOR ALLEVENTS */
  allLinks: function (req, res, next) {
  var findAll = Q.nbind(Link.find, Link);

  findAll({})
    .then(function (links) {
      res.json(links);
    })
    .fail(function (error) {
      next(error);
    });
  },

  /* MAYBE NEW EVENT METHOD */
  newLink: function (req, res, next) {
    var url = req.body.url;
    console.log(req.body);
    if (!util.isValidUrl(url)) {
      return next(new Error('Not a valid url'));
    }

    var createLink = Q.nbind(Link.create, Link);
    var findLink = Q.nbind(Link.findOne, Link);

    findLink({url: url})
      .then(function (match) {
        if (match) {
          res.send(match);
        } else {
          return  util.getUrlTitle(url);
        }
      })
      .then(function (title) {
        if (title) {
          var newLink = {
            url: url,
            visits: 0,
            base_url: req.headers.origin,
            title: title
          };
          return createLink(newLink);
        }
      })
      .then(function (createdLink) {
        if (createdLink) {
          res.json(createdLink);
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  navToLink: function (req, res, next) {
    var link = req.navLink;
    link.visits++;
    link.save(function (err, savedLink) {
      if (err) {
        next(err);
      } else {
        res.redirect(savedLink.url);
      }
    });
  }

};


/* awkwardalps */

// var mongoose = require('mongoose');
// var mongo = require('mongodb').MongoClient

// var DB;

// // this is a little weird - we're using the mongodb node module (in line 2), not the straight-up regular mongoDB stuff.  So just because a
// // command works in the mongo shell, doesn't mean it will work here.  It looks like these are the correct docs:
// // http://mongodb.github.io/node-mongodb-native/2.0/api/
// mongo.connect('mongodb://localhost:27017/corgi', function(err, db) {
//   if (err) throw err;
//   // when the connection occurs, we store the connection 'object' (or whatever it is) in a global variable so we can use it elsewhere.
//   DB = db

//   // I added some console logs throughout this file to make it easier to debug; remove them whenever you want.
//   console.log('connected')
// })

// module.exports = {
//   allEvents: function(req, res) {
//     var events = []

//     var cursorCount = 0
//     // this is the real first line, where only events happening in the future are fetched, but...
//     // var getEvents = DB.collection('corgievent').find({ datetime: { $gt: Date.now() } })
    
//     // ...for testing, we're just fetching everything.
//     var getEvents = DB.collection('corgievent').find()
//       // then sort time by ascending so we can get the events happening next...
//       .sort({ eventID: 1 })
//       // then limit the response to only ten.
//       // .limit( 10*req.body.pageNum )
//       // If there is an argument passed from events.js, it's to specify the "page," 
//       // so we might skip over some events to look at the next ten, for example.
//       // get requests require passing stuff using the params header, so we have to parse the page number here.
//       .skip ( 10*(+req.query.pageNum) )
//       // Results are streamed.
//       .stream();

//     // number of items returned; used in if statement further down.
//     getEvents.count(function(err, count) {
//       cursorCount = count
//     })

//     // turns out we can use the collection.find stuff as a stream, just like any readstream or writestream in node.
//     // http://mongodb.github.io/node-mongodb-native/2.0/tutorials/streams/
//     getEvents.on('data', function(doc) {
//       // we need another smaller stream to find the corresponding user from the corgiuser collection, using this event's 
//       // creator ID - so there should only be one result
//       var foundUser = DB.collection('corgiuser').find({ userID: doc.creatorID }).stream()
      
//       // !!!!!!!! EXTREMELY IMPORTANT - THIS COST ME A LOT OF TIME !!!!!!!!
//       // This logic only works if all of the events have a creatorID, and all creatorIDs correspond to the corgiuser collection.
//       // If that is not the case - which happened to me when I was testing writing to the database - this next part will not work,
//       // and your view will not be populated with any data whatsoever (unless you hard-code in a number in place of cursorCount in
//       // the if-statement below).  It started working again when I deleted my test data from mongo.
//       foundUser.on('data', function(user) {
//         // we set this doc's creator to the name of the user that we found
//         doc.creator = user.name

//         //these logs might eventually be used to get a separate date and time from the mongo datetime object.
//         //date
//         // console.log(doc.datetime.slice(0,10))
//         //time
//         // console.log(doc.datetime.slice(11))

//         // here we push to the events array, which is returned in res.json.
//         events.push(doc)
//         // if all found items are now in the events array, we can return the events.
//         if (events.length === cursorCount) {
//           res.json(events)
//           console.log('check passed')
//         }
          
//         })
//       })
//   },

//   newEvent: function(req, res) {
//     // save event object passed in with http request from services.js
//     DB.collection('corgievent').insert(req.body.event)
//     // return the event that was added; this makes for easy debugging in the console, where we can see the Network -> Response tabs
//     res.json(req.body.event)
//   }
// }

